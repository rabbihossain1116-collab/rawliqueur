<?php

namespace Database\Seeders;

use App\Models\BlogPageContent;
use Illuminate\Database\Seeder;

class BlogPageContentSeeder extends Seeder
{
    public function run(): void
    {
        BlogPageContent::updateOrCreate(['id' => 1], [
            'hero' => [
                'bgImage' => '/images/slider 1.png',
                'title' => 'Stories, Tips &',
                'subtitle' => 'Inspiration — RAW LIQUEUR',
            ],
            'featured_post' => [
                'title' => 'The Rise of Independent Music in South Asia',
                'excerpt' => 'How platforms like RAW LIQUEUR are empowering a new generation of artists to share their raw, unedited talent with the world.',
                'image' => 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=500&fit=crop',
                'author' => 'Rajesh Kumar',
                'authorImage' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
                'date' => 'Aug 20, 2025',
                'readTime' => '8 min read',
                'category' => 'Industry',
            ],
            'blog_posts' => [
                [
                    'title' => 'Behind the Scenes: Season 5 Grand Finale',
                    'excerpt' => 'A look at what goes into producing the biggest talent showcase in South Asia.',
                    'image' => 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
                    'author' => 'Priya Das',
                    'authorImage' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
                    'date' => 'Aug 15, 2025',
                    'readTime' => '5 min read',
                    'category' => 'Behind the Scenes',
                ],
                [
                    'title' => '5 Tips to Make Your Audition Stand Out',
                    'excerpt' => "Expert advice on how to grab the judges' attention from the very first note.",
                    'image' => 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=400&fit=crop',
                    'author' => 'Arka Dey',
                    'authorImage' => 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&crop=face',
                    'date' => 'Aug 10, 2025',
                    'readTime' => '4 min read',
                    'category' => 'Tips & Tricks',
                ],
                [
                    'title' => 'Meet the Judges: Season 6 Panel Announced',
                    'excerpt' => 'We reveal the distinguished panel of judges who will guide the next generation of talent.',
                    'image' => 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop',
                    'author' => 'Sanjay Bose',
                    'authorImage' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
                    'date' => 'Aug 5, 2025',
                    'readTime' => '3 min read',
                    'category' => 'News',
                ],
                [
                    'title' => 'From Village to Viral: Real Stories of RAW LIQUEUR Winners',
                    'excerpt' => 'Inspiring journeys of artists who transformed their lives through authentic performance.',
                    'image' => 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=400&fit=crop',
                    'author' => 'Moumita Sen',
                    'authorImage' => 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
                    'date' => 'Jul 28, 2025',
                    'readTime' => '6 min read',
                    'category' => 'Success Stories',
                ],
                [
                    'title' => 'The Power of Raw Performance',
                    'excerpt' => 'Why unedited, authentic talent resonates more with audiences than polished productions.',
                    'image' => 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=600&h=400&fit=crop',
                    'author' => 'Ridoy Das',
                    'authorImage' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
                    'date' => 'Jul 20, 2025',
                    'readTime' => '7 min read',
                    'category' => 'Opinion',
                ],
                [
                    'title' => 'How to Prepare for a Live Performance',
                    'excerpt' => 'Essential preparation tips from industry experts to help you shine on stage.',
                    'image' => 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=600&h=400&fit=crop',
                    'author' => 'Tania Khatun',
                    'authorImage' => 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=face',
                    'date' => 'Jul 15, 2025',
                    'readTime' => '5 min read',
                    'category' => 'Tips & Tricks',
                ],
            ],
            'categories' => [
                ['name' => 'All', 'count' => 24],
                ['name' => 'News', 'count' => 8],
                ['name' => 'Behind the Scenes', 'count' => 5],
                ['name' => 'Tips & Tricks', 'count' => 6],
                ['name' => 'Success Stories', 'count' => 3],
                ['name' => 'Opinion', 'count' => 2],
            ],
            'trending_posts' => [
                ['title' => 'Season 5 Winners Announcement', 'views' => '45.2K', 'date' => 'Aug 18, 2025'],
                ['title' => "Behind the Judges' Panel", 'views' => '32.1K', 'date' => 'Aug 12, 2025'],
                ['title' => 'Top 10 Audition Moments', 'views' => '28.7K', 'date' => 'Aug 8, 2025'],
                ['title' => 'The Making of RAW LIQUEUR', 'views' => '21.3K', 'date' => 'Aug 1, 2025'],
            ],
            'tags' => ['Singing', 'Dance', 'Poetry', 'Music', 'Competition', 'Judges', 'Winners', 'Audition'],
            'newsletter' => [
                'icon' => '✉️',
                'title' => 'Stay in the loop',
                'description' => 'Subscribe to our newsletter for the latest updates, exclusive stories, and insider tips delivered straight to your inbox.',
                'buttonText' => 'Subscribe Now',
            ],
            'cta' => [
                'icon' => '🎤',
                'title' => 'Got a story to share?',
                'description' => "We love hearing from our community. Whether you have a success story, a tip to share, or want to contribute — we'd love to hear from you.",
                'buttonText' => '★ SUBMIT YOUR TALENT',
                'button2Text' => 'Learn More About Us →',
            ],
        ]);
    }
}
