<?php

use App\Http\Controllers\TalentSubmissionController;
use App\Models\AboutContent;
use App\Models\ArtistsPageContent;
use App\Models\HomeContent;
use App\Models\WinnersPageContent;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $homeContent = HomeContent::getOrCreate();

    return Inertia::render('Home', [
        'homeContent' => $homeContent,
    ]);
})->name('home');

Route::get('/about', function () {
    $aboutContent = AboutContent::firstOrCreate(['id' => 1]);

    return Inertia::render('About', [
        'aboutContent' => $aboutContent,
    ]);
})->name('about');

Route::get('/artists', function () {
    $artistsContent = ArtistsPageContent::firstOrCreate(['id' => 1]);

    return Inertia::render('Artists', [
        'artistsContent' => $artistsContent,
    ]);
})->name('artists');

Route::get('/winners', function () {
    $winnersContent = WinnersPageContent::firstOrCreate(['id' => 1]);

    return Inertia::render('Winners', [
        'winnersContent' => $winnersContent,
    ]);
})->name('winners');

Route::get('/blog', fn () => Inertia::render('Blog'))->name('blog');

Route::get('/contact', fn () => Inertia::render('Contact'))->name('contact');

Route::post('/submit-talent', [TalentSubmissionController::class, 'store'])
    ->middleware('throttle:6,60')
    ->name('talent.store');

// Admin routes
require __DIR__.'/admin.php';

// Auth routes
require __DIR__.'/auth.php';
