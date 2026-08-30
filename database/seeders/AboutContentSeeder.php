<?php

namespace Database\Seeders;

use App\Models\AboutContent;
use Illuminate\Database\Seeder;

class AboutContentSeeder extends Seeder
{
    public function run(): void
    {
        AboutContent::updateOrCreate(['id' => 1], [
            'hero' => [
                'bgImage' => '/images/aboutuse.png',
                'title' => 'প্রতিভা ও কবিতা গানে',
                'subtitle' => 'RAW LIQUEUR রাজনির প্রানে',
            ],
            'voice_pairs_1' => [
                [
                    'left' => [
                        'image' => '/images/kumar-sanu.webp',
                        'name' => 'Kumar Sanu',
                        'role' => 'Playback Singer',
                        'quote' => '"সঙ্গীত আমার ভগবানের সেবা নয়, এ আমার প্রাণের ভাষা, মানুষের প্রতি ভালোবাসা।"',
                    ],
                    'right' => [
                        'image' => '/images/lata-mangeshkar.webp',
                        'name' => 'Lata Mangeshkar',
                        'role' => 'Playback Singer',
                        'quote' => '"যতই প্রযুক্তি উন্নত হোক না কেন, সঙ্গীতের মাধুর্য সবসময় হৃদয়ে থেকে হৃদয়ে পৌঁছায়।"',
                    ],
                ],
            ],
            'features' => [
                ['icon' => '🛡', 'title' => '100% Authentic', 'desc' => 'We ensure every performance is real and true.'],
                ['icon' => '🤝', 'title' => 'Equal Opportunity', 'desc' => 'We believe in talent, not popularity. Everyone gets a chance.'],
                ['icon' => '👥', 'title' => 'Community Driven', 'desc' => 'Our community decides who deserves the spotlight.'],
                ['icon' => '📈', 'title' => 'Support & Growth', 'desc' => 'We help talents grow and reach a wider audience.'],
                ['icon' => '♥', 'title' => 'Pure Passion', 'desc' => 'This platform is built with love for art and culture.'],
            ],
            'voice_pairs_2' => [
                [
                    'left' => [
                        'image' => '/images/hemant-kumar.webp',
                        'name' => 'Hemanta Mukhopadhyay',
                        'role' => 'Singer & Composer',
                        'quote' => '"সুরের ভুবনে ভালোবাসাই আমার একমাত্র ঠিকানা।"',
                    ],
                    'right' => [
                        'image' => '/images/jibanananda-das.webp',
                        'name' => 'Jibanananda Das',
                        'role' => 'Poet',
                        'quote' => '"বাংলার মাটির গন্ধ মিশে আছে আমার কবিতার প্রতিটি শব্দে।"',
                    ],
                ],
            ],
            'journey' => [
                'subtitle' => 'Our Journey',
                'title' => 'A Journey Towards Real Recognition',
                'description' => 'RAW Liqueur-এর পথচলা প্রতিভার খোঁজে, চলার প্রেরণার সুযোগ করে দিয়ে এবং সংস্কৃতিকে সঠিক গুরুত্ব দেওয়া। আমাদের লক্ষ্য একটি বিশ্বস্ত, বৈচিত্র্য-চালিত প্ল্যাটফর্ম তৈরি করা, যেখাানে প্রতিটি প্রতিভা সুযোগ, স্বীকৃতি এবং ভালোবাসা পায়।',
                'buttonText' => 'Join Our Journey',
                'stats' => [
                    ['icon' => '🗓', 'value' => '2026', 'label' => 'Started'],
                    ['icon' => '🎤', 'value' => '100+', 'label' => 'Events'],
                    ['icon' => '🎯', 'value' => '1000+', 'label' => 'Talents'],
                ],
                'impactStat' => [
                    'icon' => '📣',
                    'value' => '1M+',
                    'label' => 'Lives Impacted',
                    'description' => 'আমাদের প্ল্যাটফর্মের মাধ্যমে লক্ষাধিক মানুষের জীবনে অনুপ্রেরণা ও আনন্দ ছড়িয়ে দিয়েছি।',
                ],
            ],
            'community_1' => [
                ['initials' => 'RT', 'name' => 'Rabindranath Tagore', 'role' => 'Poet & Composer', 'quote' => '"প্রতিটি সৎ সৃষ্টিতে সমাজ কে এগিয়ে নিয়ে যায়।"'],
                ['initials' => 'KN', 'name' => 'Kazi Nazrul Islam', 'role' => 'Poet & Composer', 'quote' => '"শিল্প মানুষের মুক্তির পথ, প্রতিটি গান একটি বিপ্লব।"'],
            ],
            'values' => [
                ['icon' => '♥', 'title' => 'Respect', 'desc' => 'We respect every artist and every performance.'],
                ['icon' => '⚖', 'title' => 'Fairness', 'desc' => 'We ensure fairness in every opportunity we provide.'],
                ['icon' => '★', 'title' => 'Passion', 'desc' => 'We are passionate about preserving our culture and creativity.'],
                ['icon' => '👥', 'title' => 'Community', 'desc' => 'We grow together as a strong and supportive family.'],
                ['icon' => '🏆', 'title' => 'Excellence', 'desc' => 'We strive for excellence in everything we do.'],
            ],
            'community_2' => [
                ['initials' => 'MD', 'name' => 'Manna Dey', 'role' => 'Playback Singer', 'quote' => '"সঙ্গীতের সাধনায় ছন্দ খুঁজে পাওয়া-ই আমার পথ।"'],
                ['initials' => 'SM', 'name' => 'Sandhya Mukhopadhyay', 'role' => 'Playback Singer', 'quote' => '"সুরের মাঝে মানুষের ভালোবাসাই আমার প্রেরণা।"'],
            ],
            'cta' => [
                'icon' => '🎙',
                'subtitle' => 'Be Part of Our Mission',
                'title' => 'Help Us Celebrate Real Talent',
                'description' => 'Submit your talent or support others. Together, we can build a better platform for art & culture.',
                'buttonText' => '✎ Submit Your Talent →',
            ],
        ]);
    }
}
