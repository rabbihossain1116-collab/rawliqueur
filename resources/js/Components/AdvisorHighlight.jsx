/**
 * AdvisorHighlight — the quiet section.
 *
 * Deliberately under-designed: no cards, no shadows, no hover tricks. Two
 * portraits with a hairline crimson ring and plain typography underneath.
 * This section is here to establish credibility, not to compete for attention.
 *
 * NOTE: placeholder people. Swap `advisors` for the real journalist and
 * artist once they are confirmed.
 */
const advisors = [
    {
        name: { bn: 'আনিকা রহমান', en: 'Anika Rahman' },
        role: { bn: 'সাংবাদিক', en: 'Journalist' },
        place: { bn: 'ঢাকা', en: 'Dhaka' },
        photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80',
    },
    {
        name: { bn: 'দেবজিৎ সেন', en: 'Debjit Sen' },
        role: { bn: 'শিল্পী ও সুরকার', en: 'Artist & Composer' },
        place: { bn: 'কলকাতা', en: 'Kolkata' },
        photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80',
    },
];

export default function AdvisorHighlight({ lang = 'bn' }) {
    return (
        <section id="advisors" className="bg-paper px-6 py-28 lg:px-12 lg:py-40">
            <div className="mx-auto max-w-[1400px]">
                <p className="caps text-center text-[10px] text-ink/35">
                    {lang === 'bn' ? 'উপদেষ্টা পরিষদ' : 'Our Advisors'}
                </p>

                <div className="mt-20 flex flex-col items-start justify-center gap-20 sm:flex-row sm:gap-32 lg:gap-44">
                    {advisors.map((advisor) => (
                        <figure
                            key={advisor.name.en}
                            className="mx-auto flex w-full max-w-[220px] flex-col items-center text-center"
                        >
                            <div className="rounded-full border border-crimson/45 p-1.5">
                                <img
                                    src={advisor.photo}
                                    alt={advisor.name[lang] ?? advisor.name.en}
                                    loading="lazy"
                                    decoding="async"
                                    className="h-32 w-32 rounded-full object-cover sm:h-36 sm:w-36"
                                />
                            </div>

                            <figcaption className="mt-7">
                                <p
                                    lang={lang}
                                    className="text-base font-semibold tracking-tight text-ink"
                                >
                                    {advisor.name[lang] ?? advisor.name.en}
                                </p>
                                <p
                                    lang={lang}
                                    className="mt-1.5 text-sm text-ink/45"
                                >
                                    {advisor.role[lang] ?? advisor.role.en}
                                </p>
                                <p className="caps mt-3 text-[9px] text-ink/30">
                                    {advisor.place[lang] ?? advisor.place.en}
                                </p>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}
