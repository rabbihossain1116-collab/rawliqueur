<?php

use App\Http\Controllers\Admin\AboutContentController;
use App\Http\Controllers\Admin\ArtistsPageContentController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ArtistController;
use App\Http\Controllers\Admin\BlogController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\HomeContentController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\TalentController;
use App\Http\Controllers\Admin\UploadController;
use App\Http\Controllers\Admin\WinnerController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->name('admin.')->middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    // Home Content
    Route::get('home-content', [HomeContentController::class, 'index'])->name('home-content');
    Route::put('home-content', [HomeContentController::class, 'update'])->name('home-content.update');

    // About Content
    Route::get('about-content', [AboutContentController::class, 'index'])->name('about-content');
    Route::put('about-content', [AboutContentController::class, 'update'])->name('about-content.update');

    // Artists Page Content
    Route::get('artists-content', [ArtistsPageContentController::class, 'index'])->name('artists-content');
    Route::put('artists-content', [ArtistsPageContentController::class, 'update'])->name('artists-content.update');

    // Upload
    Route::post('upload', [UploadController::class, 'store'])->name('upload');

    // Artists
    Route::resource('artists', ArtistController::class)->except(['show']);

    // Talent Submissions
    Route::resource('talent', TalentController::class)->except(['show', 'create', 'edit']);
    Route::patch('talent/{talent}/approve', [TalentController::class, 'approve'])->name('talent.approve');
    Route::patch('talent/{talent}/reject', [TalentController::class, 'reject'])->name('talent.reject');

    // Blog Posts
    Route::resource('blog', BlogController::class)->except(['show']);

    // Winners
    Route::resource('winners', WinnerController::class)->except(['show']);

    // Contact Messages
    Route::resource('contact', ContactController::class)->except(['show', 'create', 'edit']);
    Route::patch('contact/{contact}/read', [ContactController::class, 'markAsRead'])->name('contact.read');

    // Settings
    Route::get('settings', [SettingController::class, 'index'])->name('settings');
    Route::put('settings', [SettingController::class, 'update'])->name('settings.update');
});
