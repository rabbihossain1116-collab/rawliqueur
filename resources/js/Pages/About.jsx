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
import { Paisley, AlponaDivider } from '@/Components/Ornament';
import { useLang } from '@/hooks/useLang';
import { advisors } from '@/data/advisors';
import { watchUrl } from '@/brand';
import { counter } from '@/lib/format';

/**
 * About — the story, then the advisory council.
 *
 * Per the brief the council is the substance of this page: five to six
 * established figures, each with a roughly five-minute message, of which about
 * half sits on the page and the rest is on YouTube.
 *
 * They are laid out as alternating full-width rows rather than a grid. A grid of
 * six equal cards flattens a hierarchy of senior industry names into a
 * directory; alternating rows give each one a full spread and force the reader
 * to move through them one at a time, which is the correct pace for this
 * content.
 */
export default function About() {
    const { lang, t } = useLang();
    const [showSubmit, setShowSubmit] = useState(false);

    const openSubmit = useCallback(() => setShowSubmit(true), []);

    return (
        <PublicLayout onOpenSubmit={openSubmit}>
            <Head>
                <title>{t('আমাদের কথা — RAW LIQUEUR', 'About — RAW LIQUEUR')}</title>
                <meta
                    name="description"
                    content="Why RAW LIQUEUR exists, and the senior artists, directors and journalists standing behind it."
                />
            </Head>

            <PageHeader
                eyebrow={t('আমাদের কথা', 'About us')}
                title={t(
                    'মঞ্চ নয়, গলাটাই আসল',
                    'The stage was never the point',
                )}
                lead={t(
                    'বাংলাদেশের গান, কবিতা আর নৃত্যের প্রতিভা খুঁজে বের করা এবং কোনো সম্পাদনা ছাড়া প্রকাশ করা — এই একটাই কাজ আমরা করি।',
                    'We find singers, poets and dancers across Bangladesh and publish them with no editing at all. That is the whole undertaking.',
                )}
            />

            {/* ── Story ────────────────────────────────────────────────────── */}
            <Section tone="canvas">
                <div className="grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-24">
                    <div className="lg:sticky lg:top-32 lg:self-start">
                        <SectionHeading
                            eyebrow={t('শুরুর কথা', 'How it began')}
                            title={t('কেন এই চ্যানেল', 'Why this channel')}
                        />
                    </div>

                    <div className="space-y-7">
                        {[
                            t(
                                'ঢাকার বাইরে গান শেখার জায়গা কম, মঞ্চ আরও কম। অথচ গান আছে — উঠোনে, ছাদে, স্কুলের বারান্দায়। শোনার লোক ছিল না, এটাই একমাত্র সমস্যা।',
                                'Outside Dhaka there are few places to learn and fewer stages to stand on. The singing is there regardless — in courtyards, on rooftops, along school verandas. The only thing missing was anyone listening.',
                            ),
                            t(
                                'আমরা তাই সবচেয়ে সহজ পথটাই নিয়েছি। একটা ইউটিউব চ্যানেল, প্রতিদিন দুটি পরিবেশনা, আর একটাই নিয়ম — যা তোলা হয়েছে, ঠিক তাই প্রকাশ হবে। কোনো কাট নেই, কোনো ফিল্টার নেই, কোনো এআই নেই।',
                                'So we took the simplest route available. A YouTube channel, two performances a day, and one rule — what was recorded is what goes out. No cuts, no filters, no AI.',
                            ),
                            t(
                                'এই ওয়েবসাইটে প্রতিদিনের পরিবেশনার অর্ধেকটা দেখা যায়। বাকিটা চ্যানেলে, কারণ শিল্পীর কাজের স্বীকৃতি সেখানেই জমা হয় — দর্শকের মন্তব্যে, পছন্দে, শেয়ারে।',
                                'This site carries about half of each day\'s performance. The rest is on the channel, because that is where the recognition accumulates for the performer — in the comments, the likes, the shares.',
                            ),
                            t(
                                'প্রতি মাসে একজন এবং প্রতি বছরে একজনকে আমরা আলাদাভাবে সম্মান জানাই, আর ছোট একটা উপহার তাঁদের ঠিকানায় পাঠিয়ে দিই। এটা প্রতিযোগিতা নয় — স্বীকৃতি।',
                                'Each month, and each year, we single one person out and post a small gift to their address. It is not a competition; it is an acknowledgement.',
                            ),
                        ].map((paragraph, index) => (
                            <Reveal key={index} delay={index * 80}>
                                <p
                                    lang={lang}
                                    className="text-[0.95rem] leading-loose text-ink-soft"
                                >
                                    {paragraph}
                                </p>
                            </Reveal>
                        ))}

                        {/* Pull quote — the thesis of the whole project. */}
                        <Reveal delay={340} className="!mt-16 flex gap-6">
                            <Paisley
                                className="mt-1 h-7 w-7 shrink-0 text-brass/50"
                                strokeWidth="1.2"
                            />
                            <Display size="lg" as="blockquote" className="text-ink">
                                {t(
                                    'একটা কাট প্রতিভা বাড়ায় না। শুধু ভুলটা সরিয়ে দেয়।',
                                    'A cut does not add talent. It only removes the mistake.',
                                )}
                            </Display>
                        </Reveal>
                    </div>
                </div>
            </Section>

            {/* ── Advisory council ─────────────────────────────────────────── */}
            <Section id="advisors" tone="paper" pad="loose">
                <SectionHeading
                    align="center"
                    eyebrow={t('উপদেষ্টা পরিষদ', 'Advisory council')}
                    title={t('যাঁরা পাশে আছেন', 'Those standing with us')}
                    lead={t(
                        'মিডিয়ার জ্যেষ্ঠ শিল্পী, পরিচালক ও সাংবাদিকেরা। প্রত্যেকের একটি বার্তার অর্ধেকটা এখানে — বাকিটা চ্যানেলে।',
                        'Senior artists, directors and journalists. Half of each message sits here; the rest is on the channel.',
                    )}
                    className="mx-auto"
                />

                <AlponaDivider className="mt-16" />

                <div className="mt-16 space-y-24 lg:mt-24 lg:space-y-36">
                    {advisors.map((advisor, index) => {
                        // Alternate the media side. `lg:order-*` rather than a
                        // reversed array so the DOM order always matches the
                        // reading order for assistive tech and on mobile.
                        const mediaRight = index % 2 === 1;

                        return (
                            <Reveal
                                key={advisor.slug}
                                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20"
                            >
                                {/* Media */}
                                <a
                                    href={watchUrl(advisor.videoId)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`group relative block border border-brass/15 transition-[transform,border-color,box-shadow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-brass/40 hover:shadow-frame ${
                                        mediaRight ? 'lg:order-2' : ''
                                    }`}
                                >
                                    <VideoFrame
                                        videoId={advisor.videoId}
                                        previewStart={advisor.previewStart}
                                        alt={t(
                                            `${advisor.name.bn} — বার্তা`,
                                            `${advisor.name.en} — message`,
                                        )}
                                        ratio={16 / 9}
                                    >
                                        {({ previewReady }) => (
                                            <>
                                                <span
                                                    aria-hidden="true"
                                                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent"
                                                />
                                                <PlayBadge
                                                    active={previewReady}
                                                    className="bottom-5 left-5 h-13 w-13"
                                                />
                                                <span className="caps absolute bottom-6 right-5 text-[8px] text-surface/80">
                                                    {t('অর্ধেক', 'Half')}
                                                </span>
                                            </>
                                        )}
                                    </VideoFrame>

                                    {/* Same half/half device as the talent cards,
                                        so the model is stated identically wherever
                                        it applies. */}
                                    <div className="flex h-[3px] w-full">
                                        <span className="w-1/2 bg-gradient-to-r from-brass-deep to-brass" />
                                        <span className="w-1/2 bg-crimson/25 transition-colors duration-700 group-hover:bg-crimson/70" />
                                    </div>
                                </a>

                                {/* Text */}
                                <div className={mediaRight ? 'lg:order-1' : ''}>
                                    <div className="flex items-center gap-4">
                                        <span
                                            aria-hidden="true"
                                            className="display text-xl leading-none text-brass/45"
                                        >
                                            {counter(index, lang)}
                                        </span>
                                        <span className="rule-brass w-10" />
                                        <span
                                            lang={lang}
                                            className="caps text-[8px] text-brass/80"
                                        >
                                            {advisor.role[lang]}
                                        </span>
                                    </div>

                                    <Display size="lg" as="h2" className="mt-6 text-ink">
                                        {advisor.name[lang]}
                                    </Display>

                                    <p
                                        lang={lang}
                                        className="mt-6 max-w-lg text-[0.95rem] leading-loose text-ink-soft"
                                    >
                                        {advisor.bio[lang]}
                                    </p>

                                    <a
                                        href={watchUrl(advisor.videoId)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="caps link-underline mt-9 inline-flex items-center gap-3 text-[9px] text-brass"
                                    >
                                        {t('পুরো বার্তা দেখুন', 'Watch the full message')}
                                        <svg
                                            className="h-2.5 w-2.5"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            aria-hidden="true"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7 7 7-7 7" />
                                        </svg>
                                    </a>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </Section>

            <CtaBand onOpenSubmit={openSubmit} />

            <SubmitTalentModal open={showSubmit} onClose={() => setShowSubmit(false)} />
        </PublicLayout>
    );
}
