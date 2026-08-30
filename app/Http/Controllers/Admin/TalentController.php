<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class TalentController extends Controller
{
    public function index()
    {
        $submissions = [
            ['id' => 1, 'name' => 'Rahul Das', 'email' => 'rahul@example.com', 'category' => 'Singing', 'videoUrl' => 'https://youtube.com/watch?v=xxx', 'status' => 'pending', 'submitted' => '2 hours ago'],
            ['id' => 2, 'name' => 'Ananya Sen', 'email' => 'ananya@example.com', 'category' => 'Dance', 'videoUrl' => 'https://youtube.com/watch?v=yyy', 'status' => 'pending', 'submitted' => '5 hours ago'],
            ['id' => 3, 'name' => 'Subho Adhikary', 'email' => 'subho@example.com', 'category' => 'Poetry', 'videoUrl' => 'https://youtube.com/watch?v=zzz', 'status' => 'approved', 'submitted' => '1 day ago'],
            ['id' => 4, 'name' => 'Mou Mukherjee', 'email' => 'mou@example.com', 'category' => 'Singing', 'videoUrl' => 'https://youtube.com/watch?v=aaa', 'status' => 'rejected', 'submitted' => '2 days ago'],
            ['id' => 5, 'name' => 'Imran Khan', 'email' => 'imran@example.com', 'category' => 'Instrumental', 'videoUrl' => 'https://youtube.com/watch?v=bbb', 'status' => 'pending', 'submitted' => '3 days ago'],
        ];

        return Inertia::render('Admin/Talent', [
            'submissions' => $submissions,
        ]);
    }

    public function destroy($id)
    {
        // Delete submission logic here

        return redirect()->route('admin.talent.index')->with('success', 'Submission deleted.');
    }

    public function approve($id)
    {
        // Approve submission logic here

        return redirect()->route('admin.talent.index')->with('success', 'Submission approved.');
    }

    public function reject($id)
    {
        // Reject submission logic here

        return redirect()->route('admin.talent.index')->with('success', 'Submission rejected.');
    }
}
