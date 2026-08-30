<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WinnersPageContent extends Model
{
    protected $table = 'winners_page_content';

    protected $fillable = [
        'hero',
        'stats',
        'featured_winners',
        'winners_by_season',
        'category_winners',
        'testimonials',
        'cta',
    ];

    protected $casts = [
        'hero' => 'array',
        'stats' => 'array',
        'featured_winners' => 'array',
        'winners_by_season' => 'array',
        'category_winners' => 'array',
        'testimonials' => 'array',
        'cta' => 'array',
    ];
}
