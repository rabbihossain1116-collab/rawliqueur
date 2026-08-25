import Section from '@/Components/Section';
import Reveal from '@/Components/Reveal';
import Display from '@/Components/Display';
import { AlponaCorner, AlponaDivider } from '@/Components/Ornament';
import { useLang } from '@/hooks/useLang';
import { CONTACT_EMAIL } from '@/brand';
import { counter } from '@/lib/format';

/**
 * CtaBand — the conversion point.
 *
 * Standing out is harder on an all-dark site than on a light one: there is no
 * "go dark for emphasis" move left. So this section changes *device* instead of
 * colour — content is placed inside a full alpona-cornered frame, like a
 * certificate, which is a shape that appears nowhere else on the site. Plus a
 * single soft crimson bloom behind it, the only warm light on the page.
 *
 * The three steps are here rather than in their own section because the moment
 * someone decides to submit is the moment "what happens next?" matters. Putting
 * them further up the page means answering the question before it is asked.
 */
export default function CtaBand({ onOpenSubmit }) {
    const { lang, t } = useLang();

    const steps = [
        {
            title: { bn: 'ফরম পূরণ করুন', en: 'Fill the form' },
            body: {
                bn: 'নাম, জেলা আর প্রতিভার ধরন — কয়েকটি ঘর, দুই মিনিটের কাজ।',
                en: 'Name, district and the kind of talent. A few fields, two minutes.',
            },
        },
        {
            title: { bn: 'ভিডিও পাঠান', en: 'Send the video' },
            body: {
                bn: 'এক টেকে তোলা ভিডিও আপলোড করুন। ফোনে তোলা ভিডিওই যথেষ্ট।',
                en: 'Upload your single-take recording. A phone recording is enough.',
            },
        },
        {
            title: { bn: 'যাচাই ও প্রকাশ', en: 'Checked, then published' },
            body: {
                bn: 'আমরা যাচাই করে চ্যানেলে প্রকাশ করি এবং আপনাকে জানিয়ে দিই।',
                en: 'We verify it, publish it on the channel, and let you know.',
            },
        },
    ];

    return (
        <Section id="submit" tone="canvas" pad="loose">
            {/* The single warm light on the site. Sits behind the frame and is
                large and diffuse enough to read as bloom, not as a shape. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson/[0.09] blur-[110px]"
            />

            <Reveal className="relative mx-auto max-w-4xl border border-brass/20 px-6 py-16 sm:px-14 sm:py-20 lg:px-20 lg:py-24">
                {/* All four corners — the certificate device. */}
                <span aria-hidden="true" className="pointer-events-none text-brass/50">
                    <AlponaCorner corner="tl" className="absolute -left-px -top-px h-12 w-12" />
                    <AlponaCorner corner="tr" className="absolute -right-px -top-px h-12 w-12" />
                    <AlponaCorner corner="bl" className="absolute -bottom-px -left-px h-12 w-12" />
                    <AlponaCorner corner="br" className="absolute -bottom-px -right-px h-12 w-12" />
                </span>

                <div className="flex flex-col items-center text-center">
                    <Reveal className="caps text-[9px] text-brass" y={14}>
                        {t('জমা দেওয়া সারা বছর খোলা', 'Submissions open all year')}
                    </Reveal>

                    <Reveal variant="mask" delay={140} className="mt-7">
                        <Display size="xl" className="max-w-2xl text-ink">
                            {t(
                                'আপনার প্রতিভা আমাদের দেখান',
                                'Show us what you can do',
                            )}
                        </Display>
                    </Reveal>

                    <Reveal delay={240} className="mt-7 max-w-lg">
                        <p lang={lang} className="text-sm leading-relaxed text-ink-soft">
                            {t(
                                'একটি ভিডিও, এক টেকে তোলা। মঞ্চের দরকার নেই, দামি ক্যামেরার দরকার নেই — শুধু আপনার গলা বা আপনার নাচ।',
                                'One video, recorded in a single take. No stage required, no expensive camera — just your voice or your movement.',
                            )}
                        </p>
                    </Reveal>

                    <Reveal delay={340} className="mt-11">
                        <button
                            type="button"
                            onClick={onOpenSubmit}
                            className="caps group inline-flex items-center gap-4 bg-crimson px-12 py-5 text-[10px] text-ink transition-colors duration-500 hover:bg-crimson-deep sm:px-16"
                        >
                            {t('প্রতিভা জমা দিন', 'Submit Your Talent')}
                            <svg
                                className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-1.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7 7 7-7 7" />
                            </svg>
                        </button>
                    </Reveal>

                    <Reveal delay={420} className="mt-7">
                        <p lang={lang} className="text-xs text-ink-mute">
                            {t('অথবা সরাসরি পাঠান', 'Or send it directly to')}{' '}
                            <a
                                href={`mailto:${CONTACT_EMAIL}`}
                                className="link-underline text-brass/80"
                            >
                                {CONTACT_EMAIL}
                            </a>
                        </p>
                    </Reveal>
                </div>

                <AlponaDivider className="my-14" />

                {/* Steps */}
                <ol className="grid gap-10 sm:grid-cols-3 sm:gap-8">
                    {steps.map((step, index) => (
                        <Reveal
                            as="li"
                            key={step.title.en}
                            delay={index * 110}
                            className="text-center sm:text-left"
                        >
                            <span
                                aria-hidden="true"
                                className="display block text-xl leading-none text-brass/50"
                            >
                                {counter(index, lang)}
                            </span>

                            <p
                                lang={lang}
                                className="caps mt-4 text-[9px] text-ink"
                            >
                                {step.title[lang]}
                            </p>

                            <p
                                lang={lang}
                                className="mt-3 text-xs leading-relaxed text-ink-mute"
                            >
                                {step.body[lang]}
                            </p>
                        </Reveal>
                    ))}
                </ol>
            </Reveal>
        </Section>
    );
}
