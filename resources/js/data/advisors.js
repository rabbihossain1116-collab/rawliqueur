/**
 * Advisors — the senior media figures lending credibility to the platform.
 *
 * Per the brief: five to six established directors, artists, musicians and
 * journalists. Each records a ~5 minute piece; roughly the first half sits on
 * the About page and the click-through goes to the full cut on YouTube.
 *
 * PLACEHOLDER PEOPLE. Names, photos and video IDs are stand-ins so the layout
 * can be built and reviewed. Replace before launch — do not ship invented
 * credentials for real-looking people.
 *
 * Shape:
 *   slug        Stable key. Used for React keys and deep links.
 *   name        { bn, en }
 *   role        { bn, en } — their standing in the industry, kept to one line.
 *   bio         { bn, en } — two sentences maximum. This is a credibility
 *               section, not a biography section.
 *   photo       Portrait. Cropped square by the component.
 *   videoId     YouTube ID of their full message.
 *   previewStart Seconds — where the on-page half-cut begins.
 *   featured    Surfaces on the homepage advisor strip. Keep this to two, per
 *               the brief (one journalist, one artist).
 */
export const advisors = [
    {
        slug: 'anika-rahman',
        name: { bn: 'আনিকা রহমান', en: 'Anika Rahman' },
        role: { bn: 'সাংবাদিক ও উপস্থাপক', en: 'Journalist & Presenter' },
        bio: {
            bn: 'দুই দশক ধরে সংস্কৃতি সাংবাদিকতায় কাজ করছেন। নতুন শিল্পীদের প্রথম মঞ্চ তৈরি করে দেওয়াই তাঁর কাজের কেন্দ্র।',
            en: 'Two decades in cultural journalism. Building the first stage for new performers has been the centre of her work.',
        },
        photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80',
        videoId: 'sqJ2QhjBQaw',
        previewStart: 12,
        featured: true,
    },
    {
        slug: 'debjit-sen',
        name: { bn: 'দেবজিৎ সেন', en: 'Debjit Sen' },
        role: { bn: 'সুরকার ও শিল্পী', en: 'Composer & Artist' },
        bio: {
            bn: 'লোকসুরকে আধুনিক বিন্যাসে নিয়ে আসার জন্য পরিচিত। বিশ্বাস করেন, কাঁচা গলাতেই আসল সুর ধরা পড়ে।',
            en: 'Known for carrying folk melody into modern arrangement. He believes the true note only shows in an unpolished voice.',
        },
        photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80',
        videoId: 'h89PrRNHV-E',
        previewStart: 20,
        featured: true,
    },
    {
        slug: 'shahnaz-parvin',
        name: { bn: 'শাহনাজ পারভীন', en: 'Shahnaz Parvin' },
        role: { bn: 'নৃত্যশিল্পী ও প্রশিক্ষক', en: 'Dancer & Choreographer' },
        bio: {
            bn: 'শাস্ত্রীয় ও লোকনৃত্যে চার দশকের পথচলা। মঞ্চের বাইরেও প্রজন্মের পর প্রজন্মকে শিখিয়ে চলেছেন।',
            en: 'Four decades across classical and folk dance. Beyond the stage, she has been teaching generation after generation.',
        },
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80',
        videoId: 'UghMf59vDJM',
        previewStart: 25,
    },
    {
        slug: 'kamrul-hasan',
        name: { bn: 'কামরুল হাসান', en: 'Kamrul Hasan' },
        role: { bn: 'চলচ্চিত্র পরিচালক', en: 'Film Director' },
        bio: {
            bn: 'একাধিক জাতীয় স্বীকৃতিপ্রাপ্ত পরিচালক। তাঁর কাজের ভাষা সহজ — ক্যামেরা যত কম কথা বলে, অভিনয় তত বেশি।',
            en: 'A nationally recognised director whose working principle is simple — the less the camera speaks, the more the performance does.',
        },
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
        videoId: 'zEqqW-USajs',
        previewStart: 18,
    },
    {
        slug: 'ustad-nazrul-islam',
        name: { bn: 'ওস্তাদ নজরুল ইসলাম', en: 'Ustad Nazrul Islam' },
        role: { bn: 'তবলা ও বাদ্যযন্ত্রশিল্পী', en: 'Tabla & Instrumentalist' },
        bio: {
            bn: 'ঘরানার ধারাবাহিকতায় বেড়ে ওঠা বাদক। মনে করেন, একটি টেকেই শিল্পীর প্রকৃত দখল বোঝা যায়।',
            en: 'A percussionist raised inside the gharana tradition. He holds that a single take is all it takes to hear real command.',
        },
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80',
        videoId: 'L9CfCjedhPE',
        previewStart: 30,
    },
    {
        slug: 'mitali-dasgupta',
        name: { bn: 'মিতালী দাশগুপ্ত', en: 'Mitali Dasgupta' },
        role: { bn: 'আবৃত্তিশিল্পী', en: 'Recitation Artist' },
        bio: {
            bn: 'বাংলা কবিতার আবৃত্তিতে স্বতন্ত্র কণ্ঠ। মঞ্চে ও বেতারে তিন দশকের বেশি সময় ধরে সক্রিয়।',
            en: 'A distinct voice in Bengali recitation, active on stage and on radio for more than three decades.',
        },
        photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80',
        videoId: 'YxJjFjP0crs',
        previewStart: 15,
    },
];

/** The two who appear on the homepage — see `featured` above. */
export const featuredAdvisors = advisors.filter((advisor) => advisor.featured);
