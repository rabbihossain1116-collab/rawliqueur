import { Head } from '@inertiajs/react';
import { useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import HeroSlider from '@/Components/HeroSlider';
import TalentCard from '@/Components/TalentCard';
import LatestVideos from '@/Components/LatestVideos';
import VideoModal from '@/Components/VideoModal';
import SubmitTalentModal from '@/Components/SubmitTalentModal';

const talentData = [
    {
        id: 'sqJ2QhjBQaw',
        name: 'Sneha Chakraborty',
        category: 'Singer',
        location: 'Bangladesh',
        image: 'https://images.unsplash.com/photo-1608319917470-9d9179430f8d?fm=jpg&q=70&w=400&auto=format&fit=crop',
        likes: '523',
        views: '12.4K',
        badge: 'Most Likes',
    },
    {
        id: 'gxet54MhNQI',
        name: 'Rahul Saha',
        category: 'Musician',
        location: 'Bangladesh',
        image: 'https://images.unsplash.com/photo-1549761505-a31eb21119d6?q=80&w=400&auto=format&fit=crop',
        likes: '342',
        views: '3.4K',
        badge: 'Most Views',
    },
    {
        id: 'zEqqW-USajs',
        name: 'Tania Khatun',
        category: 'Singer',
        location: 'Kolkata',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80&auto=format&fit=crop',
        likes: '289',
        views: '8.7K',
        badge: null,
    },
    {
        id: '4gzRteJyLMA',
        name: 'Ridoy Das',
        category: 'Musician',
        location: 'Bangladesh',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop',
        likes: '456',
        views: '15.2K',
        badge: 'Rising Star',
    },
    {
        id: '2ay9OPlY38A',
        name: 'Moumita Bose',
        category: 'Singer',
        location: 'Kolkata',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format&fit=crop',
        likes: '198',
        views: '5.6K',
        badge: null,
    },
    {
        id: 'h89PrRNHV-E',
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
    const [lang, setLang] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('rl_lang') || 'bn';
        }
        return 'bn';
    });
    const [activeTab, setActiveTab] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [selectedTalent, setSelectedTalent] = useState(null);
    const [showSubmitModal, setShowSubmitModal] = useState(false);

    const handleSetLang = (newLang) => {
        setLang(newLang);
        localStorage.setItem('rl_lang', newLang);
    };

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
        <PublicLayout lang={lang} setLang={handleSetLang} onOpenSubmit={() => setShowSubmitModal(true)}>
            <Head title="RAW LIQUEUR - Pure Bengali Talent" />

            <HeroSlider lang={lang} />

            {/* আজকের প্রতিভা Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="absolute inset-0 opacity-[0.015]">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 25px 25px, #C41E3A 1.5%, transparent 0%)`,
                        backgroundSize: '50px 50px'
                    }} />
                </div>

                <div className="max-w-7xl mx-auto relative">
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#C41E3A]" />
                            <svg className="w-6 h-6 text-[#C9A84C]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#C41E3A]" />
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] font-serif mb-3">
                            {sectionTitle}
                        </h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            {sectionSubtitle}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                        <div className="flex gap-2 bg-gray-50 p-1 rounded-full border border-gray-200">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                                        activeTab === tab.key
                                            ? 'bg-[#C41E3A] text-white shadow-lg shadow-[#C41E3A]/20'
                                            : 'text-gray-500 hover:text-[#1a1a1a]'
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
                                            ? 'bg-[#C41E3A]/10 text-[#C41E3A] border border-[#C41E3A]/20'
                                            : 'text-gray-400 hover:text-gray-600'
                                    }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                        {talentData.map((talent) => (
                            <TalentCard key={talent.id} talent={talent} lang={lang} onClick={setSelectedTalent} />
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <a
                            href="/winners?period=daily"
                            className="inline-flex items-center gap-2 px-8 py-3 border border-[#C41E3A]/20 text-[#C41E3A] font-semibold rounded-full hover:bg-[#C41E3A]/5 transition-all"
                        >
                            {viewAllText}
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>

            <LatestVideos lang={lang} />

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="relative inline-block mb-8">
                        <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-[#C41E3A]/10 to-[#C9A84C]/10 flex items-center justify-center border border-[#C41E3A]/10">
                            <svg className="w-16 h-16 text-[#C41E3A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                        </div>
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] font-serif mb-4">
                        {lang === 'bn' ? 'পরবর্তী ফিচার্ড শিল্পী হন' : 'Be the Next Featured Artist'}
                    </h2>
                    <p className="text-xl text-[#C41E3A] font-serif mb-6">
                        {lang === 'bn'
                            ? 'আমাদের কাঁচা প্রতিভা দেখান। কোনো AI নয়, কোনো এডিট নয়, শুধু আপনি।'
                            : 'Show us your raw talent. No AI, No Edit, Just You.'}
                    </p>
                    <button
                        type="button"
                        onClick={() => setShowSubmitModal(true)}
                        className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-[#C41E3A] to-[#8B0000] text-white font-semibold rounded-full hover:from-[#D42B4B] hover:to-[#A00000] transition-all shadow-xl shadow-[#C41E3A]/20 text-lg"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        {lang === 'bn' ? 'এখনই জমা দিন' : 'Submit Your Talent'}
                    </button>
                </div>
            </section>

            <VideoModal video={selectedTalent} onClose={() => setSelectedTalent(null)} />
            <SubmitTalentModal open={showSubmitModal} onClose={() => setShowSubmitModal(false)} lang={lang} />
        </PublicLayout>
    );
}
