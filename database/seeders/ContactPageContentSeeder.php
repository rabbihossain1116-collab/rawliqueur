<?php

namespace Database\Seeders;

use App\Models\ContactPageContent;
use Illuminate\Database\Seeder;

class ContactPageContentSeeder extends Seeder
{
    public function run(): void
    {
        ContactPageContent::updateOrCreate(['id' => 1], [
            'hero' => [
                'bgImage' => '/images/slider 1.png',
                'label' => 'Get in Touch',
                'title' => "We'd Love to Hear",
                'subtitle' => 'From You — RAW LIQUEUR',
                'button1Text' => '✉️ Send a Message',
                'button2Text' => '❓ FAQ',
            ],
            'contact_info' => [
                [
                    'icon' => '📍',
                    'title' => 'Our Office',
                    'details' => ['House 42, Road 11', 'Dhanmondi, Dhaka 1205', 'Bangladesh'],
                ],
                [
                    'icon' => '📞',
                    'title' => 'Call Us',
                    'details' => ['+880 1712-345678', '+880 2-55667788', 'Mon-Sat: 10AM - 7PM'],
                ],
                [
                    'icon' => '✉️',
                    'title' => 'Email Us',
                    'details' => ['info@rawliqueur.com', 'talent@rawliqueur.com', 'support@rawliqueur.com'],
                ],
                [
                    'icon' => '🌐',
                    'title' => 'Follow Us',
                    'details' => ['Facebook', 'YouTube', 'Instagram'],
                ],
            ],
            'form' => [
                'heading' => 'SEND US A MESSAGE',
                'title' => "Let's start a conversation",
                'subjects' => [
                    ['value' => 'general', 'label' => 'General Inquiry'],
                    ['value' => 'talent', 'label' => 'Talent Submission'],
                    ['value' => 'partnership', 'label' => 'Partnership'],
                    ['value' => 'support', 'label' => 'Technical Support'],
                    ['value' => 'media', 'label' => 'Media & Press'],
                    ['value' => 'other', 'label' => 'Other'],
                ],
                'mapEmbedUrl' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.8437572668957!2d90.3862!3d23.7509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b33cfffc33%3A0x4a826f4e361d7b4b!2sDhanmondi%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1234567890',
            ],
            'faqs' => [
                [
                    'question' => 'How do I submit my talent?',
                    'answer' => 'Click the "Submit Your Talent" button and fill out the form with your details, talent category, and a video link. Our team will review your submission within 48 hours.',
                ],
                [
                    'question' => 'What are the eligibility criteria?',
                    'answer' => 'Anyone from Bangladesh or India aged 14 or above can participate. We welcome all forms of raw talent — singing, dancing, poetry, storytelling, instrumental, and more.',
                ],
                [
                    'question' => 'How are winners selected?',
                    'answer' => 'Winners are selected through a combination of public voting and expert judge evaluation. Each season culminates in a grand finale where the champion is crowned.',
                ],
                [
                    'question' => 'Can I submit multiple entries?',
                    'answer' => "Yes! You can submit multiple entries in different categories. However, each submission must be a unique performance that hasn't been submitted before.",
                ],
                [
                    'question' => 'Is there a participation fee?',
                    'answer' => 'No! RAW LIQUEUR is completely free to participate in. We believe talent should have no barriers.',
                ],
            ],
            'social_links' => [
                ['name' => 'Facebook', 'icon' => 'f', 'url' => '#', 'color' => 'hover:bg-blue-600 hover:text-white'],
                ['name' => 'YouTube', 'icon' => '▶', 'url' => '#', 'color' => 'hover:bg-red-600 hover:text-white'],
                ['name' => 'Instagram', 'icon' => '◎', 'url' => '#', 'color' => 'hover:bg-pink hover:text-white'],
                ['name' => 'TikTok', 'icon' => '♪', 'url' => '#', 'color' => 'hover:bg-ink hover:text-white'],
                ['name' => 'Twitter', 'icon' => '𝕏', 'url' => '#', 'color' => 'hover:bg-black hover:text-white'],
            ],
            'business_hours' => [
                'title' => '🕐 Business Hours',
                'hours' => [
                    ['days' => 'Monday - Friday', 'time' => '10:00 AM - 7:00 PM', 'isOpen' => true],
                    ['days' => 'Saturday', 'time' => '10:00 AM - 5:00 PM', 'isOpen' => true],
                    ['days' => 'Sunday', 'time' => 'Closed', 'isOpen' => false],
                ],
            ],
            'cta' => [
                'icon' => '🎤',
                'title' => 'Ready to showcase your',
                'titleHighlight' => ' talent',
                'titleSuffix' => '?',
                'description' => 'Join thousands of artists who have shared their raw, unedited performances with the world. Your journey starts with one submission.',
                'button1Text' => '★ SUBMIT YOUR TALENT',
                'button2Text' => 'View Winners 🏆',
                'button2Link' => '/winners',
            ],
        ]);
    }
}
