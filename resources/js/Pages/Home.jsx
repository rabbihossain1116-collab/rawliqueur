import { useState, useCallback } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Section from '@/Components/Section';
import Reveal from '@/Components/Reveal';
import SectionHeading from '@/Components/SectionHeading';
import HeroCinematic from '@/Components/HeroCinematic';
import TalentSpotlightCard from '@/Components/TalentSpotlightCard';
import RawManifesto from '@/Components/RawManifesto';
import AdvisorStrip from '@/Components/AdvisorStrip';
import WinnerTeaser from '@/Components/WinnerTeaser';
import CtaBand from '@/Components/CtaBand';
import SubmitTalentModal from '@/Components/SubmitTalentModal';
import HomeVideos from '@/Components/HomeVideos';
import VideoLightbox from '@/Components/VideoLightbox';
import { PhraseMarquee } from '@/Components/Marquee';
import { useLang } from '@/hooks/useLang';
import { todaysTalent, performerNames } from '@/data/talent';
import { TAGLINE_EN } from '@/brand';

/**
 * Home.
 *
 * Section order is deliberate and answers the visitor's questions in the order
 * they actually occur:
 *
 *   hero        → what is this?
 *   marquee     → who is on it?          (proof of life, and a visual breather)
 *   talent      → show me today's work.   ← the heart of the page
 *   videos      → the archive, playable on-site (lightbox).
 *   manifesto   → why should I trust it?
 *   winner      → what do I get?
 *   advisors    → who else stands behind it?
 *   cta         → alright, how do I enter?
 *
 * Language comes from the `useLang` store rather than page state, so nothing
 * here has to thread it down.
 */
export default function Home() {
    const [showSubmit, setShowSubmit] = useState(false);
    // The record currently open in the lightbox, or null when closed.
    const [playing, setPlaying] = useState(null);
    const { lang, t } = useLang();

    const openSubmit = useCallback(() => setShowSubmit(true), []);
    const closeSubmit = useCallback(() => setShowSubmit(false), []);

    // The hero plays the day's first performance behind the type.
    const [feature] = todaysTalent;

    return (
        <PublicLayout overHero onOpenSubmit={openSubmit}>
            <Head>
                <title>{`RAW LIQUEUR — ${TAGLINE_EN}`}</title>
                <meta
                    name="description"
                    content="Bengali singers, poets and dancers, filmed in one unbroken take. No AI, no editing, no filters. Two new performances every day."
                />
            </Head>

            <HeroCinematic feature={feature} scrollTo="talent" onSubmit={openSubmit} />

            {/* Performer roll. Sits directly under the hero as a decompression
                band between two heavy sections, and doubles as proof that real
                people are on the channel. */}
            <div className="grain border-y border-brass/10 bg-paper py-5">
                <PhraseMarquee
                    phrases={performerNames.map((performer) => performer[lang])}
                />
            </div>

            {/* ── Today's talent — the heart of the page ───────────────────── */}
            <Section id="talent" tone="canvas" pad="loose">
                <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
                    <SectionHeading
                        eyebrow={t('আজকের প্রতিভা', "Today's talent")}
                        title={t(
                            'দুটি পরিবেশনা, প্রতিদিন',
                            'Two performances, every day',
                        )}
                    />

                    <Reveal delay={200} className="max-w-xs shrink-0">
                        <p lang={lang} className="text-sm leading-relaxed text-ink-soft">
                            {t(
                                'অর্ধেকটা এখানে দেখুন, বাকিটা ইউটিউবে। কাঁচা, অসম্পাদিত — সরাসরি শিল্পীর কাছ থেকে।',
                                'Watch half here, the rest on YouTube. Raw and unedited, straight from the performer.',
                            )}
                        </p>
                    </Reveal>
                </div>

                <div className="mt-16 grid gap-8 md:grid-cols-2 lg:mt-24 lg:gap-12">
                    {todaysTalent.map((talent, index) => (
                        <Reveal key={talent.id} delay={index * 150}>
                            <TalentSpotlightCard talent={talent} index={index} />
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={200} className="mt-16 flex justify-center">
                    <Link
                        href="/videos"
                        className="caps group inline-flex items-center gap-3 border border-brass/30 px-9 py-4 text-[9px] text-brass transition-colors duration-500 hover:bg-brass hover:text-paper"
                    >
                        {t('সব পরিবেশনা দেখুন', 'Browse all performances')}
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
            </Section>

            <HomeVideos onOpen={setPlaying} />

            <RawManifesto />

            <WinnerTeaser />

            <AdvisorStrip />

            <CtaBand onOpenSubmit={openSubmit} />

            <SubmitTalentModal open={showSubmit} onClose={closeSubmit} />

            {/* On-site player. Unmounts to null when closed, which stops the
                iframe and its audio dead — hiding it would leave the video
                playing behind the backdrop. */}
            {playing && (
                <VideoLightbox video={playing} onClose={() => setPlaying(null)} />
            )}
        </PublicLayout>
    );
}
