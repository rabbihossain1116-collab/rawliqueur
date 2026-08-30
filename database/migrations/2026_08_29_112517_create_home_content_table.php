<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('home_content', function (Blueprint $table) {
            $table->id();
            $table->json('hero'); // Hero section data
            $table->json('categories'); // Category bar data
            $table->json('top_talents'); // Top talents section
            $table->json('stats'); // Stats section
            $table->json('videos'); // Latest performances videos
            $table->json('cta'); // CTA banner data
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('home_content');
    }
};
