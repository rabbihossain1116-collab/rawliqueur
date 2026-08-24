import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import ApplicationLogo from './ApplicationLogo';

export default function Header({ lang = 'bn', setLang, onOpenSubmit }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = lang === 'bn'
        ? [
            { label: 'হোম', href: '/' },
            { label: 'আমাদের সম্পর্কে', href: '/about' },
            { label: 'শিল্পী', href: '/artists' },
            { label: 'বিজয়ী', href: '/winners' },
            { label: 'ব্লগ', href: '/blog' },
            { label: 'যোগাযোগ', href: '/contact' },
        ]
        : [
            { label: 'Home', href: '/' },
            { label: 'About Us', href: '/about' },
            { label: 'Artists', href: '/artists' },
            { label: 'Winners', href: '/winners' },
            { label: 'Blog', href: '/blog' },
            { label: 'Contact', href: '/contact' },
        ];

    const submitText = lang === 'bn' ? 'প্রতিভা জমা দিন' : 'Submit Your Talent';

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-black/5 border-b border-black/5'
                    : 'bg-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    <Link href="/" className="flex items-center gap-2 group">
                        {scrolled ? (
                            <ApplicationLogo className="h-10 sm:h-12 w-auto" />
                        ) : (
                            <ApplicationLogo className="h-10 sm:h-12 w-auto brightness-0 invert opacity-90" />
                        )}
                    </Link>

                    <nav className="hidden lg:flex items-center gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                                    scrolled
                                        ? 'text-[#333] hover:text-[#C41E3A] hover:bg-[#C41E3A]/5'
                                        : 'text-white/90 hover:text-white hover:bg-white/10'
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
                            className={`px-3 py-1.5 text-xs font-bold rounded-full border transition-colors ${
                                scrolled
                                    ? 'border-[#C41E3A]/30 text-[#C41E3A] hover:bg-[#C41E3A]/5'
                                    : 'border-white/40 text-white hover:bg-white/10'
                            }`}
                        >
                            {lang === 'bn' ? 'EN' : 'বাং'}
                        </button>

                        {onOpenSubmit ? (
                            <button
                                onClick={onOpenSubmit}
                                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#C41E3A] to-[#8B0000] text-white text-sm font-semibold rounded-full hover:from-[#D42B4B] hover:to-[#A00000] transition-all shadow-lg shadow-[#C41E3A]/20 hover:shadow-[#C41E3A]/40"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                {submitText}
                            </button>
                        ) : (
                            <Link
                                href="/submit-talent"
                                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#C41E3A] to-[#8B0000] text-white text-sm font-semibold rounded-full hover:from-[#D42B4B] hover:to-[#A00000] transition-all shadow-lg shadow-[#C41E3A]/20 hover:shadow-[#C41E3A]/40"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                {submitText}
                            </Link>
                        )}

                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className={`lg:hidden p-2 transition-colors ${
                                scrolled ? 'text-[#333] hover:text-[#C41E3A]' : 'text-white hover:text-white/80'
                            }`}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mobileOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {mobileOpen && (
                    <div className="lg:hidden pb-4 border-t border-black/5 mt-2 pt-4 bg-white shadow-xl rounded-b-xl">
                        <nav className="flex flex-col gap-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="px-4 py-3 text-[#333] hover:text-[#C41E3A] hover:bg-[#C41E3A]/5 rounded-lg transition-colors font-medium"
                                >
                                    {item.label}
                                </Link>
                            ))}
                            {onOpenSubmit ? (
                                <button
                                    onClick={() => { onOpenSubmit(); setMobileOpen(false); }}
                                    className="mx-4 mt-3 py-3 bg-gradient-to-r from-[#C41E3A] to-[#8B0000] text-white text-center font-semibold rounded-full"
                                >
                                    {submitText}
                                </button>
                            ) : (
                                <Link
                                    href="/submit-talent"
                                    onClick={() => setMobileOpen(false)}
                                    className="mx-4 mt-3 py-3 bg-gradient-to-r from-[#C41E3A] to-[#8B0000] text-white text-center font-semibold rounded-full"
                                >
                                    {submitText}
                                </Link>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
