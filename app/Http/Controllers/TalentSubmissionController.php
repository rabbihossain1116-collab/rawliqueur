<?php

namespace App\Http\Controllers;

use App\Models\EmailSetting;
use App\Models\TalentSubmission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

/**
 * Public talent submissions.
 *
 * The form is the most important surface on the site, so the rules here are the
 * authority — the client-side checks in SubmitTalentModal.jsx mirror them for
 * feedback only and are trivially bypassed.
 */
class TalentSubmissionController extends Controller
{
    /** Mirrors the option keys offered by the form. */
    private const TALENT_TYPES = [
        'singing', 'poetry', 'dance', 'folk', 'instrument', 'storytelling',
    ];

    private const DIVISIONS = [
        'dhaka', 'chattogram', 'rajshahi', 'khulna',
        'barishal', 'sylhet', 'rangpur', 'mymensingh',
    ];

    private const DURATIONS = ['under1', '1to3', '3to5', 'over5'];

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'min:2', 'max:120'],
            'age' => ['required', 'integer', 'min:5', 'max:100'],
            'gender' => ['required', Rule::in(['female', 'male', 'other'])],
            'division' => ['nullable', Rule::in(self::DIVISIONS)],
            'district' => ['nullable', 'string', 'max:80'],

            // Bangladeshi mobile, with or without the country code. Kept as a
            // regex rather than a loose string so the inbox does not fill with
            // unreachable numbers.
            'phone' => ['required', 'string', 'regex:/^(?:\+?880|0)1[3-9]\d{8}$/'],
            'email' => ['nullable', 'email:rfc', 'max:180'],
            'address' => ['nullable', 'string', 'max:500'],

            'talentType' => ['required', Rule::in(self::TALENT_TYPES)],
            'performanceTitle' => ['nullable', 'string', 'max:180'],
            'note' => ['nullable', 'string', 'max:2000'],

            // The whole premise of the channel: an edited video cannot be
            // accepted, so this is a hard `accepted` rather than a boolean.
            'isRaw' => ['required', 'accepted'],
            'duration' => ['required', Rule::in(self::DURATIONS)],

            'consentPublish' => ['required', 'accepted'],
            'consentTerms' => ['required', 'accepted'],
            'consentFuture' => ['nullable', 'boolean'],

            // 5MB. Laravel's `max` on files is in kilobytes.
            'photo' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],

            // 500MB. Note this also needs `upload_max_filesize` and
            // `post_max_size` raised in php.ini, plus `client_max_body_size` on
            // nginx — PHP rejects an oversized POST before Laravel ever runs.
            'video' => ['required', 'file', 'mimetypes:video/mp4,video/quicktime,video/webm', 'max:512000'],

            'language' => ['nullable', Rule::in(['bn', 'en'])],
        ], [
            'isRaw.accepted' => __('Only unedited, single-take video can be accepted.'),
        ]);

        // One folder per submission, prefixed by date so the storage directory
        // stays browsable as it grows. The random suffix keeps two people with
        // the same name on the same day from colliding.
        $folder = sprintf(
            'submissions/%s/%s-%s',
            now()->format('Y-m'),
            now()->format('d'),
            Str::slug($data['name']).'-'.Str::lower(Str::random(6)),
        );

        // Non-public disk on purpose: submissions are personal media and are not
        // web-servable until they have been reviewed and published.
        $photoPath = $request->file('photo')->store($folder);
        $videoPath = $request->file('video')->store($folder);

        $submission = TalentSubmission::create([
            'name' => $data['name'],
            'age' => $data['age'],
            'gender' => $data['gender'],
            'division' => $data['division'] ?? null,
            'district' => $data['district'] ?? null,
            'phone' => $data['phone'],
            'email' => $data['email'] ?? null,
            'address' => $data['address'] ?? null,
            'talent_type' => $data['talentType'],
            'performance_title' => $data['performanceTitle'] ?? null,
            'note' => $data['note'] ?? null,
            'is_raw' => true,
            'duration' => $data['duration'],
            'consent_publish' => true,
            'consent_terms' => true,
            'consent_future' => (bool) ($data['consentFuture'] ?? false),
            'photo_path' => $photoPath,
            'video_path' => $videoPath,
            'video_bytes' => $request->file('video')->getSize(),
            'language' => $data['language'] ?? 'bn',
        ]);

        $this->notify($submission);

        return response()->json([
            'status' => 'talent-submitted',
            'message' => 'Your submission has been received successfully.',
        ], 201);
    }

    /**
     * Notify the review inbox.
     *
     * A summary only — the video is referenced by path, never attached. Mail
     * failure must not fail the request: the files and the row are already
     * saved, so throwing here would show the visitor an error for a submission
     * that was in fact received, and they would send it again.
     */
    private function notify(TalentSubmission $submission): void
    {
        $emailSettings = EmailSetting::first();

        if (! $emailSettings || ! $emailSettings->notifications_enabled || ! $emailSettings->submissions_to) {
            return;
        }

        try {
            config([
                'mail.default' => 'smtp',
                'mail.mailers.smtp.transport' => $emailSettings->mail_driver,
                'mail.mailers.smtp.host' => $emailSettings->mail_host,
                'mail.mailers.smtp.port' => $emailSettings->mail_port,
                'mail.mailers.smtp.username' => $emailSettings->mail_username,
                'mail.mailers.smtp.password' => $emailSettings->mail_password,
                'mail.mailers.smtp.encryption' => $emailSettings->mail_encryption,
                'mail.from.address' => $emailSettings->mail_from_address,
                'mail.from.name' => $emailSettings->mail_from_name,
            ]);

            Mail::purge();

            Mail::mailer('smtp')->html($this->summary($submission), function ($message) use ($emailSettings, $submission) {
                $message->to($emailSettings->submissions_to)
                    ->subject("New talent submission — {$submission->name} ({$submission->district})")
                    ->from($emailSettings->mail_from_address, $emailSettings->mail_from_name);

                $photoFile = Storage::disk('local')->path($submission->photo_path);
                if ($submission->photo_path && file_exists($photoFile)) {
                    $message->attach($photoFile, ['as' => 'photo-' . basename($submission->photo_path)]);
                }
            });
        } catch (\Throwable $exception) {
            Log::error('Talent submission notification failed', [
                'submission_id' => $submission->id,
                'message' => $exception->getMessage(),
            ]);
        }
    }

    private function summary(TalentSubmission $submission): string
    {
        $megabytes = round($submission->video_bytes / 1_048_576, 1);
        $videoUrl = route('admin.submissions.show', $submission->video_path);

        $gender = $submission->gender === 'male' ? 'পুরুষ' : 'নারী';
        $talentMap = [
            'singing' => 'গান', 'poetry' => 'কবিতা', 'dance' => 'নৃত্য',
            'folk' => 'লোকসংগীত', 'storytelling' => 'অন্যান্য',
        ];

        return '
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
            <h2 style="color:#1a1425;border-bottom:2px solid #ec1e63;padding-bottom:8px;">New Talent Submission</h2>
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
                <tr><td style="padding:6px 12px;font-weight:bold;width:120px;">নাম</td><td style="padding:6px 12px;">'.$submission->name.'</td></tr>
                <tr><td style="padding:6px 12px;font-weight:bold;">বয়স</td><td style="padding:6px 12px;">'.$submission->age.'</td></tr>
                <tr><td style="padding:6px 12px;font-weight:bold;">জেন্ডার</td><td style="padding:6px 12px;">'.$gender.'</td></tr>
                <tr><td style="padding:6px 12px;font-weight:bold;">ঠিকানা</td><td style="padding:6px 12px;">'.($submission->address ?: '—').'</td></tr>
                <tr><td style="padding:6px 12px;font-weight:bold;">ফোন</td><td style="padding:6px 12px;">'.$submission->phone.'</td></tr>
                <tr><td style="padding:6px 12px;font-weight:bold;">প্রতিভা</td><td style="padding:6px 12px;">'.($talentMap[$submission->talent_type] ?? $submission->talent_type).'</td></tr>
                <tr><td style="padding:6px 12px;font-weight:bold;">ভিডিও দৈর্ঘ্য</td><td style="padding:6px 12px;">'.$submission->duration.'</td></tr>
                <tr><td style="padding:6px 12px;font-weight:bold;">ভাষা</td><td style="padding:6px 12px;">বাংলা</td></tr>
                <tr><td style="padding:6px 12px;font-weight:bold;">ভবিষ্যত সম্মতি</td><td style="padding:6px 12px;">'.($submission->consent_future ? 'হ্যাঁ' : 'না').'</td></tr>
            </table>
            <div style="margin:16px 0;padding:16px;background:#f4f4f4;border-radius:8px;">
                <p style="margin:0 0 8px;"><strong>ছবি:</strong> Attached</p>
                <p style="margin:0 0 8px;"><strong>ভিডিও:</strong> '.$megabytes.' MB</p>
                <a href="'.$videoUrl.'" style="display:inline-block;padding:10px 20px;background:#ec1e63;color:#fff;text-decoration:none;border-radius:6px;font-weight:bold;">▶ ভিডিও দেখুন</a>
            </div>
            <p style="color:#999;font-size:12px;margin-top:16px;">Review before publishing: check breathing, lip sync, ambient continuity, file metadata.</p>
        </div>';
    }
}
