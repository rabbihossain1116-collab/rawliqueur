/**
 * Brand constants and YouTube helpers — single source of truth.
 *
 * Anything that would otherwise be hardcoded in more than one component lives
 * here: the tagline, the channel links, and the embed/thumbnail URL builders.
 */

export const SITE_NAME = 'RAW LIQUEUR';

/**
 * The tagline is intentionally reused: the hero opens with it and the footer
 * closes with it, so the page ends on the line it began with.
 */
export const TAGLINE_EN = 'No AI. No Edit. Just Talent.';
export const TAGLINE_BN = 'কোনো এআই নয়। কোনো এডিট নয়। শুধু প্রতিভা।';

/**
 * Hero copy — taken from the channel's own identity (rawliqueur.com).
 * The Bangla line leads because the site does; the English rendering is a
 * companion, not a translation exercise.
 */
export const HERO_EYEBROW = {
    bn: 'প্রতিভা ও কবিতা গানে',
    en: 'In talent, poetry and song',
};

export const HERO_TITLE = {
    bn: 'বাঙালির প্রাণে',
    en: 'The soul of Bengal',
};

/** The submission call-to-action. */
export const CTA_HEADLINE = {
    bn: 'নিজের কাঁচা প্রতিভা আমাদের দেখান',
    en: 'Show us your raw talent.',
};

export const CTA_SUB = {
    bn: 'কোনো এআই নয়, কোনো এডিট নয় — শুধু আপনি।',
    en: 'No AI. No edit. Just you.',
};

export const YOUTUBE_HANDLE = '@rawliqueur';
export const YOUTUBE_CHANNEL = 'https://www.youtube.com/@rawliqueur';
export const YOUTUBE_SUBSCRIBE = `${YOUTUBE_CHANNEL}?sub_confirmation=1`;

export const CONTACT_EMAIL = 'info@rolica.com';

export const SOCIALS = [
    { name: 'youtube', label: 'YouTube', url: YOUTUBE_CHANNEL },
    { name: 'facebook', label: 'Facebook', url: 'https://facebook.com/rawliqueur' },
    { name: 'instagram', label: 'Instagram', url: 'https://instagram.com/rawliqueur' },
];

/**
 * Primary navigation. Defined once and consumed by both the header and the
 * footer so the two can never drift out of sync.
 *
 * `hash` entries are homepage sections: on the homepage they smooth-scroll, and
 * from any other page they navigate to `/#hash`. `href` entries are real routes.
 */
export const NAV = [
    { key: 'talent', label: { bn: 'আজকের প্রতিভা', en: "Today's Talent" }, hash: 'talent' },
    { key: 'videos', label: { bn: 'ভিডিও', en: 'Videos' }, href: '/videos' },
    { key: 'winners', label: { bn: 'বিজয়ী', en: 'Winners' }, href: '/winners' },
    { key: 'about', label: { bn: 'আমাদের কথা', en: 'About' }, href: '/about' },
    { key: 'journal', label: { bn: 'জার্নাল', en: 'Journal' }, href: '/journal' },
];

/* ── YouTube URL builders ───────────────────────────────────────────────────
   Centralised because the embed parameter string is easy to get subtly wrong
   and was previously duplicated across three components. */

/** Public watch page — where every "view more" click ends up. */
export const watchUrl = (videoId) => `https://www.youtube.com/watch?v=${videoId}`;

/**
 * Silent, chromeless, looping embed for background and hover previews.
 *
 * `loop` requires `playlist` to be set to the same ID — that is a YouTube
 * quirk, not a mistake. The privacy-preserving `youtube-nocookie` host is used
 * so no tracking cookie is set until a visitor actually clicks through.
 *
 * @param {string} videoId
 * @param {{ start?: number }} [options] Seconds to begin at, so previews land
 *   mid-performance instead of on an intro.
 */
export const previewEmbedUrl = (videoId, { start = 0 } = {}) => {
    const params = new URLSearchParams({
        autoplay: '1',
        mute: '1',
        loop: '1',
        playlist: videoId,
        controls: '0',
        modestbranding: '1',
        rel: '0',
        iv_load_policy: '3',
        playsinline: '1',
        disablekb: '1',
        fs: '0',
    });

    if (start > 0) params.set('start', String(start));

    return `https://www.youtube-nocookie.com/embed/${videoId}?${params}`;
};

/**
 * Thumbnail. `maxres` does not exist for every upload, so callers should fall
 * back to `hq` on the image's error event.
 */
export const thumbUrl = (videoId, quality = 'maxres') =>
    `https://img.youtube.com/vi/${videoId}/${quality}default.jpg`;
