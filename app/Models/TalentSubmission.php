<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * A single entry from the public submission form.
 *
 * @property string $status One of the STATUS_* constants.
 */
class TalentSubmission extends Model
{
    use HasFactory;

    /** Awaiting the editing/AI check described in the brief. */
    public const STATUS_PENDING = 'pending';

    /** Passed the check and is queued for the channel. */
    public const STATUS_APPROVED = 'approved';

    /** Live on YouTube — `published_video_id` holds the video ID. */
    public const STATUS_PUBLISHED = 'published';

    /** Failed the check. `review_note` should say why. */
    public const STATUS_REJECTED = 'rejected';

    /**
     * No `$guarded = []`. This model is populated directly from public form
     * input, so the writable columns are listed explicitly — `status`,
     * `review_note`, `published_video_id` and `reviewed_at` are deliberately
     * absent so no request can mark its own submission approved.
     */
    protected $fillable = [
        'name',
        'age',
        'gender',
        'division',
        'district',
        'phone',
        'email',
        'talent_type',
        'performance_title',
        'note',
        'is_raw',
        'duration',
        'consent_publish',
        'consent_terms',
        'consent_future',
        'photo_path',
        'video_path',
        'video_bytes',
        'language',
    ];

    protected function casts(): array
    {
        return [
            'age' => 'integer',
            'is_raw' => 'boolean',
            'consent_publish' => 'boolean',
            'consent_terms' => 'boolean',
            'consent_future' => 'boolean',
            'video_bytes' => 'integer',
            'reviewed_at' => 'datetime',
        ];
    }
}
