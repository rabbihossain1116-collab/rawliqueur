import { Link } from '@inertiajs/react';
import Section from '@/Components/Section';
import Reveal from '@/Components/Reveal';
import Display from '@/Components/Display';
import VideoFrame, { PlayBadge } from '@/Components/VideoFrame';
import { AwardSeal } from '@/Components/Ornament';
import { useLang } from '@/hooks/useLang';
import { yearWinner } from '@/data/winners';
import { CATEGORIES } from '@/data/talent';
import { watchUrl } from '@/brand';
import { localeDigits } from '@/lib/format';

/**
 * WinnerTeaser — the annual honour, on the homepage.
 *
 * A single record presented large, rather than a row of winner thumbnails. The
 * award means more if the page treats one person as significant than if it
 * treats five as interchangeable, and the monthly list is one click away.
 *
 * Renders nothing when there is no annual winner yet. That is the correct state
 * for a channel in its first year — an empty section with a placeholder would
 * undercut the award before it has been given once.
 */
export default function WinnerTeaser() {
    const { lang, t } = useLang();

    if (!yearWinner) return null;

    const name = lang === 'bn' ? (yearWinner.nameBn ?? yearWinner.name) : yearWinner.name;
    const title = lang === 'bn' ? (yearWinner.titleBn ?? yearWinner.title) : yearWinner.title;
    const category = CATEGORIES[yearWinner.category]?.[lang] ?? yearWinner.category;

    const stats = [
        { label: t('দেখা হয়েছে', 'Views'), value: yearWinner.views },
        { label: t('পছন্দ', 'Likes'), value: yearWinner.likes },
    ];

    return (
        <Section
            id="winner"
            tone="paper"
            watermark="-bottom-56 -right-40 h-[40rem] w-[40rem] text-brass/[0.05]"
        >
            <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
                {/* Media */}
                <Reveal className="relative">
                    <a
                        href={watchUrl(yearWinner.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative block border border-brass/20 transition-[border-color,box-shadow] duration-700 hover:border-brass/45 hover:shadow-frame"
                    >
                        <VideoFrame
                            videoId={yearWinner.id}
                            previewStart={yearWinner.previewStart}
                            alt={t(`${name} — পরিবেশনা`, `${name} performing`)}
                            ratio={16 / 9}
                        >
                            {({ previewReady }) => (
                                <>
                                    <span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/20"
                                    />
                                    <PlayBadge
                                        active={previewReady}
                                        className="bottom-5 left-5 h-14 w-14"
                                    />
                                </>
                            )}
                        </VideoFrame>
                    </a>

                    {/* Seal breaks the frame edge — the detail that makes it read
                        as stamped onto the plate rather than placed near it. */}
                    <AwardSeal
                        label={t('বর্ষসেরা', 'Talent of')}
                        sub={t('প্রতিভা', 'the Year')}
                        className="absolute -right-4 -top-4 w-20 sm:-right-7 sm:-top-7 sm:w-24"
                    />
                </Reveal>

                {/* Citation */}
                <div>
                    <Reveal className="flex items-center gap-4" y={14}>
                        <span className="rule-brass w-12" />
                        <span lang={lang} className="caps text-[9px] text-brass">
                            {yearWinner.period[lang]}
                        </span>
                    </Reveal>

                    <Reveal variant="mask" delay={120} className="mt-6">
                        <Display size="xl" className="text-ink">
                            {name}
                        </Display>
                    </Reveal>

                    <Reveal delay={200} className="mt-4">
                        <p lang={lang} className="text-sm text-ink-soft">
                            {title} · {category} · {yearWinner.district[lang]}
                        </p>
                    </Reveal>

                    {/* The citation is set as a pull quote — an award is an
                        argument, and this is the argument. */}
                    <Reveal delay={300} className="mt-9 border-l border-brass/30 pl-6">
                        <p
                            lang={lang}
                            className={`text-ink/85 ${
                                lang === 'bn'
                                    ? 'text-base leading-loose'
                                    : 'display text-xl leading-snug sm:text-2xl'
                            }`}
                        >
                            {yearWinner.citation[lang]}
                        </p>
                    </Reveal>

                    <Reveal delay={400} className="mt-10 flex flex-wrap items-end gap-10">
                        {stats.map((stat) => (
                            <div key={stat.label}>
                                <p className="display text-3xl leading-none text-brass">
                                    {localeDigits(stat.value, lang)}
                                </p>
                                <p lang={lang} className="caps mt-2.5 text-[8px] text-ink-mute">
                                    {stat.label}
                                </p>
                            </div>
                        ))}

                        <div>
                            <p lang={lang} className="text-sm text-ink/70">
                                {yearWinner.gift[lang]}
                            </p>
                            <p lang={lang} className="caps mt-2.5 text-[8px] text-ink-mute">
                                {t('পুরস্কার', 'Prize')}
                            </p>
                        </div>
                    </Reveal>

                    <Reveal delay={480} className="mt-12">
                        <Link
                            href="/winners"
                            className="caps group inline-flex items-center gap-3 border border-brass/40 px-8 py-4 text-[9px] text-brass transition-colors duration-500 hover:bg-brass hover:text-paper"
                        >
                            {t('সব বিজয়ী দেখুন', 'See all winners')}
                            <svg
                                className="h-2.5 w-2.5 transition-transform duration-500 group-hover:translate-x-1"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7 7 7-7 7" />
                            </svg>
                        </Link>
                    </Reveal>
                </div>
            </div>
        </Section>
    );
}
