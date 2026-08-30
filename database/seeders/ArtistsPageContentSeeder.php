<?php

namespace Database\Seeders;

use App\Models\ArtistsPageContent;
use Illuminate\Database\Seeder;

class ArtistsPageContentSeeder extends Seeder
{
    public function run(): void
    {
        ArtistsPageContent::updateOrCreate(['id' => 1], [
            'hero' => [
                'bgImage' => '/images/Artist.png',
                'title' => 'সম্মানে ও ইতিহাসে',
                'subtitle' => 'আমার প্রতিভা বিশ্ব মাঝে',
            ],
            'section_header' => [
                'subtitle' => 'OUR ARTISTS',
                'title' => 'Meet the Raw Talent',
                'description' => 'A platform for real talent and performances. Discover amazing artists from different categories and backgrounds.',
            ],
            'artists' => [
                ['name' => 'Sneha Chakraborty', 'loc' => 'Bangladesh', 'role' => 'SINGER', 'uploads' => 78, 'g' => 'from-[#5b2a52] to-[#1c0e22]', 'img' => 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80&auto=format&fit=crop'],
                ['name' => 'Arka Dey', 'loc' => 'Kolkata, India', 'role' => 'POET', 'uploads' => 54, 'g' => 'from-[#3a2440] to-[#0c0810]', 'img' => 'https://images.unsplash.com/photo-1508973379184-7517410fb0bc?w=400&q=80&auto=format&fit=crop'],
                ['name' => 'Ridoy Das', 'loc' => 'Bangladesh', 'role' => 'SINGER', 'uploads' => 42, 'g' => 'from-[#3f4750] to-[#12161a]', 'img' => 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&q=80&auto=format&fit=crop'],
                ['name' => 'Suvo Adhikary', 'loc' => 'Kolkata, India', 'role' => 'MUSICIAN', 'uploads' => 13, 'g' => 'from-[#141414] to-black', 'img' => 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80&auto=format&fit=crop'],
                ['name' => 'Diya Nandy', 'loc' => 'Kolkata, India', 'role' => 'DANCER', 'uploads' => 461, 'g' => 'from-[#3a2018] to-[#160b07]', 'img' => 'https://images.unsplash.com/photo-1547153760-18fc86c83137?w=400&q=80&auto=format&fit=crop'],
                ['name' => 'Iman Sen', 'loc' => 'Bangladesh', 'role' => 'STORYTELLER', 'uploads' => 47, 'g' => 'from-[#5b6270] to-[#1c2027]', 'img' => 'https://images.unsplash.com/photo-1478147427282-58a87a120781?w=400&q=80&auto=format&fit=crop'],
                ['name' => 'Rohan Mitra', 'loc' => 'Kolkata, India', 'role' => 'STORYTELLER', 'uploads' => 38, 'g' => 'from-[#6b4a1c] to-[#241608]', 'img' => 'https://images.unsplash.com/photo-1461784180009-27c1303a64b6?w=400&q=80&auto=format&fit=crop'],
                ['name' => 'Tania Khatun', 'loc' => 'Bangladesh', 'role' => 'SINGER', 'uploads' => 49, 'g' => 'from-[#7a2436] to-[#220a10]', 'img' => 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80&auto=format&fit=crop'],
                ['name' => 'Aniket Pal', 'loc' => 'Bangladesh', 'role' => 'POET', 'uploads' => 34, 'g' => 'from-[#312a24] to-[#0e0a08]', 'img' => 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&q=80&auto=format&fit=crop'],
                ['name' => 'Moumita Hore', 'loc' => 'Kolkata, India', 'role' => 'SINGER', 'uploads' => 32, 'g' => 'from-[#8c2f3a] to-[#220b0e]', 'img' => 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=400&q=80&auto=format&fit=crop'],
                ['name' => 'Farhan Ahmed', 'loc' => 'Bangladesh', 'role' => 'MUSICIAN', 'uploads' => 71, 'g' => 'from-[#454545] to-[#0a0a0a]', 'img' => 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80&auto=format&fit=crop&sat=-100'],
                ['name' => 'Priya Sengupta', 'loc' => 'Bangladesh', 'role' => 'DANCER', 'uploads' => 36, 'g' => 'from-[#c98a2e] to-[#3a2408]', 'img' => 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&q=80&auto=format&fit=crop'],
            ],
            'cta' => [
                'subtitle' => 'BE THE NEXT FEATURED ARTIST',
                'title' => 'Show us your raw talent. No AI, No Edit, Just You.',
                'description' => 'Submit your talent or support others. Together, we celebrate real art and real people.',
                'buttonText' => '👤 Submit Your Talent →',
            ],
        ]);
    }
}
