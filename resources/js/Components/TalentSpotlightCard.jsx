import VideoFrame, { PlayBadge } from '@/Components/VideoFrame';
import { AlponaCorner } from '@/Components/Ornament';
import Display from '@/Components/Display';
import { useLang } from '@/hooks/useLang';
import { CATEGORIES } from '@/data/talent';
import { watchUrl } from '@/brand';
import { counter, localeDigits } from '@/lib/format';

/**
 * TalentSpotlightCard — one of the two large cards that carry the homepage.
 *
 * The card is framed like a plate: charcoal panel, brass hairline, and alpona
 * corner flourishes that only resolve on hover. Restraint at rest is the point
 * — the ornament is a reward for attention, not the default state.
 *
 * ── The half/half bar ─────────────────────────────────────────────────────
 * The channel's model is that the site shows roughly half a performance and the
 * rest is on YouTube. That is the single most important thing a visitor has to
 * understand, and text alone was not landing it, so the card states it
 * structurally: a brass bar filled to 50% with the remainder in crimson. It
 * makes the click-through feel like finishing something rather than leaving.
 */
export default function TalentSpotlightCard({ talent, index = 0 }) {
    const { lang, t } = useLang();

    const name = lang === 'bn' ? (talent.nameBn ?? talent.name) : talent.name;
    const title = lang === 'bn' ? (talent.titleBn ?? talent.title) : talent.title;
    const category = CATEGORIES[talent.category];

    return (
        <a
            href={watchUrl(talent.id)}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block border border-brass/12 bg-surface transition-[transform,border-color,box-shadow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:border-brass/35 hover:shadow-lift"
        >
            {/* Corner flourishes — sit outside the flow, fade in on hover. */}
            <span className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                <AlponaCorner
                    corner="tl"
                    className="absolute -left-px -top-px h-10 w-10 text-brass/60"
                />
                <AlponaCorner
                    corner="br"
                    className="absolute -bottom-px -right-px h-10 w-10 text-brass/60"
                />
            </span>

            <VideoFrame
                videoId={talent.id}
                previewStart={talent.previewStart}
                alt={t(`${name} — পরিবেশনা`, `${name} performing`)}
                ratio={16 / 10}
                eager={index === 0}
            >
                {({ previewReady }) => (
                    <>
                        {/* Bottom scrim so the duration chip stays readable over
                            any footage. */}
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/85 to-transparent"
                        />

                        {/* Category — the one brass chip on the card. */}
                        <span
                            lang={lang}
                            className="caps absolute left-4 top-4 border border-brass/40 bg-ink/70 px-3 py-1.5 text-[9px] text-brass-lit backdrop-blur-md"
                        >
                            {category[lang]}
                        </span>

                        <span className="caps absolute bottom-4 right-4 text-[9px] text-surface/80">
                            {localeDigits(talent.duration, lang)}
                        </span>

                        <PlayBadge
                            active={previewReady}
                            className="bottom-4 left-4 h-12 w-12"
                        />
                    </>
                )}
            </VideoFrame>

            {/* ── Meta ─────────────────────────────────────────────────────── */}
            <div className="px-6 pb-7 pt-6 sm:px-8 sm:pb-8">
                <div className="flex items-start justify-between gap-5">
                    <div className="min-w-0">
                        <Display size="md" as="h3" className="text-ink">
                            {name}
                        </Display>

                        <p lang={lang} className="mt-2 truncate text-sm text-ink-soft">
                            {title}
                        </p>
                    </div>

                    {/* Editorial index. `aria-hidden` — it is a visual device,
                        and the DOM order already conveys the sequence. */}
                    <span
                        aria-hidden="true"
                        className="display shrink-0 text-2xl leading-none text-brass/30 transition-colors duration-700 group-hover:text-brass/60"
                    >
                        {counter(index, lang)}
                    </span>
                </div>

                {/* Half/half progress — see the note at the top of the file. */}
                <div className="mt-7">
                    <div
                        className="flex h-[3px] w-full overflow-hidden bg-veil"
                        role="presentation"
                    >
                        <span className="w-1/2 bg-gradient-to-r from-brass-deep to-brass" />
                        <span className="w-1/2 bg-crimson/25 transition-colors duration-700 group-hover:bg-crimson/70" />
                    </div>

                    <div className="mt-3.5 flex items-center justify-between gap-4">
                        <p lang={lang} className="caps text-[8px] text-ink-mute">
                            {t('অর্ধেক এখানে', 'Half here')}
                        </p>

                        <p
                            lang={lang}
                            className="caps flex items-center gap-2 text-[8px] text-brass transition-colors duration-500 group-hover:text-brass-deep"
                        >
                            {t('বাকিটা ইউটিউবে', 'Rest on YouTube')}
                            <svg
                                className="h-2.5 w-2.5 transition-transform duration-500 group-hover:translate-x-1"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7 7 7-7 7" />
                            </svg>
                        </p>
                    </div>
                </div>

                <p lang={lang} className="caps mt-6 text-[8px] text-ink-mute">
                    {talent.district[lang]}
                </p>
            </div>
        </a>
    );
}
