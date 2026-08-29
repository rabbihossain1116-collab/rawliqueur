<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WinnerController extends Controller
{
    public function index()
    {
        $winners = [
            ['id' => 1, 'name' => 'Priya Sengupta', 'category' => 'Singing', 'season' => '5', 'achievement' => 'Grand Finale Winner', 'status' => 'active', 'views' => '6.2M'],
            ['id' => 2, 'name' => 'Ridoy Das', 'category' => 'Singing', 'season' => '4', 'achievement' => 'Grand Champion', 'status' => 'active', 'views' => '22M'],
            ['id' => 3, 'name' => 'Sneha Chakraborty', 'category' => 'Singing', 'season' => '3', 'achievement' => 'Best Performer', 'status' => 'active', 'views' => '76.3M'],
            ['id' => 4, 'name' => 'Diya Nandy', 'category' => 'Dance', 'season' => '4', 'achievement' => 'Best Dancer', 'status' => 'active', 'views' => '18.5M'],
            ['id' => 5, 'name' => 'Rohan Mitra', 'category' => 'Poetry', 'season' => '3', 'achievement' => 'Best Poet', 'status' => 'active', 'views' => '5.8M'],
        ];

        return Inertia::render('Admin/Winners', [
            'winners' => $winners,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Winners/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string',
            'season' => 'required|integer|min:1|max:10',
            'achievement' => 'required|string|max:255',
        ]);

        // Store winner logic here

        return redirect()->route('admin.winners.index')->with('success', 'Winner added successfully.');
    }

    public function edit($id)
    {
        $winner = [
            'id' => $id,
            'name' => 'Priya Sengupta',
            'category' => 'Singing',
            'season' => '5',
            'achievement' => 'Grand Finale Winner',
            'quote' => 'RAW LIQUEUR gave me a platform...',
        ];

        return Inertia::render('Admin/Winners/Edit', [
            'winner' => $winner,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string',
            'season' => 'required|integer|min:1|max:10',
            'achievement' => 'required|string|max:255',
        ]);

        // Update winner logic here

        return redirect()->route('admin.winners.index')->with('success', 'Winner updated successfully.');
    }

    public function destroy($id)
    {
        // Delete winner logic here

        return redirect()->route('admin.winners.index')->with('success', 'Winner removed successfully.');
    }
}
