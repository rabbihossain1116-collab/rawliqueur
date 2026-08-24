import { Link } from '@inertiajs/react';

export default function Footer({ lang = 'bn' }) {
    const currentYear = new Date().getFullYear();

    const quickLinks = lang === 'bn'
        ? [
            { label: 'হোম', href: '/' },
            { label: 'ভিডিও', href: '/#videos' },
            { label: 'আমাদের সম্পর্কে', href: '/about' },
            { label: 'শিল্পী', href: '/artists' },
            { label: 'বিজয়ী', href: '/winners' },
            { label: 'ব্লগ', href: '/blog' },
            { label: 'যোগাযোগ', href: '/contact' },
        ]
        : [
            { label: 'Home', href: '/' },
            { label: 'Videos', href: '/#videos' },
            { label: 'About Us', href: '/about' },
            { label: 'Artists', href: '/artists' },
            { label: 'Winners', href: '/winners' },
            { label: 'Blog', href: '/blog' },
            { label: 'Contact', href: '/contact' },
        ];

    const supportLinks = lang === 'bn'
        ? [
            { label: 'প্রতিভা জমা দিন', href: '/submit-talent' },
            { label: 'নিয়মাবলী', href: '/rules' },
            { label: 'গোপনীয়তা নীতি', href: '/privacy' },
            { label: 'শর্তাবলী', href: '/terms' },
            { label: 'সচরাচর জিজ্ঞাসা', href: '/faq' },
        ]
        : [
            { label: 'Submit Talent', href: '/submit-talent' },
            { label: 'Rules & Guidelines', href: '/rules' },
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms & Conditions', href: '/terms' },
            { label: 'FAQ', href: '/faq' },
        ];

    const categories = lang === 'bn'
        ? [
            { label: 'গান', href: '/?category=singing' },
            { label: 'কবিতা', href: '/?category=poetry' },
            { label: 'নৃত্য', href: '/?category=dance' },
            { label: 'গল্প', href: '/?category=storytelling' },
            { label: 'সব ক্যাটাগরি', href: '/#videos' },
        ]
        : [
            { label: 'Singing', href: '/?category=singing' },
            { label: 'Poetry', href: '/?category=poetry' },
            { label: 'Dance', href: '/?category=dance' },
            { label: 'Storytelling', href: '/?category=storytelling' },
            { label: 'All Categories', href: '/#videos' },
        ];

    const newsletterText = lang === 'bn'
        ? 'নতুন প্রতিভা সম্পর্কে আপডেট পেতে সাবস্ক্রাইব করুন।'
        : 'Subscribe to get updates about new talents.';

    const copyright = lang === 'bn'
        ? `© ${currentYear} RAW LIQUEUR. সর্বস্বত্ব সংরক্ষিত।`
        : `© ${currentYear} RAW LIQUEUR. All Rights Reserved.`;

    const description = lang === 'bn'
        ? 'বাংলাদেশ ও কলকাতা থেকে কাঁচা, সত্য ও অসাধারণ প্রতিভার প্ল্যাটফর্ম।'
        : 'A platform for raw, real and remarkable talent from Bangladesh & Kolkata.';

    return (
        <footer className="bg-[#0d0505] border-t border-[#D4AF37]/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center">
                                <span className="text-[#1a0a0a] font-bold text-lg font-serif">R</span>
                            </div>
                            <span className="text-[#D4AF37] font-bold text-xl tracking-wider font-serif">
                                RAWLIQUEUR
                            </span>
                        </Link>
                        <p className="text-white/40 text-sm leading-relaxed mb-6">
                            {description}
                        </p>
                        {/* Social Icons */}
                        <div className="flex gap-3">
                            {[
                                { name: 'facebook', url: 'https://facebook.com/rawliqueur' },
                                { name: 'instagram', url: 'https://instagram.com/rawliqueur' },
                                { name: 'youtube', url: 'https://youtube.com/rawliqueur' },
                                { name: 'twitter', url: 'https://twitter.com/rawliqueur' },
                            ].map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        {social.name === 'facebook' && <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />}
                                        {social.name === 'instagram' && <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />}
                                        {social.name === 'youtube' && <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />}
                                        {social.name === 'twitter' && <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />}
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-[#D4AF37] font-semibold text-sm tracking-wider uppercase mb-4">
                            {lang === 'bn' ? 'দ্রুত লিংক' : 'Quick Links'}
                        </h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-white/40 hover:text-[#D4AF37] text-sm transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-[#D4AF37] font-semibold text-sm tracking-wider uppercase mb-4">
                            {lang === 'bn' ? 'সহায়তা' : 'Help & Support'}
                        </h3>
                        <ul className="space-y-2">
                            {supportLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-white/40 hover:text-[#D4AF37] text-sm transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories & Newsletter */}
                    <div>
                        <h3 className="text-[#D4AF37] font-semibold text-sm tracking-wider uppercase mb-4">
                            {lang === 'bn' ? 'ক্যাটাগরি' : 'Categories'}
                        </h3>
                        <ul className="space-y-2 mb-8">
                            {categories.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-white/40 hover:text-[#D4AF37] text-sm transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Newsletter */}
                        <h3 className="text-[#D4AF37] font-semibold text-sm tracking-wider uppercase mb-3">
                            {lang === 'bn' ? 'নিউজলেটার' : 'Newsletter'}
                        </h3>
                        <p className="text-white/40 text-sm mb-3">{newsletterText}</p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder={lang === 'bn' ? 'ইমেইল দিন' : 'Your email'}
                                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-l-full text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50"
                            />
                            <button className="px-4 py-2 bg-gradient-to-r from-[#C41E3A] to-[#8B0000] text-white rounded-r-full hover:from-[#D42B4B] hover:to-[#A00000] transition-all">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-white/30 text-sm">{copyright}</p>
                    <div className="flex items-center gap-1 text-white/20 text-sm">
                        <span>Made with</span>
                        <svg className="w-4 h-4 text-[#C41E3A]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        <span>for বাংলা</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
