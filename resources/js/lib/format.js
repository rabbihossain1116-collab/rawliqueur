/**
 * Locale-aware number formatting.
 *
 * Bangla uses its own digit glyphs (০১২৩...), and a Bengali page that prints
 * "01" or "5 min" in Latin numerals immediately reads as a translated template
 * rather than a Bengali site. These helpers keep that consistent.
 *
 * `Intl.NumberFormat('bn-BD')` can produce Bengali digits, but it also imposes
 * Indian digit grouping and cannot be applied to strings that are already
 * formatted for display (e.g. "76.3M", "04:45"). A direct glyph substitution
 * works on all of those, so that is what is used.
 */

const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

/**
 * Swap ASCII digits for Bengali ones, leaving every other character alone.
 *
 * Safe on pre-formatted strings: "04:45" → "০৪:৪৫", "76.3M" → "৭৬.৩M".
 *
 * @param {string|number} value
 * @param {'bn'|'en'} lang
 */
export function localeDigits(value, lang) {
    const text = String(value);
    if (lang !== 'bn') return text;

    return text.replace(/\d/g, (digit) => BENGALI_DIGITS[Number(digit)]);
}

/**
 * Zero-padded counter for editorial numbering — "০১", "০২".
 *
 * @param {number} index Zero-based.
 * @param {'bn'|'en'} lang
 */
export function counter(index, lang) {
    return localeDigits(String(index + 1).padStart(2, '0'), lang);
}

/** Month + year in the reader's locale, from an ISO date string. */
export function longDate(iso, lang) {
    const date = new Date(iso);

    // An unparseable date should degrade to the raw string rather than
    // rendering "Invalid Date" into the page.
    if (Number.isNaN(date.getTime())) return iso;

    return new Intl.DateTimeFormat(lang === 'bn' ? 'bn-BD' : 'en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date);
}

/**
 * Parse a compact count back into a number — "1.3M" → 1300000.
 *
 * Needed because view and like counts are stored as display strings. Sorting
 * those as strings puts "9.9K" above "12M", which is the kind of bug that looks
 * like a deliberate ranking choice and never gets reported.
 *
 * @param {string|number} value
 * @returns {number} 0 for anything unparseable, so a bad value sorts last
 *   instead of poisoning the comparator with NaN.
 */
const SUFFIXES = { k: 1e3, m: 1e6, b: 1e9 };

export function parseCompact(value) {
    if (typeof value === 'number') return value;

    const match = String(value)
        .trim()
        .replace(/,/g, '')
        .match(/^([\d.]+)\s*([kmb])?$/i);

    if (!match) return 0;

    const amount = Number.parseFloat(match[1]);
    if (!Number.isFinite(amount)) return 0;

    const multiplier = match[2] ? SUFFIXES[match[2].toLowerCase()] : 1;

    return amount * multiplier;
}
