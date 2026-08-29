<?php

use App\Http\Controllers\TalentSubmissionController;
use Illuminate\Support\Facades\Route;

Route::post('/submit-talent', [TalentSubmissionController::class, 'store'])
    ->middleware('throttle:6,60')
    ->name('talent.store');
