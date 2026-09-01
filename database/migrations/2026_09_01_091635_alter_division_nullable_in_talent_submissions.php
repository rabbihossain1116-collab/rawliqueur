<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('talent_submissions', function (Blueprint $table) {
            $table->string('division', 80)->nullable()->change();
            $table->string('district', 80)->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('talent_submissions', function (Blueprint $table) {
            $table->string('division', 80)->nullable(false)->change();
            $table->string('district', 80)->nullable(false)->change();
        });
    }
};
