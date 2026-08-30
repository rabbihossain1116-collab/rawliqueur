<?php

use App\Http\Controllers\TalentSubmissionController;
use App\Models\AboutContent;
use App\Models\ArtistsPageContent;
use App\Models\BlogPageContent;
use App\Models\ContactPageContent;
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

Route::get('/blog', function () {
    $blogContent = BlogPageContent::firstOrCreate(['id' => 1]);

    return Inertia::render('Blog', [
        'blogContent' => $blogContent,
    ]);
})->name('blog');

Route::get('/contact', function () {
    $contactContent = ContactPageContent::firstOrCreate(['id' => 1]);

    return Inertia::render('Contact', [
        'contactContent' => $contactContent,
    ]);
})->name('contact');

Route::post('/submit-talent', [TalentSubmissionController::class, 'store'])
    ->middleware('throttle:6,60')
    ->name('talent.store');

// Admin routes
require __DIR__.'/admin.php';

// Auth routes
require __DIR__.'/auth.php';
