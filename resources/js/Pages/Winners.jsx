import { useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Link } from '@inertiajs/react';

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
            {/* Hero Section */}
            <section className="px-8 pt-6 pb-0 max-[600px]:px-4">
                <div className="max-w-[1180px] mx-auto relative rounded-2xl overflow-hidden min-h-[340px] flex items-center bg-cover bg-center"
                    style={{ backgroundImage: `url('${hero.bgImage}')` }}>
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="relative z-10 p-14 max-w-[560px] max-[600px]:p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-4xl">🏆</span>
                            <span className="text-[#E9C784] font-bold text-[12px] tracking-[3px] uppercase">Hall of Fame</span>
                        </div>
                        <div className="font-hind text-[34px] font-bold text-white text-shadow-lg mb-1.5 max-[600px]:text-[24px]">{hero.title}</div>
                        <div className="text-[22px] font-semibold text-[#f3d9a8] max-[600px]:text-[16px]"><span className="text-white">{hero.subtitle}</span></div>
                        <div className="flex gap-4 flex-wrap mt-8">
                            <a href="#featured" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm bg-gradient-to-r from-orange to-pink text-white shadow-[0_8px_25px_-6px_rgba(236,30,99,.6)] hover:brightness-110 transition-all">✨ Meet the Winners</a>
                            <a href="#seasons" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm bg-white/10 text-white border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all">Browse by Season</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="bg-white border-b border-[#f0e8e0]">
                <div className="max-w-[1160px] mx-auto px-8 py-8 max-[480px]:px-4">
                    <div className="grid grid-cols-4 gap-8 max-[700px]:grid-cols-2 max-[480px]:grid-cols-2 max-[480px]:gap-6">
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center">
                                <span className="text-3xl mb-2 block">{stat.icon}</span>
                                <div className="text-[28px] font-bold text-ink leading-none mb-1">{stat.value}</div>
                                <div className="text-[12px] text-muted tracking-[1px] uppercase">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Winners */}
            <section id="featured" className="py-[70px] max-[480px]:py-[50px]">
                <div className="flex items-center justify-center gap-3.5 text-pink font-bold text-[13px] tracking-[2px] mb-4">
                    <span className="w-[50px] h-px bg-[#f0c9d3]" />
                    FEATURED CHAMPIONS
                    <span className="w-[50px] h-px bg-[#f0c9d3]" />
                </div>
                <h2 className="text-center font-playfair italic font-normal text-[34px] mb-[50px] max-[480px]:text-[26px]">Our proudest moments</h2>

                <div className="max-w-[1160px] mx-auto px-8 max-[980px]:px-5">
                    <div className="grid grid-cols-3 gap-8 max-[980px]:grid-cols-1">
                        {featuredWinners.map((winner, i) => (
                            <div key={i} className="group bg-white rounded-2xl overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,.1)] hover:shadow-[0_25px_60px_-15px_rgba(236,30,99,.2)] transition-all duration-300 hover:-translate-y-1">
                                <div className="relative h-[280px] overflow-hidden cursor-pointer" onClick={() => setModalVideoId(winner.videoId)}>
                                    <img src={`https://img.youtube.com/vi/${winner.videoId}/maxresdefault.jpg`} alt={winner.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    <div className="absolute top-4 left-4"><span className="bg-gradient-to-r from-orange to-pink text-white font-bold text-[11px] py-1.5 px-3 rounded-lg tracking-wide">SEASON {winner.season}</span></div>
                                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><span className="w-[60px] h-[60px] rounded-full bg-white/90 flex items-center justify-center text-ink text-xl shadow-lg">▶</span></div>
                                    <div className="absolute bottom-4 left-4 right-4"><div className="flex items-center gap-2 text-white/80 text-[11px] mb-1"><span>👁 {winner.views} views</span></div></div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <img src={winner.image} alt={winner.name} className="w-16 h-16 rounded-full object-cover border-3 border-pink/20" />
                                        <div><h3 className="text-[18px] font-bold text-ink">{winner.name}</h3><span className="text-[11px] text-pink font-semibold tracking-[1px] uppercase">{winner.category}</span></div>
                                    </div>
                                    <div className="bg-gradient-to-r from-orange/10 to-pink/10 rounded-xl px-4 py-3 mb-4"><p className="text-[12px] font-bold text-orange">{winner.achievement}</p></div>
                                    <p className="text-[13.5px] text-muted leading-[1.7] italic">"{winner.quote}"</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Winners by Season */}
            <section id="seasons" className="py-[70px] bg-[#fdf8f5] max-[480px]:py-[50px]">
                <div className="flex items-center justify-center gap-3.5 text-pink font-bold text-[13px] tracking-[2px] mb-4">
                    <span className="w-[50px] h-px bg-[#f0c9d3]" />
                    WINNERS BY SEASON
                    <span className="w-[50px] h-px bg-[#f0c9d3]" />
                </div>
                <h2 className="text-center font-playfair italic font-normal text-[34px] mb-[40px] max-[480px]:text-[26px]">Every season, new legends</h2>

                <div className="max-w-[1160px] mx-auto px-8 max-[980px]:px-5">
                    <div className="flex justify-center gap-3 mb-[50px] flex-wrap">
                        {winnersBySeason.map((s) => (
                            <button key={s.season} onClick={() => setActiveSeason(s.season)} className={`px-8 py-3 rounded-full font-semibold text-[14px] transition-all cursor-pointer ${activeSeason === s.season ? 'bg-gradient-to-r from-orange to-pink text-white shadow-[0_8px_20px_-6px_rgba(236,30,99,.5)]' : 'bg-white text-ink border border-[#e8dccb] hover:border-pink'}`}>
                                Season {s.season} — {s.year}
                            </button>
                        ))}
                    </div>

                    {winnersBySeason.map((s) => (
                        s.season === activeSeason && (
                            <div key={s.season} className="grid grid-cols-3 gap-8 max-[700px]:grid-cols-1 max-[980px]:grid-cols-2">
                                {s.winners.map((winner, i) => (
                                    <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-[0_10px_40px_-10px_rgba(0,0,0,.08)] hover:shadow-[0_15px_50px_-10px_rgba(236,30,99,.15)] transition-all duration-300">
                                        <div className="relative inline-block mb-5">
                                            <img src={winner.image} alt={winner.name} className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg" />
                                            <span className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-orange to-pink rounded-full flex items-center justify-center text-white text-[11px] font-bold shadow-md">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</span>
                                        </div>
                                        <h3 className="text-[18px] font-bold text-ink mb-1">{winner.name}</h3>
                                        <span className="text-[11px] text-pink font-semibold tracking-[1px] uppercase">{winner.category}</span>
                                        <div className="mt-4 pt-4 border-t border-[#f0e8e0]"><span className="text-[12px] text-muted">Season {s.season} Champion</span></div>
                                    </div>
                                ))}
                            </div>
                        )
                    ))}
                </div>
            </section>

            {/* Category Awards */}
            <section className="py-[70px] max-[480px]:py-[50px]">
                <div className="flex items-center justify-center gap-3.5 text-pink font-bold text-[13px] tracking-[2px] mb-4">
                    <span className="w-[50px] h-px bg-[#f0c9d3]" />
                    CATEGORY AWARDS
                    <span className="w-[50px] h-px bg-[#f0c9d3]" />
                </div>
                <h2 className="text-center font-playfair italic font-normal text-[34px] mb-[50px] max-[480px]:text-[26px]">Excellence across all forms</h2>

                <div className="max-w-[1160px] mx-auto px-8 max-[980px]:px-5">
                    <div className="grid grid-cols-3 gap-6 max-[980px]:grid-cols-2 max-[480px]:grid-cols-1">
                        {categoryWinners.map((cat, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 flex items-center gap-5 shadow-[0_10px_40px_-10px_rgba(0,0,0,.06)] hover:shadow-[0_15px_50px_-10px_rgba(236,30,99,.12)] transition-all duration-300 hover:-translate-y-0.5">
                                <span className="text-4xl">{cat.icon}</span>
                                <div className="flex-1">
                                    <div className="text-[11px] text-muted tracking-[1px] uppercase mb-1">{cat.category}</div>
                                    <div className="text-[16px] font-bold text-ink">{cat.winner}</div>
                                    <div className="text-[12px] text-pink font-semibold">Season {cat.season}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-[70px] bg-gradient-to-br from-ink via-[#2a1f3d] to-[#1a0f2e] max-[480px]:py-[50px]">
                <div className="flex items-center justify-center gap-3.5 text-orange font-bold text-[13px] tracking-[2px] mb-4">
                    <span className="w-[50px] h-px bg-orange/30" />
                    VOICES FROM THE JOURNEY
                    <span className="w-[50px] h-px bg-orange/30" />
                </div>
                <h2 className="text-center font-playfair italic font-normal text-[34px] text-white mb-[50px] max-[480px]:text-[26px]">What they say about us</h2>

                <div className="max-w-[1160px] mx-auto px-8 max-[980px]:px-5">
                    <div className="grid grid-cols-3 gap-8 max-[980px]:grid-cols-1">
                        {testimonials.map((t, i) => (
                            <div key={i} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                                <div className="flex items-center gap-4 mb-5">
                                    <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 border-pink/30" />
                                    <div><h4 className="text-white font-semibold text-[15px]">{t.name}</h4><span className="text-pink text-[11px] tracking-[1px] uppercase">{t.role}</span></div>
                                </div>
                                <p className="text-white/70 text-[14px] leading-[1.8] italic">"{t.text}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-[70px] max-[480px]:py-[50px]">
                <div className="max-w-[800px] mx-auto px-8 text-center max-[480px]:px-4">
                    <span className="text-5xl mb-4 block">{cta.icon}</span>
                    <h2 className="font-playfair italic text-[36px] mb-5 max-[480px]:text-[28px]">
                        {cta.title.split('champion').map((part, i) => i === 0 ? <>{part}<span className="bg-gradient-to-r from-orange to-pink bg-clip-text text-transparent">champion</span></> : <span key={i}>{part}</span>)}
                    </h2>
                    <p className="text-muted text-[16px] leading-[1.8] mb-8 max-w-[500px] mx-auto">{cta.description}</p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <button onClick={() => setShowTalentForm(true)} className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm bg-gradient-to-r from-orange to-pink text-white shadow-[0_10px_30px_-6px_rgba(236,30,99,.55)] hover:brightness-110 transition-all cursor-pointer">{cta.buttonText}</button>
                        <Link href="/artists" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm border-2 border-[#e8dccb] text-ink hover:border-pink transition-colors">{cta.button2Text}</Link>
                    </div>
                </div>
            </section>

            {modalVideoId && <VideoModal videoId={modalVideoId} onClose={() => setModalVideoId(null)} />}
        </PublicLayout>
    );
}
