import { useState, useCallback } from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import Section from '@/Components/Section';
import Reveal from '@/Components/Reveal';
import Display from '@/Components/Display';
import SectionHeading from '@/Components/SectionHeading';
import VideoFrame, { PlayBadge } from '@/Components/VideoFrame';
import CtaBand from '@/Components/CtaBand';
import SubmitTalentModal from '@/Components/SubmitTalentModal';
import { AwardSeal, AlponaCorner } from '@/Components/Ornament';
import { useLang } from '@/hooks/useLang';
import { yearWinner, monthWinners } from '@/data/winners';
import { CATEGORIES } from '@/data/talent';
import { watchUrl } from '@/brand';
import { localeDigits } from '@/lib/format';

/**
 * Winners — the annual honour, then the monthly roll.
 *
 * Two tiers, two treatments. The yearly winner gets a full spread with the
 * citation set as a quote; the monthly winners get a three-up grid. Giving both
 * the same card would make the annual award mean nothing, which defeats the
 * point of having two tiers.
 */
export default function Winners() {
    const { lang, t } = useLang();
    const [showSubmit, setShowSubmit] = useState(false);

    const openSubmit = useCallback(() => setShowSubmit(true), []);

    return (
        <PublicLayout onOpenSubmit={openSubmit}>
            <Head>
                <title>{t('বিজয়ী — RAW LIQUEUR', 'Winners — RAW LIQUEUR')}</title>
                <meta
                    name="description"
                    content="Monthly and yearly honours for the strongest single-take performances on RAW LIQUEUR."
                />
            </Head>

            <PageHeader
                eyebrow={t('স্বীকৃতি', 'Recognition')}
                title={t('মাসের ও বছরের সেরা', 'Best of the month, and the year')}
                lead={t(
                    'প্রতিভা যাচাই হয় দর্শকের সাড়ায় — কত দেখা হয়েছে, কত পছন্দ, কী বলেছেন সবাই। প্রতি মাসে একজন, প্রতি বছরে একজন। উপহার তাঁদের ঠিকানায় পাঠানো হয়।',
                    'The measure is the audience response — views, likes, and what people said. One each month, one each year. The gift is posted to their address.',
                )}
                meta={[
                    {
                        label: t('মাসিক স্বীকৃতি', 'Monthly honours'),
                        value: localeDigits(monthWinners.length, lang),
                    },
                    {
                        label: t('বার্ষিক স্বীকৃতি', 'Yearly honours'),
                        value: localeDigits(yearWinner ? 1 : 0, lang),
                    },
                ]}
            />

            {/* ── Annual honour ────────────────────────────────────────────── */}
            {yearWinner && (
                <Section tone="canvas" pad="loose">
                    <Reveal className="relative border border-brass/20 p-5 sm:p-8 lg:p-12">
                        <span aria-hidden="true" className="pointer-events-none text-brass/45">
                            <AlponaCorner corner="tl" className="absolute -left-px -top-px h-12 w-12" />
                            <AlponaCorner corner="tr" className="absolute -right-px -top-px h-12 w-12" />
                            <AlponaCorner corner="bl" className="absolute -bottom-px -left-px h-12 w-12" />
                            <AlponaCorner corner="br" className="absolute -bottom-px -right-px h-12 w-12" />
                        </span>

                        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
                            <div className="relative">
                                <a
                                    href={watchUrl(yearWinner.id)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group block border border-brass/20 transition-colors duration-700 hover:border-brass/45"
                                >
                                    <VideoFrame
                                        videoId={yearWinner.id}
                                        previewStart={yearWinner.previewStart}
                                        alt={t(
                                            `${yearWinner.nameBn} — পরিবেশনা`,
                                            `${yearWinner.name} performing`,
                                        )}
                                        ratio={16 / 9}
                                        eager
                                    >
                                        {({ previewReady }) => (
                                            <>
                                                <span
                                                    aria-hidden="true"
                                                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent"
                                                />
                                                <PlayBadge
                                                    active={previewReady}
                                                    className="bottom-5 left-5 h-14 w-14"
                                                />
                                            </>
                                        )}
                                    </VideoFrame>
                                </a>

                                <AwardSeal
                                    label={t('বর্ষসেরা', 'Talent of')}
                                    sub={t('প্রতিভা', 'the Year')}
                                    className="absolute -right-5 -top-5 w-20 sm:w-24"
                                />
                            </div>

                            <div>
                                <p lang={lang} className="caps text-[9px] text-brass">
                                    {yearWinner.period[lang]}
                                </p>

                                <Display size="xl" as="h2" className="mt-5 text-ink">
                                    {lang === 'bn' ? yearWinner.nameBn : yearWinner.name}
                                </Display>

                                <p lang={lang} className="mt-4 text-sm text-ink-soft">
                                    {lang === 'bn' ? yearWinner.titleBn : yearWinner.title} ·{' '}
                                    {CATEGORIES[yearWinner.category]?.[lang]} ·{' '}
                                    {yearWinner.district[lang]}
                                </p>

                                <blockquote
                                    lang={lang}
                                    className={`mt-9 border-l border-brass/30 pl-6 text-ink/85 ${
                                        lang === 'bn'
                                            ? 'text-base leading-loose'
                                            : 'display text-xl leading-snug sm:text-2xl'
                                    }`}
                                >
                                    {yearWinner.citation[lang]}
                                </blockquote>

                                <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
                                    {[
                                        { label: t('দেখা হয়েছে', 'Views'), value: yearWinner.views },
                                        { label: t('পছন্দ', 'Likes'), value: yearWinner.likes },
                                        { label: t('পুরস্কার', 'Prize'), value: yearWinner.gift[lang] },
                                    ].map((stat) => (
                                        <div key={stat.label}>
                                            <dd
                                                lang={lang}
                                                className="display text-2xl leading-none text-brass"
                                            >
                                                {localeDigits(stat.value, lang)}
                                            </dd>
                                            <dt className="caps mt-2.5 text-[8px] text-ink-mute">
                                                {stat.label}
                                            </dt>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                    </Reveal>
                </Section>
            )}

            {/* ── Monthly roll ─────────────────────────────────────────────── */}
            <Section tone="paper" pad="loose" watermark>
                <SectionHeading
                    eyebrow={t('মাসিক স্বীকৃতি', 'Monthly honours')}
                    title={t('প্রতি মাসে একজন', 'One every month')}
                />

                <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-10">
                    {monthWinners.map((winner, index) => (
                        <Reveal key={winner.id} delay={(index % 3) * 120}>
                            <MonthWinnerCard winner={winner} />
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={200} className="mt-16 border-t border-brass/12 pt-9">
                    <p lang={lang} className="max-w-2xl text-xs leading-relaxed text-ink-mute">
                        {t(
                            'বি. দ্র. — RAW LIQUEUR কোনো প্রতিযোগিতা নয়। মাসিক ও বার্ষিক স্বীকৃতি দর্শকের সাড়ার ভিত্তিতে দেওয়া হয়, এবং উপহার হিসেবে ছোট একটি সম্মাননা জমাদাতার ঠিকানায় পাঠানো হয়।',
                            'Note — RAW LIQUEUR is not a competition. Monthly and yearly honours are decided on audience response, and a small token of recognition is posted to the recipient\'s address.',
                        )}
                    </p>
                </Reveal>
            </Section>

            <CtaBand onOpenSubmit={openSubmit} />

            <SubmitTalentModal open={showSubmit} onClose={() => setShowSubmit(false)} />
        </PublicLayout>
    );
}

/**
 * MonthWinnerCard — one monthly honour.
 *
 * Lighter than the annual spread on purpose: the period label is the loudest
 * element, because on this page the reader is scanning by month.
 */
function MonthWinnerCard({ winner }) {
    const { lang, t } = useLang();

    const name = lang === 'bn' ? (winner.nameBn ?? winner.name) : winner.name;
    const title = lang === 'bn' ? (winner.titleBn ?? winner.title) : winner.title;

    return (
        <a
            href={watchUrl(winner.id)}
            target="_blank"
            rel="noopener noreferrer"
            className="group block h-full border border-brass/12 bg-surface transition-[transform,border-color,box-shadow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-brass/35 hover:shadow-lift"
        >
            <VideoFrame
                videoId={winner.id}
                previewStart={winner.previewStart}
                alt={t(`${name} — পরিবেশনা`, `${name} performing`)}
                ratio={16 / 10}
            >
                {({ previewReady }) => (
                    <>
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/10"
                        />
                        <span
                            lang={lang}
                            className="caps absolute left-4 top-4 border border-brass/40 bg-ink/70 px-3 py-1.5 text-[8px] text-brass-lit backdrop-blur-md"
                        >
                            {winner.period[lang]}
                        </span>
                        <PlayBadge active={previewReady} className="bottom-4 left-4 h-11 w-11" />
                    </>
                )}
            </VideoFrame>

            <div className="p-6">
                <Display size="md" as="h3" className="text-ink">
                    {name}
                </Display>

                <p lang={lang} className="mt-2.5 text-sm text-ink-soft">
                    {title} · {CATEGORIES[winner.category]?.[lang]}
                </p>

                <p lang={lang} className="mt-5 text-xs leading-relaxed text-ink-mute">
                    {winner.citation[lang]}
                </p>

                <div className="mt-6 flex items-center justify-between gap-4 border-t border-brass/10 pt-5">
                    <span lang={lang} className="caps text-[8px] text-ink-mute">
                        {winner.district[lang]}
                    </span>
                    <span className="caps text-[8px] text-brass/80">
                        {localeDigits(winner.views, lang)}{' '}
                        {t('দেখা', 'views')}
                    </span>
                </div>
            </div>
        </a>
    );
}
