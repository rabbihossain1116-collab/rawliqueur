<?php

use App\Http\Controllers\TalentSubmissionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('Home'))->name('home');

Route::get('/about', fn () => Inertia::render('About'))->name('about');

Route::get('/artists', fn () => Inertia::render('Artists'))->name('artists');

Route::get('/winners', fn () => Inertia::render('Winners'))->name('winners');

Route::post('/submit-talent', [TalentSubmissionController::class, 'store'])
    ->middleware('throttle:6,60')
    ->name('talent.store');
