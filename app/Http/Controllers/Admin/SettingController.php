<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\EmailSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        $emailSettings = EmailSetting::firstOrCreate(['id' => 1]);

        $settings = [
            'site_name' => 'RAW LIQUEUR',
            'site_description' => 'A platform for raw, real and remarkable talent',
            'contact_email' => 'info@rawliqueur.com',
            'social_facebook' => 'https://facebook.com/rawliqueur',
            'social_youtube' => 'https://youtube.com/rawliqueur',
            'social_instagram' => 'https://instagram.com/rawliqueur',
            'maintenance_mode' => false,
            'allow_submissions' => true,
        ];

        return Inertia::render('Admin/Settings', [
            'settings' => $settings,
            'emailSettings' => $emailSettings,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'site_name' => 'required|string|max:255',
            'site_description' => 'required|string|max:500',
            'contact_email' => 'required|email',
            'social_facebook' => 'nullable|url',
            'social_youtube' => 'nullable|url',
            'social_instagram' => 'nullable|url',
            'maintenance_mode' => 'boolean',
            'allow_submissions' => 'boolean',
        ]);

        return redirect()->route('admin.settings', ['tab' => 'general'])->with('success', 'Settings updated successfully.');
    }

    public function updateEmail(Request $request)
    {
        $validated = $request->validate([
            'mail_driver' => 'required|string|max:50',
            'mail_host' => 'required|string|max:255',
            'mail_port' => 'required|integer|min:1|max:65535',
            'mail_username' => 'nullable|string|max:255',
            'mail_password' => 'nullable|string|max:255',
            'mail_encryption' => 'required|string|in:tls,ssl',
            'mail_from_address' => 'nullable|email',
            'mail_from_name' => 'required|string|max:255',
            'submissions_to' => 'nullable|email',
            'notifications_enabled' => 'boolean',
        ]);

        EmailSetting::updateOrCreate(['id' => 1], $validated);

        return redirect()->route('admin.settings', ['tab' => 'email'])->with('success', 'Email settings updated successfully.');
    }

    public function sendTestEmail(Request $request)
    {
        $request->validate([
            'test_email' => 'required|email',
        ]);

        $emailSettings = EmailSetting::first();

        if (! $emailSettings) {
            return redirect()->route('admin.settings', ['tab' => 'email'])->with('error', 'Please save email settings first before sending a test email.');
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
            Mail::purge('smtp');

            Mail::mailer('smtp')->raw('This is a test email from RAW LIQUEUR admin panel. If you received this, your email configuration is working correctly.', function ($message) use ($request, $emailSettings) {
                $message->to($request->test_email)
                    ->subject('RAW LIQUEUR - Test Email')
                    ->from($emailSettings->mail_from_address, $emailSettings->mail_from_name);
            });

            return redirect()->route('admin.settings', ['tab' => 'email'])->with('success', 'Test email sent successfully!');
        } catch (\Throwable $exception) {
            return redirect()->route('admin.settings', ['tab' => 'email'])->with('error', 'Failed to send test email: '.$exception->getMessage());
        }
    }
}
