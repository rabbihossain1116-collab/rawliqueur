<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('winners_page_content', function (Blueprint $table) {
            $table->id();
            $table->json('hero')->nullable();
            $table->json('stats')->nullable();
            $table->json('featured_winners')->nullable();
            $table->json('winners_by_season')->nullable();
            $table->json('category_winners')->nullable();
            $table->json('testimonials')->nullable();
            $table->json('cta')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('winners_page_content');
    }
};
