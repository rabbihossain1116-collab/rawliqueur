import { AlponaWatermark } from '@/Components/Ornament';

/**
 * Section — the page's vertical rhythm, in one place.
 *
 * Every section on the site goes through this. When padding and max-width were
 * written per-section, the spacing drifted by a few rem between blocks and the
 * page read as assembled from separate pieces — which is exactly the "ordinary"
 * feeling a design like this has to avoid. Consistent cadence is most of what
 * makes a long dark page feel composed.
 *
 * @param {object} props
 * @param {'paper'|'canvas'|'surface'} [props.tone] Background step. Alternating
 *   `paper` and `canvas` between sections gives the page a slow tidal shift
 *   without ever introducing a second hue.
 * @param {'wide'|'narrow'|'reading'} [props.width] `reading` caps the measure
 *   at ~68 characters for long-form prose.
 * @param {'normal'|'tight'|'loose'} [props.pad]
 * @param {boolean|string} [props.watermark] Adds the alpona rosette behind the
 *   content. Pass a string to override its position classes.
 */
const TONES = {
    paper: 'bg-paper',
    canvas: 'bg-canvas',
    surface: 'bg-surface',
};

const WIDTHS = {
    wide: 'max-w-[1560px]',
    narrow: 'max-w-5xl',
    reading: 'max-w-2xl',
};

const PADS = {
    tight: 'py-16 lg:py-24',
    normal: 'py-24 lg:py-36',
    loose: 'py-28 lg:py-48',
};

export default function Section({
    children,
    id,
    tone = 'canvas',
    width = 'wide',
    pad = 'normal',
    watermark = false,
    grain = true,
    className = '',
    innerClassName = '',
}) {
    return (
        <section
            id={id}
            // `scroll-mt` clears the fixed header when an anchor jumps here;
            // without it the section title lands underneath the bar.
            className={[
                'relative overflow-hidden scroll-mt-24',
                grain ? 'grain' : '',
                TONES[tone],
                PADS[pad],
                'px-5 sm:px-8 lg:px-12',
                className,
            ]
                .filter(Boolean)
                .join(' ')}
        >
            {watermark && (
                <AlponaWatermark
                    className={
                        typeof watermark === 'string'
                            ? watermark
                            : '-right-40 -top-40 h-[32rem] w-[32rem] text-brass/[0.055]'
                    }
                />
            )}

            <div
                className={`relative mx-auto ${WIDTHS[width]} ${innerClassName}`.trim()}
            >
                {children}
            </div>
        </section>
    );
}
