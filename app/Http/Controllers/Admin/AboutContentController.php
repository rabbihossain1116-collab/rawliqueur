<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AboutContent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutContentController extends Controller
{
    public function index()
    {
        $content = AboutContent::firstOrCreate(['id' => 1]);

        return Inertia::render('Admin/AboutContent', [
            'content' => $content,
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'hero' => 'nullable|array',
            'voice_pairs_1' => 'nullable|array',
            'features' => 'nullable|array',
            'voice_pairs_2' => 'nullable|array',
            'journey' => 'nullable|array',
            'community_1' => 'nullable|array',
            'values' => 'nullable|array',
            'community_2' => 'nullable|array',
            'cta' => 'nullable|array',
        ]);

        AboutContent::updateOrCreate(['id' => 1], $data);

        return redirect()->back()->with('success', 'About content updated successfully.');
    }
}
