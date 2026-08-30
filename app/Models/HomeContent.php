<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomeContent extends Model
{
    protected $table = 'home_content';

    protected $fillable = [
        'hero',
        'categories',
        'top_talents',
        'stats',
        'videos',
        'cta',
    ];

    protected $casts = [
        'hero' => 'array',
        'categories' => 'array',
        'top_talents' => 'array',
        'stats' => 'array',
        'videos' => 'array',
        'cta' => 'array',
    ];

    public static function getOrCreate(): self
    {
        return static::firstOrCreate(['id' => 1], [
            'hero' => [],
            'categories' => [],
            'top_talents' => [],
            'stats' => [],
            'videos' => [],
            'cta' => [],
        ]);
    }
}
