import Section from '@/Components/Section';
import Reveal from '@/Components/Reveal';
import Display from '@/Components/Display';
import SectionHeading from '@/Components/SectionHeading';
import { useLang } from '@/hooks/useLang';
import { counter } from '@/lib/format';

/**
 * RawManifesto — the rules, stated plainly.
 *
 * This section is the reason the channel exists, so it gets the most
 * type-driven treatment on the page: no images, no cards, just numbered
 * declarations separated by hairlines. Adding photography here would dilute it;
 * the restraint is what makes it read as a charter rather than a feature list.
 *
 * The heading column is sticky on desktop so the rules scroll past a fixed
 * statement, which is a cheap way to make a plain list feel authored.
 */

/** Ordered deliberately: what to do, then what not to do, then enforcement. */
const RULES = [
    {
        key: 'one-take',
        title: { bn: 'এক শট, একটানা', en: 'One shot, unbroken' },
        body: {
            bn: 'ক্যামেরা যেখানে বসানো, সেখানেই থাকবে। শুরু থেকে শেষ পর্যন্ত একটানা — মাঝখানে কোনো কাট নেই।',
            en: 'The camera stays where it was placed. Start to finish in one run, with no cut anywhere in between.',
        },
    },
    {
        key: 'no-edit',
        title: { bn: 'কোনো সম্পাদনা নয়', en: 'No editing' },
        body: {
            bn: 'কোনো ফিল্টার নয়, কোনো ব্যাকগ্রাউন্ড মিউজিক নয়, সুর মিলিয়ে নেওয়া নয়। শ্বাসের শব্দটাও থেকে যাবে।',
            en: 'No filters, no backing track, no pitch correction. Even the sound of breathing stays in.',
        },
    },
    {
        key: 'no-ai',
        title: { bn: 'কোনো এআই নয়', en: 'No AI' },
        body: {
            bn: 'কৃত্রিম কণ্ঠ, এআই দিয়ে তৈরি ভিডিও বা এআই দিয়ে ঠিক করা অডিও — কিছুই গ্রহণ করা হয় না।',
            en: 'Synthetic voices, AI-generated video, AI-repaired audio — none of it is accepted.',
        },
    },
    {
        key: 'verified',
        title: { bn: 'প্রতিটি ভিডিও যাচাই হয়', en: 'Every video is checked' },
        body: {
            bn: 'শ্বাস, ঠোঁটের মিল, পটভূমির শব্দ আর ফাইলের মেটাডেটা — চারটিই দেখা হয়। সন্দেহ হলে আবার তোলার সুযোগ দেওয়া হয়।',
            en: 'Breathing, lip sync, ambient sound and file metadata — all four. If something looks off, you get another go.',
        },
    },
];

export default function RawManifesto() {
    const { lang, t } = useLang();

    return (
        <Section id="rules" tone="paper" watermark="-left-48 top-10 h-[36rem] w-[36rem] text-brass/[0.05]">
            <div className="grid gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-24">
                {/* Sticky statement column */}
                <div className="lg:sticky lg:top-32 lg:self-start">
                    <SectionHeading
                        eyebrow={t('আমাদের নিয়ম', 'Our rules')}
                        title={t(
                            'চারটি নিয়ম। কোনো ব্যতিক্রম নেই।',
                            'Four rules. No exceptions.',
                        )}
                        lead={t(
                            'একটা কাট প্রতিভা বাড়ায় না, শুধু ভুলটা সরিয়ে দেয়। আমরা ভুলটাও রাখতে চাই — কারণ সেখানেই মানুষটা থাকে।',
                            'A cut does not add talent; it only removes the mistake. We keep the mistake — because that is where the person is.',
                        )}
                    />
                </div>

                {/* Rules */}
                <ol className="border-t border-brass/12">
                    {RULES.map((rule, index) => (
                        <Reveal
                            as="li"
                            key={rule.key}
                            delay={index * 90}
                            className="group border-b border-brass/12 py-9 sm:py-11"
                        >
                            <div className="flex gap-6 sm:gap-10">
                                <span
                                    aria-hidden="true"
                                    className="display shrink-0 pt-1 text-2xl leading-none text-brass/45 transition-colors duration-700 group-hover:text-brass sm:text-3xl"
                                >
                                    {counter(index, lang)}
                                </span>

                                <div className="min-w-0">
                                    <Display size="sm" as="h3" className="text-ink">
                                        {rule.title[lang]}
                                    </Display>

                                    <p
                                        lang={lang}
                                        className="mt-3.5 max-w-xl text-sm leading-relaxed text-ink-soft"
                                    >
                                        {rule.body[lang]}
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </ol>
            </div>
        </Section>
    );
}
