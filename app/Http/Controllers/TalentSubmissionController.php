<?php

namespace App\Http\Controllers;

use App\Models\TalentSubmission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
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

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'min:2', 'max:120'],
            'age' => ['required', 'integer', 'min:5', 'max:100'],
            'gender' => ['required', Rule::in(['female', 'male', 'other'])],
            'division' => ['required', Rule::in(self::DIVISIONS)],
            'district' => ['required', 'string', 'max:80'],

            // Bangladeshi mobile, with or without the country code. Kept as a
            // regex rather than a loose string so the inbox does not fill with
            // unreachable numbers.
            'phone' => ['required', 'string', 'regex:/^(?:\+?880|0)1[3-9]\d{8}$/'],
            'email' => ['nullable', 'email:rfc', 'max:180'],

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
            'division' => $data['division'],
            'district' => $data['district'],
            'phone' => $data['phone'],
            'email' => $data['email'] ?? null,
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

        return back()->with('status', 'talent-submitted');
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
        $to = config('mail.submissions_to');

        if (! $to) {
            return;
        }

        try {
            Mail::raw($this->summary($submission), function ($message) use ($to, $submission) {
                $message->to($to)
                    ->subject("New talent submission — {$submission->name} ({$submission->district})");
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

        return implode("\n", [
            "Submission #{$submission->id}",
            '',
            "Name       : {$submission->name} ({$submission->age})",
            "From       : {$submission->district}, {$submission->division}",
            "Phone      : {$submission->phone}",
            'Email      : '.($submission->email ?: '—'),
            "Talent     : {$submission->talent_type}",
            'Title      : '.($submission->performance_title ?: '—'),
            "Length     : {$submission->duration}",
            "Language   : {$submission->language}",
            'Future ok  : '.($submission->consent_future ? 'yes' : 'no'),
            '',
            "Photo      : {$submission->photo_path}",
            "Video      : {$submission->video_path} ({$megabytes} MB)",
            '',
            'Note:',
            $submission->note ?: '—',
            '',
            'Review before publishing: check breathing, lip sync, ambient continuity, file metadata.',
        ]);
    }
}
