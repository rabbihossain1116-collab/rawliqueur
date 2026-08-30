<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ArtistsPageContent extends Model
{
    protected $table = 'artists_page_content';

    protected $fillable = [
        'hero',
        'section_header',
        'artists',
        'cta',
    ];

    protected $casts = [
        'hero' => 'array',
        'section_header' => 'array',
        'artists' => 'array',
        'cta' => 'array',
    ];
}
