import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import RLMark, { Wordmark } from '@/Components/RLMark';
import { AlponaWatermark, Lotus } from '@/Components/Ornament';
import { useLang } from '@/hooks/useLang';
import { NAV, YOUTUBE_SUBSCRIBE, TAGLINE_BN, TAGLINE_EN } from '@/brand';

/**
 * Header.
 *
 * Two states. Over a page's dark hero (`overHero`) the bar is transparent and
 * everything in it renders light; anywhere else — or past the fold — it is the
 * solid paper bar with ink type. `onDark` is derived once and drives every
 * colour decision below, so the two treatments cannot drift apart.
 *
 * The scroll listener is rAF-throttled and writes the progress bar via a CSS
 * custom property rather than React state: progress changes every frame, and
 * routing that through a re-render would re-reconcile the header ~60 times a
 * second for one visual value.
 */
export default function Header({ onOpenSubmit, overHero = false }) {
    const { lang, isBn, setLang, t } = useLang();
    const { url } = usePage();

    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const progressRef = useRef(null);

    const onHome = url === '/' || url.startsWith('/#') || url.startsWith('/?');

    // Light type over footage, ink type everywhere else.
    const onDark = overHero && !scrolled && !mobileOpen;

    useEffect(() => {
        let frame = null;

        const measure = () => {
            frame = null;
            const y = window.scrollY;

            setScrolled(y > 24);

            // Total scrollable distance can be 0 on short pages — guard the
            // division or the bar gets NaN and never paints.
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const ratio = max > 0 ? Math.min(y / max, 1) : 0;
            progressRef.current?.style.setProperty('--progress', String(ratio));
        };

        const onScroll = () => {
            if (frame === null) frame = requestAnimationFrame(measure);
        };

        measure();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (frame !== null) cancelAnimationFrame(frame);
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileOpen]);

    useEffect(() => {
        if (!mobileOpen) return;
        const onKey = (event) => event.key === 'Escape' && setMobileOpen(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [mobileOpen]);

    /** Same-page anchors scroll; from elsewhere the browser follows /#hash. */
    const goToHash = useCallback(
        (event, hash) => {
            setMobileOpen(false);
            if (!onHome) return;

            const target = document.getElementById(hash);
            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        },
        [onHome],
    );

    const handleSubmit = useCallback(() => {
        setMobileOpen(false);
        onOpenSubmit?.();
    }, [onOpenSubmit]);

    // Solid treatment whenever we are not floating over the hero.
    const solid = scrolled || mobileOpen || !overHero;

    const isActive = (item) => item.href && url.startsWith(item.href);

    return (
        <>
            <header
                className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-700 ${
                    solid
                        ? 'border-b border-brass/15 bg-paper/85 shadow-[0_1px_24px_-12px_rgb(89_68_19_/_0.18)] backdrop-blur-xl'
                        : 'border-b border-transparent bg-transparent'
                }`}
            >
                <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
                    <div className="flex h-20 items-center justify-between gap-6 lg:h-[5.5rem]">
                        {/* Identity */}
                        <Link
                            href="/"
                            aria-label={`RAW LIQUEUR — ${t('হোম', 'home')}`}
                            className="group flex shrink-0 items-center gap-3.5"
                        >
                            <RLMark
                                tone={onDark ? 'paper' : 'ink'}
                                className="h-10 w-10 text-lg lg:h-11 lg:w-11"
                            />
                            {/* Tagline is dropped on small screens where it would
                                wrap or shrink below legibility. */}
                            <Wordmark
                                tone={onDark ? 'paper' : 'ink'}
                                className="hidden xs:flex"
                                withTagline
                            />
                        </Link>

                        {/* Primary nav */}
                        <nav className="hidden items-center gap-9 lg:flex">
                            {NAV.map((item) => {
                                const label = item.label[lang];
                                const active = isActive(item);

                                const classes = `link-underline caps text-[10px] transition-colors duration-500 ${
                                    active
                                        ? onDark
                                            ? 'text-brass-lit'
                                            : 'text-brass'
                                        : onDark
                                          ? 'text-paper/75 hover:text-paper'
                                          : 'text-ink-soft hover:text-ink'
                                }`;

                                return item.href ? (
                                    <Link
                                        key={item.key}
                                        href={item.href}
                                        lang={lang}
                                        className={classes}
                                        aria-current={active ? 'page' : undefined}
                                    >
                                        {label}
                                    </Link>
                                ) : (
                                    <a
                                        key={item.key}
                                        href={`/#${item.hash}`}
                                        lang={lang}
                                        onClick={(event) => goToHash(event, item.hash)}
                                        className={classes}
                                    >
                                        {label}
                                    </a>
                                );
                            })}
                        </nav>

                        {/* Controls */}
                        <div className="flex shrink-0 items-center gap-3 sm:gap-5">
                            <LangToggle lang={lang} setLang={setLang} onDark={onDark} />

                            <a
                                href={YOUTUBE_SUBSCRIBE}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`caps hidden px-5 py-3 text-[9px] transition-colors duration-500 sm:inline-block ${
                                    onDark
                                        ? 'border border-paper/40 text-paper hover:bg-paper hover:text-ink'
                                        : 'border border-brass text-brass hover:bg-brass hover:text-surface'
                                }`}
                            >
                                {t('সাবস্ক্রাইব', 'Subscribe')}
                            </a>

                            <button
                                type="button"
                                onClick={() => setMobileOpen((open) => !open)}
                                aria-label={t(
                                    mobileOpen ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন',
                                    mobileOpen ? 'Close menu' : 'Open menu',
                                )}
                                aria-expanded={mobileOpen}
                                className="relative h-6 w-7 lg:hidden"
                            >
                                {/* Two hairlines that cross into an X. Kept as
                                    spans rather than an icon swap so the motion
                                    between the two states is continuous. */}
                                <span
                                    className={`absolute left-0 block h-px w-7 transition-all duration-500 ${
                                        onDark ? 'bg-paper' : 'bg-ink'
                                    } ${
                                        mobileOpen ? 'top-1/2 rotate-45' : 'top-2'
                                    }`}
                                />
                                <span
                                    className={`absolute left-0 block h-px transition-all duration-500 ${
                                        onDark ? 'bg-paper' : 'bg-ink'
                                    } ${
                                        mobileOpen
                                            ? 'top-1/2 w-7 -rotate-45'
                                            : 'top-[15px] w-4'
                                    }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Reading progress — brass hairline filling as you scroll,
                    driven straight from the scroll handler. */}
                <div
                    ref={progressRef}
                    aria-hidden="true"
                    className={`absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-brass-deep via-brass to-brass-lit transition-opacity duration-700 ${
                        solid ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ transform: 'scaleX(var(--progress, 0))' }}
                />
            </header>

            <MobileMenu
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                onNavigateHash={goToHash}
                onSubmit={onOpenSubmit ? handleSubmit : null}
                lang={lang}
                isBn={isBn}
                t={t}
                isActive={isActive}
            />
        </>
    );
}

/**
 * LangToggle — segmented বাং / EN control. A visible two-state segment rather
 * than a single swap button: the brief calls the language switch out as
 * critical, so English must be discoverable without interacting.
 */
function LangToggle({ lang, setLang, onDark = false }) {
    return (
        <div
            className={`flex items-center border transition-colors duration-700 ${
                onDark ? 'border-paper/30' : 'border-ink/15'
            }`}
            role="group"
            aria-label="Language"
        >
            {[
                { code: 'bn', label: 'বাং' },
                { code: 'en', label: 'EN' },
            ].map(({ code, label }) => {
                const active = lang === code;

                return (
                    <button
                        key={code}
                        type="button"
                        onClick={() => setLang(code)}
                        aria-pressed={active}
                        // Active fill flips with context: paper chip on footage,
                        // ink chip on paper — either way it stays high-contrast.
                        className={`caps px-2.5 py-2 text-[9px] transition-colors duration-400 ${
                            active
                                ? onDark
                                    ? 'bg-paper text-ink'
                                    : 'bg-ink text-paper'
                                : onDark
                                  ? 'text-paper/70 hover:text-paper'
                                  : 'text-ink-soft hover:text-ink'
                        }`}
                    >
                        {label}
                    </button>
                );
            })}
        </div>
    );
}

/**
 * MobileMenu — full-bleed overlay rather than a dropdown.
 *
 * A collapsing accordion under the bar reads cheap. Taking the whole viewport
 * lets the nav be set in display type at a size matching the rest of the site.
 * Stays mounted and animates opacity/visibility so the closing transition can
 * actually play; unmounting mid-close would cut it off.
 */
function MobileMenu({ open, onClose, onNavigateHash, onSubmit, lang, isBn, t, isActive }) {
    return (
        <div
            className={`fixed inset-0 z-40 lg:hidden ${
                open ? 'visible' : 'invisible'
            } transition-[visibility] duration-500`}
            aria-hidden={!open}
        >
            <div
                className={`grain absolute inset-0 bg-paper transition-opacity duration-700 ${
                    open ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <AlponaWatermark className="-right-24 top-1/4 h-[26rem] w-[26rem] text-brass/[0.12]" />
            </div>

            <nav className="relative flex h-full flex-col justify-center px-7 pb-16 pt-24">
                {NAV.map((item, index) => {
                    const label = item.label[lang];
                    const active = isActive(item);

                    // Stagger down the list. Capped so the last item never lands
                    // after the overlay has finished fading in.
                    const style = {
                        transitionDelay: open ? `${120 + index * 65}ms` : '0ms',
                    };

                    const classes = `block border-b border-brass/15 py-5 transition-[opacity,transform] duration-700 ${
                        open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`;

                    const inner = (
                        <span className="flex items-baseline justify-between gap-4">
                            <span
                                lang={lang}
                                className={`${isBn ? 'display-bn text-xl' : 'display text-3xl'} ${
                                    active ? 'text-brass' : 'text-ink'
                                }`}
                            >
                                {label}
                            </span>
                            <span className="caps text-[9px] text-ink-mute">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                        </span>
                    );

                    return item.href ? (
                        <Link key={item.key} href={item.href} onClick={onClose} style={style} className={classes}>
                            {inner}
                        </Link>
                    ) : (
                        <a
                            key={item.key}
                            href={`/#${item.hash}`}
                            onClick={(event) => onNavigateHash(event, item.hash)}
                            style={style}
                            className={classes}
                        >
                            {inner}
                        </a>
                    );
                })}

                <div
                    className={`mt-12 transition-[opacity,transform] duration-700 ${
                        open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}
                    style={{ transitionDelay: open ? '460ms' : '0ms' }}
                >
                    {/* Pages that own the submit modal open it directly; the rest
                        send the visitor to the CTA band on the homepage. */}
                    {onSubmit ? (
                        <button
                            type="button"
                            onClick={onSubmit}
                            className="caps block w-full bg-crimson py-4 text-center text-[10px] text-surface"
                        >
                            {t('প্রতিভা জমা দিন', 'Submit Your Talent')}
                        </button>
                    ) : (
                        <a
                            href="/#submit"
                            onClick={onClose}
                            className="caps block w-full bg-crimson py-4 text-center text-[10px] text-surface"
                        >
                            {t('প্রতিভা জমা দিন', 'Submit Your Talent')}
                        </a>
                    )}

                    <div className="mt-9 flex items-center justify-center gap-3 text-brass/50">
                        <span className="rule-brass w-10" />
                        <Lotus className="h-5 w-5" strokeWidth="1.2" />
                        <span className="rule-brass w-10" />
                    </div>

                    <p
                        lang={lang}
                        className={`mt-5 text-center text-ink-mute ${
                            isBn ? 'text-[11px]' : 'caps text-[8px]'
                        }`}
                    >
                        {isBn ? TAGLINE_BN : TAGLINE_EN}
                    </p>
                </div>
            </nav>
        </div>
    );
}
