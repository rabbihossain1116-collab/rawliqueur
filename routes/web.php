<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TalentSubmissionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public site
|--------------------------------------------------------------------------
|
| These pages render from content in `resources/js/data/*`, so they need no
| props yet. When the admin panel lands, pass the data in from here and the
| components will not need to change — they already read a fixed shape.
|
| `auth.user` is shared globally by HandleInertiaRequests, so no route needs
| to pass it.
*/

Route::get('/', fn () => Inertia::render('Home'))->name('home');

Route::get('/videos', fn () => Inertia::render('Videos'))->name('videos');

Route::get('/winners', fn () => Inertia::render('Winners'))->name('winners');

Route::get('/about', fn () => Inertia::render('About'))->name('about');

Route::get('/journal', fn () => Inertia::render('Journal/Index'))->name('journal');

/*
 * The slug is resolved client-side against resources/js/data/posts.js, because
 * there is no posts table for the server to check it against yet. An unknown
 * slug therefore renders the page's own not-found state rather than a 404.
 * Once posts are in the database, look the model up here and 404 properly.
 */
Route::get('/journal/{slug}', fn (string $slug) => Inertia::render('Journal/Show', [
    'slug' => $slug,
]))->name('journal.show');

// The public submission form. Rate limited because it accepts large uploads
// from unauthenticated visitors.
Route::post('/submit-talent', [TalentSubmissionController::class, 'store'])
    ->middleware('throttle:6,60')
    ->name('talent.store');

/*
|--------------------------------------------------------------------------
| Authenticated
|--------------------------------------------------------------------------
*/

Route::get('/dashboard', fn () => Inertia::render('Dashboard'))
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
