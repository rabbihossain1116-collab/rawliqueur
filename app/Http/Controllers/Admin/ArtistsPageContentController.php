<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ArtistsPageContent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArtistsPageContentController extends Controller
{
    public function index()
    {
        $content = ArtistsPageContent::firstOrCreate(['id' => 1]);
        return Inertia::render('Admin/ArtistsContent', [
            'content' => $content,
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'hero' => 'nullable|array',
            'section_header' => 'nullable|array',
            'artists' => 'nullable|array',
            'cta' => 'nullable|array',
        ]);

        ArtistsPageContent::updateOrCreate(['id' => 1], $data);

        return redirect()->back()->with('success', 'Artists page content updated successfully.');
    }
}
