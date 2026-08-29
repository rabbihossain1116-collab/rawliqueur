import { useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Link } from '@inertiajs/react';

const featuredPost = {
    title: 'The Rise of Independent Music in South Asia',
    excerpt: 'How platforms like RAW LIQUEUR are empowering a new generation of artists to share their raw, unedited talent with the world.',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=500&fit=crop',
    author: 'Rajesh Kumar',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    date: 'Aug 20, 2025',
    readTime: '8 min read',
    category: 'Industry',
};

const blogPosts = [
    {
        title: 'Behind the Scenes: Season 5 Grand Finale',
        excerpt: 'A look at what goes into producing the biggest talent showcase in South Asia.',
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
        author: 'Priya Das',
        authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
        date: 'Aug 15, 2025',
        readTime: '5 min read',
        category: 'Behind the Scenes',
    },
    {
        title: '5 Tips to Make Your Audition Stand Out',
        excerpt: 'Expert advice on how to grab the judges\' attention from the very first note.',
        image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=400&fit=crop',
        author: 'Arka Dey',
        authorImage: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&crop=face',
        date: 'Aug 10, 2025',
        readTime: '4 min read',
        category: 'Tips & Tricks',
    },
    {
        title: 'Meet the Judges: Season 6 Panel Announced',
        excerpt: 'We reveal the distinguished panel of judges who will guide the next generation of talent.',
        image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop',
        author: 'Sanjay Bose',
        authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
        date: 'Aug 5, 2025',
        readTime: '3 min read',
        category: 'News',
    },
    {
        title: 'From Village to Viral: Real Stories of RAW LIQUEUR Winners',
        excerpt: 'Inspiring journeys of artists who transformed their lives through authentic performance.',
        image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=400&fit=crop',
        author: 'Moumita Sen',
        authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        date: 'Jul 28, 2025',
        readTime: '6 min read',
        category: 'Success Stories',
    },
    {
        title: 'The Power of Raw Performance',
        excerpt: 'Why unedited, authentic talent resonates more with audiences than polished productions.',
        image: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=600&h=400&fit=crop',
        author: 'Ridoy Das',
        authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        date: 'Jul 20, 2025',
        readTime: '7 min read',
        category: 'Opinion',
    },
    {
        title: 'How to Prepare for a Live Performance',
        excerpt: 'Essential preparation tips from industry experts to help you shine on stage.',
        image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=600&h=400&fit=crop',
        author: 'Tania Khatun',
        authorImage: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=face',
        date: 'Jul 15, 2025',
        readTime: '5 min read',
        category: 'Tips & Tricks',
    },
];

const categories = [
    { name: 'All', count: 24 },
    { name: 'News', count: 8 },
    { name: 'Behind the Scenes', count: 5 },
    { name: 'Tips & Tricks', count: 6 },
    { name: 'Success Stories', count: 3 },
    { name: 'Opinion', count: 2 },
];

const trendingPosts = [
    { title: 'Season 5 Winners Announcement', views: '45.2K', date: 'Aug 18, 2025' },
    { title: 'Behind the Judges\' Panel', views: '32.1K', date: 'Aug 12, 2025' },
    { title: 'Top 10 Audition Moments', views: '28.7K', date: 'Aug 8, 2025' },
    { title: 'The Making of RAW LIQUEUR', views: '21.3K', date: 'Aug 1, 2025' },
];

export default function Blog() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [showTalentForm, setShowTalentForm] = useState(false);

    return (
        <PublicLayout onSubmitTalent={() => setShowTalentForm(true)}>
            {/* Hero Section */}
            <section className="px-8 pt-6 pb-0 max-[600px]:px-4">
                <div className="max-w-[1180px] mx-auto relative rounded-2xl overflow-hidden min-h-[340px] flex items-center bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/slider 1.png')" }}>
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute right-[6%] bottom-[14%] text-[44px] opacity-85 tracking-[18px] max-[600px]:hidden">✍️ 📖 💡 📰</div>
                    <div className="relative z-10 p-14 max-w-[560px] max-[600px]:p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-4xl">✍️</span>
                            <span className="text-[#E9C784] font-bold text-[12px] tracking-[3px] uppercase">Our Blog</span>
                        </div>
                        <div className="font-hind text-[34px] font-bold text-white text-shadow-lg mb-1.5 max-[600px]:text-[24px]">Stories, Tips &</div>
                        <div className="text-[22px] font-semibold text-[#f3d9a8] max-[600px]:text-[16px]"><span className="text-white">Inspiration</span> — RAW LIQUEUR</div>
                        <div className="flex gap-4 flex-wrap mt-8">
                            <a href="#posts" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm bg-gradient-to-r from-orange to-pink text-white shadow-[0_8px_25px_-6px_rgba(236,30,99,.6)] hover:brightness-110 transition-all">
                                📖 Read Articles
                            </a>
                            <a href="#newsletter" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm bg-white/10 text-white border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all">
                                ✉️ Subscribe
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            <section className="py-[70px] max-[480px]:py-[50px]">
                <div className="max-w-[1160px] mx-auto px-8 max-[980px]:px-5">
                    <div className="flex items-center justify-center gap-3.5 text-pink font-bold text-[13px] tracking-[2px] mb-4">
                        <span className="w-[50px] h-px bg-[#f0c9d3]" />
                        FEATURED ARTICLE
                        <span className="w-[50px] h-px bg-[#f0c9d3]" />
                    </div>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,.1)] hover:shadow-[0_25px_60px_-15px_rgba(236,30,99,.2)] transition-all duration-300 mt-8 grid grid-cols-2 max-[700px]:grid-cols-1">
                        <div className="relative h-full min-h-[350px] max-[700px]:min-h-[250px]">
                            <img src={featuredPost.image} alt={featuredPost.title} className="absolute inset-0 w-full h-full object-cover" />
                            <div className="absolute top-4 left-4">
                                <span className="bg-gradient-to-r from-orange to-pink text-white font-bold text-[11px] py-1.5 px-3 rounded-lg tracking-wide">{featuredPost.category}</span>
                            </div>
                        </div>
                        <div className="p-10 flex flex-col justify-center max-[480px]:p-6">
                            <h2 className="text-[28px] font-bold text-ink mb-4 leading-tight max-[4800px]:text-[22px]">{featuredPost.title}</h2>
                            <p className="text-muted text-[15px] leading-[1.8] mb-6">{featuredPost.excerpt}</p>
                            <div className="flex items-center gap-4">
                                <img src={featuredPost.authorImage} alt={featuredPost.author} className="w-12 h-12 rounded-full object-cover" />
                                <div>
                                    <p className="font-semibold text-ink text-[14px]">{featuredPost.author}</p>
                                    <p className="text-muted text-[12px]">{featuredPost.date} · {featuredPost.readTime}</p>
                                </div>
                            </div>
                            <a href="#" className="inline-flex items-center gap-2 mt-6 text-pink font-semibold text-[14px] hover:text-orange transition-colors">
                                Read Full Article <span className="text-lg">→</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Grid + Sidebar */}
            <section id="posts" className="py-[70px] bg-[#fdf8f5] max-[480px]:py-[50px]">
                <div className="max-w-[1160px] mx-auto px-8 max-[980px]:px-5">
                    <div className="flex items-center justify-center gap-3.5 text-pink font-bold text-[13px] tracking-[2px] mb-4">
                        <span className="w-[50px] h-px bg-[#f0c9d3]" />
                        LATEST ARTICLES
                        <span className="w-[50px] h-px bg-[#f0c9d3]" />
                    </div>
                    <h2 className="text-center font-playfair italic font-normal text-[34px] mb-[50px] max-[480px]:text-[26px]">Fresh from the blog</h2>

                    {/* Category Filter */}
                    <div className="flex justify-center gap-3 mb-[50px] flex-wrap">
                        {categories.map((cat) => (
                            <button
                                key={cat.name}
                                onClick={() => setActiveCategory(cat.name)}
                                className={`px-6 py-2.5 rounded-full font-semibold text-[13px] transition-all cursor-pointer ${
                                    activeCategory === cat.name
                                        ? 'bg-gradient-to-r from-orange to-pink text-white shadow-[0_8px_20px_-6px_rgba(236,30,99,.5)]'
                                        : 'bg-white text-ink border border-[#e8dccb] hover:border-pink'
                                }`}
                            >
                                {cat.name} ({cat.count})
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-3 gap-8 max-[980px]:grid-cols-2 max-[700px]:grid-cols-1">
                        {/* Main Content */}
                        <div className="col-span-2 max-[980px]:col-span-2 max-[700px]:col-span-1">
                            <div className="grid grid-cols-2 gap-6 max-[700px]:grid-cols-1">
                                {blogPosts
                                    .filter(post => activeCategory === 'All' || post.category === activeCategory)
                                    .map((post, i) => (
                                    <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,.06)] hover:shadow-[0_15px_50px_-10px_rgba(236,30,99,.15)] transition-all duration-300 hover:-translate-y-1 group">
                                        <div className="relative h-[200px] overflow-hidden">
                                            <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            <div className="absolute top-3 left-3">
                                                <span className="bg-white/90 backdrop-blur-sm text-ink font-bold text-[10px] py-1 px-2.5 rounded-lg">{post.category}</span>
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            <h3 className="text-[17px] font-bold text-ink mb-2 leading-snug line-clamp-2 group-hover:text-pink transition-colors">{post.title}</h3>
                                            <p className="text-muted text-[13px] leading-[1.6] mb-4 line-clamp-2">{post.excerpt}</p>
                                            <div className="flex items-center justify-between pt-4 border-t border-[#f0e8e0]">
                                                <div className="flex items-center gap-3">
                                                    <img src={post.authorImage} alt={post.author} className="w-8 h-8 rounded-full object-cover" />
                                                    <div>
                                                        <p className="font-semibold text-ink text-[12px]">{post.author}</p>
                                                        <p className="text-muted text-[11px]">{post.date}</p>
                                                    </div>
                                                </div>
                                                <span className="text-muted text-[11px]">{post.readTime}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            {/* Search */}
                            <div className="bg-white rounded-2xl p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,.06)]">
                                <h3 className="text-[16px] font-bold text-ink mb-4">Search</h3>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search articles..."
                                        className="w-full py-3 pl-10 pr-4 rounded-xl bg-[#fdf8f5] border border-[#f0e8e0] text-ink text-[13px] focus:border-pink focus:ring-2 focus:ring-pink/20 outline-none transition-all"
                                    />
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">🔍</span>
                                </div>
                            </div>

                            {/* Trending */}
                            <div className="bg-white rounded-2xl p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,.06)]">
                                <h3 className="text-[16px] font-bold text-ink mb-4">🔥 Trending Now</h3>
                                <div className="space-y-4">
                                    {trendingPosts.map((post, i) => (
                                        <a key={i} href="#" className="flex items-start gap-3 group">
                                            <span className="text-2xl font-bold text-pink/20 group-hover:text-pink/40 transition-colors">{String(i + 1).padStart(2, '0')}</span>
                                            <div>
                                                <h4 className="text-[13px] font-semibold text-ink leading-snug group-hover:text-pink transition-colors line-clamp-2">{post.title}</h4>
                                                <p className="text-muted text-[11px] mt-1">{post.views} views · {post.date}</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="bg-white rounded-2xl p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,.06)]">
                                <h3 className="text-[16px] font-bold text-ink mb-4">📁 Categories</h3>
                                <div className="space-y-2">
                                    {categories.filter(c => c.name !== 'All').map((cat, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setActiveCategory(cat.name)}
                                            className="w-full flex items-center justify-between py-2 px-3 rounded-lg hover:bg-[#fdf8f5] transition-colors cursor-pointer"
                                        >
                                            <span className="text-[13px] text-ink">{cat.name}</span>
                                            <span className="text-[11px] text-muted bg-[#fdf8f5] px-2 py-0.5 rounded-full">{cat.count}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="bg-white rounded-2xl p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,.06)]">
                                <h3 className="text-[16px] font-bold text-ink mb-4">🏷️ Popular Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['Singing', 'Dance', 'Poetry', 'Music', 'Competition', 'Judges', 'Winners', 'Audition'].map((tag, i) => (
                                        <span key={i} className="px-3 py-1.5 rounded-full bg-[#fdf8f5] text-ink text-[12px] hover:bg-pink/10 hover:text-pink cursor-pointer transition-all">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section id="newsletter" className="py-[70px] bg-gradient-to-br from-ink via-[#2a1f3d] to-[#1a0f2e] max-[480px]:py-[50px]">
                <div className="max-w-[700px] mx-auto px-8 text-center max-[480px]:px-4">
                    <span className="text-5xl mb-4 block">✉️</span>
                    <h2 className="font-playfair italic text-[36px] text-white mb-4 max-[480px]:text-[28px]">
                        Stay in the <span className="bg-gradient-to-r from-orange to-pink bg-clip-text text-transparent">loop</span>
                    </h2>
                    <p className="text-white/70 text-[16px] leading-[1.8] mb-8">
                        Subscribe to our newsletter for the latest updates, exclusive stories, and insider tips delivered straight to your inbox.
                    </p>
                    <div className="flex gap-3 max-[480px]:flex-col">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 text-[14px] focus:border-pink focus:ring-2 focus:ring-pink/20 outline-none transition-all"
                        />
                        <button className="px-8 py-4 rounded-full font-semibold text-sm bg-gradient-to-r from-orange to-pink text-white shadow-[0_10px_30px_-6px_rgba(236,30,99,.55)] hover:brightness-110 transition-all cursor-pointer whitespace-nowrap">
                            Subscribe Now
                        </button>
                    </div>
                    <p className="text-white/40 text-[12px] mt-4">No spam, unsubscribe anytime.</p>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-[70px] max-[480px]:py-[50px]">
                <div className="max-w-[800px] mx-auto px-8 text-center max-[480px]:px-4">
                    <span className="text-5xl mb-4 block">🎤</span>
                    <h2 className="font-playfair italic text-[36px] mb-5 max-[480px]:text-[28px]">
                        Got a story to{' '}
                        <span className="bg-gradient-to-r from-orange to-pink bg-clip-text text-transparent">share</span>?
                    </h2>
                    <p className="text-muted text-[16px] leading-[1.8] mb-8 max-w-[500px] mx-auto">
                        We love hearing from our community. Whether you have a success story, a tip to share, or want to contribute — we'd love to hear from you.
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <button onClick={() => setShowTalentForm(true)} className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm bg-gradient-to-r from-orange to-pink text-white shadow-[0_10px_30px_-6px_rgba(236,30,99,.55)] hover:brightness-110 transition-all cursor-pointer">
                            &#9733; SUBMIT YOUR TALENT
                        </button>
                        <Link href="/about" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm border-2 border-[#e8dccb] text-ink hover:border-pink transition-colors">
                            Learn More About Us →
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
