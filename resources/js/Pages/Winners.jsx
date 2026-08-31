import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import TalentForm from '@/Components/TalentForm';

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

export default function Winners({ winnersContent }) {
    const [activeSeason, setActiveSeason] = useState('5');
    const [modalVideoId, setModalVideoId] = useState(null);
    const [showTalentForm, setShowTalentForm] = useState(false);

    const hero = winnersContent?.hero || { bgImage: '/images/slider 1.png', title: 'Celebrating Extraordinary', subtitle: 'RAW LIQUEUR Talent Champions' };
    const stats = winnersContent?.stats || [];
    const featuredWinners = winnersContent?.featured_winners || [];
    const winnersBySeason = winnersContent?.winners_by_season || [];
    const categoryWinners = winnersContent?.category_winners || [];
    const testimonials = winnersContent?.testimonials || [];
    const cta = winnersContent?.cta || { icon: '🌟', title: 'Ready to be the next champion?', description: '', buttonText: '★ SUBMIT YOUR TALENT', button2Text: 'View All Artists →' };

    return (
        <PublicLayout onSubmitTalent={() => setShowTalentForm(true)}>
            <Head title="Winners — RAW LIQUEUR" />
            {/* Hero Section */}
            <section className="px-4 sm:px-8 pt-5 sm:pt-6 pb-0">
                <div className="max-w-[1180px] mx-auto relative rounded-xl sm:rounded-2xl overflow-hidden min-h-[240px] sm:min-h-[300px] md:min-h-[340px] flex items-center bg-cover bg-center"
                    style={{ backgroundImage: `url('${hero.bgImage}')` }}>
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="relative z-10 p-6 sm:p-10 md:p-14 max-w-[560px]">
                        <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                            <span className="text-2xl sm:text-3xl md:text-4xl">🏆</span>
                            <span className="text-[#E9C784] font-bold text-[10px] sm:text-[11px] md:text-[12px] tracking-[2px] sm:tracking-[3px] uppercase">Hall of Fame</span>
                        </div>
                        <div className="font-hind text-[22px] sm:text-[28px] md:text-[34px] font-bold text-white text-shadow-lg mb-1.5">{hero.title}</div>
                        <div className="text-[16px] sm:text-[18px] md:text-[22px] font-semibold text-[#f3d9a8]"><span className="text-white">{hero.subtitle}</span></div>
                        <div className="flex gap-3 sm:gap-4 flex-wrap mt-5 sm:mt-6 md:mt-8">
                            <a href="#featured" className="inline-flex items-center gap-2 px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 md:py-3.5 rounded-full font-semibold text-xs sm:text-sm bg-gradient-to-r from-orange to-pink text-white shadow-[0_8px_25px_-6px_rgba(236,30,99,.6)] hover:brightness-110 transition-all">✨ Meet the Winners</a>
                            <a href="#seasons" className="inline-flex items-center gap-2 px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 md:py-3.5 rounded-full font-semibold text-xs sm:text-sm bg-white/10 text-white border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all">Browse by Season</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="bg-white border-b border-[#f0e8e0]">
                <div className="max-w-[1160px] mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-7 md:py-8">
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 md:gap-8">
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center">
                                <span className="text-2xl sm:text-3xl mb-1.5 sm:mb-2 block">{stat.icon}</span>
                                <div className="text-[22px] sm:text-[24px] md:text-[28px] font-bold text-ink leading-none mb-0.5 sm:mb-1">{stat.value}</div>
                                <div className="text-[10px] sm:text-[11px] md:text-[12px] text-muted tracking-[0.8px] sm:tracking-[1px] uppercase">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Winners */}
            <section id="featured" className="py-10 sm:py-12 md:py-[70px]">
                <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 text-pink font-bold text-[11px] sm:text-[12px] md:text-[13px] tracking-[1.5px] sm:tracking-[2px] mb-3 sm:mb-4">
                    <span className="w-8 sm:w-10 md:w-[50px] h-px bg-[#f0c9d3]" />
                    FEATURED CHAMPIONS
                    <span className="w-8 sm:w-10 md:w-[50px] h-px bg-[#f0c9d3]" />
                </div>
                <h2 className="text-center font-playfair italic font-normal text-[24px] sm:text-[28px] md:text-[34px] mb-8 sm:mb-9 md:mb-[50px]">Our proudest moments</h2>

                <div className="max-w-[1160px] mx-auto px-4 sm:px-5 md:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
                        {featuredWinners.map((winner, i) => (
                            <div key={i} className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,.1)] hover:shadow-[0_25px_60px_-15px_rgba(236,30,99,.2)] transition-all duration-300 hover:-translate-y-1">
                                <div className="relative h-[200px] sm:h-[240px] md:h-[280px] overflow-hidden cursor-pointer" onClick={() => setModalVideoId(winner.videoId)}>
                                    <img src={`https://img.youtube.com/vi/${winner.videoId}/maxresdefault.jpg`} alt={winner.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4"><span className="bg-gradient-to-r from-orange to-pink text-white font-bold text-[9px] sm:text-[10px] md:text-[11px] py-1 sm:py-1.5 px-2 sm:px-3 rounded-lg tracking-wide">SEASON {winner.season}</span></div>
                                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><span className="w-12 h-12 sm:w-14 sm:h-14 md:w-[60px] md:h-[60px] rounded-full bg-white/90 flex items-center justify-center text-ink text-lg sm:text-xl shadow-lg">▶</span></div>
                                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4"><div className="flex items-center gap-1.5 sm:gap-2 text-white/80 text-[9px] sm:text-[10px] md:text-[11px] mb-0.5 sm:mb-1"><span>👁 {winner.views} views</span></div></div>
                                </div>
                                <div className="p-4 sm:p-5 md:p-6">
                                    <div className="flex items-center gap-3 sm:gap-3.5 md:gap-4 mb-3 sm:mb-3.5 md:mb-4">
                                        <img src={winner.image} alt={winner.name} className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover border-2 sm:border-3 border-pink/20" />
                                        <div><h3 className="text-[15px] sm:text-[16px] md:text-[18px] font-bold text-ink">{winner.name}</h3><span className="text-[9px] sm:text-[10px] md:text-[11px] text-pink font-semibold tracking-[0.8px] sm:tracking-[1px] uppercase">{winner.category}</span></div>
                                    </div>
                                    <div className="bg-gradient-to-r from-orange/10 to-pink/10 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 mb-3 sm:mb-3.5 md:mb-4"><p className="text-[11px] sm:text-[12px] font-bold text-orange">{winner.achievement}</p></div>
                                    <p className="text-[12px] sm:text-[13px] md:text-[13.5px] text-muted leading-[1.7] italic">"{winner.quote}"</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Winners by Season */}
            <section id="seasons" className="py-10 sm:py-12 md:py-[70px] bg-[#fdf8f5]">
                <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 text-pink font-bold text-[11px] sm:text-[12px] md:text-[13px] tracking-[1.5px] sm:tracking-[2px] mb-3 sm:mb-4">
                    <span className="w-8 sm:w-10 md:w-[50px] h-px bg-[#f0c9d3]" />
                    WINNERS BY SEASON
                    <span className="w-8 sm:w-10 md:w-[50px] h-px bg-[#f0c9d3]" />
                </div>
                <h2 className="text-center font-playfair italic font-normal text-[24px] sm:text-[28px] md:text-[34px] mb-7 sm:mb-8 md:mb-[40px]">Every season, new legends</h2>

                <div className="max-w-[1160px] mx-auto px-4 sm:px-5 md:px-8">
                    <div className="flex justify-center gap-2 sm:gap-3 mb-8 sm:mb-9 md:mb-[50px] flex-wrap">
                        {winnersBySeason.map((s) => (
                            <button key={s.season} onClick={() => setActiveSeason(s.season)} className={`px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-[12px] sm:text-[13px] md:text-[14px] transition-all cursor-pointer whitespace-nowrap ${activeSeason === s.season ? 'bg-gradient-to-r from-orange to-pink text-white shadow-[0_8px_20px_-6px_rgba(236,30,99,.5)]' : 'bg-white text-ink border border-[#e8dccb] hover:border-pink'}`}>
                                Season {s.season} — {s.year}
                            </button>
                        ))}
                    </div>

                    {winnersBySeason.map((s) => (
                        s.season === activeSeason && (
                            <div key={s.season} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
                                {s.winners.map((winner, i) => (
                                    <div key={i} className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 text-center shadow-[0_10px_40px_-10px_rgba(0,0,0,.08)] hover:shadow-[0_15px_50px_-10px_rgba(236,30,99,.15)] transition-all duration-300">
                                        <div className="relative inline-block mb-4 sm:mb-5">
                                            <img src={winner.image} alt={winner.name} className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full object-cover border-3 sm:border-4 border-white shadow-lg" />
                                            <span className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-r from-orange to-pink rounded-full flex items-center justify-center text-white text-[9px] sm:text-[10px] md:text-[11px] font-bold shadow-md">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</span>
                                        </div>
                                        <h3 className="text-[15px] sm:text-[16px] md:text-[18px] font-bold text-ink mb-0.5 sm:mb-1">{winner.name}</h3>
                                        <span className="text-[9px] sm:text-[10px] md:text-[11px] text-pink font-semibold tracking-[0.8px] sm:tracking-[1px] uppercase">{winner.category}</span>
                                        <div className="mt-3 sm:mt-3.5 md:mt-4 pt-3 sm:pt-3.5 md:pt-4 border-t border-[#f0e8e0]"><span className="text-[10px] sm:text-[11px] md:text-[12px] text-muted">Season {s.season} Champion</span></div>
                                    </div>
                                ))}
                            </div>
                        )
                    ))}
                </div>
            </section>

            {/* Category Awards */}
            <section className="py-10 sm:py-12 md:py-[70px]">
                <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 text-pink font-bold text-[11px] sm:text-[12px] md:text-[13px] tracking-[1.5px] sm:tracking-[2px] mb-3 sm:mb-4">
                    <span className="w-8 sm:w-10 md:w-[50px] h-px bg-[#f0c9d3]" />
                    CATEGORY AWARDS
                    <span className="w-8 sm:w-10 md:w-[50px] h-px bg-[#f0c9d3]" />
                </div>
                <h2 className="text-center font-playfair italic font-normal text-[24px] sm:text-[28px] md:text-[34px] mb-8 sm:mb-9 md:mb-[50px]">Excellence across all forms</h2>

                <div className="max-w-[1160px] mx-auto px-4 sm:px-5 md:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                        {categoryWinners.map((cat, i) => (
                            <div key={i} className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 flex items-center gap-4 sm:gap-5 shadow-[0_10px_40px_-10px_rgba(0,0,0,.06)] hover:shadow-[0_15px_50px_-10px_rgba(236,30,99,.12)] transition-all duration-300 hover:-translate-y-0.5">
                                <span className="text-3xl sm:text-4xl">{cat.icon}</span>
                                <div className="flex-1">
                                    <div className="text-[9px] sm:text-[10px] md:text-[11px] text-muted tracking-[0.8px] sm:tracking-[1px] uppercase mb-0.5 sm:mb-1">{cat.category}</div>
                                    <div className="text-[14px] sm:text-[15px] md:text-[16px] font-bold text-ink">{cat.winner}</div>
                                    <div className="text-[11px] sm:text-[12px] text-pink font-semibold">Season {cat.season}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-10 sm:py-12 md:py-[70px] bg-gradient-to-br from-ink via-[#2a1f3d] to-[#1a0f2e]">
                <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 text-orange font-bold text-[11px] sm:text-[12px] md:text-[13px] tracking-[1.5px] sm:tracking-[2px] mb-3 sm:mb-4">
                    <span className="w-8 sm:w-10 md:w-[50px] h-px bg-orange/30" />
                    VOICES FROM THE JOURNEY
                    <span className="w-8 sm:w-10 md:w-[50px] h-px bg-orange/30" />
                </div>
                <h2 className="text-center font-playfair italic font-normal text-[24px] sm:text-[28px] md:text-[34px] text-white mb-8 sm:mb-9 md:mb-[50px]">What they say about us</h2>

                <div className="max-w-[1160px] mx-auto px-4 sm:px-5 md:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
                        {testimonials.map((t, i) => (
                            <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-7 md:p-8 border border-white/10">
                                <div className="flex items-center gap-3 sm:gap-3.5 md:gap-4 mb-4 sm:mb-5">
                                    <img src={t.image} alt={t.name} className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-pink/30" />
                                    <div><h4 className="text-white font-semibold text-[13px] sm:text-[14px] md:text-[15px]">{t.name}</h4><span className="text-pink text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.8px] sm:tracking-[1px] uppercase">{t.role}</span></div>
                                </div>
                                <p className="text-white/70 text-[12px] sm:text-[13px] md:text-[14px] leading-[1.8] italic">"{t.text}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-10 sm:py-12 md:py-[70px]">
                <div className="max-w-[800px] mx-auto px-4 sm:px-6 md:px-8 text-center">
                    <span className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 block">{cta.icon}</span>
                    <h2 className="font-playfair italic text-[26px] sm:text-[30px] md:text-[36px] mb-4 sm:mb-5">
                        {cta.title.split('champion').map((part, i) => i === 0 ? <>{part}<span className="bg-gradient-to-r from-orange to-pink bg-clip-text text-transparent">champion</span></> : <span key={i}>{part}</span>)}
                    </h2>
                    <p className="text-muted text-[13px] sm:text-[14px] md:text-[16px] leading-[1.8] mb-6 sm:mb-7 md:mb-8 max-w-[500px] mx-auto">{cta.description}</p>
                    <div className="flex gap-3 sm:gap-4 justify-center flex-wrap">
                        <button onClick={() => setShowTalentForm(true)} className="inline-flex items-center gap-2 px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-full font-semibold text-xs sm:text-sm bg-gradient-to-r from-orange to-pink text-white shadow-[0_10px_30px_-6px_rgba(236,30,99,.55)] hover:brightness-110 transition-all cursor-pointer">{cta.buttonText}</button>
                        <Link href="/artists" className="inline-flex items-center gap-2 px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-full font-semibold text-xs sm:text-sm border-2 border-[#e8dccb] text-ink hover:border-pink transition-colors">{cta.button2Text}</Link>
                    </div>
                </div>
            </section>

            {modalVideoId && <VideoModal videoId={modalVideoId} onClose={() => setModalVideoId(null)} />}
            {showTalentForm && <TalentForm onClose={() => setShowTalentForm(false)} />}
        </PublicLayout>
    );
}
