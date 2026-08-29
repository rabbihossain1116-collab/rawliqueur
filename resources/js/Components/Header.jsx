import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { url } = usePage();

    const navLinks = [
        { label: 'Home', href: '/' },
        { label: 'About Us', href: '/about' },
        { label: 'Artists', href: '/artists' },
        { label: 'Winners', href: '/winners' },
        { label: 'Blog', href: '/journal' },
        { label: 'Contact', href: '/contact' },
    ];

    const isActive = (href) => url === href;

    return (
        <>
            <header className="flex items-center justify-between px-8 py-5 max-w-[1240px] mx-auto">
                <Link href="/" className="flex-shrink-0">
                    <img src="/image/rllogo.png" alt="RAW LIQUEUR" className="h-[50px] w-auto" />
                </Link>

                <nav className="hidden md:block">
                    <ul className="flex gap-[34px] text-[15px] font-medium">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`transition-colors hover:text-pink ${isActive(link.href) ? 'text-pink relative' : 'text-[#3a3548]'}`}
                                >
                                    {link.label}
                                    {isActive(link.href) && (
                                        <span className="absolute left-0 right-0 bottom-[-20px] h-[3px] bg-gradient-to-r from-orange to-pink rounded-sm" />
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <Link
                    href="/submit-talent"
                    className="hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-gradient-to-r from-orange to-pink text-white shadow-[0_8px_20px_-6px_rgba(236,30,99,.55)] hover:brightness-105"
                >
                    &#9733; SUBMIT YOUR TALENT
                </Link>

                <button
                    className="md:hidden flex flex-col gap-[5px] p-1.5 bg-transparent border-none cursor-pointer"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Open menu"
                >
                    <span className="w-6 h-[2.5px] bg-ink rounded-sm" />
                    <span className="w-6 h-[2.5px] bg-ink rounded-sm" />
                    <span className="w-6 h-[2.5px] bg-ink rounded-sm" />
                </button>
            </header>

            <div className={`md:hidden flex-col gap-0.5 bg-white shadow-[0_12px_30px_rgba(0,0,0,.08)] px-6 pb-[18px] relative z-20 ${mobileOpen ? 'flex' : 'hidden'}`}>
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`py-3 text-[15px] font-medium border-b border-[#f4eef1] ${isActive(link.href) ? 'text-pink' : 'text-[#3a3548]'}`}
                    >
                        {link.label}
                    </Link>
                ))}
                <Link
                    href="/submit-talent"
                    className="mt-3.5 flex items-center justify-center w-full gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-gradient-to-r from-orange to-pink text-white shadow-[0_8px_20px_-6px_rgba(236,30,99,.55)]"
                >
                    &#9733; SUBMIT YOUR TALENT
                </Link>
            </div>
        </>
    );
}
