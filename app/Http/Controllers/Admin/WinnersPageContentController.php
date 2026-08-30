<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\WinnersPageContent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WinnersPageContentController extends Controller
{
    public function index()
    {
        $content = WinnersPageContent::firstOrCreate(['id' => 1]);

        return Inertia::render('Admin/WinnersContent', [
            'content' => $content,
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'hero' => 'nullable|array',
            'stats' => 'nullable|array',
            'featured_winners' => 'nullable|array',
            'winners_by_season' => 'nullable|array',
            'category_winners' => 'nullable|array',
            'testimonials' => 'nullable|array',
            'cta' => 'nullable|array',
        ]);

        WinnersPageContent::updateOrCreate(['id' => 1], $data);

        return redirect()->back()->with('success', 'Winners page content updated successfully.');
    }
}
