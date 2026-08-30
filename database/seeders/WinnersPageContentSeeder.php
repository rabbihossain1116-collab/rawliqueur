<?php

namespace Database\Seeders;

use App\Models\WinnersPageContent;
use Illuminate\Database\Seeder;

class WinnersPageContentSeeder extends Seeder
{
    public function run(): void
    {
        WinnersPageContent::updateOrCreate(['id' => 1], [
            'hero' => [
                'bgImage' => '/images/slider 1.png',
                'title' => 'Celebrating Extraordinary',
                'subtitle' => 'RAW LIQUEUR Talent Champions',
            ],
            'stats' => [
                ['value' => '120+', 'label' => 'Winners', 'icon' => '🏆'],
                ['value' => '5', 'label' => 'Seasons', 'icon' => '🎬'],
                ['value' => '50K+', 'label' => 'Participants', 'icon' => '🎤'],
                ['value' => '10M+', 'label' => 'Votes Cast', 'icon' => '🗳️'],
            ],
            'featured_winners' => [
                [
                    'name' => 'Priya Sengupta',
                    'category' => 'Singing',
                    'achievement' => 'Winner — Season 5 Grand Finale',
                    'image' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
                    'videoId' => 'qz38Kthnxfo',
                    'quote' => 'RAW LIQUEUR gave me a platform to share my voice with the world. This journey has been life-changing.',
                    'season' => '5',
                    'views' => '6.2M',
                ],
                [
                    'name' => 'Ridoy Das',
                    'category' => 'Singing',
                    'achievement' => 'Grand Champion — Season 4',
                    'image' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
                    'videoId' => 'gxet54MhNQI',
                    'quote' => 'From a small town in Bangladesh to the national stage — RAW LIQUEUR made it possible.',
                    'season' => '4',
                    'views' => '22M',
                ],
                [
                    'name' => 'Sneha Chakraborty',
                    'category' => 'Singing',
                    'achievement' => 'Best Performer — Season 3',
                    'image' => 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
                    'videoId' => 'sqJ2QhjBQaw',
                    'quote' => 'Every note I sing is for the people who believed in me. Thank you, RAW LIQUEUR.',
                    'season' => '3',
                    'views' => '76.3M',
                ],
            ],
            'winners_by_season' => [
                [
                    'season' => '5',
                    'year' => '2025',
                    'winners' => [
                        ['name' => 'Priya Sengupta', 'category' => 'Singing', 'image' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face'],
                        ['name' => 'Tanishk Shukla', 'category' => 'Singing', 'image' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face'],
                        ['name' => 'Iman Sen', 'category' => 'Storytelling', 'image' => 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face'],
                    ],
                ],
                [
                    'season' => '4',
                    'year' => '2024',
                    'winners' => [
                        ['name' => 'Ridoy Das', 'category' => 'Singing', 'image' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face'],
                        ['name' => 'Diya Nandy', 'category' => 'Dance', 'image' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face'],
                        ['name' => 'Farhan Ahmed', 'category' => 'Instrumental', 'image' => 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face'],
                    ],
                ],
                [
                    'season' => '3',
                    'year' => '2023',
                    'winners' => [
                        ['name' => 'Sneha Chakraborty', 'category' => 'Singing', 'image' => 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face'],
                        ['name' => 'Rohan Mitra', 'category' => 'Poetry', 'image' => 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face'],
                        ['name' => 'Moumita Bose', 'category' => 'Singing', 'image' => 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face'],
                    ],
                ],
            ],
            'category_winners' => [
                ['category' => 'Best Singer', 'winner' => 'Priya Sengupta', 'season' => '5', 'icon' => '🎤'],
                ['category' => 'Best Dancer', 'winner' => 'Diya Nandy', 'season' => '4', 'icon' => '💃'],
                ['category' => 'Best Poet', 'winner' => 'Rohan Mitra', 'season' => '3', 'icon' => '✍️'],
                ['category' => 'Best Storyteller', 'winner' => 'Iman Sen', 'season' => '5', 'icon' => '📖'],
                ['category' => 'Best Musician', 'winner' => 'Farhan Ahmed', 'season' => '4', 'icon' => '🎵'],
                ['category' => "People's Choice", 'winner' => 'Ridoy Das', 'season' => '4', 'icon' => '❤️'],
            ],
            'testimonials' => [
                [
                    'name' => 'Arka Dey',
                    'role' => 'Season 4 Finalist',
                    'text' => 'The competition was fierce, but the support from the RAW LIQUEUR community kept me going. Even as a finalist, I felt like a winner.',
                    'image' => 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&crop=face',
                ],
                [
                    'name' => 'Suvo Adhikary',
                    'role' => 'Season 3 Performer',
                    'text' => "My performance reached 190M views! RAW LIQUEUR doesn't just find winners — they create stars.",
                    'image' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
                ],
                [
                    'name' => 'Tania Khatun',
                    'role' => 'Season 5 Top 10',
                    'text' => 'From Bangladesh to the world stage. RAW LIQUEUR believed in my talent when no one else did.',
                    'image' => 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=face',
                ],
            ],
            'cta' => [
                'icon' => '🌟',
                'title' => 'Ready to be the next champion?',
                'description' => 'Join thousands of talented artists who have showcased their raw, unedited performances. Your journey to the top starts with one submission.',
                'buttonText' => '★ SUBMIT YOUR TALENT',
                'button2Text' => 'View All Artists →',
            ],
        ]);
    }
}
