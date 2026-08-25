import { Link } from '@inertiajs/react';
import RLMark from '@/Components/RLMark';
import Reveal from '@/Components/Reveal';
import Display from '@/Components/Display';
import { AlponaDivider, AlponaWatermark } from '@/Components/Ornament';
import { useLang } from '@/hooks/useLang';
import {
    NAV,
    SOCIALS,
    CONTACT_EMAIL,
    YOUTUBE_HANDLE,
    YOUTUBE_CHANNEL,
    YOUTUBE_SUBSCRIBE,
    TAGLINE_BN,
    TAGLINE_EN,
} from '@/brand';

/**
 * Brand glyph paths, 24×24. Inlined rather than pulled from an icon package —
 * three paths is not worth a dependency, and these are the only icons the
 * footer needs.
 */
const SOCIAL_PATHS = {
    youtube:
        'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
    facebook:
        'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
    instagram:
        'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
};

/**
 * Footer — the closing spread.
 *
 * Three movements: a large display sign-off, the alpona divider, then the link
 * columns and legal rail. Deliberately taller and more typographic than a
 * standard footer; on a portfolio site the last thing a visitor sees carries as
 * much weight as the hero, and a compressed link dump undoes the whole page.
 *
 * `onOpenSubmit` is optional. Pages that host the modal pass it so the sign-off
 * opens it directly; everywhere else the link falls back to the homepage CTA
 * anchor.
 */
export default function Footer({ onOpenSubmit }) {
    const { lang, isBn, t } = useLang();
    const year = new Date().getFullYear();

    const columns = [
        {
            heading: t('ঘুরে দেখুন', 'Explore'),
            links: NAV.map((item) => ({
                label: item.label[lang],
                href: item.href ?? `/#${item.hash}`,
                internal: Boolean(item.href),
            })),
        },
        {
            heading: t('অংশ নিন', 'Participate'),
            links: [
                { label: t('প্রতিভা জমা দিন', 'Submit Talent'), href: '/#submit' },
                { label: t('নিয়মকানুন', 'The Rules'), href: '/journal/what-we-check-for-ai', internal: true },
                { label: t('কীভাবে ভিডিও তুলবেন', 'How to Record'), href: '/journal/how-to-record-at-home', internal: true },
                { label: t('বিজয়ীরা', 'Winners'), href: '/winners', internal: true },
            ],
        },
    ];

    return (
        <footer className="grain relative overflow-hidden border-t border-brass/15 bg-canvas">
            <AlponaWatermark className="-bottom-40 -left-32 h-[34rem] w-[34rem] text-brass/[0.12]" />

            <div className="relative mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
                {/* ── Sign-off ──────────────────────────────────────────────── */}
                <div className="flex flex-col items-center pb-20 pt-24 text-center lg:pb-24 lg:pt-32">
                    <Reveal className="caps text-[9px] text-brass" y={14}>
                        {t('আপনার পালা', 'Your turn')}
                    </Reveal>

                    <Reveal variant="mask" delay={120} className="mt-7">
                        <Display size="lg" as="p" className="max-w-2xl text-ink">
                            {t(
                                'একটা শট। একটাই সুযোগ। কোনো সম্পাদনা নয়।',
                                'One shot. One chance. No edits.',
                            )}
                        </Display>
                    </Reveal>

                    <Reveal delay={260} className="mt-10">
                        {onOpenSubmit ? (
                            <button
                                type="button"
                                onClick={onOpenSubmit}
                                className="caps border border-brass px-10 py-4 text-[10px] text-brass transition-colors duration-500 hover:bg-brass hover:text-paper"
                            >
                                {t('প্রতিভা জমা দিন', 'Submit Your Talent')}
                            </button>
                        ) : (
                            <a
                                href="/#submit"
                                className="caps inline-block border border-brass px-10 py-4 text-[10px] text-brass transition-colors duration-500 hover:bg-brass hover:text-paper"
                            >
                                {t('প্রতিভা জমা দিন', 'Submit Your Talent')}
                            </a>
                        )}
                    </Reveal>
                </div>

                <AlponaDivider />

                {/* ── Columns ───────────────────────────────────────────────── */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-14 pt-20 lg:grid-cols-4 lg:gap-12">
                    {columns.map((column) => (
                        <nav key={column.heading}>
                            <h2 className="caps text-[9px] text-brass/70">
                                {column.heading}
                            </h2>

                            <ul className="mt-7 space-y-4">
                                {column.links.map((link) => (
                                    <li key={link.href + link.label}>
                                        {link.internal ? (
                                            <Link
                                                href={link.href}
                                                lang={lang}
                                                className="link-underline text-sm text-ink-soft transition-colors duration-500 hover:text-ink"
                                            >
                                                {link.label}
                                            </Link>
                                        ) : (
                                            <a
                                                href={link.href}
                                                lang={lang}
                                                className="link-underline text-sm text-ink-soft transition-colors duration-500 hover:text-ink"
                                            >
                                                {link.label}
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    ))}

                    {/* Channel — the work actually lives on YouTube, so it gets
                        its own column rather than a row of icons. */}
                    <div>
                        <h2 className="caps text-[9px] text-brass/70">
                            {t('চ্যানেল', 'Channel')}
                        </h2>

                        <a
                            href={YOUTUBE_CHANNEL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-7 inline-flex items-center gap-2.5 text-sm text-ink-soft transition-colors duration-500 hover:text-ink"
                        >
                            <svg
                                className="h-4 w-4 shrink-0"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path d={SOCIAL_PATHS.youtube} />
                            </svg>
                            {YOUTUBE_HANDLE}
                        </a>

                        <a
                            href={YOUTUBE_SUBSCRIBE}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="caps mt-6 block w-fit border border-crimson/50 px-5 py-2.5 text-[9px] text-crimson-lit transition-colors duration-500 hover:bg-crimson hover:text-ink"
                        >
                            {t('সাবস্ক্রাইব', 'Subscribe')}
                        </a>

                        <div className="mt-8 flex gap-5">
                            {SOCIALS.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="text-ink-mute transition-colors duration-500 hover:text-brass"
                                >
                                    <svg
                                        className="h-[17px] w-[17px]"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path d={SOCIAL_PATHS[social.name]} />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="caps text-[9px] text-brass/70">
                            {t('যোগাযোগ', 'Contact')}
                        </h2>

                        <ul className="mt-7 space-y-4">
                            <li>
                                <a
                                    href={`mailto:${CONTACT_EMAIL}`}
                                    className="link-underline text-sm text-ink-soft transition-colors duration-500 hover:text-ink"
                                >
                                    {CONTACT_EMAIL}
                                </a>
                            </li>
                            <li lang={lang} className="text-sm leading-relaxed text-ink-soft">
                                {t(
                                    'ঢাকা, বাংলাদেশ',
                                    'Dhaka, Bangladesh',
                                )}
                            </li>
                            <li lang={lang} className="text-xs leading-relaxed text-ink-mute">
                                {t(
                                    'জমা দেওয়ার ফরম সারা বছর খোলা থাকে।',
                                    'The submission form stays open all year.',
                                )}
                            </li>
                        </ul>
                    </div>
                </div>

                {/* ── Legal rail ────────────────────────────────────────────── */}
                <div className="mt-20 flex flex-col items-start gap-6 border-t border-brass/10 py-9 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <RLMark className="h-8 w-8 text-sm" interactive={false} />
                        <p
                            lang={lang}
                            className={`text-ink-mute ${isBn ? 'text-[11px]' : 'caps text-[8px]'}`}
                        >
                            {isBn ? TAGLINE_BN : TAGLINE_EN}
                        </p>
                    </div>

                    <p className="caps text-[8px] text-ink-mute">
                        © {year} RAW LIQUEUR
                    </p>
                </div>
            </div>
        </footer>
    );
}
