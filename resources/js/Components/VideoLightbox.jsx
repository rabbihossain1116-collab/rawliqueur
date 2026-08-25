import { useState, useEffect, useRef, useCallback } from 'react';
import Display from '@/Components/Display';
import { AlponaCorner } from '@/Components/Ornament';
import { useLang } from '@/hooks/useLang';
import { watchUrl, thumbUrl } from '@/brand';

/**
 * VideoLightbox — plays a video on-site.
 *
 * Per the brief, visitors watch without being pushed off to YouTube; the
 * channel link is offered afterwards, not forced before the viewing.
 *
 * ── Why the panel is dark on a light site ────────────────────────────────
 * Video reads correctly only against a dark surround — a cinema screen, not a
 * lit room. Floating the player on cream would halo the footage grey. So this
 * is the one deliberately dark surface on the site: dimmed ink backdrop, ink
 * panel, brass frame. It also makes the modal unmistakably "a screening is
 * happening now".
 *
 * Sound is ON here (no mute parameter). This is a deliberate click with intent
 * to watch — muting a performance someone chose to play defeats the point,
 * unlike the ambient hero previews which must stay silent.
 */
export default function VideoLightbox({ video, onClose }) {
    const { lang, t } = useLang();

    const panelRef = useRef(null);
    const restoreFocusTo = useRef(null);

    const [quality, setQuality] = useState('maxres');

    // Lock the page behind the player.
    useEffect(() => {
        if (!video) return;

        document.body.style.overflow = 'hidden';
        restoreFocusTo.current = document.activeElement;
        panelRef.current?.focus();

        return () => {
            document.body.style.overflow = '';
            restoreFocusTo.current?.focus?.();
        };
    }, [video]);

    const onKeyDown = useCallback(
        (event) => {
            if (event.key !== 'Escape') return;
            onClose();
        },
        [onClose],
    );

    useEffect(() => {
        if (!video) return;
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [video, onKeyDown]);

    if (!video) return null;

    const name = lang === 'bn' ? (video.nameBn ?? video.name) : video.name;
    const title = lang === 'bn' ? (video.titleBn ?? video.title) : video.title;

    // Playback embed: controls on, autoplay with sound (a direct response to a
    // click), no related-videos rabbit hole at the end.
    const embed =
        `https://www.youtube-nocookie.com/embed/${video.id}` +
        '?autoplay=1&rel=0&modestbranding=1&playsinline=1';

    return (
        <div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/85 p-4 backdrop-blur-md sm:p-8"
            onMouseDown={(event) => {
                // Only an unbroken press on the backdrop closes — see note in
                // SubmitTalentModal about text-selection drags.
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <div
                ref={panelRef}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                aria-label={title}
                className="grain relative w-full max-w-5xl border border-brass/30 bg-ink shadow-float outline-none"
            >
                <span aria-hidden="true" className="pointer-events-none text-brass/50">
                    <AlponaCorner corner="tl" className="absolute -left-px -top-px h-10 w-10" />
                    <AlponaCorner corner="br" className="absolute -bottom-px -right-px h-10 w-10" />
                </span>

                {/* Screen. The poster still paints first so there is never an
                    empty black box while the iframe negotiates with YouTube. */}
                <div className="relative aspect-video w-full overflow-hidden bg-ink">
                    <img
                        src={thumbUrl(video.id, quality)}
                        onError={() => setQuality((q) => (q === 'maxres' ? 'hq' : q))}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 h-full w-full object-cover opacity-40"
                    />

                    <iframe
                        src={embed}
                        title={title}
                        allow="autoplay; encrypted-media; fullscreen"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full border-0"
                    />
                </div>

                {/* Caption rail */}
                <div className="flex items-start justify-between gap-5 px-5 py-5 sm:px-7">
                    <div className="min-w-0">
                        <p lang={lang} className="caps text-[8px] text-brass-lit">
                            {name}
                            {video.district ? ` · ${video.district[lang]}` : ''}
                        </p>

                        <Display size="sm" as="h3" className="mt-2 text-paper">
                            {title}
                        </Display>
                    </div>

                    <div className="flex shrink-0 items-center gap-3 pt-1">
                        <a
                            href={watchUrl(video.id)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="caps hidden border border-paper/25 px-4 py-2.5 text-[8px] text-paper/70 transition-colors duration-500 hover:border-brass-lit hover:text-brass-lit sm:inline-block"
                        >
                            {t('ইউটিউবে দেখুন', 'On YouTube')}
                        </a>

                        <button
                            type="button"
                            onClick={onClose}
                            aria-label={t('বন্ধ করুন', 'Close')}
                            className="flex h-9 w-9 items-center justify-center border border-paper/25 text-paper/70 transition-colors duration-500 hover:border-crimson hover:text-crimson-lit"
                        >
                            <svg
                                className="h-3.5 w-3.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.75"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
