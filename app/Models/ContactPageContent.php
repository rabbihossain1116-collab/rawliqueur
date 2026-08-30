<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactPageContent extends Model
{
    protected $table = 'contact_page_content';

    protected $fillable = [
        'hero',
        'contact_info',
        'form',
        'faqs',
        'social_links',
        'business_hours',
        'cta',
    ];

    protected $casts = [
        'hero' => 'array',
        'contact_info' => 'array',
        'form' => 'array',
        'faqs' => 'array',
        'social_links' => 'array',
        'business_hours' => 'array',
        'cta' => 'array',
    ];
}
