<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HomeContent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeContentController extends Controller
{
    public function index()
    {
        $content = HomeContent::getOrCreate();

        return Inertia::render('Admin/HomeContent', [
            'content' => $content,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'hero' => 'required|array',
            'categories' => 'required|array',
            'top_talents' => 'required|array',
            'stats' => 'required|array',
            'videos' => 'required|array',
            'cta' => 'required|array',
        ]);

        $content = HomeContent::getOrCreate();
        $content->update($validated);

        return redirect()->route('admin.home-content')->with('success', 'Home page content updated successfully.');
    }
}
