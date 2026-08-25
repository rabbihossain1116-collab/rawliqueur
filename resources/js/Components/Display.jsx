import { createElement } from 'react';
import { useLang } from '@/hooks/useLang';

/**
 * Display — every headline on the site goes through here.
 *
 * Bangla and Latin display type cannot share a size scale. Cormorant Garamond
 * is a small-appearing, high-contrast Latin face that wants to be set large and
 * light; Noto Serif Bengali has a much taller apparent size and dense conjuncts
 * that need more weight and far more leading. Setting both to `text-6xl` gives
 * you one elegant headline and one that looks shouted.
 *
 * So each step below is a *pair*: a Latin ramp and a deliberately smaller,
 * heavier, looser Bangla ramp that reads as the same visual weight. Centralising
 * it means a headline can never be typeset wrong by a call site, and the whole
 * site's type scale can be retuned from one table.
 */

const SIZES = {
    /** Hero only — one per page, at most. */
    hero: {
        en: 'text-[2.85rem] sm:text-[4.5rem] lg:text-[6.25rem]',
        bn: 'text-[2rem] sm:text-[3rem] lg:text-[4.15rem]',
    },
    /** Major section titles. */
    xl: {
        en: 'text-4xl sm:text-5xl lg:text-[4rem]',
        bn: 'text-[1.6rem] sm:text-3xl lg:text-[2.7rem]',
    },
    /** Sub-sections, pull quotes. */
    lg: {
        en: 'text-3xl sm:text-4xl lg:text-5xl',
        bn: 'text-xl sm:text-2xl lg:text-[2.1rem]',
    },
    /** Card titles, advisor names. */
    md: {
        en: 'text-2xl sm:text-3xl',
        bn: 'text-lg sm:text-xl',
    },
    /** Smallest display step — below this, use body type instead. */
    sm: {
        en: 'text-xl sm:text-2xl',
        bn: 'text-base sm:text-lg',
    },
};

/**
 * @param {object} props
 * @param {keyof SIZES} [props.size]
 * @param {string|import('react').ElementType} [props.as] Pick the level that
 *   is correct for the document outline; size is purely visual.
 */
export default function Display({
    children,
    size = 'xl',
    as = 'h2',
    className = '',
    ...rest
}) {
    const { lang, isBn } = useLang();
    const scale = SIZES[size] ?? SIZES.xl;

    return createElement(
        as,
        {
            // Explicit `lang` so the browser applies the right font fallback and
            // line-breaking rules even inside an otherwise-English page.
            lang,
            className: [
                isBn ? 'display-bn' : 'display',
                isBn ? scale.bn : scale.en,
                'text-balance',
                className,
            ]
                .filter(Boolean)
                .join(' '),
            ...rest,
        },
        children,
    );
}
