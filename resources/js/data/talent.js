/**
 * Talent content.
 *
 * Stand-in data. These are real YouTube IDs so previews, thumbnails and links
 * all work while the channel is being filled — swap the array contents for the
 * real submissions (or an API/props payload from the admin panel) and every
 * component downstream keeps working, because they only read the shape below.
 *
 * Shape:
 *   id            YouTube video ID. Doubles as the React key and thumbnail source.
 *   name / nameBn Performer. `nameBn` is optional; components fall back to `name`.
 *   category      Key into CATEGORIES.
 *   title/titleBn Performance title.
 *   district      Where they submitted from — this is the detail that makes the
 *                 roster feel national rather than like stock content.
 *   previewStart  Seconds. Where the muted hover preview drops in, chosen to
 *                 land mid-performance rather than on an intro or a count-in.
 *   duration      Display string only; never parsed.
 */

/**
 * The five submission categories. Order here is the order they appear in every
 * filter bar on the site.
 */
export const CATEGORIES = {
    singing: { bn: 'গান', en: 'Song' },
    poetry: { bn: 'কবিতা', en: 'Poetry' },
    dance: { bn: 'নৃত্য', en: 'Dance' },
    folk: { bn: 'লোকসংগীত', en: 'Folk' },
    storytelling: { bn: 'গল্প', en: 'Storytelling' },
};

/**
 * Today's two performers — the heart of the homepage.
 *
 * Deliberately two, per the brief: one song and one recitation. The cards are
 * large enough that a third would collapse the spread on desktop.
 */
export const todaysTalent = [
    {
        id: 'sqJ2QhjBQaw',
        name: 'Sneha Chakraborty',
        nameBn: 'স্নেহা চক্রবর্তী',
        category: 'singing',
        title: 'Long Distance Love',
        titleBn: 'দূরের ভালোবাসা',
        district: { bn: 'কুষ্টিয়া', en: 'Kushtia' },
        previewStart: 45,
        duration: '04:45',
    },
    {
        id: 'h89PrRNHV-E',
        name: 'Farhan Ahmed',
        nameBn: 'ফারহান আহমেদ',
        category: 'poetry',
        title: 'Ekla Cholo Re',
        titleBn: 'একলা চলো রে',
        district: { bn: 'সিলেট', en: 'Sylhet' },
        previewStart: 30,
        duration: '05:41',
    },
];

/**
 * The full archive behind /videos.
 *
 * `publishedAt` is an ISO date so the newest-first sort is a plain string
 * compare and needs no Date parsing. `views` / `likes` are display strings —
 * the archive page sorts them through `parseCompact` in lib/format.js, since
 * comparing them as strings would rank "9.9K" above "12M".
 */
export const videoLibrary = [
    {
        id: 'sqJ2QhjBQaw',
        name: 'Sneha Chakraborty',
        nameBn: 'স্নেহা চক্রবর্তী',
        category: 'singing',
        title: 'Long Distance Love',
        titleBn: 'দূরের ভালোবাসা',
        district: { bn: 'কুষ্টিয়া', en: 'Kushtia' },
        duration: '04:45',
        views: '76.3M',
        likes: '599K',
        publishedAt: '2026-08-24',
    },
    {
        id: 'h89PrRNHV-E',
        name: 'Farhan Ahmed',
        nameBn: 'ফারহান আহমেদ',
        category: 'poetry',
        title: 'Ekla Cholo Re',
        titleBn: 'একলা চলো রে',
        district: { bn: 'সিলেট', en: 'Sylhet' },
        duration: '05:41',
        views: '30.4M',
        likes: '430K',
        publishedAt: '2026-08-24',
    },
    {
        id: 'UghMf59vDJM',
        name: 'Ridoy Das',
        nameBn: 'হৃদয় দাস',
        category: 'folk',
        title: 'Moha Jadu',
        titleBn: 'মহা যাদু',
        district: { bn: 'ময়মনসিংহ', en: 'Mymensingh' },
        duration: '04:20',
        views: '42M',
        likes: '380K',
        publishedAt: '2026-08-23',
    },
    {
        id: 'zEqqW-USajs',
        name: 'Tania Khatun',
        nameBn: 'তানিয়া খাতুন',
        category: 'folk',
        title: 'Ma Lo Ma',
        titleBn: 'মা লো মা',
        district: { bn: 'রাজশাহী', en: 'Rajshahi' },
        duration: '03:55',
        views: '38M',
        likes: '340K',
        publishedAt: '2026-08-22',
    },
    {
        id: 'YxJjFjP0crs',
        name: 'Nabanita Roy',
        nameBn: 'নবনীতা রায়',
        category: 'singing',
        title: 'Patar Bashori',
        titleBn: 'পাতার বাঁশরি',
        district: { bn: 'খুলনা', en: 'Khulna' },
        duration: '04:10',
        views: '15M',
        likes: '145K',
        publishedAt: '2026-08-21',
    },
    {
        id: 'L9CfCjedhPE',
        name: 'Moumita Bose',
        nameBn: 'মৌমিতা বসু',
        category: 'dance',
        title: 'Sonchadi',
        titleBn: 'সোঁচাদি',
        district: { bn: 'চট্টগ্রাম', en: 'Chattogram' },
        duration: '04:50',
        views: '26.7M',
        likes: '210K',
        publishedAt: '2026-08-20',
    },
    {
        id: 'gxet54MhNQI',
        name: 'Arka Dey',
        nameBn: 'অর্ক দে',
        category: 'singing',
        title: 'Re Mann',
        titleBn: 'রে মন',
        district: { bn: 'বরিশাল', en: 'Barishal' },
        duration: '04:30',
        views: '22M',
        likes: '185K',
        publishedAt: '2026-08-19',
    },
    {
        id: 'ut1rfURWyCo',
        name: 'Suvo Adhikary',
        nameBn: 'শুভ অধিকারী',
        category: 'poetry',
        title: 'Ae Ajnabee',
        titleBn: 'ও অজানা',
        district: { bn: 'রংপুর', en: 'Rangpur' },
        duration: '04:15',
        views: '18M',
        likes: '165K',
        publishedAt: '2026-08-18',
    },
    {
        id: 'bP8ATWCvqzw',
        name: 'Ishrat Jahan',
        nameBn: 'ইশরাত জাহান',
        category: 'storytelling',
        title: 'Arz Kiya Hai',
        titleBn: 'আরজ কিয়া হ্যায়',
        district: { bn: 'ঢাকা', en: 'Dhaka' },
        duration: '05:05',
        views: '190.6M',
        likes: '1.3M',
        publishedAt: '2026-08-17',
    },
    {
        id: 'qz38Kthnxfo',
        name: 'Priya Sengupta',
        nameBn: 'প্রিয়া সেনগুপ্ত',
        category: 'singing',
        title: 'Bhalobashi Tomay',
        titleBn: 'ভালোবাসি তোমায়',
        district: { bn: 'যশোর', en: 'Jashore' },
        duration: '04:55',
        views: '6.2M',
        likes: '54K',
        publishedAt: '2026-08-16',
    },
    {
        id: '4gzRteJyLMA',
        name: 'Sabbir Rahman',
        nameBn: 'সাব্বির রহমান',
        category: 'folk',
        title: 'Nodir Kule',
        titleBn: 'নদীর কূলে',
        district: { bn: 'ফরিদপুর', en: 'Faridpur' },
        duration: '05:20',
        views: '8.5M',
        likes: '72K',
        publishedAt: '2026-08-15',
    },
    {
        id: '2ay9OPlY38A',
        name: 'Anindita Ghosh',
        nameBn: 'অনিন্দিতা ঘোষ',
        category: 'dance',
        title: 'Zindagi Ke Safar',
        titleBn: 'জীবনের পথে',
        district: { bn: 'নারায়ণগঞ্জ', en: 'Narayanganj' },
        duration: '04:05',
        views: '15.2K',
        likes: '148',
        publishedAt: '2026-08-14',
    },
    {
        id: 'v_TG2YnaavU',
        name: 'Mahfuz Alam',
        nameBn: 'মাহফুজ আলম',
        category: 'poetry',
        title: 'Baharon Phool Barsao',
        titleBn: 'ফুল ঝরে যাক',
        district: { bn: 'কুমিল্লা', en: 'Cumilla' },
        duration: '03:40',
        views: '18.5K',
        likes: '175',
        publishedAt: '2026-08-13',
    },
    {
        id: 'NHDYwhfJGzk',
        name: 'Rupa Barua',
        nameBn: 'রূপা বড়ুয়া',
        category: 'storytelling',
        title: 'Kah Doon Tumhe',
        titleBn: 'বলি তোমায়',
        district: { bn: 'রাঙামাটি', en: 'Rangamati' },
        duration: '03:50',
        views: '24.9K',
        likes: '202',
        publishedAt: '2026-08-12',
    },
];

/** Names for the homepage ticker — every performer currently on the channel. */
export const performerNames = videoLibrary.map((video) => ({
    bn: video.nameBn ?? video.name,
    en: video.name,
}));
