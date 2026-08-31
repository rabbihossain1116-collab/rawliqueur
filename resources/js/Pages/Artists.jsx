import { useState } from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import TalentForm from '@/Components/TalentForm';

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
        <svg className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 opacity-85 relative z-10" viewBox="0 0 24 24" fill="none">
            <path d="M12 15a3 3 0 003-3V6a3 3 0 10-6 0v6a3 3 0 003 3z" stroke="white" strokeWidth="1.5"/>
            <path d="M19 11a7 7 0 01-14 0M12 18v3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
    );
}

function MusicianIcon() {
    return (
        <svg className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 opacity-85 relative z-10" viewBox="0 0 24 24" fill="none">
            <path d="M9 18V5l10-2v13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="6" cy="18" r="3" stroke="white" strokeWidth="1.5"/>
            <circle cx="16" cy="16" r="3" stroke="white" strokeWidth="1.5"/>
        </svg>
    );
}

function DancerIcon() {
    return (
        <svg className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 opacity-85 relative z-10" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="5" r="2" stroke="white" strokeWidth="1.5"/>
            <path d="M12 7v6M12 13l-5 5M12 13l6 4M12 9l-6-2M12 9l6-1" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
    );
}

function StorytellerIcon() {
    return (
        <svg className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 opacity-85 relative z-10" viewBox="0 0 24 24" fill="none">
            <path d="M4 19V6a2 2 0 012-2h9l5 5v10a2 2 0 01-2 2H6a2 2 0 01-2-2z" stroke="white" strokeWidth="1.5"/>
            <path d="M8 10h8M8 14h5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
    );
}

function PoetIcon() {
    return (
        <svg className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 opacity-85 relative z-10" viewBox="0 0 24 24" fill="none">
            <path d="M12 15a3 3 0 003-3V6a3 3 0 10-6 0v6a3 3 0 003 3z" stroke="white" strokeWidth="1.5"/>
            <path d="M19 11a7 7 0 01-14 0M12 18v3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
    );
}

const roleIcons = { SINGER: SingerIcon, POET: PoetIcon, MUSICIAN: MusicianIcon, DANCER: DancerIcon, STORYTELLER: StorytellerIcon };

export default function Artists({ artistsContent }) {
    const [activeFilter, setActiveFilter] = useState('All');
    const [showTalentForm, setShowTalentForm] = useState(false);

    const hero = artistsContent?.hero || {
        bgImage: '/images/Artist.png',
        title: 'সম্মানে ও ইতিহাসে',
        subtitle: 'আমার প্রতিভা বিশ্ব মাঝে',
    };

    const sectionHeader = artistsContent?.section_header || {
        subtitle: 'OUR ARTISTS',
        title: 'Meet the Raw Talent',
        description: 'A platform for real talent and performances. Discover amazing artists from different categories and backgrounds.',
    };

    const artists = artistsContent?.artists || [
        { name: 'Sneha Chakraborty', loc: 'Bangladesh', role: 'SINGER', uploads: 78, g: 'from-[#5b2a52] to-[#1c0e22]', img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80&auto=format&fit=crop' },
        { name: 'Arka Dey', loc: 'Kolkata, India', role: 'POET', uploads: 54, g: 'from-[#3a2440] to-[#0c0810]', img: 'https://images.unsplash.com/photo-1508973379184-7517410fb0bc?w=400&q=80&auto=format&fit=crop' },
        { name: 'Ridoy Das', loc: 'Bangladesh', role: 'SINGER', uploads: 42, g: 'from-[#3f4750] to-[#12161a]', img: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&q=80&auto=format&fit=crop' },
        { name: 'Suvo Adhikary', loc: 'Kolkata, India', role: 'MUSICIAN', uploads: 13, g: 'from-[#141414] to-black', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80&auto=format&fit=crop' },
        { name: 'Diya Nandy', loc: 'Kolkata, India', role: 'DANCER', uploads: 461, g: 'from-[#3a2018] to-[#160b07]', img: 'https://images.unsplash.com/photo-1547153760-18fc86c83137?w=400&q=80&auto=format&fit=crop' },
        { name: 'Iman Sen', loc: 'Bangladesh', role: 'STORYTELLER', uploads: 47, g: 'from-[#5b6270] to-[#1c2027]', img: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?w=400&q=80&auto=format&fit=crop' },
    ];

    const cta = artistsContent?.cta || {
        subtitle: 'BE THE NEXT FEATURED ARTIST',
        title: 'Show us your raw talent. No AI, No Edit, Just You.',
        description: 'Submit your talent or support others. Together, we celebrate real art and real people.',
        buttonText: '👤 Submit Your Talent →',
    };

    return (
        <PublicLayout onSubmitTalent={() => setShowTalentForm(true)}>
            <Head title="Artists — RAW LIQUEUR" />
            {/* Hero */}
            <section className="max-w-[1180px] mx-auto mt-4 sm:mt-5 md:mt-[22px] px-4 sm:px-8">
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden h-[250px] sm:h-[320px] md:h-[400px] bg-cover bg-center"
                    style={{ backgroundImage: `url('${hero.bgImage}')` }}>
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-5">
                        <div className="font-hind text-[22px] sm:text-[28px] md:text-[34px] font-semibold text-[#E9C784] tracking-[1px] text-shadow-lg">{hero.title}</div>
                        <div className="w-[140px] sm:w-[180px] md:w-[210px] h-px bg-gradient-to-r from-transparent via-[#E9C784] to-transparent my-3 sm:my-4" />
                        <div className="font-hind text-[16px] sm:text-[18px] md:text-[22px] font-semibold text-white tracking-[.5px]">{hero.subtitle}</div>
                    </div>
                </div>
            </section>

            {/* Section Head */}
            <div className="text-center pt-8 sm:pt-12 md:pt-16 pb-6 sm:pb-7 md:pb-[34px] px-4">
                <div className="text-pink font-bold text-[10px] sm:text-[11px] md:text-[11.5px] tracking-[2px] sm:tracking-[3px] uppercase before:content-['—'] before:mr-2 before:text-orange after:content-['—'] after:ml-2 after:text-orange">{sectionHeader.subtitle}</div>
                <h2 className="font-playfair text-[26px] sm:text-[32px] md:text-[38px] mt-2.5 sm:mt-3 md:mt-3.5 font-semibold text-ink">{sectionHeader.title}</h2>
                <p className="max-w-[520px] mx-auto mt-3 sm:mt-4 text-muted text-[13px] sm:text-[14px] md:text-[15px] leading-[1.6] px-4">{sectionHeader.description}</p>
            </div>

            <main className="max-w-[1180px] mx-auto px-4 sm:px-8">
                {/* Filter Bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-7 md:mb-[34px]">
                    <div className="flex gap-2 sm:gap-2.5 flex-wrap overflow-x-auto flex-nowrap pb-1 sm:pb-0 w-full sm:w-auto">
                        {filterPills.map((pill) => (
                            <button key={pill} onClick={() => setActiveFilter(pill)}
                                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-24 border bg-white text-[12px] sm:text-[13px] md:text-[13.5px] font-semibold cursor-pointer transition-all whitespace-nowrap flex-shrink-0 ${activeFilter === pill ? 'bg-[#E9C784] border-[#E9C784] text-[#241611]' : 'border-border text-ink hover:border-pink'}`}>
                                {pill}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
                        <div className="flex items-center gap-2 bg-white border border-border rounded-24 py-2 sm:py-2.5 px-3 sm:px-[18px] text-[12px] sm:text-[13px] md:text-[13.5px] text-muted flex-1 sm:flex-none sm:min-w-[210px]">
                            <svg className="flex-shrink-0 opacity-60" width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/><path d="M21 21l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                            Search artists...
                        </div>
                        <div className="flex items-center gap-2 bg-white border border-border rounded-24 py-2 sm:py-2.5 px-3 sm:px-[18px] text-[12px] sm:text-[13px] md:text-[13.5px] font-semibold text-ink flex-shrink-0">Newest ⌄</div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-[22px] pb-3">
                    {artists.map((a, i) => {
                        const RoleIcon = roleIcons[a.role];
                        return (
                            <div key={i} className="bg-white rounded-xl sm:rounded-[14px] overflow-hidden border border-border transition-all hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(36,24,18,.10)]">
                                <div className={`relative h-[200px] sm:h-[200px] md:h-[210px] flex items-center justify-center bg-gradient-to-br ${a.g} overflow-hidden`}>
                                    <img src={a.img} alt={a.name} className="absolute inset-0 w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                                    <span className={`absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-20 text-[9px] sm:text-[10px] font-bold tracking-[1px] uppercase text-white py-1 sm:py-[6px] px-2 sm:px-3 rounded-20 ${badgeColors[a.role]}`}>{a.role}</span>
                                </div>
                                <div className="p-3.5 sm:p-4 pb-4 sm:pb-[18px]">
                                    <h3 className="font-playfair text-[15px] sm:text-[16px] md:text-[16.5px] font-semibold">{a.name}</h3>
                                    <div className="flex items-center gap-1.5 text-muted text-[11px] sm:text-[12px] md:text-[12.5px] mt-1 sm:mt-1.5">📍 {a.loc}</div>
                                    <div className="flex items-center justify-between mt-3 sm:mt-3.5">
                                        <span className="text-[11px] sm:text-[12px] text-muted font-semibold">{a.uploads} Uploads</span>
                                        <span className="inline-flex items-center gap-1 text-[11px] sm:text-[12px] font-bold text-pink cursor-pointer">View Profile →</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-center my-8 sm:my-9 md:my-11 mb-10 sm:mb-12 md:mb-[70px]">
                    <button className="inline-flex items-center gap-2 bg-transparent text-ink font-semibold text-[11px] sm:text-[12px] md:text-[12.5px] tracking-[.5px] py-2.5 sm:py-3 px-5 sm:px-[26px] rounded-30 border border-border cursor-pointer hover:border-ink transition-colors">LOAD MORE ARTISTS ↻</button>
                </div>
            </main>

            {/* CTA Banner */}
            <section className="max-w-[1180px] mx-auto mb-10 sm:mb-14 md:mb-[90px] px-4 sm:px-8">
                <div className="bg-gradient-to-br from-[#1d130d] to-[#120b08] rounded-2xl py-8 sm:py-10 md:py-[46px] px-5 sm:px-8 md:px-[50px] flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-7 md:gap-8 relative overflow-hidden text-center sm:text-left">
                    <div className="absolute -right-[60px] -top-[60px] w-[180px] sm:w-[200px] md:w-[220px] h-[180px] sm:h-[200px] md:h-[220px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(217,169,79,.18), transparent 70%)' }} />
                    <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 md:gap-7 text-center sm:text-center relative z-10">
                        <svg className="w-14 h-14 sm:w-[56px] sm:h-[56px] md:w-[70px] md:h-[70px] flex-shrink-0" viewBox="0 0 100 100" fill="none">
                            <rect x="40" y="8" width="20" height="42" rx="10" fill="#D9A94F"/>
                            <rect x="36" y="14" width="28" height="4" fill="#241611"/>
                            <rect x="36" y="24" width="28" height="4" fill="#241611"/>
                            <rect x="36" y="34" width="28" height="4" fill="#241611"/>
                            <path d="M25 42 A25 25 0 0 0 75 42" stroke="#D9A94F" strokeWidth="4" fill="none"/>
                            <rect x="47" y="62" width="6" height="18" fill="#D9A94F"/>
                            <rect x="34" y="80" width="32" height="6" rx="3" fill="#D9A94F"/>
                        </svg>
                        <div className="cta-text">
                            <div className="text-[#E9C784] font-bold text-[10px] sm:text-[11px] md:text-[11.5px] tracking-[2px] sm:tracking-[3px] uppercase before:content-['—'] before:mr-2 before:text-[#E9C784] after:content-['—'] after:ml-2 after:text-[#E9C784]">{cta.subtitle}</div>
                            <h2 className="text-white font-playfair text-[20px] sm:text-[24px] md:text-[27px] leading-[1.35] mt-2 sm:mt-2.5">{cta.title}</h2>
                            <p className="text-[#c9bfb3] text-[12px] sm:text-[13px] md:text-[14px] mt-2.5 sm:mt-3">{cta.description}</p>
                        </div>
                    </div>
                    <button className="inline-flex items-center gap-2 bg-gradient-to-r from-orange to-pink text-white font-semibold text-[12px] sm:text-[13px] md:text-[13.5px] py-2.5 sm:py-3 px-4 sm:px-[22px] rounded-30 border-none cursor-pointer shadow-[0_8px_18px_rgba(236,30,99,.35)] hover:-translate-y-0.5 transition-all whitespace-nowrap relative z-10 flex-none">{cta.buttonText}</button>
                </div>
            </section>
            {showTalentForm && <TalentForm onClose={() => setShowTalentForm(false)} />}
        </PublicLayout>
    );
}
