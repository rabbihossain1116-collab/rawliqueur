<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        $messages = [
            ['id' => 1, 'name' => 'Suvo Adhikary', 'email' => 'suvo@example.com', 'subject' => 'Partnership Inquiry', 'message' => 'I would like to discuss a potential collaboration...', 'status' => 'unread', 'received' => '2 hours ago'],
            ['id' => 2, 'name' => 'Tania Khatun', 'email' => 'tania@example.com', 'subject' => 'Talent Submission', 'message' => 'I want to submit my performance for review...', 'status' => 'read', 'received' => '5 hours ago'],
            ['id' => 3, 'name' => 'Arka Dey', 'email' => 'arka@example.com', 'subject' => 'Technical Support', 'message' => 'I am having trouble uploading my video...', 'status' => 'replied', 'received' => '1 day ago'],
            ['id' => 4, 'name' => 'Moumita Bose', 'email' => 'mou@example.com', 'subject' => 'General Inquiry', 'message' => 'When does Season 6 start?', 'status' => 'unread', 'received' => '2 days ago'],
        ];

        return Inertia::render('Admin/Contact', [
            'messages' => $messages,
        ]);
    }

    public function destroy($id)
    {
        // Delete message logic here

        return redirect()->route('admin.contact.index')->with('success', 'Message deleted.');
    }

    public function markAsRead($id)
    {
        // Mark as read logic here

        return redirect()->route('admin.contact.index')->with('success', 'Message marked as read.');
    }
}
