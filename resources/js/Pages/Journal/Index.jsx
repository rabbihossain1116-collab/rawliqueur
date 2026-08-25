import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import Section from '@/Components/Section';
import Reveal from '@/Components/Reveal';
import Display from '@/Components/Display';
import { useLang } from '@/hooks/useLang';
import { featuredPost, restPosts } from '@/data/posts';
import { longDate, localeDigits } from '@/lib/format';

/**
 * Journal index — one lead story, then the rest in a grid.
 *
 * An even grid of four posts gives a reader no entry point and reads as a
 * changelog. Promoting one to a full-width spread creates a hierarchy and makes
 * the section feel edited, which is the whole premise of calling it a journal
 * rather than a blog.
 */
export default function JournalIndex() {
    const { lang, t } = useLang();

    return (
        <PublicLayout>
            <Head>
                <title>{t('জার্নাল — RAW LIQUEUR', 'Journal — RAW LIQUEUR')}</title>
                <meta
                    name="description"
                    content="Notes on single-take recording, how we verify submissions, and the talent we find outside Dhaka."
                />
            </Head>

            <PageHeader
                eyebrow={t('জার্নাল', 'Journal')}
                title={t('লেখা, নিয়ম আর নির্দেশিকা', 'Notes, rules and guides')}
                lead={t(
                    'কেন এক টেক, কীভাবে ঘরে বসে ভিডিও তুলবেন, আর জমা পড়া ভিডিও আমরা কীভাবে যাচাই করি — সব এখানে।',
                    'Why a single take, how to record at home, and how we verify what arrives. All of it here.',
                )}
            />

            {/* ── Lead story ───────────────────────────────────────────────── */}
            <Section tone="canvas">
                <Reveal>
                    <Link
                        href={`/journal/${featuredPost.slug}`}
                        className="group grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
                    >
                        <div className="relative overflow-hidden border border-brass/15 bg-surface">
                            <img
                                src={featuredPost.cover}
                                alt=""
                                decoding="async"
                                className="aspect-[16/10] w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                            />
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-paper/60 to-transparent"
                            />
                        </div>

                        <div>
                            <div className="flex items-center gap-4">
                                <span lang={lang} className="caps text-[9px] text-brass">
                                    {featuredPost.tag[lang]}
                                </span>
                                <span className="rule-brass w-10" />
                                <span lang={lang} className="caps text-[8px] text-ink-mute">
                                    {longDate(featuredPost.publishedAt, lang)}
                                </span>
                            </div>

                            <Display
                                size="lg"
                                as="h2"
                                className="mt-6 text-ink transition-colors duration-500 group-hover:text-brass-deep"
                            >
                                {featuredPost.title[lang]}
                            </Display>

                            <p
                                lang={lang}
                                className="mt-6 max-w-lg text-[0.95rem] leading-loose text-ink-soft"
                            >
                                {featuredPost.excerpt[lang]}
                            </p>

                            <span className="caps mt-9 inline-flex items-center gap-3 text-[9px] text-brass">
                                {t('পড়ুন', 'Read')}
                                <svg
                                    className="h-2.5 w-2.5 transition-transform duration-500 group-hover:translate-x-1.5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7 7 7-7 7" />
                                </svg>
                                <span className="text-ink-mute">
                                    · {localeDigits(featuredPost.readMinutes, lang)}{' '}
                                    {t('মিনিট', 'min')}
                                </span>
                            </span>
                        </div>
                    </Link>
                </Reveal>
            </Section>

            {/* ── The rest ─────────────────────────────────────────────────── */}
            <Section tone="paper" pad="loose" watermark>
                <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                    {restPosts.map((post, index) => (
                        <Reveal key={post.slug} delay={(index % 3) * 120}>
                            <Link
                                href={`/journal/${post.slug}`}
                                className="group flex h-full flex-col"
                            >
                                <div className="relative overflow-hidden border border-brass/12 bg-surface">
                                    <img
                                        src={post.cover}
                                        alt=""
                                        loading="lazy"
                                        decoding="async"
                                        className="aspect-[16/10] w-full object-cover grayscale-[35%] transition-[transform,filter] duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-hover:grayscale-0"
                                    />
                                    <span
                                        lang={lang}
                                        className="caps absolute left-4 top-4 border border-brass/35 bg-paper/70 px-3 py-1.5 text-[8px] text-brass backdrop-blur-md"
                                    >
                                        {post.tag[lang]}
                                    </span>
                                </div>

                                <Display
                                    size="md"
                                    as="h3"
                                    className="mt-6 text-ink transition-colors duration-500 group-hover:text-brass-deep"
                                >
                                    {post.title[lang]}
                                </Display>

                                <p
                                    lang={lang}
                                    className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft"
                                >
                                    {post.excerpt[lang]}
                                </p>

                                <p className="caps mt-6 flex items-center gap-3 text-[8px] text-ink-mute">
                                    <span lang={lang}>{longDate(post.publishedAt, lang)}</span>
                                    <span className="h-px w-4 bg-brass/40" />
                                    <span>
                                        {localeDigits(post.readMinutes, lang)}{' '}
                                        {t('মিনিট', 'min')}
                                    </span>
                                </p>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </Section>
        </PublicLayout>
    );
}
