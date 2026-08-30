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
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999] p-2 sm:p-4" onClick={onClose}>
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
            <section className="relative min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex items-center">
                <img src={hero.bgImage || '/images/slider 1.png'} alt="hero" className="absolute inset-0 w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                <div className="relative z-10 w-full max-w-[1240px] px-5 sm:px-8 py-10 sm:py-[60px] md:py-[70px]">
                    <h1 className="text-[28px] sm:text-[36px] md:text-[44px] leading-[1.3] sm:leading-[1.35] font-bold mb-4 sm:mb-[18px] text-left text-white">
                        {hero.title}<br />
                        <span className="bg-gradient-to-r from-orange to-pink bg-clip-text text-transparent font-[800] font-poppins italic">{hero.highlight}</span><br />
                        {hero.subtitle}
                    </h1>
                    <p className="text-[rgba(255,255,255,.8)] text-[13px] sm:text-[15px] leading-[1.7] sm:leading-[1.8] max-w-[420px] mb-5 sm:mb-[30px] text-left">
                        {hero.description}
                    </p>
                    <div className="flex gap-3 sm:gap-4 items-center flex-wrap">
                        <button className="relative z-10 inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold text-xs sm:text-sm bg-gradient-to-r from-orange to-pink text-white shadow-[0_8px_20px_-6px_rgba(236,30,99,.55)] hover:brightness-105">
                            {hero.buttonText}
                        </button>
                        <button className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold text-xs sm:text-sm bg-white/10 text-white border-[1.5px] border-white/30 backdrop-blur-sm hover:bg-white/20">
                            <span className="w-6 h-6 sm:w-[26px] sm:h-[26px] rounded-full bg-gradient-to-r from-orange to-pink text-white flex items-center justify-center text-[11px]">▶</span>
                            {hero.secondButtonText}
                        </button>
                    </div>
                    <div className="flex gap-1.5 mt-5 sm:mt-[26px]">
                        <span className="w-7 sm:w-[30px] h-[4px] sm:h-[5px] rounded bg-gradient-to-r from-orange to-pink" />
                        <span className="w-5 sm:w-[22px] h-[4px] sm:h-[5px] rounded bg-white/40" />
                    </div>
                </div>
            </section>

            {/* Category Bar */}
            <div className="max-w-[1160px] mx-auto -mt-8 sm:-mt-10 md:-mt-14 mb-10 sm:mb-[50px] md:mb-[60px] bg-white rounded-2xl sm:rounded-[22px] shadow-[0_15px_40px_-15px_rgba(60,20,60,.18)] sm:shadow-[0_20px_50px_-20px_rgba(60,20,60,.18)] flex justify-center flex-wrap px-4 sm:px-6 md:px-10 py-5 sm:py-[22px] md:py-[26px] relative z-10 gap-y-4 gap-x-3 sm:gap-x-5">
                {categories.map((cat, i) => (
                    <div key={i} className={`flex flex-col items-center gap-1.5 sm:gap-2 text-xs sm:text-[13px] font-medium cursor-pointer relative px-2 sm:px-3 ${i === 0 ? 'text-pink' : 'text-[#544f63]'}`}>
                        <span className="text-lg sm:text-xl">{cat.icon}</span>
                        {cat.label}
                        {i === 0 && <span className="absolute bottom-[-12px] sm:bottom-[-14px] w-5 sm:w-[26px] h-[3px] bg-pink rounded-sm" />}
                    </div>
                ))}
            </div>

            {/* Top Talents */}
            <section className="py-5 pb-10 sm:pb-14 md:pb-[60px] relative">
                <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 text-pink font-bold text-[11px] sm:text-[13px] tracking-[1.5px] sm:tracking-[2px] mb-3 sm:mb-4">
                    <span className="w-8 sm:w-[50px] h-px bg-[#f0c9d3]" />
                    TOP TALENTS TODAY
                    <span className="w-8 sm:w-[50px] h-px bg-[#f0c9d3]" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-[1160px] mx-auto px-5 sm:px-8">
                    {talents.map((t, i) => (
                        <div key={i} className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-black cursor-pointer group h-[300px] sm:h-[360px] md:h-[420px]" onClick={() => setModalVideoId(t.videoId)}>
                            <img
                                src={`https://img.youtube.com/vi/${t.videoId}/maxresdefault.jpg`}
                                alt={t.name}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none flex items-center justify-center">
                                <span className="w-12 h-12 sm:w-[60px] sm:h-[60px] rounded-full bg-white/90 flex items-center justify-center text-ink text-xl sm:text-2xl shadow-lg">▶</span>
                            </div>
                            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20">
                                <span className="bg-gradient-to-r from-orange to-pink text-white font-bold text-[11px] sm:text-[13px] py-1 sm:py-[5px] px-2 sm:px-3 rounded-lg">{t.rank}</span>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 z-20 p-3.5 sm:p-[18px]">
                                <span className={`inline-block text-[9px] sm:text-[10px] font-bold py-[3px] px-2 sm:px-2.5 rounded-[5px] mb-1.5 sm:mb-2 uppercase tracking-[.5px] ${t.variant === 'dance' ? 'bg-purple' : 'bg-pink'}`}>{t.type}</span>
                                <h3 className="text-[16px] sm:text-[18px] md:text-[19px] mb-0.5 sm:mb-1 text-white font-semibold">{t.name}</h3>
                                <p className="text-[11px] sm:text-[12.5px] opacity-85 mb-2 sm:mb-2.5 text-white">{t.desc}</p>
                                <span className="inline-flex items-center gap-1 sm:gap-1.5 bg-[rgba(255,255,255,.9)] text-pink text-[10px] sm:text-[11px] font-bold py-0.5 sm:py-1 px-2 sm:px-2.5 rounded-full">♥ {t.likes}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-7 sm:mt-8 md:mt-[34px] mb-8 sm:mb-10 md:mb-[50px]">
                    <a href="#" className="border-[1.5px] border-[#f0d3dc] py-2.5 sm:py-[11px] px-5 sm:px-[26px] rounded-full text-xs sm:text-[13px] font-semibold text-ink inline-flex items-center gap-1.5">
                        VIEW FULL RANKINGS →
                    </a>
                </div>

                {/* Stats */}
                <div className="max-w-[1160px] mx-auto mb-10 sm:mb-14 md:mb-[70px] bg-[#fff8f6] border border-[#fbe6e6] rounded-2xl sm:rounded-[20px] flex flex-wrap justify-center sm:justify-between px-5 sm:px-8 md:px-10 py-6 sm:py-[26px] md:py-[30px] gap-4 sm:gap-5">
                    {stats.map((s, i) => (
                        <div key={i} className="flex items-center gap-2.5 sm:gap-3 min-w-[140px] sm:min-w-[150px] w-[45%] sm:w-[40%] md:w-auto justify-center sm:justify-start">
                            <span className="text-xl sm:text-2xl">{s.icon}</span>
                            <div>
                                <b className="text-lg sm:text-[20px] md:text-[22px] block text-ink">{s.value}</b>
                                <span className="text-[10px] sm:text-xs text-muted">{s.label}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Latest Performances */}
            <section className="pb-10 sm:pb-14 md:pb-[70px]">
                <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 text-pink font-bold text-[11px] sm:text-[13px] tracking-[1.5px] sm:tracking-[2px] mb-3 sm:mb-4">
                    <span className="w-8 sm:w-[50px] h-px bg-[#f0c9d3]" />
                    LATEST PERFORMANCES
                    <span className="w-8 sm:w-[50px] h-px bg-[#f0c9d3]" />
                </div>
                <h2 className="text-center font-playfair italic font-normal text-[24px] sm:text-[28px] md:text-[34px] mb-7 sm:mb-8 md:mb-[40px] px-4">Raw Performances to Watch</h2>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center max-w-[1160px] mx-auto mb-7 sm:mb-8 md:mb-[34px] px-5 sm:px-8 gap-3 sm:gap-0">
                    <div className="flex gap-2 overflow-x-auto flex-nowrap pb-1 sm:pb-0 w-full sm:w-auto scrollbar-hide">
                        {filterPills.map((pill) => (
                            <button
                                key={pill}
                                onClick={() => setActiveFilter(pill)}
                                className={`px-4 sm:px-5 py-2 sm:py-[9px] rounded-full text-xs sm:text-[13px] font-semibold border cursor-pointer whitespace-nowrap flex-shrink-0 ${activeFilter === pill ? 'bg-gradient-to-r from-orange to-pink text-white border-none' : 'border-[#eee] text-[#666] bg-white'}`}
                            >
                                {pill}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-2 sm:gap-2.5 w-full sm:w-auto">
                        <input type="text" placeholder="Search videos..." className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border border-[#e5e0e8] text-xs sm:text-[13px] font-inherit text-[#555] flex-1 sm:flex-none min-w-0" />
                        <select className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border border-[#e5e0e8] text-xs sm:text-[13px] font-inherit text-[#555] flex-shrink-0">
                            <option>Newest</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-[18px] max-w-[1160px] mx-auto px-5 sm:px-8">
                    {videos.map((v, i) => (
                        <div key={i} className="cursor-pointer group" onClick={() => setModalVideoId(v.videoId)}>
                            <div className="relative rounded-lg sm:rounded-xl overflow-hidden mb-2 sm:mb-2.5">
                                <div className="relative w-full h-0 pb-[56.25%]">
                                    <img
                                        src={`https://img.youtube.com/vi/${v.videoId}/mqdefault.jpg`}
                                        alt={v.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <span className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-pink text-white text-[8px] sm:text-[9px] font-bold py-[2px] sm:py-[3px] px-1.5 sm:px-2 rounded-[4px] sm:rounded-[5px] uppercase tracking-[.4px] z-10">{v.tag}</span>
                                    <span className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 bg-[rgba(0,0,0,.65)] text-white text-[9px] sm:text-[10px] py-[2px] px-1.5 sm:px-[7px] rounded-[4px] sm:rounded-[5px] z-10">{v.dur}</span>
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="w-8 h-8 sm:w-[38px] sm:h-[38px] rounded-full bg-white/90 flex items-center justify-center text-ink text-[11px] sm:text-[13px] shadow-lg">▶</span>
                                    </div>
                                </div>
                            </div>
                            <h4 className="text-[12px] sm:text-[13px] md:text-[13.5px] font-semibold mb-1 sm:mb-1.5 leading-[1.3] sm:leading-[1.4] line-clamp-2">{v.title}</h4>
                            <div className="flex justify-between items-center text-[10px] sm:text-[11px] text-muted gap-1">
                                <span className="truncate">{v.by}</span>
                                <span className="flex-shrink-0">👁 {v.views}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-8 sm:mt-9 md:mt-[44px] mb-2.5">
                    <button className="bg-gradient-to-r from-orange to-pink text-white border-none py-2.5 sm:py-3 px-6 sm:px-[30px] rounded-full font-semibold text-xs sm:text-[13px] cursor-pointer">
                        LOAD MORE ⟳
                    </button>
                </div>
            </section>

            {/* CTA Banner */}
            <div className="relative max-w-[1160px] mx-auto mb-10 sm:mb-14 md:mb-[70px] rounded-2xl sm:rounded-[22px] overflow-hidden mx-4 sm:mx-auto flex items-center justify-end px-5 sm:px-[40px] md:px-[50px] py-6 sm:py-8 md:py-9 gap-4 sm:gap-5 md:gap-6">
                <img src={cta.bgImage || '/images/footer.png'} alt="cta" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 text-left sm:text-right flex-1">
                    <div className="text-white text-[10px] sm:text-xs font-bold tracking-[1.5px] sm:tracking-[2px] mb-1.5 sm:mb-2">{cta.tagline}</div>
                    <h3 className="text-[20px] sm:text-[22px] md:text-[26px] font-bold leading-[1.3] sm:leading-[1.4] text-white">
                        {cta.title}<br />
                        <span className="bg-gradient-to-r from-orange to-pink bg-clip-text text-transparent">{cta.highlight}</span>
                    </h3>
                </div>
                <button onClick={() => setShowTalentForm(true)} className="relative z-10 inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold text-xs sm:text-sm bg-gradient-to-r from-orange to-pink text-white shadow-[0_8px_20px_-6px_rgba(236,30,99,.55)] hover:brightness-105 whitespace-nowrap cursor-pointer flex-shrink-0">
                    {cta.buttonText}
                </button>
            </div>

            {modalVideoId && <VideoModal videoId={modalVideoId} onClose={() => setModalVideoId(null)} />}
            {showTalentForm && <TalentForm onClose={() => setShowTalentForm(false)} />}
        </PublicLayout>
    );
}
