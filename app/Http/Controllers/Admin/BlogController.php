<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        $posts = [
            ['id' => 1, 'title' => 'The Rise of Independent Music in South Asia', 'category' => 'Industry', 'status' => 'published', 'author' => 'Admin', 'views' => '12.4K', 'published' => 'Aug 20, 2025'],
            ['id' => 2, 'title' => 'Behind the Scenes: Season 5 Grand Finale', 'category' => 'Behind the Scenes', 'status' => 'published', 'author' => 'Priya Das', 'views' => '8.7K', 'published' => 'Aug 15, 2025'],
            ['id' => 3, 'title' => '5 Tips to Make Your Audition Stand Out', 'category' => 'Tips & Tricks', 'status' => 'draft', 'author' => 'Arka Dey', 'views' => '-', 'published' => 'Draft'],
            ['id' => 4, 'title' => 'Meet the Judges: Season 6 Panel Announced', 'category' => 'News', 'status' => 'published', 'author' => 'Sanjay Bose', 'views' => '15.2K', 'published' => 'Aug 5, 2025'],
            ['id' => 5, 'title' => 'From Village to Viral: Real Stories', 'category' => 'Success Stories', 'status' => 'scheduled', 'author' => 'Moumita Sen', 'views' => '-', 'published' => 'Scheduled for Sep 1'],
        ];

        return Inertia::render('Admin/Blog', [
            'posts' => $posts,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Blog/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category' => 'required|string',
            'status' => 'required|string|in:draft,published,scheduled',
        ]);

        // Store post logic here

        return redirect()->route('admin.blog.index')->with('success', 'Post created successfully.');
    }

    public function edit($id)
    {
        $post = [
            'id' => $id,
            'title' => 'The Rise of Independent Music in South Asia',
            'content' => 'Full article content here...',
            'category' => 'Industry',
            'status' => 'published',
            'excerpt' => 'How platforms like RAW LIQUEUR are empowering...',
        ];

        return Inertia::render('Admin/Blog/Edit', [
            'post' => $post,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category' => 'required|string',
            'status' => 'required|string|in:draft,published,scheduled',
        ]);

        // Update post logic here

        return redirect()->route('admin.blog.index')->with('success', 'Post updated successfully.');
    }

    public function destroy($id)
    {
        // Delete post logic here

        return redirect()->route('admin.blog.index')->with('success', 'Post deleted successfully.');
    }
}
