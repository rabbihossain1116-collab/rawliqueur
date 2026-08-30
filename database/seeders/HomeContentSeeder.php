<?php

namespace Database\Seeders;

use App\Models\HomeContent;
use Illuminate\Database\Seeder;

class HomeContentSeeder extends Seeder
{
    public function run(): void
    {
        HomeContent::updateOrCreate(
            ['id' => 1],
            [
                'hero' => [
                    'title' => 'প্রতিভা ও কবিতা গানে',
                    'highlight' => 'RAW LIQUEUR',
                    'subtitle' => 'বাংলার প্রাণে',
                    'description' => 'গানের মাঝে ফুটে বির থাগসাব সেরা প্রতিভা সবাইকে বেধান, সবাইকে শোনান।',
                    'buttonText' => '♫ EXPLORE TALENTS',
                    'secondButtonText' => 'HOW IT WORKS',
                    'bgImage' => '/images/slider 1.png',
                ],
                'categories' => [
                    ['icon' => '🎚️', 'label' => 'All'],
                    ['icon' => '🎵', 'label' => 'Singing'],
                    ['icon' => '💃', 'label' => 'Dance'],
                    ['icon' => '📖', 'label' => 'Storytelling'],
                    ['icon' => '🖋️', 'label' => 'Poetry'],
                    ['icon' => '🎸', 'label' => 'Instrumental'],
                    ['icon' => '▦', 'label' => 'Others'],
                ],
                'top_talents' => [
                    ['rank' => '01', 'name' => 'Moha Jadu', 'type' => 'Singing', 'desc' => 'Coke Studio Bangla S3', 'likes' => '380K', 'videoId' => 'UghMf59vDJM', 'variant' => ''],
                    ['rank' => '02', 'name' => 'Long Distance Love', 'type' => 'Singing', 'desc' => 'Coke Studio Bangla S3', 'likes' => '360K', 'videoId' => 'sqJ2QhjBQaw', 'variant' => ''],
                    ['rank' => '03', 'name' => 'Ma Lo Ma', 'type' => 'Singing', 'desc' => 'Coke Studio Bangla S3', 'likes' => '340K', 'videoId' => 'zEqqW-USajs', 'variant' => ''],
                ],
                'stats' => [
                    ['icon' => '⭐', 'value' => '25K+', 'label' => 'Talents Discovered'],
                    ['icon' => '👁️', 'value' => '500K+', 'label' => 'Total Views'],
                    ['icon' => '👥', 'value' => '10K+', 'label' => 'Active Artists'],
                    ['icon' => '▦', 'value' => '50+', 'label' => 'Categories'],
                    ['icon' => '🏆', 'value' => '120+', 'label' => 'Winners'],
                ],
                'videos' => [
                    ['tag' => 'Singing', 'title' => 'Sa Re Ga Ma Pa 2025 | Ep 53 Best Scene', 'by' => 'Priya Sengupta', 'dur' => '04:55', 'views' => '6.2M', 'likes' => '540000', 'videoId' => 'qz38Kthnxfo'],
                    ['tag' => 'Singing', 'title' => 'Kishore Kumar Special | Jyotirmayee Nayak | Indian Idol S16', 'by' => 'Jyotirmayee Nayak', 'dur' => '04:05', 'views' => '12K', 'likes' => '1800', 'videoId' => 'lIfJ0nngD68'],
                    ['tag' => 'Singing', 'title' => 'Kehna Hai Kehna Hai | Tanishk Shukla | Indian Idol S16', 'by' => 'Tanishk Shukla', 'dur' => '03:40', 'views' => '16K', 'likes' => '2100', 'videoId' => 'pMhjxMwY9W0'],
                    ['tag' => 'Singing', 'title' => 'Kah Doon Tumhe Ya Chup Rahun | Indian Idol S16', 'by' => 'Sneha Chakraborty', 'dur' => '03:50', 'views' => '24.9K', 'likes' => '2020', 'videoId' => 'NHDYwhfJGzk'],
                    ['tag' => 'Singing', 'title' => 'Ae Ajnabee | Coke Studio Bharat', 'by' => 'Arka Dey', 'dur' => '04:15', 'views' => '18M', 'likes' => '1650000', 'videoId' => 'ut1rfURWyCo'],
                    ['tag' => 'Singing', 'title' => 'Re Mann | Coke Studio Bharat', 'by' => 'Ridoy Das', 'dur' => '04:30', 'views' => '22M', 'likes' => '1850000', 'videoId' => 'gxet54MhNQI'],
                    ['tag' => 'Singing', 'title' => 'Sonchadi | Coke Studio Bharat', 'by' => 'Moumita Bose', 'dur' => '04:50', 'views' => '26.7M', 'likes' => '2100000', 'videoId' => 'L9CfCjedhPE'],
                    ['tag' => 'Singing', 'title' => 'Holi Aayi Re | Coke Studio Bharat', 'by' => 'Farhan Ahmed', 'dur' => '05:41', 'views' => '30.4M', 'likes' => '430000', 'videoId' => 'h89PrRNHV-E'],
                    ['tag' => 'Singing', 'title' => 'Arz Kiya Hai | Coke Studio Bharat', 'by' => 'Suvo Adhikary', 'dur' => '05:05', 'views' => '190.6M', 'likes' => '13000000', 'videoId' => 'bP8ATWCvqzw'],
                    ['tag' => 'Singing', 'title' => 'Patar Bashori | Coke Studio Bangla S4', 'by' => 'Sneha Chakraborty', 'dur' => '04:10', 'views' => '15M', 'likes' => '1450000', 'videoId' => 'YxJjFjP0crs'],
                    ['tag' => 'Singing', 'title' => 'Ma Lo Ma | Coke Studio Bangla', 'by' => 'Tania Khatun', 'dur' => '03:55', 'views' => '38M', 'likes' => '3400000', 'videoId' => 'zEqqW-USajs'],
                    ['tag' => 'Singing', 'title' => 'Moha Jadu | Coke Studio Bangla S3', 'by' => 'Ridoy Das', 'dur' => '04:20', 'views' => '42M', 'likes' => '3800000', 'videoId' => 'UghMf59vDJM'],
                    ['tag' => 'Singing', 'title' => 'Long Distance Love | Coke Studio Bangla S3', 'by' => 'Sneha Chakraborty', 'dur' => '04:45', 'views' => '76.3M', 'likes' => '5997000', 'videoId' => 'sqJ2QhjBQaw'],
                ],
                'cta' => [
                    'tagline' => 'BE THE NEXT FEATURED ARTIST',
                    'title' => 'Show us your raw talent.',
                    'highlight' => 'No AI, No Edit, Just You.',
                    'buttonText' => '★ SUBMIT YOUR TALENT →',
                    'bgImage' => '/images/footer.png',
                ],
            ]
        );
    }
}
