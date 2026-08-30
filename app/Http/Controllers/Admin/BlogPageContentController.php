<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPageContent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogPageContentController extends Controller
{
    public function index()
    {
        $content = BlogPageContent::firstOrCreate(['id' => 1]);

        return Inertia::render('Admin/BlogContent', [
            'content' => $content,
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'hero' => 'nullable|array',
            'featured_post' => 'nullable|array',
            'blog_posts' => 'nullable|array',
            'categories' => 'nullable|array',
            'trending_posts' => 'nullable|array',
            'tags' => 'nullable|array',
            'newsletter' => 'nullable|array',
            'cta' => 'nullable|array',
        ]);

        BlogPageContent::updateOrCreate(['id' => 1], $data);

        return redirect()->back()->with('success', 'Blog page content updated successfully.');
    }
}
