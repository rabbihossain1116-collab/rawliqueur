<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutContent extends Model
{
    protected $table = 'about_content';

    protected $fillable = [
        'hero',
        'voice_pairs_1',
        'features',
        'voice_pairs_2',
        'journey',
        'community_1',
        'values',
        'community_2',
        'cta',
    ];

    protected $casts = [
        'hero' => 'array',
        'voice_pairs_1' => 'array',
        'features' => 'array',
        'voice_pairs_2' => 'array',
        'journey' => 'array',
        'community_1' => 'array',
        'values' => 'array',
        'community_2' => 'array',
        'cta' => 'array',
    ];
}
