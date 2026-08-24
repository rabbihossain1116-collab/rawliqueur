import { Head } from '@inertiajs/react';
import { useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { videosData } from '@/Components/LatestVideos';

export default function Videos() {
    const [lang, setLang] = useState('bn');
    const [activeFilter, setActiveFilter] = useState('all');
    const [activeSort, setActiveSort] = useState('newest');

    const filters = lang === 'bn'
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

    const pageTitle = lang === 'bn' ? 'সব ভিডিও' : 'All Videos';
    const pageSubtitle = lang === 'bn'
        ? 'শিল্পীদের সব পারফরম্যান্স এখানে দেখুন।'
        : 'Watch all performances from the artists.';

    const filteredVideos = activeFilter === 'all'
        ? videosData
        : videosData.filter((v) => v.category === activeFilter);

    return (
        <PublicLayout lang={lang} setLang={setLang}>
            <Head title={pageTitle} />

            {/* Page Header */}
            <section className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 bg-[#0d0505]">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#D4AF37]" />
                        <svg className="w-5 h-5 text-[#C41E3A]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                        <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#D4AF37]" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white font-serif mb-3">
                        {pageTitle}
                    </h1>
                    <p className="text-[#D4AF37] font-serif mb-2">
                        Raw Performances to Watch
                    </p>
                    <p className="text-white/50 max-w-xl mx-auto text-sm">
                        {pageSubtitle}
                    </p>
                </div>
            </section>

            {/* Videos Grid */}
            <section className="pb-20 px-4 sm:px-6 lg:px-8 bg-[#0d0505]">
                <div className="max-w-7xl mx-auto">
                    {/* Filters & Sort */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-8">
                        <div className="flex flex-wrap gap-1.5 justify-center">
                            {filters.map((filter) => (
                                <button
                                    key={filter.key}
                                    onClick={() => setActiveFilter(filter.key)}
                                    className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all ${
                                        activeFilter === filter.key
                                            ? 'bg-[#C41E3A] text-white shadow-lg shadow-[#C41E3A]/30'
                                            : 'bg-[#2a1212]/50 text-white/50 hover:text-white border border-white/5 hover:border-white/10'
                                    }`}
                                >
                                    {filter.label}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-1 bg-[#2a1212]/50 p-0.5 rounded-full border border-white/5">
                            {sortOptions.map((opt) => (
                                <button
                                    key={opt.key}
                                    onClick={() => setActiveSort(opt.key)}
                                    className={`px-3 py-1 text-[10px] font-medium rounded-full transition-all ${
                                        activeSort === opt.key
                                            ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30'
                                            : 'text-white/40 hover:text-white/60'
                                    }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Video Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                        {filteredVideos.map((video) => (
                            <a
                                key={video.id}
                                href={`https://www.youtube.com/watch?v=${video.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative bg-[#2a1212]/40 rounded-xl overflow-hidden border border-white/5 hover:border-[#D4AF37]/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/5 block"
                            >
                                {/* Thumbnail */}
                                <div className="relative aspect-video overflow-hidden">
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 bg-black/80 text-white text-[10px] font-medium rounded">
                                        {video.duration}
                                    </div>
                                    <div className="absolute top-1.5 left-1.5 px-2 py-0.5 bg-[#C41E3A] text-white text-[10px] font-semibold rounded-full capitalize">
                                        {video.category}
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                                        <div className="w-10 h-10 rounded-full bg-[#C41E3A]/90 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                                            <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="p-2.5">
                                    <h4 className="text-white font-medium text-xs leading-snug line-clamp-2 mb-1.5 group-hover:text-[#D4AF37] transition-colors">
                                        {video.title}
                                    </h4>
                                    <p className="text-[#D4AF37]/70 text-[11px] mb-1.5">
                                        {video.artist}
                                    </p>
                                    <div className="flex items-center gap-3 text-[10px] text-white/30">
                                        <span className="flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            {video.views}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                            {video.likes}
                                        </span>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Total Count */}
                    <div className="text-center mt-8 text-white/30 text-sm">
                        {lang === 'bn'
                            ? `মোট ${filteredVideos.length}টি ভিডিও`
                            : `Total ${filteredVideos.length} videos`}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
