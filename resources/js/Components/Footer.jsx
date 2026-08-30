import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="bg-[#fdf3ea] pt-10 sm:pt-[50px] md:pt-[60px]">
            <div className="max-w-[1160px] mx-auto px-5 sm:px-8 pb-8 sm:pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1.2fr] gap-6 sm:gap-7 md:gap-[30px]">
                <div className="footer-about">
                    <Link href="/" className="flex-shrink-0">
                        <img src="/image/rllogo.png" alt="RAW LIQUEUR" className="h-[40px] sm:h-[50px] w-auto" />
                    </Link>
                    <p className="text-[12px] sm:text-[13px] text-muted leading-[1.7] mt-3 mb-4 sm:mb-[18px] max-w-[220px]">
                        A platform for raw, real and remarkable talent from Bangladesh &amp; India.
                    </p>
                    <div className="flex gap-2 sm:gap-2.5">
                        {['f', '▶', '◎', '♪', '𝕏'].map((icon, i) => (
                            <a key={i} href="#" className="w-8 h-8 sm:w-[34px] sm:h-[34px] rounded-full bg-white flex items-center justify-center text-sm text-ink">
                                {icon}
                            </a>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="text-[11px] sm:text-[13px] tracking-[0.8px] sm:tracking-[1px] text-[#b48a5a] font-bold mb-3 sm:mb-4">QUICK LINKS</h4>
                    <ul className="space-y-2 sm:space-y-2.5 text-[12px] sm:text-[13.5px] text-[#5a5563]">
                        {['Home', 'Videos', 'About Us', 'Artists', 'Winners', 'Blog', 'Contact'].map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-[11px] sm:text-[13px] tracking-[0.8px] sm:tracking-[1px] text-[#b48a5a] font-bold mb-3 sm:mb-4">HELP &amp; SUPPORT</h4>
                    <ul className="space-y-2 sm:space-y-2.5 text-[12px] sm:text-[13.5px] text-[#5a5563]">
                        {['Submit Talent', 'Rules & Guidelines', 'Privacy Policy', 'Terms & Conditions', 'FAQ'].map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-[11px] sm:text-[13px] tracking-[0.8px] sm:tracking-[1px] text-[#b48a5a] font-bold mb-3 sm:mb-4">CATEGORIES</h4>
                    <ul className="space-y-2 sm:space-y-2.5 text-[12px] sm:text-[13.5px] text-[#5a5563]">
                        {['Singing', 'Dance', 'Poetry', 'Storytelling', 'Instrumental', 'All Categories'].map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-[11px] sm:text-[13px] tracking-[0.8px] sm:tracking-[1px] text-[#b48a5a] font-bold mb-3 sm:mb-4">NEWSLETTER</h4>
                    <p className="text-[12px] sm:text-[13px] text-muted mb-2 sm:mb-2.5">Subscribe to get updates about new talents.</p>
                    <div className="flex rounded-full overflow-hidden border border-[#e8dccb]">
                        <input type="email" placeholder="Enter your email" className="flex-1 border-none px-3 sm:px-4 py-2 sm:py-2.5 text-[12px] sm:text-[13px] outline-none bg-white min-w-0" />
                        <button className="bg-pink border-none text-white px-3 sm:px-4 cursor-pointer text-sm">➤</button>
                    </div>
                </div>
            </div>

            <div className="border-t border-[#f0e2cf] text-center py-3 sm:py-4 text-[11px] sm:text-[12.5px] text-[#9a927f]">
                © 2025 RAW LIQUEUR. All Rights Reserved.
            </div>
            <div className="h-1 sm:h-1.5 bg-gradient-to-r from-orange via-pink to-purple" />
        </footer>
    );
}
