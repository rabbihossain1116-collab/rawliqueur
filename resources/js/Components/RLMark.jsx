import { TAGLINE_EN } from '@/brand';

/**
 * Brand marks.
 *
 * Built from DOM text and borders rather than SVG <text>. An SVG <text> node
 * using a webfont paints with the fallback face until the font loads and then
 * snaps — very visible on a logo. Real text avoids that and stays scalable.
 *
 * `tone` — 'ink' for use on paper, 'paper' for use over dark footage (the
 * hero). On footage the dark brass would vanish, so the paper tone swaps to
 * lit brass and keeps crimson at its brighter step. Same geometry either way.
 */

const TONES = {
    ink: {
        frame: 'border-brass/50',
        inner: 'border-brass/20',
        r: 'text-brass',
        l: 'text-crimson',
        title: 'text-ink group-hover:text-brass-deep',
        tagline: 'text-ink-mute',
    },
    paper: {
        frame: 'border-brass-lit/60',
        inner: 'border-brass-lit/25',
        r: 'text-brass-lit',
        l: 'text-crimson-lit',
        title: 'text-paper group-hover:text-brass-lit',
        tagline: 'text-paper/50',
    },
};

/**
 * RLMark — the monogram seal.
 *
 * A double rule (outer frame plus inset hairline) reads as an engraved plate.
 * Corners stay sharp; rounding them makes it read as an app icon.
 */
export default function RLMark({
    tone = 'ink',
    className = 'h-10 w-10',
    interactive = true,
}) {
    const t = TONES[tone] ?? TONES.ink;

    return (
        <span
            className={`relative inline-flex shrink-0 items-center justify-center border ${
                interactive ? `transition-colors duration-500 group-hover:border-brass` : ''
            } ${t.frame} ${className}`}
            role="img"
            aria-label="RAW LIQUEUR"
        >
            {/* Inset hairline — the second rule of the engraved plate. */}
            <span
                aria-hidden="true"
                className={`pointer-events-none absolute inset-[3px] border ${t.inner}`}
            />

            {/* `leading-none` and the nudge stop the serif's descender from
                pushing the pair visually below centre inside the frame. */}
            <span
                aria-hidden="true"
                className="display relative -top-px text-[0.95em] leading-none tracking-tight"
            >
                <span className={t.r}>R</span>
                <span className={t.l}>L</span>
            </span>
        </span>
    );
}

/**
 * Wordmark — "RAW LIQUEUR" plus the tagline, stacked.
 *
 * Wide tracking is the whole design: at 0.3em+ the words stop being a name and
 * become a masthead, which is what makes the header read as a publication
 * rather than a product.
 */
export function Wordmark({ tone = 'ink', className = '', withTagline = true }) {
    const t = TONES[tone] ?? TONES.ink;

    return (
        <span className={`flex flex-col justify-center ${className}`}>
            <span
                className={`caps text-[0.7rem] leading-none transition-colors duration-500 sm:text-[0.78rem] ${t.title}`}
            >
                Raw Liqueur
            </span>

            {withTagline && (
                <span
                    className={`caps mt-1.5 text-[0.4rem] leading-none sm:text-[0.45rem] ${t.tagline}`}
                >
                    {TAGLINE_EN}
                </span>
            )}
        </span>
    );
}
