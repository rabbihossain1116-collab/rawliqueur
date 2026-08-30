import { useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import TalentForm from '@/Components/TalentForm';

const defaultCategories = [
    { icon: '🎚️', label: 'All' },
    { icon: '🎵', label: 'Singing' },
    { icon: '💃', label: 'Dance' },
    { icon: '📖', label: 'Storytelling' },
    { icon: '🖋️', label: 'Poetry' },
    { icon: '🎸', label: 'Instrumental' },
    { icon: '▦', label: 'Others' },
];

const defaultTalents = [
    { rank: '01', name: 'Moha Jadu', type: 'Singing', desc: 'Coke Studio Bangla S3', likes: '380K', videoId: 'UghMf59vDJM', variant: '' },
    { rank: '02', name: 'Long Distance Love', type: 'Singing', desc: 'Coke Studio Bangla S3', likes: '360K', videoId: 'sqJ2QhjBQaw', variant: '' },
    { rank: '03', name: 'Ma Lo Ma', type: 'Singing', desc: 'Coke Studio Bangla S3', likes: '340K', videoId: 'zEqqW-USajs', variant: '' },
];

const defaultStats = [
    { icon: '⭐', value: '25K+', label: 'Talents Discovered' },
    { icon: '👁️', value: '500K+', label: 'Total Views' },
    { icon: '👥', value: '10K+', label: 'Active Artists' },
    { icon: '▦', value: '50+', label: 'Categories' },
    { icon: '🏆', value: '120+', label: 'Winners' },
];

const defaultVideos = [
    { tag: 'Singing', title: 'Sa Re Ga Ma Pa 2025 | Ep 53 Best Scene', by: 'Priya Sengupta', dur: '04:55', views: '6.2M', likes: '540000', videoId: 'qz38Kthnxfo' },
    { tag: 'Singing', title: 'Kishore Kumar Special | Jyotirmayee Nayak | Indian Idol S16', by: 'Jyotirmayee Nayak', dur: '04:05', views: '12K', likes: '1800', videoId: 'lIfJ0nngD68' },
    { tag: 'Singing', title: 'Kehna Hai Kehna Hai | Tanishk Shukla | Indian Idol S16', by: 'Tanishk Shukla', dur: '03:40', views: '16K', likes: '2100', videoId: 'pMhjxMwY9W0' },
    { tag: 'Singing', title: 'Kah Doon Tumhe Ya Chup Rahun | Indian Idol S16', by: 'Sneha Chakraborty', dur: '03:50', views: '24.9K', likes: '2020', videoId: 'NHDYwhfJGzk' },
    { tag: 'Singing', title: 'Ae Ajnabee | Coke Studio Bharat', by: 'Arka Dey', dur: '04:15', views: '18M', likes: '1650000', videoId: 'ut1rfURWyCo' },
    { tag: 'Singing', title: 'Re Mann | Coke Studio Bharat', by: 'Ridoy Das', dur: '04:30', views: '22M', likes: '1850000', videoId: 'gxet54MhNQI' },
    { tag: 'Singing', title: 'Sonchadi | Coke Studio Bharat', by: 'Moumita Bose', dur: '04:50', views: '26.7M', likes: '2100000', videoId: 'L9CfCjedhPE' },
    { tag: 'Singing', title: 'Holi Aayi Re | Coke Studio Bharat', by: 'Farhan Ahmed', dur: '05:41', views: '30.4M', likes: '430000', videoId: 'h89PrRNHV-E' },
    { tag: 'Singing', title: 'Arz Kiya Hai | Coke Studio Bharat', by: 'Suvo Adhikary', dur: '05:05', views: '190.6M', likes: '13000000', videoId: 'bP8ATWCvqzw' },
    { tag: 'Singing', title: 'Patar Bashori | Coke Studio Bangla S4', by: 'Sneha Chakraborty', dur: '04:10', views: '15M', likes: '1450000', videoId: 'YxJjFjP0crs' },
    { tag: 'Singing', title: 'Ma Lo Ma | Coke Studio Bangla', by: 'Tania Khatun', dur: '03:55', views: '38M', likes: '3400000', videoId: 'zEqqW-USajs' },
    { tag: 'Singing', title: 'Moha Jadu | Coke Studio Bangla S3', by: 'Ridoy Das', dur: '04:20', views: '42M', likes: '3800000', videoId: 'UghMf59vDJM' },
    { tag: 'Singing', title: 'Long Distance Love | Coke Studio Bangla S3', by: 'Sneha Chakraborty', dur: '04:45', views: '76.3M', likes: '5997000', videoId: 'sqJ2QhjBQaw' },
];

const filterPills = ['All', 'Singing', 'Dance', 'Storytelling', 'Poetry', 'Instrumental'];

function VideoModal({ videoId, onClose }) {
    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999] p-4" onClick={onClose}>
            <div className="relative w-full max-w-[900px]" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute -top-10 right-0 text-white text-3xl cursor-pointer hover:text-pink">✕</button>
                <div className="relative w-full h-0 pb-[56.25%] rounded-xl overflow-hidden">
                    <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                        title="Video Player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </div>
        </div>
    );
}

export default function Home({ homeContent }) {
    const [activeFilter, setActiveFilter] = useState('All');
    const [modalVideoId, setModalVideoId] = useState(null);
    const [showTalentForm, setShowTalentForm] = useState(false);

    // Use dynamic data or defaults
    const hero = homeContent?.hero || {
        title: 'প্রতিভা ও কবিতা গানে',
        highlight: 'RAW LIQUEUR',
        subtitle: 'বাংলার প্রাণে',
        description: 'গানের মাঝে ফুটে বির থাগসাব সেরা প্রতিভা সবাইকে বেধান, সবাইকে শোনান।',
        buttonText: '♫ EXPLORE TALENTS',
        secondButtonText: 'HOW IT WORKS',
        bgImage: '/images/slider 1.png',
    };

    const categories = homeContent?.categories?.length > 0 ? homeContent.categories : defaultCategories;
    const talents = homeContent?.top_talents?.length > 0 ? homeContent.top_talents : defaultTalents;
    const stats = homeContent?.stats?.length > 0 ? homeContent.stats : defaultStats;
    const videos = homeContent?.videos?.length > 0 ? homeContent.videos : defaultVideos;
    const cta = homeContent?.cta || {
        tagline: 'BE THE NEXT FEATURED ARTIST',
        title: 'Show us your raw talent.',
        highlight: 'No AI, No Edit, Just You.',
        buttonText: '★ SUBMIT YOUR TALENT →',
        bgImage: '/images/footer.png',
    };

    return (
        <PublicLayout onSubmitTalent={() => setShowTalentForm(true)}>
            {/* Hero */}
            <section className="relative min-h-[600px] flex items-center max-[700px]:min-h-[350px]">
                <img src={hero.bgImage || '/images/slider 1.png'} alt="hero" className="absolute inset-0 w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
                <div className="relative z-10 max-w-[1240px] px-8 py-[70px] max-[700px]:py-[50px] max-[480px]:px-4">
                    <h1 className="text-[44px] leading-[1.35] font-bold mb-[18px] text-left text-white max-[700px]:text-[32px] max-[480px]:text-[26px]">
                        {hero.title}<br />
                        <span className="bg-gradient-to-r from-orange to-pink bg-clip-text text-transparent font-[800] font-poppins italic">{hero.highlight}</span><br />
                        {hero.subtitle}
                    </h1>
                    <p className="text-[rgba(255,255,255,.8)] text-[15px] leading-[1.8] max-w-[420px] mb-[30px] text-left max-[480px]:text-[13.5px]">
                        {hero.description}
                    </p>
                    <div className="flex gap-4 items-center flex-wrap">
                <button className="relative z-10 inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-gradient-to-r from-orange to-pink text-white shadow-[0_8px_20px_-6px_rgba(236,30,99,.55)] hover:brightness-105">
                            {hero.buttonText}
                        </button>
                        <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-white/10 text-white border-[1.5px] border-white/30 backdrop-blur-sm hover:bg-white/20">
                            <span className="w-[26px] h-[26px] rounded-full bg-gradient-to-r from-orange to-pink text-white flex items-center justify-center text-[11px]">▶</span>
                            {hero.secondButtonText}
                        </button>
                    </div>
                    <div className="flex gap-1.5 mt-[26px]">
                        <span className="w-[30px] h-[5px] rounded bg-gradient-to-r from-orange to-pink" />
                        <span className="w-[22px] h-[5px] rounded bg-white/40" />
                    </div>
                </div>
            </section>

            {/* Category Bar */}
            <div className="max-w-[1160px] mx-auto -mt-14 mb-[60px] bg-white rounded-[22px] shadow-[0_20px_50px_-20px_rgba(60,20,60,.18)] flex justify-between px-10 py-[26px] relative z-10 max-[980px]:flex-wrap max-[980px]:row-gap-[18px] max-[980px]:column-gap-3.5 max-[980px]:justify-center max-[980px]:py-[22px] max-[980px]:px-5 max-[980px]:-mt-[30px] max-[480px]:mx-4 max-[480px]:px-[14px]">
                {categories.map((cat, i) => (
                    <div key={i} className={`flex flex-col items-center gap-2 text-[13px] font-medium cursor-pointer relative max-[980px]:w-[26%] max-[700px]:w-[30%] max-[480px]:w-[44%] max-[480px]:text-xs ${i === 0 ? 'text-pink' : 'text-[#544f63]'}`}>
                        <span className="text-xl">{cat.icon}</span>
                        {cat.label}
                        {i === 0 && <span className="absolute bottom-[-14px] w-[26px] h-[3px] bg-pink rounded-sm" />}
                    </div>
                ))}
            </div>

            {/* Top Talents */}
            <section className="py-5 pb-[60px] relative">
                <div className="flex items-center justify-center gap-3.5 text-pink font-bold text-[13px] tracking-[2px] mb-4">
                    <span className="w-[50px] h-px bg-[#f0c9d3]" />
                    TOP TALENTS TODAY
                    <span className="w-[50px] h-px bg-[#f0c9d3]" />
                </div>
                <div className="grid grid-cols-3 gap-6 max-w-[1160px] mx-auto px-8 max-[980px]:grid-cols-2 max-[700px]:grid-cols-1 max-[980px]:px-5">
                    {talents.map((t, i) => (
                        <div key={i} className="relative rounded-2xl overflow-hidden bg-black cursor-pointer group" style={{ height: '420px' }} onClick={() => setModalVideoId(t.videoId)}>
                            <img
                                src={`https://img.youtube.com/vi/${t.videoId}/maxresdefault.jpg`}
                                alt={t.name}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none flex items-center justify-center">
                                <span className="w-[60px] h-[60px] rounded-full bg-white/90 flex items-center justify-center text-ink text-2xl shadow-lg">▶</span>
                            </div>
                            <div className="absolute top-4 left-4 z-20">
                                <span className="bg-gradient-to-r from-orange to-pink text-white font-bold text-[13px] py-[5px] px-3 rounded-lg">{t.rank}</span>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 z-20 p-[18px]">
                                <span className={`inline-block text-[10px] font-bold py-[3px] px-2.5 rounded-[5px] mb-2 uppercase tracking-[.5px] ${t.variant === 'dance' ? 'bg-purple' : 'bg-pink'}`}>{t.type}</span>
                                <h3 className="text-[19px] mb-1 text-white font-semibold">{t.name}</h3>
                                <p className="text-[12.5px] opacity-85 mb-2.5 text-white">{t.desc}</p>
                                <span className="inline-flex items-center gap-1.5 bg-[rgba(255,255,255,.9)] text-pink text-[11px] font-bold py-1 px-2.5 rounded-full">♥ {t.likes}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-[34px] mb-[50px]">
                    <a href="#" className="border-[1.5px] border-[#f0d3dc] py-[11px] px-[26px] rounded-full text-[13px] font-semibold text-ink inline-flex items-center gap-1.5">
                        VIEW FULL RANKINGS →
                    </a>
                </div>

                {/* Stats */}
                <div className="max-w-[1160px] mx-auto mb-[70px] bg-[#fff8f6] border border-[#fbe6e6] rounded-[20px] flex justify-between px-10 py-[30px] flex-wrap gap-5 max-[980px]:justify-center max-[980px]:gap-y-[26px] max-[980px]:gap-x-[34px] max-[980px]:py-[26px] max-[980px]:px-[30px] max-[480px]:flex-col max-[480px]:items-stretch">
                    {stats.map((s, i) => (
                        <div key={i} className="flex items-center gap-3 min-w-[150px] max-[980px]:w-[40%] max-[480px]:w-full max-[480px]:justify-center">
                            <span className="text-2xl">{s.icon}</span>
                            <div>
                                <b className="text-[22px] block text-ink">{s.value}</b>
                                <span className="text-xs text-muted">{s.label}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Latest Performances */}
            <section className="pb-[70px]">
                <div className="flex items-center justify-center gap-3.5 text-pink font-bold text-[13px] tracking-[2px] mb-4">
                    <span className="w-[50px] h-px bg-[#f0c9d3]" />
                    LATEST PERFORMANCES
                    <span className="w-[50px] h-px bg-[#f0c9d3]" />
                </div>
                <h2 className="text-center font-playfair italic font-normal text-[34px] mb-[40px] max-[480px]:text-[26px]">Raw Performances to Watch</h2>

                <div className="flex justify-between items-center max-w-[1160px] mx-auto mb-[34px] px-8 max-[980px]:px-5 max-[480px]:flex-col max-[480px]:items-stretch">
                    <div className="flex gap-2.5 flex-wrap max-[480px]:overflow-x-auto max-[480px]:flex-nowrap max-[480px]:pb-1 max-[480px]:gap-2.5">
                        {filterPills.map((pill) => (
                            <button
                                key={pill}
                                onClick={() => setActiveFilter(pill)}
                                className={`px-5 py-[9px] rounded-full text-[13px] font-semibold border cursor-pointer whitespace-nowrap ${activeFilter === pill ? 'bg-gradient-to-r from-orange to-pink text-white border-none' : 'border-[#eee] text-[#666] bg-white'}`}
                            >
                                {pill}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-2.5 max-[480px]:w-full max-[480px]:mt-2.5">
                        <input type="text" placeholder="Search videos..." className="px-4 py-2.5 rounded-full border border-[#e5e0e8] text-[13px] font-inherit text-[#555] max-[480px]:flex-1 max-[480px]:w-auto" />
                        <select className="px-4 py-2.5 rounded-full border border-[#e5e0e8] text-[13px] font-inherit text-[#555]">
                            <option>Newest</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-5 gap-[18px] max-w-[1160px] mx-auto px-8 max-[1080px]:grid-cols-3 max-[980px]:grid-cols-3 max-[700px]:grid-cols-2 max-[480px]:grid-cols-2 max-[980px]:px-5 max-[480px]:gap-3">
                    {videos.map((v, i) => (
                        <div key={i} className="cursor-pointer group" onClick={() => setModalVideoId(v.videoId)}>
                            <div className="relative rounded-xl overflow-hidden mb-2.5">
                                <div className="relative w-full h-0 pb-[56.25%]">
                                    <img
                                        src={`https://img.youtube.com/vi/${v.videoId}/mqdefault.jpg`}
                                        alt={v.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <span className="absolute top-2 left-2 bg-pink text-white text-[9px] font-bold py-[3px] px-2 rounded-[5px] uppercase tracking-[.4px] z-10">{v.tag}</span>
                                    <span className="absolute bottom-2 right-2 bg-[rgba(0,0,0,.65)] text-white text-[10px] py-[2px] px-[7px] rounded-[5px] z-10">{v.dur}</span>
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="w-[38px] h-[38px] rounded-full bg-white/90 flex items-center justify-center text-ink text-[13px] shadow-lg">▶</span>
                                    </div>
                                </div>
                            </div>
                            <h4 className="text-[13.5px] font-semibold mb-1.5 leading-[1.4] max-[480px]:text-[12.5px]">{v.title}</h4>
                            <div className="flex justify-between items-center text-[11px] text-muted">
                                <span>By {v.by}</span>
                                <span>👁 {v.views} ♥ {v.likes}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-[44px] mb-2.5">
                    <button className="bg-gradient-to-r from-orange to-pink text-white border-none py-3 px-[30px] rounded-full font-semibold text-[13px] cursor-pointer">
                        LOAD MORE ⟳
                    </button>
                </div>
            </section>

            {/* CTA Banner */}
            <div className="relative max-w-[1160px] mx-auto mb-[70px] rounded-[22px] overflow-hidden flex items-center justify-end px-[50px] py-9 gap-6 max-[700px]:flex-col max-[700px]:text-center max-[700px]:justify-center max-[700px]:p-[30px]">
                <img src={cta.bgImage || '/images/footer.png'} alt="cta" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 text-right max-[700px]:text-center">
                    <div className="text-white text-xs font-bold tracking-[2px] mb-2">{cta.tagline}</div>
                    <h3 className="text-[26px] font-bold leading-[1.4] text-white max-[700px]:text-[22px]">
                        {cta.title}<br />
                        <span className="bg-gradient-to-r from-orange to-pink bg-clip-text text-transparent">{cta.highlight}</span>
                    </h3>
                </div>
                <button onClick={() => setShowTalentForm(true)} className="relative z-10 inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-gradient-to-r from-orange to-pink text-white shadow-[0_8px_20px_-6px_rgba(236,30,99,.55)] hover:brightness-105 whitespace-nowrap cursor-pointer">
                    {cta.buttonText}
                </button>
            </div>

            {modalVideoId && <VideoModal videoId={modalVideoId} onClose={() => setModalVideoId(null)} />}
            {showTalentForm && <TalentForm onClose={() => setShowTalentForm(false)} />}
        </PublicLayout>
    );
}
