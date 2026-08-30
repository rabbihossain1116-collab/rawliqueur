<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('contact_page_content', function (Blueprint $table) {
            $table->id();
            $table->json('hero')->nullable();
            $table->json('contact_info')->nullable();
            $table->json('form')->nullable();
            $table->json('faqs')->nullable();
            $table->json('social_links')->nullable();
            $table->json('business_hours')->nullable();
            $table->json('cta')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contact_page_content');
    }
};
