<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('artists_page_content', function (Blueprint $table) {
            $table->id();
            $table->json('hero')->nullable();
            $table->json('section_header')->nullable();
            $table->json('artists')->nullable();
            $table->json('cta')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('artists_page_content');
    }
};
