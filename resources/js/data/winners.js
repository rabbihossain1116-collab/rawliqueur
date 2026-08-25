/**
 * Winners — monthly and yearly honours.
 *
 * Per the brief, the strongest submission each month (and one each year) is
 * published here and receives a small gift posted to their address. Selection
 * is judged on the YouTube signals the video earned — views, likes and comment
 * response — which is why those numbers are part of the record rather than
 * decoration.
 *
 * PLACEHOLDER DATA.
 *
 * Shape:
 *   tier      'year' | 'month'. Drives which layout the card gets — the
 *             annual winner is presented full-width, months as a grid.
 *   period    { bn, en } Display label for the award window.
 *   citation  { bn, en } One line on *why* they won. This is what makes the
 *             page read as a jury result instead of a leaderboard.
 *   gift      { bn, en } What was sent.
 */
export const winners = [
    {
        id: 'bP8ATWCvqzw',
        tier: 'year',
        period: { bn: '২০২৫ — বর্ষসেরা', en: '2025 — Talent of the Year' },
        name: 'Ishrat Jahan',
        nameBn: 'ইশরাত জাহান',
        category: 'storytelling',
        title: 'Arz Kiya Hai',
        titleBn: 'আরজ কিয়া হ্যায়',
        district: { bn: 'ঢাকা', en: 'Dhaka' },
        citation: {
            bn: 'এক টেকে, কোনো সম্পাদনা ছাড়া টানা পাঁচ মিনিটের গল্প বলা — সারা বছরে দর্শকের সবচেয়ে বেশি সাড়া পাওয়া পরিবেশনা।',
            en: 'Five unbroken minutes of storytelling in a single take, no edits — the most-responded performance of the entire year.',
        },
        gift: { bn: 'স্বীকৃতিপত্র ও উপহার', en: 'Citation & gift hamper' },
        views: '190.6M',
        likes: '1.3M',
        previewStart: 40,
    },
    {
        id: 'UghMf59vDJM',
        tier: 'month',
        period: { bn: 'জুলাই ২০২৬', en: 'July 2026' },
        name: 'Ridoy Das',
        nameBn: 'হৃদয় দাস',
        category: 'folk',
        title: 'Moha Jadu',
        titleBn: 'মহা যাদু',
        district: { bn: 'ময়মনসিংহ', en: 'Mymensingh' },
        citation: {
            bn: 'গ্রামীণ সুরের নিজস্ব পাঠ, কোনো যন্ত্র ছাড়া।',
            en: 'His own reading of a village melody, with no instrument at all.',
        },
        gift: { bn: 'উপহার পাঠানো হয়েছে', en: 'Gift dispatched' },
        views: '42M',
        likes: '380K',
        previewStart: 35,
    },
    {
        id: 'zEqqW-USajs',
        tier: 'month',
        period: { bn: 'জুন ২০২৬', en: 'June 2026' },
        name: 'Tania Khatun',
        nameBn: 'তানিয়া খাতুন',
        category: 'folk',
        title: 'Ma Lo Ma',
        titleBn: 'মা লো মা',
        district: { bn: 'রাজশাহী', en: 'Rajshahi' },
        citation: {
            bn: 'উঠোনে দাঁড়িয়ে গাওয়া — মঞ্চের কোনো প্রয়োজন পড়েনি।',
            en: 'Sung standing in a courtyard — no stage was required.',
        },
        gift: { bn: 'উপহার পাঠানো হয়েছে', en: 'Gift dispatched' },
        views: '38M',
        likes: '340K',
        previewStart: 28,
    },
    {
        id: 'L9CfCjedhPE',
        tier: 'month',
        period: { bn: 'মে ২০২৬', en: 'May 2026' },
        name: 'Moumita Bose',
        nameBn: 'মৌমিতা বসু',
        category: 'dance',
        title: 'Sonchadi',
        titleBn: 'সোঁচাদি',
        district: { bn: 'চট্টগ্রাম', en: 'Chattogram' },
        citation: {
            bn: 'এক ফ্রেমে ধরা নৃত্য, ক্যামেরা একবারও নড়েনি।',
            en: 'A dance held in one frame; the camera never moved once.',
        },
        gift: { bn: 'উপহার পাঠানো হয়েছে', en: 'Gift dispatched' },
        views: '26.7M',
        likes: '210K',
        previewStart: 22,
    },
    {
        id: 'gxet54MhNQI',
        tier: 'month',
        period: { bn: 'এপ্রিল ২০২৬', en: 'April 2026' },
        name: 'Arka Dey',
        nameBn: 'অর্ক দে',
        category: 'singing',
        title: 'Re Mann',
        titleBn: 'রে মন',
        district: { bn: 'বরিশাল', en: 'Barishal' },
        citation: {
            bn: 'কণ্ঠের নিয়ন্ত্রণ আর সংযম — দুটোই একসঙ্গে।',
            en: 'Vocal control and restraint, both at once.',
        },
        gift: { bn: 'উপহার পাঠানো হয়েছে', en: 'Gift dispatched' },
        views: '22M',
        likes: '185K',
        previewStart: 26,
    },
];

/** The annual honour, presented on its own. */
export const yearWinner = winners.find((winner) => winner.tier === 'year') ?? null;

/** Monthly honours, newest first — the array is authored in that order. */
export const monthWinners = winners.filter((winner) => winner.tier === 'month');
