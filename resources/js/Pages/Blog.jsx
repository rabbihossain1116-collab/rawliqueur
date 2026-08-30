import { Fragment, useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import TalentForm from '@/Components/TalentForm';
import { Link } from '@inertiajs/react';

export default function Blog({ blogContent }) {
    const [activeCategory, setActiveCategory] = useState('All');
    const [showTalentForm, setShowTalentForm] = useState(false);

    const hero = blogContent?.hero || { bgImage: '/images/slider 1.png', title: 'Stories, Tips &', subtitle: 'Inspiration — RAW LIQUEUR' };
    const featuredPost = blogContent?.featured_post || {};
    const blogPosts = blogContent?.blog_posts || [];
    const categories = blogContent?.categories || [];
    const trendingPosts = blogContent?.trending_posts || [];
    const tags = blogContent?.tags || [];
    const newsletter = blogContent?.newsletter || { icon: '✉️', title: 'Stay in the loop', description: '', buttonText: 'Subscribe Now' };
    const cta = blogContent?.cta || { icon: '🎤', title: 'Got a story to share?', description: '', buttonText: '★ SUBMIT YOUR TALENT', button2Text: 'Learn More About Us →' };

    return (
        <PublicLayout onSubmitTalent={() => setShowTalentForm(true)}>
            {/* Hero Section */}
            <section className="px-8 pt-6 pb-0 max-[600px]:px-4">
                <div className="max-w-[1180px] mx-auto relative rounded-2xl overflow-hidden min-h-[340px] flex items-center bg-cover bg-center"
                    style={{ backgroundImage: `url('${hero.bgImage}')` }}>
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="relative z-10 p-14 max-w-[560px] max-[600px]:p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-4xl">✍️</span>
                            <span className="text-[#E9C784] font-bold text-[12px] tracking-[3px] uppercase">Our Blog</span>
                        </div>
                        <div className="font-hind text-[34px] font-bold text-white text-shadow-lg mb-1.5 max-[600px]:text-[24px]">{hero.title}</div>
                        <div className="text-[22px] font-semibold text-[#f3d9a8] max-[600px]:text-[16px]"><span className="text-white">{hero.subtitle}</span></div>
                        <div className="flex gap-4 flex-wrap mt-8">
                            <a href="#posts" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm bg-gradient-to-r from-orange to-pink text-white shadow-[0_8px_25px_-6px_rgba(236,30,99,.6)] hover:brightness-110 transition-all">📖 Read Articles</a>
                            <a href="#newsletter" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm bg-white/10 text-white border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all">✉️ Subscribe</a>
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
                            <div className="absolute top-4 left-4"><span className="bg-gradient-to-r from-orange to-pink text-white font-bold text-[11px] py-1.5 px-3 rounded-lg tracking-wide">{featuredPost.category}</span></div>
                        </div>
                        <div className="p-10 flex flex-col justify-center max-[480px]:p-6">
                            <h2 className="text-[28px] font-bold text-ink mb-4 leading-tight max-[4800px]:text-[22px]">{featuredPost.title}</h2>
                            <p className="text-muted text-[15px] leading-[1.8] mb-6">{featuredPost.excerpt}</p>
                            <div className="flex items-center gap-4">
                                <img src={featuredPost.authorImage} alt={featuredPost.author} className="w-12 h-12 rounded-full object-cover" />
                                <div><p className="font-semibold text-ink text-[14px]">{featuredPost.author}</p><p className="text-muted text-[12px]">{featuredPost.date} · {featuredPost.readTime}</p></div>
                            </div>
                            <a href="#" className="inline-flex items-center gap-2 mt-6 text-pink font-semibold text-[14px] hover:text-orange transition-colors">Read Full Article <span className="text-lg">→</span></a>
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

                    <div className="flex justify-center gap-3 mb-[50px] flex-wrap">
                        {categories.map((cat) => (
                            <button key={cat.name} onClick={() => setActiveCategory(cat.name)} className={`px-6 py-2.5 rounded-full font-semibold text-[13px] transition-all cursor-pointer ${activeCategory === cat.name ? 'bg-gradient-to-r from-orange to-pink text-white shadow-[0_8px_20px_-6px_rgba(236,30,99,.5)]' : 'bg-white text-ink border border-[#e8dccb] hover:border-pink'}`}>
                                {cat.name} ({cat.count})
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-3 gap-8 max-[980px]:grid-cols-2 max-[700px]:grid-cols-1">
                        <div className="col-span-2 max-[980px]:col-span-2 max-[700px]:col-span-1">
                            <div className="grid grid-cols-2 gap-6 max-[700px]:grid-cols-1">
                                {blogPosts.filter(post => activeCategory === 'All' || post.category === activeCategory).map((post, i) => (
                                    <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,.06)] hover:shadow-[0_15px_50px_-10px_rgba(236,30,99,.15)] transition-all duration-300 hover:-translate-y-1 group">
                                        <div className="relative h-[200px] overflow-hidden">
                                            <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            <div className="absolute top-3 left-3"><span className="bg-white/90 backdrop-blur-sm text-ink font-bold text-[10px] py-1 px-2.5 rounded-lg">{post.category}</span></div>
                                        </div>
                                        <div className="p-5">
                                            <h3 className="text-[17px] font-bold text-ink mb-2 leading-snug line-clamp-2 group-hover:text-pink transition-colors">{post.title}</h3>
                                            <p className="text-muted text-[13px] leading-[1.6] mb-4 line-clamp-2">{post.excerpt}</p>
                                            <div className="flex items-center justify-between pt-4 border-t border-[#f0e8e0]">
                                                <div className="flex items-center gap-3">
                                                    <img src={post.authorImage} alt={post.author} className="w-8 h-8 rounded-full object-cover" />
                                                    <div><p className="font-semibold text-ink text-[12px]">{post.author}</p><p className="text-muted text-[11px]">{post.date}</p></div>
                                                </div>
                                                <span className="text-muted text-[11px]">{post.readTime}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="bg-white rounded-2xl p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,.06)]">
                                <h3 className="text-[16px] font-bold text-ink mb-4">Search</h3>
                                <div className="relative">
                                    <input type="text" placeholder="Search articles..." className="w-full py-3 pl-10 pr-4 rounded-xl bg-[#fdf8f5] border border-[#f0e8e0] text-ink text-[13px] focus:border-pink focus:ring-2 focus:ring-pink/20 outline-none transition-all" />
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">🔍</span>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,.06)]">
                                <h3 className="text-[16px] font-bold text-ink mb-4">🔥 Trending Now</h3>
                                <div className="space-y-4">
                                    {trendingPosts.map((post, i) => (
                                        <a key={i} href="#" className="flex items-start gap-3 group">
                                            <span className="text-2xl font-bold text-pink/20 group-hover:text-pink/40 transition-colors">{String(i + 1).padStart(2, '0')}</span>
                                            <div><h4 className="text-[13px] font-semibold text-ink leading-snug group-hover:text-pink transition-colors line-clamp-2">{post.title}</h4><p className="text-muted text-[11px] mt-1">{post.views} views · {post.date}</p></div>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,.06)]">
                                <h3 className="text-[16px] font-bold text-ink mb-4">📁 Categories</h3>
                                <div className="space-y-2">
                                    {categories.filter(c => c.name !== 'All').map((cat, i) => (
                                        <button key={i} onClick={() => setActiveCategory(cat.name)} className="w-full flex items-center justify-between py-2 px-3 rounded-lg hover:bg-[#fdf8f5] transition-colors cursor-pointer">
                                            <span className="text-[13px] text-ink">{cat.name}</span>
                                            <span className="text-[11px] text-muted bg-[#fdf8f5] px-2 py-0.5 rounded-full">{cat.count}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,.06)]">
                                <h3 className="text-[16px] font-bold text-ink mb-4">🏷️ Popular Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag, i) => (
                                        <span key={i} className="px-3 py-1.5 rounded-full bg-[#fdf8f5] text-ink text-[12px] hover:bg-pink/10 hover:text-pink cursor-pointer transition-all">{tag}</span>
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
                    <span className="text-5xl mb-4 block">{newsletter.icon}</span>
                    <h2 className="font-playfair italic text-[36px] text-white mb-4 max-[480px]:text-[28px]">
                        {newsletter.title.split('loop').map((part, i) => i === 0 ? <Fragment key={i}>{part}<span className="bg-gradient-to-r from-orange to-pink bg-clip-text text-transparent">loop</span></Fragment> : <span key={i}>{part}</span>)}
                    </h2>
                    <p className="text-white/70 text-[16px] leading-[1.8] mb-8">{newsletter.description}</p>
                    <div className="flex gap-3 max-[480px]:flex-col">
                        <input type="email" placeholder="Enter your email address" className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 text-[14px] focus:border-pink focus:ring-2 focus:ring-pink/20 outline-none transition-all" />
                        <button className="px-8 py-4 rounded-full font-semibold text-sm bg-gradient-to-r from-orange to-pink text-white shadow-[0_10px_30px_-6px_rgba(236,30,99,.55)] hover:brightness-110 transition-all cursor-pointer whitespace-nowrap">{newsletter.buttonText}</button>
                    </div>
                    <p className="text-white/40 text-[12px] mt-4">No spam, unsubscribe anytime.</p>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-[70px] max-[480px]:py-[50px]">
                <div className="max-w-[800px] mx-auto px-8 text-center max-[480px]:px-4">
                    <span className="text-5xl mb-4 block">{cta.icon}</span>
                    <h2 className="font-playfair italic text-[36px] mb-5 max-[480px]:text-[28px]">
                        {cta.title.split('share').map((part, i) => i === 0 ? <Fragment key={i}>{part}<span className="bg-gradient-to-r from-orange to-pink bg-clip-text text-transparent">share</span></Fragment> : <span key={i}>{part}</span>)}
                    </h2>
                    <p className="text-muted text-[16px] leading-[1.8] mb-8 max-w-[500px] mx-auto">{cta.description}</p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <button onClick={() => setShowTalentForm(true)} className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm bg-gradient-to-r from-orange to-pink text-white shadow-[0_10px_30px_-6px_rgba(236,30,99,.55)] hover:brightness-110 transition-all cursor-pointer">{cta.buttonText}</button>
                        <Link href="/about" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm border-2 border-[#e8dccb] text-ink hover:border-pink transition-colors">{cta.button2Text}</Link>
                    </div>
                </div>
            </section>
            {showTalentForm && <TalentForm onClose={() => setShowTalentForm(false)} />}
        </PublicLayout>
    );
}
