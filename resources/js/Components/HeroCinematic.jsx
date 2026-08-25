import { useState, useEffect, useCallback } from 'react';
import Reveal from '@/Components/Reveal';
import { useLang } from '@/hooks/useLang';
import { previewEmbedUrl, thumbUrl, HERO_EYEBROW, HERO_TITLE } from '@/brand';
import { CATEGORIES } from '@/data/talent';

/**
 * HeroCinematic — the opening frame.
 *
 * Full-bleed performance footage plays silently behind the type: the film IS
 * the hero, the type is the caption laid over it. This is the one deliberately
 * dark surface at the top of a light site — like the screening room before you
 * walk out into the gallery. The cut from ink footage to paper below is
 * intentional; softening it would read as an accident rather than a decision.
 *
 * Copy comes straight from the channel's own identity (see brand.js): the
 * "প্রতিভা ও কবিতা গানে" eyebrow and the "বাঙালির প্রাণে" title.
 *
 * ── Loading strategy ─────────────────────────────────────────────────────
 * The poster still paints first, the muted YouTube loop mounts a beat later
 * and cross-fades in — so there is never an empty black box, and the iframe
 * never competes with the fonts for the first paint. Reduced-motion visitors
 * keep the poster; no iframe mounts at all.
 */
export default function HeroCinematic({ feature, scrollTo = 'talent', onSubmit }) {
    const { lang, isBn, t } = useLang();

    const [allowVideo, setAllowVideo] = useState(false);
    const [videoReady, setVideoReady] = useState(false);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        // Long enough for the poster and headline to land first.
        const timer = setTimeout(() => setAllowVideo(true), 700);
        return () => clearTimeout(timer);
    }, []);

    const handleScroll = useCallback(
        (event) => {
            const target = document.getElementById(scrollTo);
            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        },
        [scrollTo],
    );

    const performer = lang === 'bn' ? (feature.nameBn ?? feature.name) : feature.name;
    const category = CATEGORIES[feature.category]?.[lang] ?? feature.category;

    return (
        <section className="grain relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink">
            {/* ── Footage ──────────────────────────────────────────────────── */}
            <div className="absolute inset-0" aria-hidden="true">
                <img
                    src={thumbUrl(feature.id, 'maxres')}
                    alt=""
                    loading="eager"
                    decoding="async"
                    // Slow ken-burns keeps the frame alive before the loop
                    // arrives; reduced-motion visitors get it frozen.
                    className="animate-kenburns absolute inset-0 h-full w-full object-cover"
                />

                {allowVideo && (
                    <iframe
                        src={previewEmbedUrl(feature.id, { start: feature.previewStart })}
                        title=""
                        tabIndex={-1}
                        allow="autoplay; encrypted-media"
                        onLoad={() => setVideoReady(true)}
                        // 177.78vh is 16:9 against viewport height; min-w-full
                        // covers any viewport shape without letterboxing. Extra
                        // height crops YouTube's chrome out of frame.
                        className={`pointer-events-none absolute left-1/2 top-1/2 h-[calc(100%+200px)] min-w-full -translate-x-1/2 -translate-y-1/2 border-0 transition-opacity duration-[1400ms] ${
                            videoReady ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{ width: '177.78vh' }}
                    />
                )}
            </div>

            {/* Two-part darkening: a vignette protecting the type, plus a ramp
                so the lower rail always sits on something. */}
            <div className="vignette absolute inset-0" aria-hidden="true" />
            <div
                className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink via-ink/55 to-transparent"
                aria-hidden="true"
            />

            {/* ── Type ─────────────────────────────────────────────────────── */}
            <div className="relative mx-auto flex h-full max-w-[1560px] flex-col justify-end px-5 pb-16 pt-32 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
                <Reveal className="flex items-center gap-5" y={16}>
                    <span className="rule-brass w-14 opacity-80 sm:w-24" />
                    <span lang={lang} className="caps-wide text-[10px] text-brass-lit">
                        {HERO_EYEBROW[lang]}
                    </span>
                </Reveal>

                {/* Title card wipe — the channel's own lockup, exactly as it
                    reads on rawliqueur.com: RAW LIQUEUR বাঙালির প্রাণে.
                    Latin set in Cormorant caps, Bangla in the heavier Bengali
                    display face, with the gold shimmer on the Bangla words so
                    the metal lands on the mother tongue. */}
                <Reveal variant="mask" delay={200} className="mt-8">
                    <h1
                        lang={isBn ? 'bn' : 'en'}
                        className={`text-balance text-paper ${
                            isBn
                                ? 'display-bn text-[2.1rem] leading-[1.25] sm:text-[3.2rem] lg:text-[4.5rem]'
                                : 'display text-[2.6rem] leading-[1.08] sm:text-[4rem] lg:text-[5.5rem]'
                        }`}
                    >
                        <span className="caps tracking-[0.14em] sm:tracking-[0.2em]">
                            RAW LIQUEUR
                        </span>{' '}
                        <span className="gold-text">{HERO_TITLE[lang]}</span>
                    </h1>
                </Reveal>

                <Reveal
                    variant="line"
                    delay={520}
                    className="mt-9 h-px w-full max-w-md bg-gradient-to-r from-brass-lit/70 to-transparent"
                />

                {/* ── Bottom rail ──────────────────────────────────────────── */}
                <div className="mt-11 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <Reveal delay={620} className="flex flex-wrap items-center gap-6">
                            <a
                                href={`#${scrollTo}`}
                                onClick={handleScroll}
                                className="caps group inline-flex items-center gap-3 bg-crimson px-8 py-4 text-[10px] text-surface transition-colors duration-500 hover:bg-crimson-deep"
                            >
                                {t('আজকের প্রতিভা দেখুন', "See Today's Talent")}
                                <svg
                                    className="h-3 w-3 transition-transform duration-500 group-hover:translate-y-1"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0 7-7m-7 7-7-7" />
                                </svg>
                            </a>

                            {/* Secondary over footage: outline flips to paper
                                fill on hover. */}
                            {onSubmit ? (
                                <button
                                    type="button"
                                    onClick={onSubmit}
                                    className="caps border border-paper/40 px-8 py-4 text-[10px] text-paper transition-colors duration-500 hover:bg-paper hover:text-ink"
                                >
                                    {t('প্রতিভা জমা দিন', 'Submit Your Talent')}
                                </button>
                            ) : (
                                <a
                                    href="/#submit"
                                    className="caps border border-paper/40 px-8 py-4 text-[10px] text-paper transition-colors duration-500 hover:bg-paper hover:text-ink"
                                >
                                    {t('প্রতিভা জমা দিন', 'Submit Your Talent')}
                                </a>
                            )}

                            {/* Scroll cue: hairline track, brass sliver falling
                                through it on a loop. */}
                            <span
                                aria-hidden="true"
                                className="relative hidden h-14 w-px overflow-hidden bg-paper/20 lg:block"
                            >
                                <span className="animate-scroll-cue absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent via-brass-lit to-transparent" />
                            </span>
                        </Reveal>

                        <Reveal delay={720}>
                            <p
                                lang={lang}
                                className={
                                    isBn
                                        ? 'mt-8 max-w-md text-sm leading-relaxed tracking-[0.14em] text-paper/65'
                                        : 'caps-wide mt-8 max-w-md text-[10px] leading-relaxed text-paper/65'
                                }
                            >
                                {isBn
                                    ? 'কোনো এআই নয়। কোনো এডিট নয়। শুধু প্রতিভা।'
                                    : 'No AI. No edit. Just talent.'}
                            </p>
                        </Reveal>
                    </div>

                    {/* Now-playing credit. Crediting the performer under their
                        footage — rather than using it as anonymous wallpaper —
                        states the channel's ethic on the first screen. */}
                    <Reveal
                        delay={840}
                        className="w-fit border-l border-brass-lit/40 pl-5 lg:border-l-0 lg:border-r lg:pl-0 lg:pr-5 lg:text-right"
                    >
                        <p className="caps text-[8px] text-brass-lit">
                            {t('এখন চলছে', 'Now playing')}
                        </p>
                        <p lang={lang} className="mt-2.5 text-sm font-medium text-paper">
                            {performer}
                        </p>
                        <p lang={lang} className="caps mt-1.5 text-[8px] text-paper/55">
                            {category} · {feature.district[lang]}
                        </p>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
