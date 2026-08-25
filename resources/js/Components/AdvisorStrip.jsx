import { Link } from '@inertiajs/react';
import Section from '@/Components/Section';
import Reveal from '@/Components/Reveal';
import Display from '@/Components/Display';
import SectionHeading from '@/Components/SectionHeading';
import { Paisley } from '@/Components/Ornament';
import { useLang } from '@/hooks/useLang';
import { featuredAdvisors } from '@/data/advisors';

/**
 * AdvisorStrip — the credibility section on the homepage.
 *
 * Two people only, per the brief: one journalist, one artist. The full council
 * lives on /about, and putting all six here would turn a statement of standing
 * into a directory.
 *
 * Portraits are desaturated at rest and resolve to colour on hover. That is not
 * decoration — full-colour headshots on a black page pull attention away from
 * the performers, who are the actual subject of the site. The advisors are
 * meant to be reassurance in the periphery.
 *
 * The offset brass frame behind each portrait is the one flourish here: a second
 * rule sitting a few pixels off the image, the same engraved-plate device as the
 * logo, scaled up.
 */
export default function AdvisorStrip() {
    const { lang, t } = useLang();

    return (
        <Section id="advisors" tone="canvas" pad="loose">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <SectionHeading
                    eyebrow={t('উপদেষ্টা পরিষদ', 'Advisory council')}
                    title={t('যাঁরা পাশে আছেন', 'Those standing with us')}
                />

                <Reveal delay={200} className="shrink-0">
                    <Link
                        href="/about"
                        className="caps link-underline inline-flex items-center gap-3 text-[9px] text-brass"
                    >
                        {t('সব উপদেষ্টা', 'All advisors')}
                        <svg
                            className="h-2.5 w-2.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7 7 7-7 7" />
                        </svg>
                    </Link>
                </Reveal>
            </div>

            <div className="mt-16 grid gap-14 sm:grid-cols-2 sm:gap-10 lg:mt-24 lg:gap-20">
                {featuredAdvisors.map((advisor, index) => (
                    <Reveal
                        as="figure"
                        key={advisor.slug}
                        delay={index * 140}
                        className="group"
                    >
                        <div className="relative">
                            {/* Offset frame. `-z-10` keeps it behind the image
                                while both stay inside the same stacking context. */}
                            <span
                                aria-hidden="true"
                                className="absolute -bottom-3 -right-3 -z-10 h-full w-full border border-brass/25 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-bottom-1.5 group-hover:-right-1.5"
                            />

                            <div className="relative overflow-hidden bg-surface">
                                <img
                                    src={advisor.photo}
                                    alt={advisor.name[lang]}
                                    loading="lazy"
                                    decoding="async"
                                    className="aspect-[4/5] w-full object-cover grayscale transition-[filter,transform] duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] group-hover:grayscale-0"
                                />

                                {/* Keeps the lower edge of the portrait sitting
                                    in the page rather than cutting hard. */}
                                <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-canvas/80 to-transparent"
                                />
                            </div>
                        </div>

                        <figcaption className="mt-8">
                            <p className="caps text-[8px] text-brass/70">
                                {advisor.role[lang]}
                            </p>

                            <Display size="md" as="p" className="mt-3 text-ink">
                                {advisor.name[lang]}
                            </Display>

                            <div className="mt-5 flex gap-4">
                                <Paisley
                                    className="mt-1 h-5 w-5 shrink-0 text-brass/40"
                                    strokeWidth="1.4"
                                />
                                <p
                                    lang={lang}
                                    className="max-w-sm text-sm leading-relaxed text-ink-soft"
                                >
                                    {advisor.bio[lang]}
                                </p>
                            </div>
                        </figcaption>
                    </Reveal>
                ))}
            </div>
        </Section>
    );
}
