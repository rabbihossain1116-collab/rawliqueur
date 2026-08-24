import { Head } from '@inertiajs/react';
import { useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import HeroSlider from '@/Components/HeroSlider';
import TalentCard from '@/Components/TalentCard';
import LatestVideos from '@/Components/LatestVideos';

const talentData = [
    {
        id: 1,
        name: 'Sneha Chakraborty',
        category: 'Singer',
        location: 'Bangladesh',
        image: 'https://images.unsplash.com/photo-1608319917470-9d9179430f8d?fm=jpg&q=70&w=400&auto=format&fit=crop',
        likes: '523',
        views: '12.4K',
        badge: 'Most Likes',
    },
    {
        id: 2,
        name: 'Rahul Saha',
        category: 'Musician',
        location: 'Bangladesh',
        image: 'https://images.unsplash.com/photo-1549761505-a31eb21119d6?q=80&w=400&auto=format&fit=crop',
        likes: '342',
        views: '3.4K',
        badge: 'Most Views',
    },
    {
        id: 3,
        name: 'Tania Khatun',
        category: 'Singer',
        location: 'Kolkata',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80&auto=format&fit=crop',
        likes: '289',
        views: '8.7K',
        badge: null,
    },
    {
        id: 4,
        name: 'Ridoy Das',
        category: 'Musician',
        location: 'Bangladesh',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop',
        likes: '456',
        views: '15.2K',
        badge: 'Rising Star',
    },
    {
        id: 5,
        name: 'Moumita Bose',
        category: 'Singer',
        location: 'Kolkata',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format&fit=crop',
        likes: '198',
        views: '5.6K',
        badge: null,
    },
    {
        id: 6,
        name: 'Farhan Ahmed',
        category: 'Poet',
        location: 'Bangladesh',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&auto=format&fit=crop',
        likes: '312',
        views: '9.1K',
        badge: 'Top Rated',
    },
];

export default function Home() {
    const [lang, setLang] = useState('bn');
    const [activeTab, setActiveTab] = useState('all');
    const [sortBy, setSortBy] = useState('newest');

    const tabs = lang === 'bn'
        ? [
            { key: 'all', label: 'সব' },
            { key: 'singing', label: 'গান' },
            { key: 'dance', label: 'নৃত্য' },
            { key: 'storytelling', label: 'গল্প' },
            { key: 'poetry', label: 'কবিতা' },
        ]
        : [
            { key: 'all', label: 'All' },
            { key: 'singing', label: 'Singing' },
            { key: 'dance', label: 'Dance' },
            { key: 'storytelling', label: 'Storytelling' },
            { key: 'poetry', label: 'Poetry' },
        ];

    const sortOptions = lang === 'bn'
        ? [
            { key: 'newest', label: 'নতুন' },
            { key: 'likes', label: 'বেশি পছন্দ' },
            { key: 'views', label: 'বেশি দেখা হয়েছে' },
        ]
        : [
            { key: 'newest', label: 'Newest' },
            { key: 'likes', label: 'Most Liked' },
            { key: 'views', label: 'Most Viewed' },
        ];

    const sectionTitle = lang === 'bn' ? 'আজকের প্রতিভা' : "Today's Talent";
    const sectionSubtitle = lang === 'bn'
        ? 'দৈনিক সবচেয়ে জনপ্রিয় পারফরম্যান্স, পছন্দ ও ভিউ অনুযায়ী র‍্যাঙ্ককৃত।'
        : 'Celebrating the most loved performances of the day ranked by likes & views.';
    const viewAllText = lang === 'bn' ? 'সব দেখুন' : 'View Full Rankings';

    return (
        <PublicLayout lang={lang} setLang={setLang}>
            <Head title="RAW LIQUEUR - Pure Bengali Talent" />

            {/* Hero Slider */}
            <HeroSlider lang={lang} />

            {/* আজকের প্রতিভা Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 25px 25px, #D4AF37 2%, transparent 0%)`,
                        backgroundSize: '50px 50px'
                    }} />
                </div>

                <div className="max-w-7xl mx-auto relative">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#D4AF37]" />
                            <svg className="w-6 h-6 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#D4AF37]" />
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif mb-3">
                            {sectionTitle}
                        </h2>
                        <p className="text-white/50 max-w-2xl mx-auto">
                            {sectionSubtitle}
                        </p>
                    </div>

                    {/* Tabs & Sort */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                        <div className="flex gap-2 bg-[#2a1212]/50 p-1 rounded-full border border-white/5">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                                        activeTab === tab.key
                                            ? 'bg-[#C41E3A] text-white shadow-lg shadow-[#C41E3A]/30'
                                            : 'text-white/50 hover:text-white'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-2">
                            {sortOptions.map((opt) => (
                                <button
                                    key={opt.key}
                                    onClick={() => setSortBy(opt.key)}
                                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                                        sortBy === opt.key
                                            ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30'
                                            : 'text-white/40 hover:text-white/60'
                                    }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Talent Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {talentData.map((talent) => (
                            <TalentCard key={talent.id} talent={talent} lang={lang} />
                        ))}
                    </div>

                    {/* View All */}
                    <div className="text-center">
                        <a
                            href="/winners?period=daily"
                            className="inline-flex items-center gap-2 px-8 py-3 border border-[#D4AF37]/30 text-[#D4AF37] font-semibold rounded-full hover:bg-[#D4AF37]/10 transition-all"
                        >
                            {viewAllText}
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>

            {/* Latest Videos Section */}
            <LatestVideos lang={lang} />

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1a0a0a] via-[#2a1212] to-[#1a0a0a]">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="relative inline-block mb-8">
                        <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#B8860B]/20 flex items-center justify-center border border-[#D4AF37]/20">
                            <svg className="w-16 h-16 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                        </div>
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif mb-4">
                        {lang === 'bn' ? 'পরবর্তী ফিচার্ড শিল্পী হন' : 'Be the Next Featured Artist'}
                    </h2>
                    <p className="text-xl text-[#D4AF37] font-serif mb-6">
                        {lang === 'bn'
                            ? 'আমাদের কাঁচা প্রতিভা দেখান। কোনো AI নয়, কোনো এডিট নয়, শুধু আপনি।'
                            : 'Show us your raw talent. No AI, No Edit, Just You.'}
                    </p>
                    <a
                        href="/submit-talent"
                        className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-[#C41E3A] to-[#8B0000] text-white font-semibold rounded-full hover:from-[#D42B4B] hover:to-[#A00000] transition-all shadow-xl shadow-[#C41E3A]/30 text-lg"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        {lang === 'bn' ? 'এখনই জমা দিন' : 'Submit Your Talent'}
                    </a>
                </div>
            </section>
        </PublicLayout>
    );
}
