import { useMemo } from 'react';
import Section from '@/Components/Section';
import Reveal from '@/Components/Reveal';
import Display from '@/Components/Display';
import SectionHeading from '@/Components/SectionHeading';
import VideoFrame, { PlayBadge } from '@/Components/VideoFrame';
import { Link } from '@inertiajs/react';
import { useLang } from '@/hooks/useLang';
import { videoLibrary, CATEGORIES } from '@/data/talent';
import { localeDigits } from '@/lib/format';

/**
 * HomeVideos — the archive strip on the homepage.
 *
 * Cards here do NOT link out. Clicking one hands the record up to the page via
 * `onOpen`, which mounts the VideoLightbox — the visitor watches on-site, per
 * the brief, and YouTube is only a follow-up action from inside the player.
 *
 * Shows the six newest submissions; the full list lives on /videos, which the
 * section links to rather than duplicating.
 */
export default function HomeVideos({ onOpen }) {
    const { lang, t } = useLang();

    // Newest first by ISO date — string compare needs no Date parsing.
    const recent = useMemo(
        () => [...videoLibrary].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 6),
        [],
    );

    return (
        <Section id="recent" tone="canvas" pad="loose" watermark="-left-44 -bottom-44 h-[32rem] w-[32rem] text-brass/[0.09]">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <SectionHeading
                    eyebrow={t('সংগ্রহ থেকে', 'From the archive')}
                    title={t('সাম্প্রতিক পরিবেশনা', 'Recent performances')}
                    lead={t(
                        'ক্লিক করলেই এখানেই চলবে — বিরতিহীনভাবে, যেভাবে তোলা হয়েছিল।',
                        'Click any of them and it plays right here — uninterrupted, exactly as it was recorded.',
                    )}
                />

                <Reveal delay={200} className="shrink-0">
                    <Link
                        href="/videos"
                        className="caps group inline-flex items-center gap-3 border border-brass/35 px-7 py-3.5 text-[9px] text-brass transition-colors duration-500 hover:bg-brass hover:text-surface"
                    >
                        {t('সব ভিডিও', 'All videos')}
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

            <div className="mt-14 grid gap-x-7 gap-y-11 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
                {recent.map((video, index) => (
                    <Reveal key={video.id} delay={(index % 3) * 110}>
                        <ArchiveTile video={video} onOpen={onOpen} eager={index < 3} />
                    </Reveal>
                ))}
            </div>
        </Section>
    );
}

/**
 * ArchiveTile — a `<button>`, not a link: the action is opening the player,
 * not navigating anywhere.
 */
function ArchiveTile({ video, onOpen, eager }) {
    const { lang, t } = useLang();

    const name = lang === 'bn' ? (video.nameBn ?? video.name) : video.name;
    const title = lang === 'bn' ? (video.titleBn ?? video.title) : video.title;

    return (
        <button
            type="button"
            onClick={() => onOpen(video)}
            className="group block w-full text-left"
            aria-label={t(`${title} — ${name}, চালু করুন`, `${title} by ${name} — play`)}
        >
            <div className="border border-brass/15 transition-colors duration-700 group-hover:border-brass/45">
                <VideoFrame
                    videoId={video.id}
                    previewStart={30}
                    alt=""
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
                                className="caps absolute left-3 top-3 border border-brass-lit/40 bg-ink/70 px-2.5 py-1 text-[8px] text-brass-lit backdrop-blur-md"
                            >
                                {CATEGORIES[video.category]?.[lang]}
                            </span>

                            <span className="caps absolute bottom-3 right-3 text-[8px] text-surface/75">
                                {localeDigits(video.duration, lang)}
                            </span>

                            <PlayBadge active={previewReady} className="bottom-3 left-3 h-11 w-11" />
                        </>
                    )}
                </VideoFrame>
            </div>

            <Display size="md" as="h3" className="mt-5 text-ink transition-colors duration-500 group-hover:text-brass-deep">
                {title}
            </Display>

            <p className="caps mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[8px] text-ink-mute">
                <span lang={lang}>{name}</span>
                <span className="h-px w-3 bg-brass/40" />
                <span lang={lang}>{video.district[lang]}</span>
            </p>
        </button>
    );
}
