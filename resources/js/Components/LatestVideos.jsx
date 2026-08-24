import { useState } from 'react';

const videosData = [
    {
        id: 1,
        title: 'Sa Re Ga Ma Pa 2025 | Ep 53 Best Scene',
        artist: 'Priya Sengupta',
        category: 'singing',
        thumbnail: 'https://img.youtube.com/vi/qz38Kthnxfo/mqdefault.jpg',
        duration: '04:55',
        views: '6.2M',
        likes: '54K',
    },
    {
        id: 2,
        title: 'Sa Re Ga Ma Pa 2025 | Best Performance',
        artist: 'Ridoy Das',
        category: 'singing',
        thumbnail: 'https://img.youtube.com/vi/4gzRteJyLMA/mqdefault.jpg',
        duration: '05:20',
        views: '8.5M',
        likes: '72K',
    },
    {
        id: 3,
        title: 'Zindagi Ke Safar Mein | Indian Idol 16',
        artist: 'Moumita Bose',
        category: 'singing',
        thumbnail: 'https://img.youtube.com/vi/2ay9OPlY38A/mqdefault.jpg',
        duration: '04:05',
        views: '15.2K',
        likes: '148',
    },
    {
        id: 4,
        title: 'Baharon Phool Barsao | Indian Idol S16',
        artist: 'Tania Khatun',
        category: 'singing',
        thumbnail: 'https://img.youtube.com/vi/v_TG2YnaavU/mqdefault.jpg',
        duration: '03:40',
        views: '18.5K',
        likes: '175',
    },
    {
        id: 5,
        title: 'Kah Doon Tumhe Ya Chup Rahun',
        artist: 'Sneha Chakraborty',
        category: 'singing',
        thumbnail: 'https://img.youtube.com/vi/NHDYwhfJGzk/mqdefault.jpg',
        duration: '03:50',
        views: '24.9K',
        likes: '202',
    },
    {
        id: 6,
        title: 'Ae Ajnabee | Coke Studio Bharat',
        artist: 'Arka Dey',
        category: 'singing',
        thumbnail: 'https://img.youtube.com/vi/ut1rfURWyCo/mqdefault.jpg',
        duration: '04:15',
        views: '18M',
        likes: '165K',
    },
    {
        id: 7,
        title: 'Re Mann | Coke Studio Bharat',
        artist: 'Ridoy Das',
        category: 'singing',
        thumbnail: 'https://img.youtube.com/vi/gxet54MhNQI/mqdefault.jpg',
        duration: '04:30',
        views: '22M',
        likes: '185K',
    },
    {
        id: 8,
        title: 'Sonchadi | Coke Studio Bharat',
        artist: 'Moumita Bose',
        category: 'singing',
        thumbnail: 'https://img.youtube.com/vi/L9CfCjedhPE/mqdefault.jpg',
        duration: '04:50',
        views: '26.7M',
        likes: '210K',
    },
    {
        id: 9,
        title: 'Holi Aayi Re | Coke Studio Bharat',
        artist: 'Farhan Ahmed',
        category: 'singing',
        thumbnail: 'https://img.youtube.com/vi/h89PrRNHV-E/mqdefault.jpg',
        duration: '05:41',
        views: '30.4M',
        likes: '430K',
    },
    {
        id: 10,
        title: 'Arz Kiya Hai | Coke Studio Bharat',
        artist: 'Suvo Adhikary',
        category: 'singing',
        thumbnail: 'https://img.youtube.com/vi/bP8ATWCvqzw/mqdefault.jpg',
        duration: '05:05',
        views: '190.6M',
        likes: '1.3M',
    },
    {
        id: 11,
        title: 'Patar Bashori | Coke Studio Bangla S4',
        artist: 'Sneha Chakraborty',
        category: 'singing',
        thumbnail: 'https://img.youtube.com/vi/YxJjFjP0crs/mqdefault.jpg',
        duration: '04:10',
        views: '15M',
        likes: '145K',
    },
    {
        id: 12,
        title: 'Ma Lo Ma | Coke Studio Bangla',
        artist: 'Tania Khatun',
        category: 'singing',
        thumbnail: 'https://img.youtube.com/vi/zEqqW-USajs/mqdefault.jpg',
        duration: '03:55',
        views: '38M',
        likes: '340K',
    },
];

const VideoCard = ({ video }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="group relative bg-[#2a1212]/50 rounded-2xl overflow-hidden border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#D4AF37]/5"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden">
                <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 text-white text-xs font-medium rounded">
                    {video.duration}
                </div>

                {/* Category Badge */}
                <div className="absolute top-2 left-2 px-2.5 py-1 bg-[#C41E3A] text-white text-xs font-semibold rounded-full capitalize">
                    {video.category}
                </div>

                {/* Play Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                    <div className="w-14 h-14 rounded-full bg-[#C41E3A]/90 flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Info */}
            <div className="p-4">
                <h4 className="text-white font-semibold text-sm line-clamp-2 mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {video.title}
                </h4>

                <p className="text-white/50 text-xs mb-3">
                    By <span className="text-[#D4AF37]/80">{video.artist}</span>
                </p>

                {/* Views & Likes */}
                <div className="flex items-center gap-4 text-xs text-white/40">
                    <span className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {video.views}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {video.likes}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default function LatestVideos({ lang = 'bn' }) {
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

    const sectionTitle = lang === 'bn' ? 'সর্বশেষ প্রতিভা' : 'Latest Talents';
    const sectionSubtitle = lang === 'bn'
        ? 'শিল্পীদের নিজেদের কাছ থেকে আনফিল্টার্ড, আনএডিটেড পারফরম্যান্স।'
        : 'Unfiltered, unedited performances straight from the artists themselves.';

    const filteredVideos = activeFilter === 'all'
        ? videosData
        : videosData.filter((v) => v.category === activeFilter);

    return (
        <section id="videos" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#0d0505]">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#D4AF37]" />
                        <svg className="w-6 h-6 text-[#C41E3A]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                        <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#D4AF37]" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif mb-3">
                        {sectionTitle}
                    </h2>
                    <p className="text-xl text-[#D4AF37] font-serif mb-2">
                        Raw Performances to Watch
                    </p>
                    <p className="text-white/50 max-w-2xl mx-auto">
                        {sectionSubtitle}
                    </p>
                </div>

                {/* Filters & Sort */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
                    {/* Filters */}
                    <div className="flex flex-wrap gap-2 justify-center">
                        {filters.map((filter) => (
                            <button
                                key={filter.key}
                                onClick={() => setActiveFilter(filter.key)}
                                className={`px-5 py-2 text-sm font-medium rounded-full transition-all ${
                                    activeFilter === filter.key
                                        ? 'bg-[#C41E3A] text-white shadow-lg shadow-[#C41E3A]/30'
                                        : 'bg-[#2a1212]/50 text-white/50 hover:text-white border border-white/5 hover:border-white/10'
                                }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>

                    {/* Sort */}
                    <div className="flex items-center gap-2 bg-[#2a1212]/50 p-1 rounded-full border border-white/5">
                        {sortOptions.map((opt) => (
                            <button
                                key={opt.key}
                                onClick={() => setActiveSort(opt.key)}
                                className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all ${
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {filteredVideos.map((video) => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>

                {/* Load More */}
                <div className="text-center mt-12">
                    <button className="px-8 py-3 border border-[#D4AF37]/30 text-[#D4AF37] font-semibold rounded-full hover:bg-[#D4AF37]/10 transition-all">
                        {lang === 'bn' ? 'আরো দেখুন' : 'Load More'}
                    </button>
                </div>
            </div>
        </section>
    );
}
