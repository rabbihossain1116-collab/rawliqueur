import { useState } from 'react';
import VideoModal from './VideoModal';

export const videosData = [
    {
        id: 'qz38Kthnxfo',
        title: 'Sa Re Ga Ma Pa 2025 | Ep 53 Best Scene',
        artist: 'Priya Sengupta',
        category: 'singing',
        thumbnail: 'https://img.youtube.com/vi/qz38Kthnxfo/mqdefault.jpg',
        duration: '04:55',
        views: '6.2M',
        likes: '54K',
    },
    {
        id: '4gzRteJyLMA',
        title: 'Sa Re Ga Ma Pa 2025 | Best Performance',
        artist: 'Ridoy Das',
        category: 'singing',
        thumbnail: 'https://img.youtube.com/vi/4gzRteJyLMA/mqdefault.jpg',
        duration: '05:20',
        views: '8.5M',
        likes: '72K',
    },
    {
        id: '2ay9OPlY38A',
        title: 'Zindagi Ke Safar Mein | Indian Idol 16',
        artist: 'Moumita Bose',
        category: 'singing',
        thumbnail: 'https://img.youtube.com/vi/2ay9OPlY38A/mqdefault.jpg',
        duration: '04:05',
        views: '15.2K',
        likes: '148',
    },
    {
        id: 'v_TG2YnaavU',
        title: 'Baharon Phool Barsao | Indian Idol S16',
        artist: 'Tania Khatun',
        category: 'singing',
        thumbnail: 'https://img.youtube.com/vi/v_TG2YnaavU/mqdefault.jpg',
        duration: '03:40',
        views: '18.5K',
        likes: '175',
    },
    {
        id: 'NHDYwhfJGzk',
        title: 'Kah Doon Tumhe Ya Chup Rahun | Indian Idol S16',
        artist: 'Sneha Chakraborty',
        category: 'singing',
        thumbnail: 'https://img.youtube.com/vi/NHDYwhfJGzk/mqdefault.jpg',
        duration: '03:50',
        views: '24.9K',
        likes: '202',
    },
    {
        id: 'ut1rfURWyCo',
        title: 'Ae Ajnabee | Coke Studio Bharat',
        artist: 'Arka Dey',
        category: 'singing',
        thumbnail: 'https://img.youtube.com/vi/ut1rfURWyCo/mqdefault.jpg',
        duration: '04:15',
        views: '18M',
        likes: '165K',
    },
    {
        id: 'gxet54MhNQI',
        title: 'Re Mann | Coke Studio Bharat',
        artist: 'Ridoy Das',
        category: 'singing',
        thumbnail: 'https://img.youtube.com/vi/gxet54MhNQI/mqdefault.jpg',
        duration: '04:30',
        views: '22M',
        likes: '185K',
    },
    {
        id: 'L9CfCjedhPE',
        title: 'Sonchadi | Coke Studio Bharat',
        artist: 'Moumita Bose',
        category: 'singing',
        thumbnail: 'https://img.youtube.com/vi/L9CfCjedhPE/mqdefault.jpg',
        duration: '04:50',
        views: '26.7M',
        likes: '210K',
    },
    {
        id: 'h89PrRNHV-E',
        title: 'Holi Aayi Re | Coke Studio Bharat',
        artist: 'Farhan Ahmed',
        category: 'singing',
        thumbnail: 'https://img.youtube.com/vi/h89PrRNHV-E/mqdefault.jpg',
        duration: '05:41',
        views: '30.4M',
        likes: '430K',
    },
    {
        id: 'bP8ATWCvqzw',
        title: 'Arz Kiya Hai | Coke Studio Bharat',
        artist: 'Suvo Adhikary',
        category: 'singing',
        thumbnail: 'https://img.youtube.com/vi/bP8ATWCvqzw/mqdefault.jpg',
        duration: '05:05',
        views: '190.6M',
        likes: '1.3M',
    },
    {
        id: 'YxJjFjP0crs',
        title: 'Patar Bashori | Coke Studio Bangla S4',
        artist: 'Sneha Chakraborty',
        category: 'singing',
        thumbnail: 'https://img.youtube.com/vi/YxJjFjP0crs/mqdefault.jpg',
        duration: '04:10',
        views: '15M',
        likes: '145K',
    },
    {
        id: 'zEqqW-USajs',
        title: 'Ma Lo Ma | Coke Studio Bangla',
        artist: 'Tania Khatun',
        category: 'singing',
        thumbnail: 'https://img.youtube.com/vi/zEqqW-USajs/mqdefault.jpg',
        duration: '03:55',
        views: '38M',
        likes: '340K',
    },
    {
        id: 'UghMf59vDJM',
        title: 'Moha Jadu | Coke Studio Bangla S3',
        artist: 'Ridoy Das',
        category: 'singing',
        thumbnail: 'https://img.youtube.com/vi/UghMf59vDJM/mqdefault.jpg',
        duration: '04:20',
        views: '42M',
        likes: '380K',
    },
    {
        id: 'sqJ2QhjBQaw',
        title: 'Long Distance Love | Coke Studio Bangla S3',
        artist: 'Sneha Chakraborty',
        category: 'singing',
        thumbnail: 'https://img.youtube.com/vi/sqJ2QhjBQaw/mqdefault.jpg',
        duration: '04:45',
        views: '76.3M',
        likes: '599K',
    },
];

const VideoCard = ({ video, onClick }) => {
    return (
        <button
            onClick={() => onClick(video)}
            className="group relative bg-[#2a1212]/40 rounded-xl overflow-hidden border border-white/5 hover:border-[#D4AF37]/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/5 block text-left w-full"
        >
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden">
                <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Duration Badge */}
                <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 bg-black/80 text-white text-[10px] font-medium rounded">
                    {video.duration}
                </div>

                {/* Category Badge */}
                <div className="absolute top-1.5 left-1.5 px-2 py-0.5 bg-[#C41E3A] text-white text-[10px] font-semibold rounded-full capitalize">
                    {video.category}
                </div>

                {/* Play Overlay */}
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

                <p className="text-white/40 text-[11px] mb-1.5">
                    <span className="text-[#D4AF37]/70">{video.artist}</span>
                </p>

                {/* Views & Likes */}
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
        </button>
    );
};

export default function LatestVideos({ lang = 'bn' }) {
    const [activeFilter, setActiveFilter] = useState('all');
    const [activeSort, setActiveSort] = useState('newest');
    const [selectedVideo, setSelectedVideo] = useState(null);

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
        <section id="videos" className="relative py-16 px-4 sm:px-6 lg:px-8 bg-[#0d0505]">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#D4AF37]" />
                        <svg className="w-5 h-5 text-[#C41E3A]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                        <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#D4AF37]" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif mb-2">
                        {sectionTitle}
                    </h2>
                    <p className="text-lg text-[#D4AF37] font-serif mb-1">
                        Raw Performances to Watch
                    </p>
                    <p className="text-white/50 max-w-xl mx-auto text-sm">
                        {sectionSubtitle}
                    </p>
                </div>

                {/* Filters & Sort */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
                    {/* Filters */}
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

                    {/* Sort */}
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
                        <VideoCard key={video.id} video={video} onClick={setSelectedVideo} />
                    ))}
                </div>

                {/* Load More */}
                <div className="text-center mt-8">
                    <a
                        href="/videos"
                        className="inline-block px-6 py-2 border border-[#D4AF37]/30 text-[#D4AF37] text-sm font-medium rounded-full hover:bg-[#D4AF37]/10 transition-all"
                    >
                        {lang === 'bn' ? 'আরো দেখুন' : 'Load More'}
                    </a>
                </div>
            </div>

            {/* Video Modal */}
            <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
        </section>
    );
}
