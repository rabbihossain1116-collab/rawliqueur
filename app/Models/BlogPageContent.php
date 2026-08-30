<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BlogPageContent extends Model
{
    protected $table = 'blog_page_content';

    protected $fillable = [
        'hero',
        'featured_post',
        'blog_posts',
        'categories',
        'trending_posts',
        'tags',
        'newsletter',
        'cta',
    ];

    protected $casts = [
        'hero' => 'array',
        'featured_post' => 'array',
        'blog_posts' => 'array',
        'categories' => 'array',
        'trending_posts' => 'array',
        'tags' => 'array',
        'newsletter' => 'array',
        'cta' => 'array',
    ];
}
