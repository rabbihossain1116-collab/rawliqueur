import { useState, useMemo, useCallback } from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import Section from '@/Components/Section';
import Reveal from '@/Components/Reveal';
import Display from '@/Components/Display';
import VideoFrame, { PlayBadge } from '@/Components/VideoFrame';
import CtaBand from '@/Components/CtaBand';
import SubmitTalentModal from '@/Components/SubmitTalentModal';
import { Lotus } from '@/Components/Ornament';
import { useLang } from '@/hooks/useLang';
import { videoLibrary, CATEGORIES } from '@/data/talent';
import { watchUrl } from '@/brand';
import { localeDigits, parseCompact } from '@/lib/format';

/**
 * Videos — the full archive.
 *
 * ── Fixed here ───────────────────────────────────────────────────────────
 * The previous version rendered a sort control that was never applied: the
 * selected key went into state and nothing read it, so "Most viewed" silently
 * did nothing. Sorting is real now, and runs through `parseCompact` because the
 * counts are display strings ("1.3M") rather than numbers.
 *
 * Filtering and sorting are both derived inside one `useMemo`. Keeping a
 * separate `filteredVideos` state in sync with two controls is how lists drift
 * out of step with their own filters.
 */
export default function Videos() {
    const { lang, t } = useLang();

    const [category, setCategory] = useState('all');
    const [sort, setSort] = useState('newest');
    const [showSubmit, setShowSubmit] = useState(false);

    const openSubmit = useCallback(() => setShowSubmit(true), []);

    const filters = useMemo(
        () => [
            { key: 'all', label: t('সব', 'All') },
            ...Object.entries(CATEGORIES).map(([key, label]) => ({
                key,
                label: label[lang],
            })),
        ],
        [lang, t],
    );

    const sorts = useMemo(
        () => [
            { key: 'newest', label: t('নতুন', 'Newest') },
            { key: 'views', label: t('বেশি দেখা', 'Most viewed') },
            { key: 'likes', label: t('বেশি পছন্দ', 'Most liked') },
        ],
        [t],
    );

    const visible = useMemo(() => {
        const list =
            category === 'all'
                ? videoLibrary
                : videoLibrary.filter((video) => video.category === category);

        // Copy before sorting — `sort` mutates, and mutating the imported array
        // would permanently reorder the module-level data.
        const sorted = [...list];

        if (sort === 'views') {
            sorted.sort((a, b) => parseCompact(b.views) - parseCompact(a.views));
        } else if (sort === 'likes') {
            sorted.sort((a, b) => parseCompact(b.likes) - parseCompact(a.likes));
        } else {
            // ISO dates compare correctly as strings.
            sorted.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
        }

        return sorted;
    }, [category, sort]);

    return (
        <PublicLayout onOpenSubmit={openSubmit}>
            <Head>
                <title>{t('সব ভিডিও — RAW LIQUEUR', 'All videos — RAW LIQUEUR')}</title>
                <meta
                    name="description"
                    content="Every performance published on RAW LIQUEUR — unedited, single take, straight from the performer."
                />
            </Head>

            <PageHeader
                eyebrow={t('সংগ্রহ', 'Archive')}
                title={t('সব পরিবেশনা', 'Every performance')}
                lead={t(
                    'চ্যানেলে প্রকাশিত সব ভিডিও এখানে। প্রতিটি এক টেকে তোলা, কোনো সম্পাদনা ছাড়া।',
                    'Everything published on the channel. Each one a single take, with no editing.',
                )}
                meta={[
                    {
                        label: t('মোট ভিডিও', 'Total videos'),
                        value: localeDigits(videoLibrary.length, lang),
                    },
                    {
                        label: t('বিভাগ', 'Categories'),
                        value: localeDigits(Object.keys(CATEGORIES).length, lang),
                    },
                ]}
            />

            <Section tone="canvas" pad="normal">
                {/* ── Controls ─────────────────────────────────────────────── */}
                <div className="flex flex-col gap-6 border-b border-brass/12 pb-7 lg:flex-row lg:items-center lg:justify-between">
                    {/* Categories as a tab list — this is a view switcher, not a
                        set of independent toggles. */}
                    <div
                        role="tablist"
                        aria-label={t('বিভাগ', 'Category')}
                        className="flex flex-wrap gap-x-7 gap-y-3"
                    >
                        {filters.map((filter) => {
                            const active = category === filter.key;

                            return (
                                <button
                                    key={filter.key}
                                    type="button"
                                    role="tab"
                                    aria-selected={active}
                                    onClick={() => setCategory(filter.key)}
                                    lang={lang}
                                    className={`caps relative pb-1.5 text-[9px] transition-colors duration-500 ${
                                        active
                                            ? 'text-brass'
                                            : 'text-ink-soft hover:text-ink'
                                    }`}
                                >
                                    {filter.label}
                                    {/* Underline rather than a pill: pills at this
                                        size turn the row into a strip of buttons
                                        and fight the type elsewhere on the page. */}
                                    <span
                                        aria-hidden="true"
                                        className={`absolute inset-x-0 bottom-0 h-px origin-left bg-brass transition-transform duration-500 ${
                                            active ? 'scale-x-100' : 'scale-x-0'
                                        }`}
                                    />
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="caps shrink-0 text-[8px] text-ink-mute">
                            {t('সাজান', 'Sort')}
                        </span>

                        <div className="flex border border-ink/12">
                            {sorts.map((option) => {
                                const active = sort === option.key;

                                return (
                                    <button
                                        key={option.key}
                                        type="button"
                                        aria-pressed={active}
                                        onClick={() => setSort(option.key)}
                                        lang={lang}
                                        className={`caps px-3.5 py-2.5 text-[8px] transition-colors duration-400 ${
                                            active
                                                ? 'bg-brass/90 text-paper'
                                                : 'text-ink-soft hover:text-ink'
                                        }`}
                                    >
                                        {option.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* ── Grid ─────────────────────────────────────────────────── */}
                {visible.length > 0 ? (
                    <>
                        <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {visible.map((video, index) => (
                                <Reveal
                                    // Key includes the sort so the reveal replays
                                    // when the order changes — otherwise React
                                    // reuses already-shown nodes and the new
                                    // arrangement appears with no transition.
                                    key={`${sort}-${video.id}`}
                                    delay={(index % 4) * 90}
                                >
                                    <ArchiveCard video={video} eager={index < 4} />
                                </Reveal>
                            ))}
                        </div>

                        <p
                            lang={lang}
                            className="caps mt-16 text-center text-[8px] text-ink-mute"
                        >
                            {t(
                                `${localeDigits(visible.length, lang)}টি পরিবেশনা`,
                                `${visible.length} performances`,
                            )}
                        </p>
                    </>
                ) : (
                    <div className="flex flex-col items-center py-28 text-center">
                        <Lotus className="h-9 w-9 text-brass/40" strokeWidth="1" />

                        <Display size="md" as="p" className="mt-8 text-ink">
                            {t('এখানে এখনো কিছু নেই', 'Nothing here yet')}
                        </Display>

                        <p lang={lang} className="mt-4 max-w-sm text-sm text-ink-soft">
                            {t(
                                'এই বিভাগে এখনো কোনো ভিডিও প্রকাশ করা হয়নি। প্রথমটি আপনারই হতে পারে।',
                                'No videos published in this category yet. The first one could be yours.',
                            )}
                        </p>

                        <button
                            type="button"
                            onClick={openSubmit}
                            className="caps mt-10 border border-brass/40 px-8 py-4 text-[9px] text-brass transition-colors duration-500 hover:bg-brass hover:text-paper"
                        >
                            {t('প্রতিভা জমা দিন', 'Submit your talent')}
                        </button>
                    </div>
                )}
            </Section>

            <CtaBand onOpenSubmit={openSubmit} />

            <SubmitTalentModal open={showSubmit} onClose={() => setShowSubmit(false)} />
        </PublicLayout>
    );
}

/**
 * ArchiveCard — compact grid card.
 *
 * No panel background and no border: at four across, framed cards produce a wall
 * of boxes. The thumbnail is the frame, and everything under it is plain type,
 * which lets the grid read as a contact sheet.
 */
function ArchiveCard({ video, eager = false }) {
    const { lang, t } = useLang();

    const name = lang === 'bn' ? (video.nameBn ?? video.name) : video.name;
    const title = lang === 'bn' ? (video.titleBn ?? video.title) : video.title;

    return (
        <a
            href={watchUrl(video.id)}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
        >
            <div className="border border-brass/10 transition-colors duration-700 group-hover:border-brass/35">
                <VideoFrame
                    videoId={video.id}
                    previewStart={30}
                    alt={t(`${name} — পরিবেশনা`, `${name} performing`)}
                    ratio={16 / 10}
                    eager={eager}
                >
                    {({ previewReady }) => (
                        <>
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/85 to-transparent"
                            />

                            <span
                                lang={lang}
                                className="caps absolute left-3 top-3 border border-brass/35 bg-ink/70 px-2.5 py-1 text-[8px] text-brass-lit backdrop-blur-md"
                            >
                                {CATEGORIES[video.category]?.[lang]}
                            </span>

                            <span className="caps absolute bottom-3 right-3 text-[8px] text-surface/80">
                                {localeDigits(video.duration, lang)}
                            </span>

                            <PlayBadge
                                active={previewReady}
                                className="bottom-3 left-3 h-10 w-10"
                            />
                        </>
                    )}
                </VideoFrame>
            </div>

            <h3
                lang={lang}
                className="mt-4 text-sm font-medium leading-snug text-ink transition-colors duration-500 group-hover:text-brass-deep"
            >
                {title}
            </h3>

            <p lang={lang} className="mt-1.5 text-xs text-ink-soft">
                {name}
            </p>

            <p className="caps mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[8px] text-ink-mute">
                <span lang={lang}>{video.district[lang]}</span>
                <span className="h-px w-3 bg-brass/40" />
                <span>
                    {localeDigits(video.views, lang)} {t('দেখা', 'views')}
                </span>
                <span className="h-px w-3 bg-brass/40" />
                <span>
                    {localeDigits(video.likes, lang)} {t('পছন্দ', 'likes')}
                </span>
            </p>
        </a>
    );
}
