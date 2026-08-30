<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactPageContent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactPageContentController extends Controller
{
    public function index()
    {
        $content = ContactPageContent::firstOrCreate(['id' => 1]);

        return Inertia::render('Admin/ContactContent', [
            'content' => $content,
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'hero' => 'nullable|array',
            'contact_info' => 'nullable|array',
            'form' => 'nullable|array',
            'faqs' => 'nullable|array',
            'social_links' => 'nullable|array',
            'business_hours' => 'nullable|array',
            'cta' => 'nullable|array',
        ]);

        ContactPageContent::updateOrCreate(['id' => 1], $data);

        return redirect()->back()->with('success', 'Contact page content updated successfully.');
    }
}
