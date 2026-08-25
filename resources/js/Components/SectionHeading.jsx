import Reveal from '@/Components/Reveal';
import Display from '@/Components/Display';
import { useLang } from '@/hooks/useLang';

/**
 * SectionHeading — the standard way a section introduces itself.
 *
 * Three fixed parts in a fixed rhythm: a brass eyebrow behind a short rule,
 * the display headline, then optional lead copy. Every section using it gets
 * the same vertical cadence and the same staggered reveal, which is most of
 * what stops a long page feeling assembled from unrelated blocks.
 *
 * Callers pass already-translated strings (via `t()` from useLang) — this
 * component only needs the language to choose the type ramp.
 */
export default function SectionHeading({
    eyebrow,
    title,
    lead,
    align = 'left',
    size = 'xl',
    className = '',
}) {
    const { lang } = useLang();
    const centered = align === 'center';

    return (
        <div
            className={[
                centered ? 'mx-auto flex flex-col items-center text-center' : '',
                className,
            ]
                .filter(Boolean)
                .join(' ')}
        >
            {eyebrow && (
                <Reveal className="flex items-center gap-4" y={14}>
                    {/* On centred headings the rule appears both sides so the
                        eyebrow stays optically centred. */}
                    {centered && <span className="rule-brass w-10 sm:w-16" />}
                    <span className="caps text-[10px] text-brass">{eyebrow}</span>
                    <span className="rule-brass w-10 sm:w-16" />
                </Reveal>
            )}

            {title && (
                <Reveal variant="mask" delay={eyebrow ? 120 : 0} className="mt-6">
                    <Display size={size} className="text-ink">
                        {title}
                    </Display>
                </Reveal>
            )}

            {lead && (
                <Reveal
                    delay={240}
                    className={`mt-7 ${centered ? 'max-w-xl' : 'max-w-lg'}`}
                >
                    <p
                        lang={lang}
                        className="text-[0.95rem] leading-relaxed text-ink-soft"
                    >
                        {lead}
                    </p>
                </Reveal>
            )}
        </div>
    );
}
