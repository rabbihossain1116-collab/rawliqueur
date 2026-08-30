<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('blog_page_content', function (Blueprint $table) {
            $table->id();
            $table->json('hero')->nullable();
            $table->json('featured_post')->nullable();
            $table->json('blog_posts')->nullable();
            $table->json('categories')->nullable();
            $table->json('trending_posts')->nullable();
            $table->json('tags')->nullable();
            $table->json('newsletter')->nullable();
            $table->json('cta')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('blog_page_content');
    }
};
