import { useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';

const artists = [
    { name: 'Sneha Chakraborty', loc: 'Bangladesh', role: 'SINGER', uploads: 78, g: 'from-[#5b2a52] to-[#1c0e22]', img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80&auto=format&fit=crop' },
    { name: 'Arka Dey', loc: 'Kolkata, India', role: 'POET', uploads: 54, g: 'from-[#3a2440] to-[#0c0810]', img: 'https://images.unsplash.com/photo-1508973379184-7517410fb0bc?w=400&q=80&auto=format&fit=crop' },
    { name: 'Ridoy Das', loc: 'Bangladesh', role: 'SINGER', uploads: 42, g: 'from-[#3f4750] to-[#12161a]', img: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&q=80&auto=format&fit=crop' },
    { name: 'Suvo Adhikary', loc: 'Kolkata, India', role: 'MUSICIAN', uploads: 13, g: 'from-[#141414] to-black', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80&auto=format&fit=crop' },
    { name: 'Diya Nandy', loc: 'Kolkata, India', role: 'DANCER', uploads: 461, g: 'from-[#3a2018] to-[#160b07]', img: 'https://images.unsplash.com/photo-1547153760-18fc86c83137?w=400&q=80&auto=format&fit=crop' },
    { name: 'Iman Sen', loc: 'Bangladesh', role: 'STORYTELLER', uploads: 47, g: 'from-[#5b6270] to-[#1c2027]', img: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?w=400&q=80&auto=format&fit=crop' },
    { name: 'Rohan Mitra', loc: 'Kolkata, India', role: 'STORYTELLER', uploads: 38, g: 'from-[#6b4a1c] to-[#241608]', img: 'https://images.unsplash.com/photo-1461784180009-27c1303a64b6?w=400&q=80&auto=format&fit=crop' },
    { name: 'Tania Khatun', loc: 'Bangladesh', role: 'SINGER', uploads: 49, g: 'from-[#7a2436] to-[#220a10]', img: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80&auto=format&fit=crop' },
    { name: 'Aniket Pal', loc: 'Bangladesh', role: 'POET', uploads: 34, g: 'from-[#312a24] to-[#0e0a08]', img: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&q=80&auto=format&fit=crop' },
    { name: 'Moumita Hore', loc: 'Kolkata, India', role: 'SINGER', uploads: 32, g: 'from-[#8c2f3a] to-[#220b0e]', img: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=400&q=80&auto=format&fit=crop' },
    { name: 'Farhan Ahmed', loc: 'Bangladesh', role: 'MUSICIAN', uploads: 71, g: 'from-[#454545] to-[#0a0a0a]', img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80&auto=format&fit=crop&sat=-100' },
    { name: 'Priya Sengupta', loc: 'Bangladesh', role: 'DANCER', uploads: 36, g: 'from-[#c98a2e] to-[#3a2408]', img: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&q=80&auto=format&fit=crop' },
];

const badgeColors = {
    SINGER: 'bg-[#8C2233]',
    POET: 'bg-[#1F2937]',
    MUSICIAN: 'bg-[#111827]',
    DANCER: 'bg-[#9A2E1F]',
    STORYTELLER: 'bg-[#3B3024]',
};

const filterPills = ['All', 'Singers', 'Musicians', 'Poets', 'Dancers', 'Storytellers'];

function SingerIcon() {
    return (
        <svg className="w-14 h-14 opacity-85 relative z-10" viewBox="0 0 24 24" fill="none">
            <path d="M12 15a3 3 0 003-3V6a3 3 0 10-6 0v6a3 3 0 003 3z" stroke="white" strokeWidth="1.5"/>
            <path d="M19 11a7 7 0 01-14 0M12 18v3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
    );
}

function MusicianIcon() {
    return (
        <svg className="w-14 h-14 opacity-85 relative z-10" viewBox="0 0 24 24" fill="none">
            <path d="M9 18V5l10-2v13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="6" cy="18" r="3" stroke="white" strokeWidth="1.5"/>
            <circle cx="16" cy="16" r="3" stroke="white" strokeWidth="1.5"/>
        </svg>
    );
}

function DancerIcon() {
    return (
        <svg className="w-14 h-14 opacity-85 relative z-10" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="5" r="2" stroke="white" strokeWidth="1.5"/>
            <path d="M12 7v6M12 13l-5 5M12 13l6 4M12 9l-6-2M12 9l6-1" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
    );
}

function StorytellerIcon() {
    return (
        <svg className="w-14 h-14 opacity-85 relative z-10" viewBox="0 0 24 24" fill="none">
            <path d="M4 19V6a2 2 0 012-2h9l5 5v10a2 2 0 01-2 2H6a2 2 0 01-2-2z" stroke="white" strokeWidth="1.5"/>
            <path d="M8 10h8M8 14h5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
    );
}

function PoetIcon() {
    return (
        <svg className="w-14 h-14 opacity-85 relative z-10" viewBox="0 0 24 24" fill="none">
            <path d="M12 15a3 3 0 003-3V6a3 3 0 10-6 0v6a3 3 0 003 3z" stroke="white" strokeWidth="1.5"/>
            <path d="M19 11a7 7 0 01-14 0M12 18v3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
    );
}

const roleIcons = { SINGER: SingerIcon, POET: PoetIcon, MUSICIAN: MusicianIcon, DANCER: DancerIcon, STORYTELLER: StorytellerIcon };

export default function Artists() {
    const [activeFilter, setActiveFilter] = useState('All');

    return (
        <PublicLayout>
            {/* Hero */}
            <section className="max-w-[1180px] mx-auto mt-[22px] px-8 max-[600px]:px-4">
                <div className="relative rounded-2xl overflow-hidden h-[400px] bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/Artist.png')" }}>
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5">
                        <div className="font-hind text-[34px] font-semibold text-[#E9C784] tracking-[1px] text-shadow-lg max-[560px]:text-[24px]">সম্মানে ও ইতিহাসে</div>
                        <div className="w-[210px] h-px bg-gradient-to-r from-transparent via-[#E9C784] to-transparent my-4" />
                        <div className="font-hind text-[22px] font-semibold text-white tracking-[.5px] max-[560px]:text-[16px]">আমার প্রতিভা বিশ্ব মাঝে</div>
                    </div>
                </div>
            </section>

            {/* Section Head */}
            <div className="text-center pt-16 pb-[34px]">
                <div className="text-pink font-bold text-[11.5px] tracking-[3px] uppercase before:content-['—'] before:mr-2.5 before:text-orange after:content-['—'] after:ml-2.5 after:text-orange">OUR ARTISTS</div>
                <h2 className="font-playfair text-[38px] mt-3.5 font-semibold text-ink max-[560px]:text-[28px]">Meet the Raw Talent</h2>
                <p className="max-w-[520px] mx-auto mt-4 text-muted text-[15px] leading-[1.6]">A platform for real talent and performances. Discover amazing artists from different categories and backgrounds.</p>
            </div>

            <main className="max-w-[1180px] mx-auto px-8 max-[600px]:px-4">
                {/* Filter Bar */}
                <div className="flex items-center justify-between flex-wrap gap-4 mb-[34px]">
                    <div className="flex gap-2.5 flex-wrap">
                        {filterPills.map((pill) => (
                            <button key={pill} onClick={() => setActiveFilter(pill)}
                                className={`px-5 py-2.5 rounded-24 border bg-white text-[13.5px] font-semibold cursor-pointer transition-all ${activeFilter === pill ? 'bg-[#E9C784] border-[#E9C784] text-[#241611]' : 'border-border text-ink hover:border-pink'}`}>
                                {pill}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-3">
                        <div className="flex items-center gap-2 bg-white border border-border rounded-24 py-2.5 px-[18px] text-[13.5px] text-muted min-w-[210px]">
                            <svg className="flex-shrink-0 opacity-60" width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/><path d="M21 21l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                            Search artists...
                        </div>
                        <div className="flex items-center gap-2 bg-white border border-border rounded-24 py-2.5 px-[18px] text-[13.5px] font-semibold text-ink">Newest ⌄</div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-4 gap-[22px] pb-3 max-[980px]:grid-cols-2 max-[560px]:grid-cols-1">
                    {artists.map((a, i) => {
                        const RoleIcon = roleIcons[a.role];
                        return (
                            <div key={i} className="bg-white rounded-[14px] overflow-hidden border border-border transition-all hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(36,24,18,.10)]">
                                <div className={`relative h-[210px] flex items-center justify-center bg-gradient-to-br ${a.g} overflow-hidden`}>
                                    <img src={a.img} alt={a.name} className="absolute inset-0 w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                                    <span className={`absolute top-3 left-3 z-20 text-[10px] font-bold tracking-[1px] uppercase text-white py-[6px] px-3 rounded-20 ${badgeColors[a.role]}`}>{a.role}</span>
                                </div>
                                <div className="p-4 pb-[18px]">
                                    <h3 className="font-playfair text-[16.5px] font-semibold">{a.name}</h3>
                                    <div className="flex items-center gap-1.5 text-muted text-[12.5px] mt-1.5">📍 {a.loc}</div>
                                    <div className="flex items-center justify-between mt-3.5">
                                        <span className="text-[12px] text-muted font-semibold">{a.uploads} Uploads</span>
                                        <span className="inline-flex items-center gap-1 text-[12px] font-bold text-pink cursor-pointer">View Profile →</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-center my-11 mb-[70px]">
                    <button className="inline-flex items-center gap-2 bg-transparent text-ink font-semibold text-[12.5px] tracking-[.5px] py-3 px-[26px] rounded-30 border border-border cursor-pointer hover:border-ink transition-colors">LOAD MORE ARTISTS ↻</button>
                </div>
            </main>

            {/* CTA Banner */}
            <section className="max-w-[1180px] mx-auto mb-[90px] px-8 max-[600px]:px-4">
                <div className="bg-gradient-to-br from-[#1d130d] to-[#120b08] rounded-2xl py-[46px] px-[50px] flex items-center justify-between gap-8 relative overflow-hidden max-[980px]:flex-col max-[980px]:text-center max-[600px]:py-8 max-[600px]:px-6">
                    <div className="absolute -right-[60px] -top-[60px] w-[220px] h-[220px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(217,169,79,.18), transparent 70%)' }} />
                    <div className="flex items-center gap-7 max-[980px]:flex-col max-[980px]:text-center relative z-10">
                        <svg className="w-[70px] h-[70px] flex-shrink-0" viewBox="0 0 100 100" fill="none">
                            <rect x="40" y="8" width="20" height="42" rx="10" fill="#D9A94F"/>
                            <rect x="36" y="14" width="28" height="4" fill="#241611"/>
                            <rect x="36" y="24" width="28" height="4" fill="#241611"/>
                            <rect x="36" y="34" width="28" height="4" fill="#241611"/>
                            <path d="M25 42 A25 25 0 0 0 75 42" stroke="#D9A94F" strokeWidth="4" fill="none"/>
                            <rect x="47" y="62" width="6" height="18" fill="#D9A94F"/>
                            <rect x="34" y="80" width="32" height="6" rx="3" fill="#D9A94F"/>
                        </svg>
                        <div className="cta-text">
                            <div className="text-[#E9C784] font-bold text-[11.5px] tracking-[3px] uppercase before:content-['—'] before:mr-2.5 before:text-[#E9C784] after:content-['—'] after:ml-2.5 after:text-[#E9C784]">BE THE NEXT FEATURED ARTIST</div>
                            <h2 className="text-white font-playfair text-[27px] leading-[1.35] mt-2.5 max-[560px]:text-[22px]">Show us your raw talent.<br/>No AI, No Edit, Just You.</h2>
                            <p className="text-[#c9bfb3] text-[14px] mt-3">Submit your talent or support others.<br/>Together, we celebrate real art and real people.</p>
                        </div>
                    </div>
                    <button className="inline-flex items-center gap-2 bg-gradient-to-r from-orange to-pink text-white font-semibold text-[13.5px] py-3 px-[22px] rounded-30 border-none cursor-pointer shadow-[0_8px_18px_rgba(236,30,99,.35)] hover:-translate-y-0.5 transition-all whitespace-nowrap relative z-10 flex-none">👤 Submit Your Talent →</button>
                </div>
            </section>
        </PublicLayout>
    );
}
