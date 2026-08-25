import { Children } from 'react';
import { Lotus } from '@/Components/Ornament';

/**
 * Marquee — the horizontal ticker band.
 *
 * The track renders its children exactly twice and animates to -50%, so the
 * second copy is under the cursor the instant the first scrolls out and the
 * seam is invisible. Two copies is not arbitrary: the `marquee` keyframe in
 * app.css translates by -50% specifically because of it. If you ever render
 * three copies, that keyframe has to become -66.666%.
 *
 * Runs on transform only, so it composites on the GPU and costs nothing on the
 * main thread. `prefers-reduced-motion` stops it via the global opt-out in
 * app.css rather than a guard here.
 */
export default function Marquee({ children, className = '', reverse = false }) {
    const items = Children.toArray(children);

    return (
        <div
            className={`edge-fade-x relative overflow-hidden ${className}`}
            // The band is decorative repetition; announcing it twice to a
            // screen reader is pure noise.
            aria-hidden="true"
        >
            <div
                className="marquee-track items-center"
                style={reverse ? { animationDirection: 'reverse' } : undefined}
            >
                {/* Copy A, then copy B. See note above before changing this. */}
                {[0, 1].map((copy) => (
                    <div key={copy} className="flex shrink-0 items-center">
                        {items}
                    </div>
                ))}
            </div>
        </div>
    );
}

/**
 * The site's manifesto band — a phrase list separated by lotus motifs.
 *
 * Used to carry "No AI · No Edit · One Take" across full-bleed rules. Sized
 * small and letter-spaced so it behaves like a caption rail, not a headline.
 */
export function PhraseMarquee({ phrases, className = '' }) {
    return (
        <Marquee className={className}>
            {phrases.map((phrase, index) => (
                <span
                    key={`${phrase}-${index}`}
                    className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12"
                >
                    <span className="caps-wide whitespace-nowrap text-[10px] text-ink/55 sm:text-xs">
                        {phrase}
                    </span>
                    <Lotus className="h-4 w-4 shrink-0 text-brass/60" strokeWidth="1.4" />
                </span>
            ))}
        </Marquee>
    );
}
