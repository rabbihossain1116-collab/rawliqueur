/**
 * Journal (blog) content.
 *
 * PLACEHOLDER POSTS. Bodies are plain-text paragraph arrays rather than HTML so
 * nothing here can inject markup, and so this file can be swapped for a CMS
 * payload without changing the renderer.
 *
 * Shape:
 *   slug        URL segment. Route is /journal/{slug}.
 *   title       { bn, en }
 *   excerpt     { bn, en } One or two sentences for the index card.
 *   body        { bn: string[], en: string[] } One string per paragraph.
 *   author      Plain string — bylines are not translated.
 *   publishedAt ISO date. Sorted newest-first by string compare.
 *   readMinutes Integer. Displayed, never computed from body length.
 *   cover       Hero image for the card and the article header.
 *   tag         { bn, en } Single category label.
 *   featured    The one post that gets the large slot on the index.
 */
export const posts = [
    {
        slug: 'why-one-take',
        featured: true,
        tag: { bn: 'দর্শন', en: 'Philosophy' },
        title: {
            bn: 'কেন এক টেক? সম্পাদনা যা লুকিয়ে ফেলে',
            en: 'Why one take? What editing hides',
        },
        excerpt: {
            bn: 'একটি কাট প্রতিভা বাড়ায় না, শুধু ভুলটা সরিয়ে দেয়। আমরা ভুলটাও রাখতে চাই — কারণ সেখানেই মানুষটা থাকে।',
            en: 'A cut does not add talent; it only removes the mistake. We want to keep the mistake — because that is where the person is.',
        },
        body: {
            bn: [
                'একটা গান রেকর্ড করার পর সাধারণত কী হয়? সুর মিলিয়ে নেওয়া হয়, শ্বাসের শব্দ মুছে দেওয়া হয়, দুর্বল জায়গাটা কেটে বাদ দেওয়া হয়। শেষে যা দাঁড়ায়, সেটা নিখুঁত — কিন্তু সেটা আর ওই মানুষটার গলা নয়।',
                'আমাদের নিয়মটা তাই একটাই: একটা শট, একটানা। ক্যামেরা যেখানে বসানো, সেখানেই থাকবে। কোনো ব্যাকগ্রাউন্ড মিউজিক নয়, কোনো ফিল্টার নয়, কোনো এআই নয়।',
                'এতে যা হয় — সুর কখনো একটু কেঁপে যায়, হাত কখনো একটু কাঁপে, পেছনে হয়তো একটা রিকশার হর্ন শোনা যায়। আমরা সেগুলো রেখে দিই। কারণ ওই কম্পনটাই প্রমাণ, যে সামনে দাঁড়ানো মানুষটা সত্যিই গাইছে।',
                'প্রতিটি জমা পড়া ভিডিও আমাদের এখানে যাচাই করা হয়। কোনো সম্পাদনা, কোনো কৃত্রিম কণ্ঠ বা কোনো ফিল্টার ধরা পড়লে সেটি বাদ যায় — কোনো ব্যতিক্রম নেই। এই একটা নিয়মের ওপরেই পুরো চ্যানেলটা দাঁড়িয়ে আছে।',
            ],
            en: [
                'What usually happens after a song is recorded? The pitch is corrected, the breaths are erased, the weak bar is cut out. What is left is flawless — and it is no longer that person\'s voice.',
                'So our rule is a single one: one shot, unbroken. The camera stays exactly where it was placed. No backing track, no filter, no AI.',
                'What follows is that the pitch sometimes wavers, a hand sometimes shakes, and a rickshaw horn occasionally cuts through from the street. We keep all of it. That waver is the proof that the person in front of you is genuinely singing.',
                'Every submission is checked here before it goes out. Any editing, any synthetic voice, any filter and it is set aside — without exception. The entire channel rests on that one rule.',
            ],
        },
        author: 'RAW LIQUEUR',
        publishedAt: '2026-08-18',
        readMinutes: 4,
        cover: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=1600&q=80',
    },
    {
        slug: 'how-to-record-at-home',
        tag: { bn: 'নির্দেশিকা', en: 'Guide' },
        title: {
            bn: 'ঘরে বসে ভিডিও তোলার সাত কথা',
            en: 'Seven notes on recording at home',
        },
        excerpt: {
            bn: 'দামি ক্যামেরার দরকার নেই। দরকার আলো, নীরবতা আর স্থির একটা ফোন। বাকিটা আপনার গলা।',
            en: 'You do not need an expensive camera. You need light, quiet, and a phone that stays still. The rest is your voice.',
        },
        body: {
            bn: [
                'এক — জানালার দিকে মুখ করে দাঁড়ান, জানালাকে পিছনে রাখবেন না। দিনের আলোই সবচেয়ে ভালো আলো, আর এটা বিনামূল্যে।',
                'দুই — ফোনটা কোথাও ঠেকিয়ে রাখুন। বই, দেয়াল, চেয়ার — যা হাতের কাছে আছে। হাতে ধরে তোলা ভিডিও দেখতে অস্থির লাগে।',
                'তিন — ফোন থেকে দুই হাত দূরে দাঁড়ান। খুব কাছে দাঁড়ালে গলা ফেটে যায়, খুব দূরে দাঁড়ালে ঘরের প্রতিধ্বনি ঢুকে পড়ে।',
                'চার — ফ্যান বন্ধ করুন। মাইক্রোফোন ফ্যানের শব্দকে আপনার গলার চেয়ে জোরে শোনে।',
                'পাঁচ — শুরু করার আগে তিন সেকেন্ড চুপ থাকুন, শেষ করার পরেও তিন সেকেন্ড। এতে শুরুটা আর শেষটা কাটা পড়ে না।',
                'ছয় — এক টেকেই শেষ করুন। ভুল হলে আবার প্রথম থেকে শুরু করুন, মাঝখান থেকে জোড়া দেবেন না।',
                'সাত — ফোনটা আড়াআড়ি ধরুন, খাড়া নয়। ইউটিউবে আড়াআড়ি ভিডিওই পুরো পর্দা জুড়ে দেখা যায়।',
            ],
            en: [
                'One — face the window, do not stand with your back to it. Daylight is the best light there is, and it costs nothing.',
                'Two — rest the phone against something. A book, a wall, a chair; whatever is nearest. Handheld footage is restless to watch.',
                'Three — stand about two arm-lengths from the phone. Too close and the voice distorts; too far and the room\'s echo comes in with it.',
                'Four — switch the fan off. A microphone hears a fan more clearly than it hears you.',
                'Five — hold three seconds of silence before you begin and three after you finish. That keeps the opening and the ending from being clipped.',
                'Six — finish in one take. If it goes wrong, start again from the top; never splice from the middle.',
                'Seven — hold the phone sideways, not upright. Landscape is what fills the screen on YouTube.',
            ],
        },
        author: 'RAW LIQUEUR',
        publishedAt: '2026-08-11',
        readMinutes: 3,
        cover: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1600&q=80',
    },
    {
        slug: 'talent-outside-dhaka',
        tag: { bn: 'প্রতিবেদন', en: 'Report' },
        title: {
            bn: 'ঢাকার বাইরে যে গলাগুলো কেউ শোনেনি',
            en: 'The voices outside Dhaka that nobody heard',
        },
        excerpt: {
            bn: 'প্রথম তিন মাসে জমা পড়েছে চৌদ্দটি জেলা থেকে। রাজধানীর বাইরের সংখ্যাটা আমাদের নিজেদেরও অবাক করেছে।',
            en: 'Submissions arrived from fourteen districts in the first three months. The share from outside the capital surprised even us.',
        },
        body: {
            bn: [
                'আমরা ধরে নিয়েছিলাম শুরুতে বেশিরভাগ ভিডিও আসবে ঢাকা থেকে। বাস্তবে হয়েছে উল্টো। প্রথম তিন মাসের জমা পড়া ভিডিওর বড় অংশ এসেছে কুষ্টিয়া, ময়মনসিংহ, সিলেট আর রাঙামাটি থেকে।',
                'এর কারণটা সম্ভবত সহজ। রাজধানীতে গান শেখার জায়গা আছে, মঞ্চ আছে, প্রতিযোগিতা আছে। বাইরে সেসব নেই — কিন্তু গান আছে। শুধু শোনার লোক ছিল না।',
                'একটা ভিডিওতে দেখা যায়, একজন উঠোনে দাঁড়িয়ে গাইছেন, পেছনে সন্ধ্যার আলো নিভে আসছে। কোনো মাইক নেই, কোনো যন্ত্র নেই। ওই একটা ভিডিও আমাদের চ্যানেলের সবচেয়ে বেশি দেখা পরিবেশনা।',
                'এটাই ছিল ধারণাটার মূল কথা — মঞ্চ নয়, গলাটাই আসল।',
            ],
            en: [
                'We assumed most videos would come from Dhaka at first. The opposite happened. A large share of the first three months\' submissions came from Kushtia, Mymensingh, Sylhet and Rangamati.',
                'The reason is probably simple. The capital has places to learn, stages to stand on, competitions to enter. Outside it, none of that exists — but the singing does. There was just nobody listening.',
                'In one video, someone sings standing in a courtyard as the evening light drains out behind them. No microphone, no instrument. That single video is the most-watched performance on the channel.',
                'Which was the point of the whole idea — the stage was never what mattered, the voice was.',
            ],
        },
        author: 'RAW LIQUEUR',
        publishedAt: '2026-08-04',
        readMinutes: 5,
        cover: 'https://images.unsplash.com/photo-1533444621158-9d3b0a4f5e83?w=1600&q=80',
    },
    {
        slug: 'what-we-check-for-ai',
        tag: { bn: 'নিয়ম', en: 'Rules' },
        title: {
            bn: 'এআই ধরা পড়ে কীভাবে',
            en: 'How we catch AI',
        },
        excerpt: {
            bn: 'জমা পড়া প্রতিটি ভিডিও আমাদের এখানে যাচাই হয়। কী দেখা হয়, সেটা গোপন কিছু নয় — বরং জেনে রাখাই ভালো।',
            en: 'Every submission is checked here. What we look at is not a secret — it is better that you know.',
        },
        body: {
            bn: [
                'প্রথমে দেখা হয় শ্বাস। কৃত্রিম কণ্ঠে শ্বাস নেওয়ার শব্দ থাকে না, বা থাকলেও সেটা একই জায়গায় একইভাবে ফিরে আসে। মানুষের শ্বাস অনিয়মিত।',
                'তারপর দেখা হয় ঠোঁট আর শব্দের মিল। ফ্রেম ধরে ধরে দেখলে সম্পাদিত বা সিন্থেটিক অডিওতে সামান্য দেরি ধরা পড়ে।',
                'তারপর পটভূমি। এক টেকের ভিডিওতে পেছনের শব্দ — পাখি, গাড়ি, বাতাস — গানের সঙ্গে একটানা চলে। কেটে জোড়া দিলে ওই শব্দে হঠাৎ ছেদ পড়ে।',
                'শেষে দেখা হয় ফাইলের মেটাডেটা। কোন অ্যাপে তোলা, কতবার সেভ হয়েছে, কোনো এডিটিং সফটওয়্যারের চিহ্ন আছে কিনা।',
                'কোনো একটি জায়গায় সন্দেহ হলে ভিডিওটি বাদ দেওয়া হয় না — আমরা আগে জমাদাতাকে জানাই এবং আবার তোলার সুযোগ দিই। উদ্দেশ্য কাউকে বাদ দেওয়া নয়, নিয়মটা টিকিয়ে রাখা।',
            ],
            en: [
                'The first thing we look at is breathing. A synthetic voice either has no audible breath or repeats the same breath in the same place. Human breathing is irregular.',
                'Next, lips against sound. Stepped through frame by frame, edited or synthetic audio reveals a small delay.',
                'Then the background. In a true single take, the ambient sound — birds, traffic, wind — runs continuously underneath the performance. Splice it and that sound jumps.',
                'Finally the file metadata: which app recorded it, how many times it was saved, whether any editing software left a trace.',
                'If something looks off in one of those places we do not simply reject it — we tell the person and give them another go. The aim is not to disqualify anyone, it is to keep the rule intact.',
            ],
        },
        author: 'RAW LIQUEUR',
        publishedAt: '2026-07-28',
        readMinutes: 4,
        cover: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&q=80',
    },
];

/** The post that takes the large slot on the journal index. */
export const featuredPost = posts.find((post) => post.featured) ?? posts[0];

/** Everything except the featured post, for the index grid. */
export const restPosts = posts.filter((post) => post !== featuredPost);

/** @returns {typeof posts[number] | undefined} */
export const findPost = (slug) => posts.find((post) => post.slug === slug);
