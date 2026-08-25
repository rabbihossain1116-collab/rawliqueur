import Reveal from '@/Components/Reveal';
import Display from '@/Components/Display';
import { AlponaWatermark, AlponaDivider } from '@/Components/Ornament';
import { useLang } from '@/hooks/useLang';

/**
 * PageHeader — the opening block for every interior page.
 *
 * Deliberately not a second video hero. Only the homepage gets full-bleed
 * footage; if every page opened that way the device would stop meaning anything
 * and each page would cost another autoplaying iframe. These open on type over
 * black instead, which is faster and leaves the cinematic treatment reserved.
 *
 * Top padding here is what clears the fixed header, so interior pages pass
 * `overHero={false}` to PublicLayout and add no top spacing of their own.
 */
export default function PageHeader({ eyebrow, title, lead, meta, align = 'left' }) {
    const { lang } = useLang();
    const centered = align === 'center';

    return (
        <header className="grain relative overflow-hidden bg-paper px-5 pb-20 pt-36 sm:px-8 sm:pt-44 lg:px-12 lg:pb-28 lg:pt-52">
            <AlponaWatermark className="-right-40 -top-32 h-[34rem] w-[34rem] text-brass/[0.06]" />

            <div
                className={`relative mx-auto max-w-[1560px] ${
                    centered ? 'flex flex-col items-center text-center' : ''
                }`}
            >
                <Reveal className="flex items-center gap-4" y={14}>
                    {centered && <span className="rule-brass w-12" />}
                    <span lang={lang} className="caps text-[9px] text-brass">
                        {eyebrow}
                    </span>
                    <span className="rule-brass w-12 sm:w-20" />
                </Reveal>

                <Reveal variant="mask" delay={130} className="mt-7">
                    <Display size="hero" as="h1" className="max-w-4xl text-ink">
                        {title}
                    </Display>
                </Reveal>

                {lead && (
                    <Reveal delay={260} className="mt-9 max-w-2xl">
                        <p
                            lang={lang}
                            className="text-base leading-relaxed text-ink-soft sm:text-lg"
                        >
                            {lead}
                        </p>
                    </Reveal>
                )}

                {/* Optional stat / label rail — used by the winners and journal
                    pages to state scale without a paragraph. */}
                {meta && meta.length > 0 && (
                    <Reveal delay={360} className="mt-12">
                        <dl
                            className={`flex flex-wrap gap-x-14 gap-y-8 ${
                                centered ? 'justify-center' : ''
                            }`}
                        >
                            {meta.map((item) => (
                                <div key={item.label}>
                                    <dt className="caps text-[8px] text-ink-mute">
                                        {item.label}
                                    </dt>
                                    <dd
                                        lang={lang}
                                        className="display mt-2.5 text-2xl leading-none text-brass"
                                    >
                                        {item.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </Reveal>
                )}

                {centered && <AlponaDivider className="mt-14" />}
            </div>
        </header>
    );
}
