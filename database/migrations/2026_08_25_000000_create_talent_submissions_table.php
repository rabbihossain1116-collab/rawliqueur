<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Talent submissions.
 *
 * Every entry from the public form lands here. The row is the record of intent;
 * the uploaded photo and video live on the filesystem and are referenced by
 * path, because a 500MB video has no business in a database column.
 *
 * `status` drives the review workflow described in the brief: each submission is
 * checked for editing/AI before it can be published, so nothing is publishable
 * straight out of the form.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('talent_submissions', function (Blueprint $table) {
            $table->id();

            // Identity
            $table->string('name');
            $table->unsignedTinyInteger('age');
            $table->string('gender', 16);
            $table->string('division', 32);
            $table->string('district');
            $table->string('phone', 24);
            $table->string('email')->nullable();

            // The performance
            $table->string('talent_type', 32);
            $table->string('performance_title')->nullable();
            $table->text('note')->nullable();
            $table->boolean('is_raw');
            $table->string('duration', 16);

            // Consent. Stored per-clause rather than as one flag: these are the
            // permissions the channel relies on to publish, so which ones were
            // granted has to remain auditable after the fact.
            $table->boolean('consent_publish');
            $table->boolean('consent_terms');
            $table->boolean('consent_future')->default(false);

            // Uploads — relative paths on the configured disk.
            $table->string('photo_path');
            $table->string('video_path');
            $table->unsignedBigInteger('video_bytes');

            // Review workflow
            $table->string('status', 20)->default('pending');
            $table->text('review_note')->nullable();
            $table->string('published_video_id')->nullable();
            $table->timestamp('reviewed_at')->nullable();

            // Which language the form was filled in — worth knowing before
            // replying to someone.
            $table->string('language', 5)->default('bn');

            $table->timestamps();

            // The admin queue is always "pending, oldest first".
            $table->index(['status', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('talent_submissions');
    }
};
