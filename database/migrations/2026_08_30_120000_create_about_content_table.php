<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('about_content', function (Blueprint $table) {
            $table->id();
            $table->json('hero')->nullable();
            $table->json('voice_pairs_1')->nullable();
            $table->json('features')->nullable();
            $table->json('voice_pairs_2')->nullable();
            $table->json('journey')->nullable();
            $table->json('community_1')->nullable();
            $table->json('values')->nullable();
            $table->json('community_2')->nullable();
            $table->json('cta')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('about_content');
    }
};
