import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Section from '@/Components/Section';
import Reveal from '@/Components/Reveal';
import Display from '@/Components/Display';
import { AlponaDivider, AlponaWatermark, Lotus } from '@/Components/Ornament';
import { useLang } from '@/hooks/useLang';
import { findPost, posts } from '@/data/posts';
import { longDate, localeDigits } from '@/lib/format';

/**
 * Journal article.
 *
 * The route hands over a slug and the lookup happens here, because the content
 * currently lives in `resources/js/data/posts.js` — the server has no post table
 * to validate against yet. Consequence: an unknown slug renders the not-found
 * state below rather than a real 404.
 *
 * When posts move to the database, resolve the model in the controller and pass
 * it as a prop instead; the rendering below does not need to change.
 */
export default function JournalShow({ slug }) {
    const { lang, isBn, t } = useLang();

    const post = findPost(slug);

    if (!post) return <NotFound t={t} />;

    // "More reading" — everything else, newest first, capped at two so the
    // article ends on a suggestion rather than a second index.
    const more = posts.filter((candidate) => candidate.slug !== post.slug).slice(0, 2);

    return (
        <PublicLayout>
            <Head>
                <title>{`${post.title[lang]} — RAW LIQUEUR`}</title>
                <meta name="description" content={post.excerpt.en} />
            </Head>

            {/* ── Article header ───────────────────────────────────────────── */}
            <header className="grain relative overflow-hidden bg-paper px-5 pb-16 pt-36 sm:px-8 sm:pt-44 lg:px-12 lg:pt-52">
                <AlponaWatermark className="-right-44 -top-28 h-[32rem] w-[32rem] text-brass/[0.055]" />

                <div className="relative mx-auto max-w-3xl">
                    <Reveal y={14}>
                        <Link
                            href="/journal"
                            className="caps link-underline inline-flex items-center gap-2.5 text-[9px] text-brass"
                        >
                            <svg
                                className="h-2.5 w-2.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7-7 7 7 7" />
                            </svg>
                            {t('জার্নাল', 'Journal')}
                        </Link>
                    </Reveal>

                    <Reveal variant="mask" delay={120} className="mt-9">
                        <Display size="xl" as="h1" className="text-ink">
                            {post.title[lang]}
                        </Display>
                    </Reveal>

                    <Reveal delay={240} className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
                        <span lang={lang} className="caps text-[9px] text-brass">
                            {post.tag[lang]}
                        </span>
                        <span className="h-px w-8 bg-brass/40" />
                        <span lang={lang} className="caps text-[8px] text-ink-mute">
                            {longDate(post.publishedAt, lang)}
                        </span>
                        <span className="caps text-[8px] text-ink-mute">
                            {localeDigits(post.readMinutes, lang)} {t('মিনিট পড়া', 'min read')}
                        </span>
                        <span className="caps text-[8px] text-ink-mute">{post.author}</span>
                    </Reveal>
                </div>
            </header>

            {/* Cover, breaking out wider than the text column so the article has
                one moment of scale before settling into the measure. */}
            <div className="bg-paper px-5 sm:px-8 lg:px-12">
                <Reveal className="mx-auto max-w-5xl">
                    <div className="overflow-hidden border border-brass/15 bg-surface">
                        <img
                            src={post.cover}
                            alt=""
                            decoding="async"
                            className="aspect-[16/9] w-full object-cover"
                        />
                    </div>
                </Reveal>
            </div>

            {/* ── Body ─────────────────────────────────────────────────────── */}
            <Section tone="paper" width="reading" pad="normal">
                <div className="space-y-7">
                    {post.body[lang].map((paragraph, index) => (
                        <Reveal key={index} delay={index < 4 ? index * 70 : 0}>
                            <p
                                lang={lang}
                                // A dark long-read needs a slightly softer ink and
                                // more leading than a light one, or the lines
                                // bloom into each other.
                                className={`text-ink-soft ${
                                    isBn
                                        ? 'text-[1.02rem] leading-[2]'
                                        : 'text-[1.05rem] leading-[1.9]'
                                }`}
                            >
                                {paragraph}
                            </p>
                        </Reveal>
                    ))}
                </div>

                <AlponaDivider className="mt-16" />

                <Reveal className="mt-12 flex items-start gap-5">
                    <Lotus className="mt-1 h-6 w-6 shrink-0 text-brass/50" strokeWidth="1.2" />
                    <p lang={lang} className="text-xs leading-relaxed text-ink-mute">
                        {t(
                            'RAW LIQUEUR — বাংলাদেশের গান, কবিতা ও নৃত্যের প্রতিভা, এক টেকে ধারণ করা। কোনো এআই নয়, কোনো এডিট নয়।',
                            'RAW LIQUEUR — Bengali singers, poets and dancers, recorded in one unbroken take. No AI, no editing.',
                        )}
                    </p>
                </Reveal>
            </Section>

            {/* ── More reading ─────────────────────────────────────────────── */}
            {more.length > 0 && (
                <Section tone="canvas" pad="normal">
                    <div className="flex items-center gap-4">
                        <span className="caps text-[9px] text-brass">
                            {t('আরও পড়ুন', 'More reading')}
                        </span>
                        <span className="rule-brass flex-1" />
                    </div>

                    <div className="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-8">
                        {more.map((next, index) => (
                            <Reveal key={next.slug} delay={index * 120}>
                                <Link
                                    href={`/journal/${next.slug}`}
                                    className="group flex gap-5"
                                >
                                    <div className="w-28 shrink-0 overflow-hidden border border-brass/12 bg-surface sm:w-32">
                                        <img
                                            src={next.cover}
                                            alt=""
                                            loading="lazy"
                                            decoding="async"
                                            className="aspect-square w-full object-cover grayscale-[40%] transition-[transform,filter] duration-[1200ms] group-hover:scale-105 group-hover:grayscale-0"
                                        />
                                    </div>

                                    <div className="min-w-0">
                                        <p lang={lang} className="caps text-[8px] text-brass/80">
                                            {next.tag[lang]}
                                        </p>
                                        <Display
                                            size="sm"
                                            as="h3"
                                            className="mt-2.5 text-ink transition-colors duration-500 group-hover:text-brass-deep"
                                        >
                                            {next.title[lang]}
                                        </Display>
                                        <p className="caps mt-3 text-[8px] text-ink-mute">
                                            {localeDigits(next.readMinutes, lang)}{' '}
                                            {t('মিনিট', 'min')}
                                        </p>
                                    </div>
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                </Section>
            )}
        </PublicLayout>
    );
}

/** Shown when the slug in the URL matches no post. */
function NotFound({ t }) {
    return (
        <PublicLayout>
            <Head>
                <title>{t('পাওয়া যায়নি — RAW LIQUEUR', 'Not found — RAW LIQUEUR')}</title>
            </Head>

            <Section tone="paper" pad="loose" width="narrow">
                <div className="flex flex-col items-center py-20 text-center">
                    <Lotus className="h-10 w-10 text-brass/50" strokeWidth="1" />

                    <Display size="lg" as="h1" className="mt-9 text-ink">
                        {t('লেখাটি পাওয়া যায়নি', 'That piece is not here')}
                    </Display>

                    <p className="mt-6 max-w-md text-sm text-ink-soft">
                        {t(
                            'হয়তো ঠিকানাটি বদলে গেছে, অথবা লেখাটি সরিয়ে নেওয়া হয়েছে।',
                            'The address may have changed, or the piece was taken down.',
                        )}
                    </p>

                    <Link
                        href="/journal"
                        className="caps mt-11 border border-brass/40 px-9 py-4 text-[9px] text-brass transition-colors duration-500 hover:bg-brass hover:text-paper"
                    >
                        {t('সব লেখা দেখুন', 'All writing')}
                    </Link>
                </div>
            </Section>
        </PublicLayout>
    );
}
