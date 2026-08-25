import { useEffect, useRef, useState, createElement } from 'react';

/**
 * Reveal — scroll-triggered entrance.
 *
 * JS owns *when*, CSS owns *what*: this component does nothing but flip
 * `data-shown` on its element. The actual animation lives in the `reveal`,
 * `reveal-mask` and `reveal-line` utilities in app.css. Keeping it split that
 * way means no animation runs on the JS thread, and a variant can be
 * restyled without touching this file.
 *
 * One shared IntersectionObserver serves every instance on the page. A page
 * with forty reveals would otherwise spin up forty observers, each with its
 * own callback queue, which is measurable on low-end Android.
 */

/** Registry so the shared observer knows which callback belongs to which node. */
const callbacks = new WeakMap();

let observer = null;

function getObserver() {
    if (observer) return observer;

    observer = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (!entry.isIntersecting) continue;

                const onShow = callbacks.get(entry.target);
                if (onShow) onShow();

                // Reveals are one-shot: re-animating on every scroll-past reads
                // as a glitch, not as polish.
                observer.unobserve(entry.target);
                callbacks.delete(entry.target);
            }
        },
        {
            // Fire a little before the element is fully in view so the motion
            // finishes roughly as it settles, instead of starting late.
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.15,
        },
    );

    return observer;
}

const VARIANT_CLASS = {
    up: 'reveal',
    mask: 'reveal-mask',
    line: 'reveal-line',
};

/**
 * @param {object} props
 * @param {keyof VARIANT_CLASS} [props.variant] `up` slides, `mask` wipes
 *   (for display headlines), `line` draws a rule open from the left.
 * @param {number} [props.delay] Stagger, in ms. Keep cumulative delays under
 *   ~600ms; past that a reader has already scrolled by.
 * @param {number} [props.y] Travel distance for `up`, in px.
 * @param {string|import('react').ElementType} [props.as] Element to render.
 */
export default function Reveal({
    children,
    variant = 'up',
    delay = 0,
    y,
    as = 'div',
    className = '',
    style,
    ...rest
}) {
    const ref = useRef(null);

    // Start hidden, then let the observer promote it. Anyone who has asked for
    // reduced motion starts shown, so nothing is ever stuck invisible if the
    // observer never fires.
    const [shown, setShown] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Also short-circuit if the element is already on screen at mount:
        // above-the-fold content should not wait for a scroll event.
        if (reduced) {
            setShown(true);
            return;
        }

        callbacks.set(node, () => setShown(true));
        const io = getObserver();
        io.observe(node);

        return () => {
            io.unobserve(node);
            callbacks.delete(node);
        };
    }, []);

    return createElement(
        as,
        {
            ref,
            'data-shown': shown ? 'true' : 'false',
            className: `${VARIANT_CLASS[variant] ?? VARIANT_CLASS.up} ${className}`.trim(),
            style: {
                ...(delay ? { '--reveal-delay': `${delay}ms` } : null),
                ...(y !== undefined ? { '--reveal-y': `${y}px` } : null),
                ...style,
            },
            ...rest,
        },
        children,
    );
}
