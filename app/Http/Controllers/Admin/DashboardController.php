<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'totalArtists' => 156,
            'totalSubmissions' => 1247,
            'totalViews' => '2.4M',
            'pendingReviews' => 23,
            'monthlyGrowth' => '+12.5%',
            'activeUsers' => '45.2K',
        ];

        $recentActivity = [
            ['id' => 1, 'type' => 'submission', 'name' => 'Rahul Das', 'action' => 'New talent submission', 'time' => '2 minutes ago', 'status' => 'pending'],
            ['id' => 2, 'type' => 'artist', 'name' => 'Priya Sengupta', 'action' => 'Profile updated', 'time' => '15 minutes ago', 'status' => 'approved'],
            ['id' => 3, 'type' => 'blog', 'name' => 'Admin', 'action' => 'Published new article', 'time' => '1 hour ago', 'status' => 'published'],
            ['id' => 4, 'type' => 'contact', 'name' => 'Suvo Adhikary', 'action' => 'New contact message', 'time' => '2 hours ago', 'status' => 'unread'],
            ['id' => 5, 'type' => 'winner', 'name' => 'Season 5 Finale', 'action' => 'Winner announced', 'time' => '3 hours ago', 'status' => 'completed'],
        ];

        $chartData = [
            'labels' => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            'submissions' => [120, 145, 167, 189, 210, 234, 256, 278, 301, 324, 347, 370],
            'views' => [4500, 5200, 6100, 7200, 8500, 9800, 11200, 12800, 14500, 16400, 18500, 20800],
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentActivity' => $recentActivity,
            'chartData' => $chartData,
        ]);
    }
}
