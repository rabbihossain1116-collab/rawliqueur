import { useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';

const talents = [
    { rank: '01', name: 'Sneha Chakraborty', type: 'Singing', desc: 'Bangladeshi Singer', likes: '5.3K', img: 'https://images.unsplash.com/photo-1516307365426-bea591f05011?w=600&q=75&auto=format&fit=crop', variant: '' },
    { rank: '02', name: 'Rahul Saha', type: 'Singing', desc: 'Bangladeshi Musician', likes: '4.2K', img: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=600&q=75&auto=format&fit=crop', variant: '' },
    { rank: '03', name: 'Ananya Das', type: 'Dance', desc: 'Indian Dancer', likes: '3.8K', img: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&q=75&auto=format&fit=crop', variant: 'dance' },
];

const categories = [
    { icon: '🎚️', label: 'All' },
    { icon: '🎵', label: 'Singing' },
    { icon: '💃', label: 'Dance' },
    { icon: '📖', label: 'Storytelling' },
    { icon: '🖋️', label: 'Poetry' },
    { icon: '🎸', label: 'Instrumental' },
    { icon: '▦', label: 'Others' },
];

const photos = [
    'photo-1470225620780-dba8ba36b745', 'photo-1493225457124-a3eb161ffa5f', 'photo-1516280440614-37939bbacd81',
    'photo-1501386761578-eac5c94b800a', 'photo-1571266028243-e4bb35e0d4a2', 'photo-1524368535928-5b5e00ddc76b',
    'photo-1508700115892-45ecd05ae2ad', 'photo-1445985543470-41fba5c3144a', 'photo-1508973379184-7517410fb0bc',
    'photo-1514320291840-2e0a9bf2a9ae', 'photo-1514525253161-7a46d19cd819', 'photo-1415201364774-f6f0bb35f28f',
    'photo-1516307365426-bea591f05011', 'photo-1520523839897-bd0b52f945a0', 'photo-1499415479124-43c32433a620',
    'photo-1478147427282-58a87a120781', 'photo-1461784180009-27c1303a64b6',
];

const videos = [
    { tag: 'Singing', title: 'So Re Ga Ma Pa 2025 | Ep 3 Scene', by: 'Pritom Sengupta', dur: '04:15', views: '24.5K', likes: '6400' },
    { tag: 'Singing', title: 'So Re Ga Ma Pa 2025 | Best Performance', by: 'Rishab Das', dur: '04:20', views: '18.4K', likes: '7200' },
    { tag: 'Singing', title: 'Zindagi Ke Safar Mein | Indian Idol', by: 'Moumita Bose', dur: '04:45', views: '15.2K', likes: '9100' },
    { tag: 'Singing', title: 'Baharon Phool Barso | Indian Idol', by: 'Tushar Pradhan', dur: '02:50', views: '18.3K', likes: '8700' },
    { tag: 'Singing', title: 'Keh Doon Tumhe Ya Chup Rahun | Indian Idol', by: 'Sneha Chatterjee', dur: '04:50', views: '14.6K', likes: '5100' },
    { tag: 'Singing', title: 'Ae Ajnabee | Coke Studio Bharat', by: 'Arko Dev', dur: '03:30', views: '18M', likes: '155000' },
    { tag: 'Singing', title: 'Re Mann | Coke Studio Bharat', by: 'Prithy Das', dur: '04:30', views: '28M', likes: '158000' },
    { tag: 'Singing', title: 'Sonchadi | Coke Studio Bharat', by: 'Moumita Bose', dur: '03:30', views: '25.3M', likes: '216000' },
    { tag: 'Singing', title: 'Hasti Aayi Re | Coke Studio Bharat', by: 'Protom Pradhon', dur: '02:50', views: '30.4M', likes: '35000' },
    { tag: 'Singing', title: 'Ar Khyuu Hai | Coke Studio Bharat', by: 'Shyno Saha', dur: '02:30', views: '19.8M', likes: '156000' },
];

const stats = [
    { icon: '⭐', value: '25K+', label: 'Talents Discovered' },
    { icon: '👁️', value: '500K+', label: 'Total Views' },
    { icon: '👥', value: '10K+', label: 'Active Artists' },
    { icon: '▦', value: '50+', label: 'Categories' },
    { icon: '🏆', value: '120+', label: 'Winners' },
];

const filterPills = ['All', 'Singing', 'Dance', 'Storytelling', 'Poetry', 'Instrumental'];

export default function Home() {
    const [activeFilter, setActiveFilter] = useState('All');

    return (
        <PublicLayout>
            {/* Hero */}
            <section className="relative min-h-[600px] flex items-center max-[700px]:min-h-[350px]">
                <img src="/images/slider%201.png" alt="hero" className="absolute inset-0 w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
                <div className="relative z-10 max-w-[1240px] px-8 py-[70px] max-[700px]:py-[50px] max-[480px]:px-4">
                    <h1 className="text-[44px] leading-[1.35] font-bold mb-[18px] text-left text-white max-[700px]:text-[32px] max-[480px]:text-[26px]">
                        প্রতিভা ও কবিতা গানে<br />
                        <span className="bg-gradient-to-r from-orange to-pink bg-clip-text text-transparent font-[800] font-poppins italic">RAW LIQUEUR</span><br />
                        বাংলার প্রাণে
                    </h1>
                    <p className="text-[rgba(255,255,255,.8)] text-[15px] leading-[1.8] max-w-[420px] mb-[30px] text-left max-[480px]:text-[13.5px]">
                        গানের মাঝে ফুটে বির থাগসাব সেরা প্রতিভা সবাইকে বেধান, সবাইকে শোনান।
                    </p>
                    <div className="flex gap-4 items-center flex-wrap">
                <button className="relative z-10 inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-gradient-to-r from-orange to-pink text-white shadow-[0_8px_20px_-6px_rgba(236,30,99,.55)] hover:brightness-105">
                            ♫ EXPLORE TALENTS
                        </button>
                        <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-white/10 text-white border-[1.5px] border-white/30 backdrop-blur-sm hover:bg-white/20">
                            <span className="w-[26px] h-[26px] rounded-full bg-gradient-to-r from-orange to-pink text-white flex items-center justify-center text-[11px]">▶</span>
                            HOW IT WORKS
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
                        <div key={i} className={`relative rounded-2xl overflow-hidden h-[280px] flex items-end text-white ${t.variant === 'dance' ? 'dance' : ''}`}>
                            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${t.img}')` }} />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(15,5,20,.85)]" />
                            <span className="absolute top-3.5 left-3.5 bg-gradient-to-r from-orange to-pink text-white font-bold text-[13px] py-[5px] px-3 rounded-lg z-10">{t.rank}</span>
                            <span className="absolute top-3.5 right-3.5 w-[38px] h-[38px] rounded-full bg-[rgba(255,255,255,.25)] backdrop-blur-sm flex items-center justify-center text-white text-[14px] z-10 border border-[rgba(255,255,255,.4)]">▶</span>
                            <div className="relative z-10 p-[18px] w-full">
                                <span className={`inline-block text-[10px] font-bold py-[3px] px-2.5 rounded-[5px] mb-2 uppercase tracking-[.5px] ${t.variant === 'dance' ? 'bg-purple' : 'bg-pink'}`}>{t.type}</span>
                                <h3 className="text-[19px] mb-1">{t.name}</h3>
                                <p className="text-[12.5px] opacity-85 mb-2.5">{t.desc}</p>
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
                        <div key={i} className="cursor-pointer">
                            <div className="relative rounded-xl overflow-hidden h-[150px] mb-2.5">
                                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/${photos[i % photos.length]}?w=400&q=70&auto=format&fit=crop')` }} />
                                <span className="absolute top-2 left-2 bg-pink text-white text-[9px] font-bold py-[3px] px-2 rounded-[5px] uppercase tracking-[.4px] z-10">{v.tag}</span>
                                <span className="absolute bottom-2 right-2 bg-[rgba(0,0,0,.65)] text-white text-[10px] py-[2px] px-[7px] rounded-[5px] z-10">{v.dur}</span>
                                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38px] h-[38px] rounded-full bg-[rgba(255,255,255,.3)] border-[1.5px] border-[rgba(255,255,255,.7)] backdrop-blur-sm flex items-center justify-center text-white text-[13px] z-10">▶</span>
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
                <img src="/images/footer.png" alt="cta" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 text-right max-[700px]:text-center">
                    <div className="text-white text-xs font-bold tracking-[2px] mb-2">BE THE NEXT FEATURED ARTIST</div>
                    <h3 className="text-[26px] font-bold leading-[1.4] text-white max-[700px]:text-[22px]">
                        Show us your raw talent.<br />
                        <span className="bg-gradient-to-r from-orange to-pink bg-clip-text text-transparent">No AI, No Edit, Just You.</span>
                    </h3>
                </div>
                <button className="relative z-10 inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-gradient-to-r from-orange to-pink text-white shadow-[0_8px_20px_-6px_rgba(236,30,99,.55)] hover:brightness-105 whitespace-nowrap">
                    &#9733; SUBMIT YOUR TALENT →
                </button>
            </div>
        </PublicLayout>
    );
}
