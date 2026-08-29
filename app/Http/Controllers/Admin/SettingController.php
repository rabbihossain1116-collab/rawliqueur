<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
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

        // Update settings logic here

        return redirect()->route('admin.settings')->with('success', 'Settings updated successfully.');
    }
}
