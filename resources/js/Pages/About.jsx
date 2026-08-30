import PublicLayout from '@/Layouts/PublicLayout';

function VoicePair({ data }) {
    return (
        <div className="grid grid-cols-[1fr_1fr_1px_1fr_1fr] items-stretch gap-7 bg-white rounded-2xl shadow-[0_20px_40px_-30px_rgba(60,40,20,.25)] overflow-hidden max-[980px]:grid-cols-1 max-[980px]:text-center">
            <div className="w-full bg-[#1c1512] flex items-center justify-center p-2">
                <img src={data.left.image} alt={data.left.name} className="max-h-[260px] w-auto object-contain" />
            </div>
            <div className="py-6 pl-7 flex flex-col justify-center max-[980px]:p-6 max-[980px]:text-center">
                <div className="font-playfair font-semibold text-[19px] mb-0.5">{data.left.name}</div>
                <div className="text-[11px] tracking-[.1em] uppercase text-orange-deep font-semibold mb-3">{data.left.role}</div>
                <p className="text-sm text-muted mb-4 leading-[1.7]">{data.left.quote}</p>
                <span className="text-[11px] font-semibold tracking-[.08em] border border-border rounded-20 py-2 px-[18px] inline-block text-ink w-fit max-[980px]:mx-auto">VIEW MORE</span>
            </div>
            <div className="w-px bg-border max-[980px]:hidden" />
            <div className="py-6 pr-7 text-right flex flex-col justify-center max-[980px]:p-6 max-[980px]:text-center">
                <div className="font-playfair font-semibold text-[19px] mb-0.5">{data.right.name}</div>
                <div className="text-[11px] tracking-[.1em] uppercase text-orange-deep font-semibold mb-3">{data.right.role}</div>
                <p className="text-sm text-muted mb-4 leading-[1.7]">{data.right.quote}</p>
                <span className="text-[11px] font-semibold tracking-[.08em] border border-border rounded-20 py-2 px-[18px] inline-block text-ink max-[980px]:mx-auto ml-auto">VIEW MORE</span>
            </div>
            <div className="w-full bg-[#dcd3c8] flex items-center justify-center p-2">
                <img src={data.right.image} alt={data.right.name} className="max-h-[260px] w-auto object-contain" />
            </div>
        </div>
    );
}

function CommunityCard({ data }) {
    return (
        <div className="bg-white rounded-2xl p-[30px] flex items-center gap-5 shadow-[0_16px_32px_-26px_rgba(60,40,20,.3)] max-[600px]:flex-col max-[600px]:text-center">
            <div className="w-16 h-16 rounded-full flex-none bg-gradient-to-br from-[#fdece0] to-[#f3d3b4] text-pink font-playfair font-bold text-[22px] flex items-center justify-center border border-[#f0dcb8]">
                {data.initials}
            </div>
            <div>
                <div className="font-playfair font-semibold text-[16.5px] mb-0.5">{data.name}</div>
                <div className="text-[11px] tracking-[.1em] uppercase text-orange-deep font-semibold mb-2">{data.role}</div>
                <p className="text-[13px] text-muted mb-3 leading-[1.7]">{data.quote}</p>
                <span className="text-[11px] font-semibold tracking-[.08em] border border-border rounded-20 py-2 px-[18px] inline-block text-ink">VIEW MORE</span>
            </div>
        </div>
    );
}

export default function About({ aboutContent }) {
    const hero = aboutContent?.hero || {
        bgImage: '/images/aboutuse.png',
        title: 'প্রতিভা ও কবিতা গানে',
        subtitle: 'RAW LIQUEUR রাজনির প্রানে',
    };

    const voicePairs1 = aboutContent?.voice_pairs_1 || [
        {
            left: { image: '/images/kumar-sanu.webp', name: 'Kumar Sanu', role: 'Playback Singer', quote: '"সঙ্গীত আমার ভগবানের সেবা নয়, এ আমার প্রাণের ভাষা, মানুষের প্রতি ভালোবাসা।"' },
            right: { image: '/images/lata-mangeshkar.webp', name: 'Lata Mangeshkar', role: 'Playback Singer', quote: '"যতই প্রযুক্তি উন্নত হোক না কেন, সঙ্গীতের মাধুর্য সবসময় হৃদয়ে থেকে হৃদয়ে পৌঁছায়।"' },
        },
    ];

    const features = aboutContent?.features || [
        { icon: '🛡', title: '100% Authentic', desc: 'We ensure every performance is real and true.' },
        { icon: '🤝', title: 'Equal Opportunity', desc: 'We believe in talent, not popularity. Everyone gets a chance.' },
        { icon: '👥', title: 'Community Driven', desc: 'Our community decides who deserves the spotlight.' },
        { icon: '📈', title: 'Support & Growth', desc: 'We help talents grow and reach a wider audience.' },
        { icon: '♥', title: 'Pure Passion', desc: 'This platform is built with love for art and culture.' },
    ];

    const voicePairs2 = aboutContent?.voice_pairs_2 || [
        {
            left: { image: '/images/hemant-kumar.webp', name: 'Hemanta Mukhopadhyay', role: 'Singer & Composer', quote: '"সুরের ভুবনে ভালোবাসাই আমার একমাত্র ঠিকানা।"' },
            right: { image: '/images/jibanananda-das.webp', name: 'Jibanananda Das', role: 'Poet', quote: '"বাংলার মাটির গন্ধ মিশে আছে আমার কবিতার প্রতিটি শব্দে।"' },
        },
    ];

    const journey = aboutContent?.journey || {
        subtitle: 'Our Journey',
        title: 'A Journey Towards Real Recognition',
        description: 'RAW Liqueur-এর পথচলা প্রতিভার খোঁজে, চলার প্রেরণার সুযোগ করে দিয়ে এবং সংস্কৃতিকে সঠিক গুরুত্ব দেওয়া। আমাদের লক্ষ্য একটি বিশ্বস্ত, বৈচিত্র্য-চালিত প্ল্যাটফর্ম তৈরি করা, যেখাানে প্রতিটি প্রতিভা সুযোগ, স্বীকৃতি এবং ভালোবাসা পায়।',
        buttonText: 'Join Our Journey',
        stats: [
            { icon: '🗓', value: '2026', label: 'Started' },
            { icon: '🎤', value: '100+', label: 'Events' },
            { icon: '🎯', value: '1000+', label: 'Talents' },
        ],
        impactStat: { icon: '📣', value: '1M+', label: 'Lives Impacted', description: 'আমাদের প্ল্যাটফর্মের মাধ্যমে লক্ষাধিক মানুষের জীবনে অনুপ্রেরণা ও আনন্দ ছড়িয়ে দিয়েছি।' },
    };

    const community1 = aboutContent?.community_1 || [
        { initials: 'RT', name: 'Rabindranath Tagore', role: 'Poet & Composer', quote: '"প্রতিটি সৎ সৃষ্টিতে সমাজ কে এগিয়ে নিয়ে যায়।"' },
        { initials: 'KN', name: 'Kazi Nazrul Islam', role: 'Poet & Composer', quote: '"শিল্প মানুষের মুক্তির পথ, প্রতিটি গান একটি বিপ্লব।"' },
    ];

    const values = aboutContent?.values || [
        { icon: '♥', title: 'Respect', desc: 'We respect every artist and every performance.' },
        { icon: '⚖', title: 'Fairness', desc: 'We ensure fairness in every opportunity we provide.' },
        { icon: '★', title: 'Passion', desc: 'We are passionate about preserving our culture and creativity.' },
        { icon: '👥', title: 'Community', desc: 'We grow together as a strong and supportive family.' },
        { icon: '🏆', title: 'Excellence', desc: 'We strive for excellence in everything we do.' },
    ];

    const community2 = aboutContent?.community_2 || [
        { initials: 'MD', name: 'Manna Dey', role: 'Playback Singer', quote: '"সঙ্গীতের সাধনায় ছন্দ খুঁজে পাওয়া-ই আমার পথ।"' },
        { initials: 'SM', name: 'Sandhya Mukhopadhyay', role: 'Playback Singer', quote: '"সুরের মাঝে মানুষের ভালোবাসাই আমার প্রেরণা।"' },
    ];

    const cta = aboutContent?.cta || {
        icon: '🎙',
        subtitle: 'Be Part of Our Mission',
        title: 'Help Us Celebrate Real Talent',
        description: 'Submit your talent or support others. Together, we can build a better platform for art & culture.',
        buttonText: '✎ Submit Your Talent →',
    };

    return (
        <PublicLayout>
            {/* Hero */}
            <section className="px-8 pt-6 pb-0 max-[600px]:px-4">
                <div className="max-w-[1180px] mx-auto relative rounded-2xl overflow-hidden min-h-[340px] flex items-center bg-cover bg-center"
                    style={{ backgroundImage: `url('${hero.bgImage}')` }}>
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="relative z-10 p-14 max-w-[560px] max-[600px]:p-8">
                        <div className="font-hind text-[34px] font-bold text-white text-shadow-lg mb-1.5 max-[600px]:text-[24px]">{hero.title}</div>
                        <div className="text-[22px] font-semibold text-[#f3d9a8] max-[600px]:text-[16px]"><span className="text-white">{hero.subtitle}</span></div>
                    </div>
                </div>
            </section>

            {/* Voice of Bengal 1 */}
            <section className="py-16 px-8 max-[600px]:px-4">
                <div className="max-w-[1180px] mx-auto">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2.5 text-[12px] tracking-[.2em] uppercase text-pink font-semibold mb-3 before:w-[26px] before:h-px before:bg-pink before:opacity-50 after:w-[26px] after:h-px after:bg-pink after:opacity-50">Legends Who Inspire</div>
                        <h2 className="font-playfair text-[34px] font-semibold text-ink">Voice of Bengal</h2>
                    </div>
                    {voicePairs1.map((pair, i) => <VoicePair key={i} data={pair} />)}
                </div>
            </section>

            {/* What Makes Us Different */}
            <section className="py-16 px-8 max-[600px]:px-4">
                <div className="max-w-[1180px] mx-auto">
                    <div className="bg-gradient-to-b from-[#f3e2c8] to-[#f6e6cd] rounded-[18px] py-[52px] px-10 max-[600px]:px-5 max-[600px]:py-10">
                        <div className="text-center">
                            <div className="inline-flex items-center gap-2.5 text-[12px] tracking-[.2em] uppercase text-pink font-semibold mb-3">What Makes Us Different</div>
                            <h2 className="font-playfair text-[32px] max-w-[520px] mx-auto">Real Talent. Real People.<br/>Real Impact.</h2>
                        </div>
                        <div className="grid grid-cols-5 gap-[18px] mt-10 max-[980px]:grid-cols-2 max-[600px]:grid-cols-2">
                            {features.map((f, i) => (
                                <div key={i} className="bg-white rounded-[14px] py-[26px] px-[18px] text-center shadow-[0_14px_30px_-22px_rgba(60,40,20,.3)]">
                                    <div className="w-[52px] h-[52px] rounded-full mx-auto mb-4 bg-gradient-to-br from-[#fdece0] to-[#f7d3c4] flex items-center justify-center text-[22px] text-pink">{f.icon}</div>
                                    <h3 className="text-[15px] mb-2 font-semibold">{f.title}</h3>
                                    <p className="text-[12.5px] text-muted leading-[1.6]">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Voice of Bengal 2 */}
            <section className="py-16 px-8 max-[600px]:px-4">
                <div className="max-w-[1180px] mx-auto">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2.5 text-[12px] tracking-[.2em] uppercase text-pink font-semibold mb-3 before:w-[26px] before:h-px before:bg-pink before:opacity-50 after:w-[26px] after:h-px after:bg-pink after:opacity-50">Legends Who Inspire</div>
                        <h2 className="font-playfair text-[34px] font-semibold text-ink">Voice of Bengal</h2>
                    </div>
                    {voicePairs2.map((pair, i) => <VoicePair key={i} data={pair} />)}
                </div>
            </section>

            {/* Journey */}
            <section className="py-16 px-8 max-[600px]:px-4">
                <div className="max-w-[1180px] mx-auto">
                    <div className="bg-gradient-to-b from-[#f3e2c8] to-[#f6e6cd] rounded-[18px] py-12 px-11 grid grid-cols-[1fr_1.15fr] gap-10 items-center relative overflow-hidden max-[980px]:grid-cols-1 max-[600px]:px-6">
                        <div className="absolute right-6 bottom-5 text-[70px] opacity-35 max-[980px]:hidden">🌿</div>
                        <div>
                            <div className="inline-flex items-center gap-2.5 text-[12px] tracking-[.2em] uppercase text-pink font-semibold mb-3 before:w-[26px] before:h-px before:bg-pink before:opacity-50">{journey.subtitle}</div>
                            <h2 className="font-playfair text-[30px] mb-3.5">{journey.title}</h2>
                            <p className="text-[13.5px] text-muted mb-5.5 leading-[1.8]">{journey.description}</p>
                            <button className="bg-pink text-white py-3 px-[26px] rounded-full font-semibold text-[13px] shadow-[0_10px_20px_-10px_rgba(236,30,99,.6)] hover:bg-pink-deep hover:-translate-y-0.5 transition-all cursor-pointer">{journey.buttonText}</button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {(journey.stats || []).map((s, i) => (
                                <div key={i} className="bg-white rounded-[14px] py-[18px] px-5 flex items-center gap-3.5 shadow-[0_14px_26px_-20px_rgba(60,40,20,.3)]">
                                    <div className="w-[42px] h-[42px] rounded-full flex-none bg-gradient-to-br from-pink to-pink-deep text-white flex items-center justify-center text-[17px]">{s.icon}</div>
                                    <div>
                                        <div className="font-playfair font-bold text-[19px] leading-none">{s.value}</div>
                                        <div className="text-[10px] tracking-[.12em] uppercase text-orange-deep font-bold mt-0.5">{s.label}</div>
                                    </div>
                                </div>
                            ))}
                            {journey.impactStat && (
                                <div className="bg-white rounded-[14px] py-[18px] px-5 flex items-center gap-3.5 shadow-[0_14px_26px_-20px_rgba(60,40,20,.3)] col-span-2">
                                    <div className="w-[42px] h-[42px] rounded-full flex-none bg-gradient-to-br from-pink to-pink-deep text-white flex items-center justify-center text-[17px]">{journey.impactStat.icon}</div>
                                    <div>
                                        <div className="font-playfair font-bold text-[19px] leading-none">{journey.impactStat.value}</div>
                                        <div className="text-[10px] tracking-[.12em] uppercase text-orange-deep font-bold mt-0.5">{journey.impactStat.label}</div>
                                        <div className="text-[11.5px] text-muted mt-1">{journey.impactStat.description}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Voices of Community 1 */}
            <section className="py-16 px-8 max-[600px]:px-4">
                <div className="max-w-[1180px] mx-auto">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center gap-2.5 text-[12px] tracking-[.2em] uppercase text-pink font-semibold mb-3 before:w-[26px] before:h-px before:bg-pink before:opacity-50 after:w-[26px] after:h-px after:bg-pink after:opacity-50">Voices of the Community</div>
                    </div>
                    <div className="grid grid-cols-2 gap-6 max-[600px]:grid-cols-1">
                        {community1.map((c, i) => <CommunityCard key={i} data={c} />)}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-16 px-8 max-[600px]:px-4">
                <div className="max-w-[1180px] mx-auto">
                    <div className="text-center mb-9">
                        <div className="inline-flex items-center gap-2.5 text-[12px] tracking-[.2em] uppercase text-pink font-semibold mb-3 before:w-[26px] before:h-px before:bg-pink before:opacity-50 after:w-[26px] after:h-px after:bg-pink after:opacity-50">Our Values</div>
                    </div>
                    <div className="grid grid-cols-5 gap-5 text-center max-[980px]:grid-cols-2 max-[600px]:grid-cols-2">
                        {values.map((v, i) => (
                            <div key={i}>
                                <div className="w-[58px] h-[58px] rounded-full mx-auto mb-3.5 bg-white border border-border flex items-center justify-center text-[22px] text-pink">{v.icon}</div>
                                <h4 className="text-[14.5px] mb-1.5 font-semibold">{v.title}</h4>
                                <p className="text-[11.5px] text-muted leading-[1.6]">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Voices of Community 2 */}
            <section className="py-16 px-8 max-[600px]:px-4">
                <div className="max-w-[1180px] mx-auto">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center gap-2.5 text-[12px] tracking-[.2em] uppercase text-pink font-semibold mb-3 before:w-[26px] before:h-px before:bg-pink before:opacity-50 after:w-[26px] after:h-px after:bg-pink after:opacity-50">Voices of the Community</div>
                    </div>
                    <div className="grid grid-cols-2 gap-6 max-[600px]:grid-cols-1">
                        {community2.map((c, i) => <CommunityCard key={i} data={c} />)}
                    </div>
                </div>
            </section>

            {/* CTA Strip */}
            <section className="py-16 px-8 max-[600px]:px-4">
                <div className="max-w-[1180px] mx-auto">
                    <div className="bg-gradient-to-b from-[#f3e2c8] to-[#f6e6cd] rounded-[18px] py-[30px] px-10 flex items-center justify-between gap-6 max-[980px]:flex-col max-[980px]:text-center max-[600px]:px-6">
                        <div className="flex items-center gap-6 max-[980px]:flex-col max-[980px]:text-center">
                            <div className="w-[74px] h-[74px] rounded-full flex-none bg-gradient-to-br from-[#4a3a30] to-[#1c1512] flex items-center justify-center text-[30px] text-[#e8c98f]">{cta.icon}</div>
                            <div>
                                <div className="inline-flex items-center gap-2.5 text-[12px] tracking-[.2em] uppercase text-pink font-semibold mb-1.5 before:hidden after:hidden">{cta.subtitle}</div>
                                <h3 className="font-playfair text-[22px] mb-1.5">{cta.title}</h3>
                                <p className="text-[13px] text-muted max-w-[420px]">{cta.description}</p>
                            </div>
                        </div>
                        <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-gradient-to-r from-orange to-pink text-white shadow-[0_8px_20px_-6px_rgba(236,30,99,.55)] hover:brightness-105 whitespace-nowrap cursor-pointer flex-none">{cta.buttonText}</button>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
