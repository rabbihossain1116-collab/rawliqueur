import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="bg-[#fdf3ea] pt-[60px]">
            <div className="max-w-[1160px] mx-auto px-8 pb-10 grid grid-cols-[1.6fr_1fr_1fr_1fr_1.2fr] gap-[30px] max-[980px]:grid-cols-2 max-[980px]:gap-y-[34px] max-[980px]:gap-x-5 max-[480px]:grid-cols-1 max-[480px]:text-left">
                <div className="footer-about">
                    <Link href="/" className="flex-shrink-0">
                        <img src="/image/rllogo.png" alt="RAW LIQUEUR" className="h-[50px] w-auto" />
                    </Link>
                    <p className="text-[13px] text-muted leading-[1.7] mt-3.5 mb-[18px] max-w-[220px]">
                        A platform for raw, real and remarkable talent from Bangladesh &amp; India.
                    </p>
                    <div className="flex gap-2.5">
                        {['f', '▶', '◎', '♪', '𝕏'].map((icon, i) => (
                            <a key={i} href="#" className="w-[34px] h-[34px] rounded-full bg-white flex items-center justify-center text-sm text-ink">
                                {icon}
                            </a>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="text-[13px] tracking-[1px] text-[#b48a5a] font-bold mb-4">QUICK LINKS</h4>
                    <ul className="space-y-2.5 text-[13.5px] text-[#5a5563]">
                        {['Home', 'Videos', 'About Us', 'Artists', 'Winners', 'Blog', 'Contact'].map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-[13px] tracking-[1px] text-[#b48a5a] font-bold mb-4">HELP &amp; SUPPORT</h4>
                    <ul className="space-y-2.5 text-[13.5px] text-[#5a5563]">
                        {['Submit Talent', 'Rules & Guidelines', 'Privacy Policy', 'Terms & Conditions', 'FAQ'].map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-[13px] tracking-[1px] text-[#b48a5a] font-bold mb-4">CATEGORIES</h4>
                    <ul className="space-y-2.5 text-[13.5px] text-[#5a5563]">
                        {['Singing', 'Dance', 'Poetry', 'Storytelling', 'Instrumental', 'All Categories'].map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-[13px] tracking-[1px] text-[#b48a5a] font-bold mb-4">NEWSLETTER</h4>
                    <p className="text-[13px] text-muted mb-2.5">Subscribe to get updates about new talents.</p>
                    <div className="flex rounded-full overflow-hidden border border-[#e8dccb]">
                        <input type="email" placeholder="Enter your email" className="flex-1 border-none px-4 py-2.5 text-[13px] outline-none bg-white" />
                        <button className="bg-pink border-none text-white px-4 cursor-pointer">➤</button>
                    </div>
                </div>
            </div>

            <div className="border-t border-[#f0e2cf] text-center py-4 text-[12.5px] text-[#9a927f]">
                © 2025 RAW LIQUEUR. All Rights Reserved.
            </div>
            <div className="h-1.5 bg-gradient-to-r from-orange via-pink to-purple" />
        </footer>
    );
}
