import { useState, useRef, useCallback, useEffect } from 'react';
import { previewEmbedUrl, thumbUrl } from '@/brand';

/**
 * VideoFrame — a still that becomes a silent preview on hover.
 *
 * Every card on the site (talent, advisor, winner, archive) needs the same
 * behaviour, and it was previously reimplemented per card with slightly
 * different — and in two cases wrong — iframe sizing. This owns it once.
 *
 * ── Why `ratio` is a number, not a Tailwind class ─────────────────────────
 * A YouTube embed letterboxes its video inside the iframe, so to fill a frame
 * with no black bars the iframe must both keep 16:9 *and* overflow the frame.
 * The required width is `max(100%, (16/9 ÷ frameRatio) × 100%)`.
 *
 * Previously the frame's aspect lived in a class (`aspect-[16/10]`) and the
 * matching iframe width lived in a second class (`w-[129%]`) with the
 * derivation written out in a comment — so changing the aspect silently broke
 * the fill. Taking the ratio as a number lets both be derived from one value
 * and makes that class of bug impossible.
 */
export default function VideoFrame({
    videoId,
    previewStart = 0,
    alt = '',
    ratio = 16 / 10,
    children,
    className = '',
    /** Set on the one above-the-fold frame; everything else stays lazy. */
    eager = false,
    /** Disables the hover preview where it would compete for attention. */
    preview = true,
}) {
    const [previewing, setPreviewing] = useState(false);
    const [previewReady, setPreviewReady] = useState(false);
    const [quality, setQuality] = useState('maxres');

    const timer = useRef(null);

    const startPreview = useCallback(() => {
        if (!preview) return;

        // Touch devices fire hover events on tap, which would load an embed on
        // the way to following the link. Reduced-motion users opted out of
        // exactly this kind of thing.
        if (window.matchMedia('(hover: none)').matches) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        // Short delay so a cursor crossing a grid does not spawn six iframes.
        timer.current = setTimeout(() => setPreviewing(true), 260);
    }, [preview]);

    const stopPreview = useCallback(() => {
        clearTimeout(timer.current);
        setPreviewing(false);
        setPreviewReady(false);
    }, []);

    // Never leave a pending timer behind — it would set state after unmount.
    useEffect(() => () => clearTimeout(timer.current), []);

    // See the note above. The extra 4% is overscan, hiding the residual edge
    // of YouTube's own UI.
    const coverWidth = Math.max(1, 16 / 9 / ratio) * 1.04 * 100;

    return (
        <div
            className={`relative overflow-hidden bg-surface ${className}`}
            style={{ aspectRatio: ratio }}
            onMouseEnter={startPreview}
            onMouseLeave={stopPreview}
            onFocus={startPreview}
            onBlur={stopPreview}
        >
            <img
                src={thumbUrl(videoId, quality)}
                // Not every upload has a maxres thumbnail; hq always exists.
                onError={() => setQuality((q) => (q === 'maxres' ? 'hq' : q))}
                alt={alt}
                loading={eager ? 'eager' : 'lazy'}
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
            />

            {previewing && (
                <iframe
                    src={previewEmbedUrl(videoId, { start: previewStart })}
                    title={alt ? `${alt} — preview` : 'preview'}
                    // The preview is decoration over a link: it must never take
                    // focus or be announced.
                    tabIndex={-1}
                    aria-hidden="true"
                    allow="autoplay; encrypted-media"
                    onLoad={() => setPreviewReady(true)}
                    style={{ width: `${coverWidth}%` }}
                    className={`video-cover aspect-video transition-opacity duration-700 ${
                        previewReady ? 'opacity-100' : 'opacity-0'
                    }`}
                />
            )}

            {/* Overlay content — badges, gradients, meta. Rendered above the
                preview, and told whether the preview has taken over so it can
                get out of the way. */}
            {typeof children === 'function' ? children({ previewReady }) : children}
        </div>
    );
}

/**
 * PlayBadge — the crimson play cue.
 *
 * Crimson is the site's action colour and this is the only place it appears at
 * full strength inside a card. It fades out once the preview is running,
 * because at that point it is describing something already happening.
 */
export function PlayBadge({ active = false, className = '' }) {
    return (
        <span
            aria-hidden="true"
            className={`pointer-events-none absolute flex items-center justify-center rounded-full bg-crimson text-ink shadow-[0_10px_30px_-8px_rgb(196_30_58_/_0.6)] transition-all duration-700 ${
                active ? 'translate-y-1 opacity-0' : 'opacity-95'
            } ${className}`}
        >
            <svg className="ml-0.5 h-[38%] w-[38%]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
            </svg>
        </span>
    );
}
