<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArtistController extends Controller
{
    public function index()
    {
        $artists = [
            ['id' => 1, 'name' => 'Priya Sengupta', 'category' => 'Singing', 'status' => 'active', 'uploads' => 12, 'views' => '2.4M', 'joined' => '2024-01-15'],
            ['id' => 2, 'name' => 'Ridoy Das', 'category' => 'Singing', 'status' => 'active', 'uploads' => 8, 'views' => '1.8M', 'joined' => '2024-02-20'],
            ['id' => 3, 'name' => 'Sneha Chakraborty', 'category' => 'Singing', 'status' => 'active', 'uploads' => 15, 'views' => '3.1M', 'joined' => '2023-11-10'],
            ['id' => 4, 'name' => 'Arka Dey', 'category' => 'Poetry', 'status' => 'pending', 'uploads' => 5, 'views' => '890K', 'joined' => '2024-03-05'],
            ['id' => 5, 'name' => 'Tania Khatun', 'category' => 'Dance', 'status' => 'active', 'uploads' => 9, 'views' => '1.2M', 'joined' => '2024-01-28'],
            ['id' => 6, 'name' => 'Farhan Ahmed', 'category' => 'Instrumental', 'status' => 'active', 'uploads' => 11, 'views' => '1.5M', 'joined' => '2023-12-12'],
            ['id' => 7, 'name' => 'Moumita Bose', 'category' => 'Singing', 'status' => 'inactive', 'uploads' => 7, 'views' => '950K', 'joined' => '2024-02-14'],
            ['id' => 8, 'name' => 'Rohan Mitra', 'category' => 'Poetry', 'status' => 'active', 'uploads' => 6, 'views' => '780K', 'joined' => '2024-03-20'],
        ];

        return Inertia::render('Admin/Artists', [
            'artists' => $artists,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Artists/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'category' => 'required|string|in:Singing,Dance,Poetry,Instrumental,Storytelling',
        ]);

        // Store artist logic here

        return redirect()->route('admin.artists.index')->with('success', 'Artist created successfully.');
    }

    public function edit($id)
    {
        $artist = [
            'id' => $id,
            'name' => 'Priya Sengupta',
            'email' => 'priya@example.com',
            'category' => 'Singing',
            'status' => 'active',
            'bio' => 'A talented singer from Kolkata...',
        ];

        return Inertia::render('Admin/Artists/Edit', [
            'artist' => $artist,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|in:Singing,Dance,Poetry,Instrumental,Storytelling',
            'status' => 'required|string|in:active,inactive,pending',
        ]);

        // Update artist logic here

        return redirect()->route('admin.artists.index')->with('success', 'Artist updated successfully.');
    }

    public function destroy($id)
    {
        // Delete artist logic here

        return redirect()->route('admin.artists.index')->with('success', 'Artist deleted successfully.');
    }
}
