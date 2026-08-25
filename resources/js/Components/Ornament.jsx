/**
 * Ornament — the আলপনা (alpona) vocabulary.
 *
 * Alpona is the swept, curvilinear floor-painting tradition of Bengal: lotus,
 * paisley (কলকা), and trailing vine, always drawn as a single continuous
 * line. Rendering these as hairline strokes rather than filled shapes is what
 * keeps them reading as luxury detailing instead of clipart, so every path
 * here is `fill="none"` with a sub-pixel stroke.
 *
 * All motifs inherit `currentColor`, so a call site sets the colour with a
 * normal text utility (`text-brass/40`) and nothing needs a colour prop.
 *
 * These are decoration with no semantic content — each root carries
 * aria-hidden and is skipped by assistive tech.
 */

/**
 * A single lotus, opening upward, built from one petal rotated five times.
 *
 * Rotation is done with transforms rather than five hand-authored paths
 * because hand-authoring guarantees the symmetry drifts.
 */
export function Lotus({ className = 'h-8 w-8', strokeWidth = 1 }) {
    return (
        <svg
            viewBox="-30 -32 60 40"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            aria-hidden="true"
        >
            {[-52, -26, 0, 26, 52].map((angle) => (
                <path
                    key={angle}
                    // Petal drawn once at 12 o'clock, then fanned out.
                    d="M0,4 C-6,-6 -6,-18 0,-27 C6,-18 6,-6 0,4"
                    transform={`rotate(${angle})`}
                    // Outer petals sit further back so the fan reads as depth.
                    opacity={Math.abs(angle) === 52 ? 0.45 : Math.abs(angle) === 26 ? 0.7 : 1}
                />
            ))}
            {/* Seed at the base, where the petals converge. */}
            <circle cx="0" cy="5" r="1.6" fill="currentColor" stroke="none" />
        </svg>
    );
}

/**
 * কলকা — the paisley teardrop, the single most recognisably Bengali shape in
 * the set. Used where a lotus would be too symmetric, e.g. beside pull quotes.
 */
export function Paisley({ className = 'h-8 w-8', strokeWidth = 1 }) {
    return (
        <svg
            viewBox="0 0 48 64"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            aria-hidden="true"
        >
            {/* Outer teardrop: swells right, then hooks back to a fine point. */}
            <path d="M24 62C10 54 4 42 4 30 4 15 13 2 24 2c11 0 20 12 20 26 0 10-6 17-13 17-6 0-10-5-10-11 0-6 4-10 9-10" />
            {/* Inner echo — the traditional double outline. */}
            <path
                d="M24 54C15 47 11 38 11 29 11 18 17 9 24 9c7 0 13 9 13 19"
                opacity="0.5"
            />
        </svg>
    );
}

/**
 * Section divider: hairline rule → dot → lotus → dot → hairline rule.
 *
 * The rules are gradient-masked to transparent at the outer ends so the
 * divider dissolves into the page instead of stopping at a hard edge.
 */
export function AlponaDivider({ className = '' }) {
    return (
        <div
            className={`flex items-center justify-center gap-4 text-brass/45 ${className}`}
            aria-hidden="true"
        >
            <span className="rule-brass w-16 sm:w-28" />
            <span className="h-1 w-1 rounded-full bg-brass/55" />
            <Lotus className="h-7 w-7 shrink-0" strokeWidth={1.1} />
            <span className="h-1 w-1 rounded-full bg-brass/55" />
            <span className="rule-brass w-16 sm:w-28" />
        </div>
    );
}

/**
 * Corner flourish for framing a panel — a bracket that resolves into a vine
 * curl and a bud.
 *
 * `corner` rotates the same artwork into place. Rotating one asset beats
 * maintaining four near-identical paths.
 */
const CORNER_ROTATION = {
    tl: 0,
    tr: 90,
    br: 180,
    bl: 270,
};

export function AlponaCorner({ corner = 'tl', className = 'h-14 w-14' }) {
    return (
        <svg
            viewBox="0 0 64 64"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            style={{ rotate: `${CORNER_ROTATION[corner] ?? 0}deg` }}
            aria-hidden="true"
        >
            {/* Bracket with a softened elbow. */}
            <path d="M2 46V16C2 8.3 8.3 2 16 2h30" />
            {/* Vine peeling off the elbow into a curl. */}
            <path d="M14 14c0 9 5 15 14 16" opacity="0.6" />
            <path d="M28 30c6 0 9-4 9-9 0-3-2-5-5-5s-5 2-5 5" opacity="0.45" />
            {/* Bud terminal. */}
            <circle cx="46" cy="2" r="1.4" fill="currentColor" stroke="none" />
            <circle cx="2" cy="46" r="1.4" fill="currentColor" stroke="none" />
        </svg>
    );
}

/**
 * AwardSeal — the honour badge used on the winners feature and page.
 *
 * A double brass ring with a lotus at the top and the award label curved
 * beneath it would need textPath and would break at small sizes, so the label is
 * set flat below the lotus instead. Reads as a stamp, survives down to ~72px.
 *
 * Not aria-hidden: unlike the rest of this file it carries real information, so
 * the label is exposed to assistive tech.
 */
export function AwardSeal({ label, sub, className = '' }) {
    return (
        <span
            className={`relative inline-flex aspect-square flex-col items-center justify-center rounded-full border border-brass/50 bg-paper/80 p-4 text-center backdrop-blur-md ${className}`}
        >
            <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-1.5 rounded-full border border-brass/20"
            />
            <Lotus className="h-5 w-5 text-brass" strokeWidth="1.3" />
            <span className="caps mt-1.5 text-[7px] leading-tight text-brass">
                {label}
            </span>
            {sub && (
                <span className="caps mt-1 text-[6px] leading-tight text-ink-mute">
                    {sub}
                </span>
            )}
        </span>
    );
}

/**
 * Oversized paisley watermark for section backgrounds.
 *
 * Sits at very low opacity behind content to break up large flat panels of
 * black. Absolutely positioned by the caller; it never affects layout.
 */
export function AlponaWatermark({ className = '' }) {
    return (
        <div
            className={`pointer-events-none absolute select-none ${className}`}
            aria-hidden="true"
        >
            <svg
                viewBox="0 0 320 320"
                className="h-full w-full"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.6"
                aria-hidden="true"
            >
                {/* Eight paisleys fanned around a centre, the classic alpona
                    rosette. One shape, rotated — same reasoning as Lotus. */}
                {Array.from({ length: 8 }, (_, i) => (
                    <g key={i} transform={`rotate(${i * 45} 160 160)`}>
                        <path d="M160 150c-16-10-24-26-24-42 0-20 11-36 24-36s24 16 24 36c0 13-7 23-17 23-8 0-13-6-13-14 0-7 5-12 11-12" />
                    </g>
                ))}
                <circle cx="160" cy="160" r="26" opacity="0.7" />
                <circle cx="160" cy="160" r="52" opacity="0.35" />
                <circle cx="160" cy="160" r="150" opacity="0.2" />
            </svg>
        </div>
    );
}
