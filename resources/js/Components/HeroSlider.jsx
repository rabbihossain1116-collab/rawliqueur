import { useState, useEffect, useCallback } from 'react';

const slides = [
    {
        image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=1920&q=80',
        title: 'সংগীত',
        titleEn: 'Music',
    },
    {
        image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1920&q=80',
        title: 'কবিতা',
        titleEn: 'Poetry',
    },
    {
        image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=1920&q=80',
        title: 'নৃত্য',
        titleEn: 'Dance',
    },
    {
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&q=80',
        title: 'গান',
        titleEn: 'Songs',
    },
];

export default function HeroSlider({ lang = 'bn' }) {
    const [current, setCurrent] = useState(0);

    const next = useCallback(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
    }, []);

    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [next]);

    return (
        <section className="relative h-screen min-h-[600px] overflow-hidden">
            {/* Background Images */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === current ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a0a]/70 via-[#1a0a0a]/40 to-[#1a0a0a]" />
                </div>
            ))}

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                {/* Decorative Element */}
                <div className="mb-6 flex items-center gap-3">
                    <div className="w-12 h-px bg-[#D4AF37]" />
                    <svg className="w-8 h-8 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <div className="w-12 h-px bg-[#D4AF37]" />
                </div>

                {/* Subtitle */}
                <p className="text-[#D4AF37] text-lg sm:text-xl font-medium tracking-[0.3em] uppercase mb-4">
                    {lang === 'bn' ? 'প্রতিভা ও কবিতা গানে' : 'In Talent & Poetry & Song'}
                </p>

                {/* Main Title */}
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white font-serif leading-tight mb-4">
                    RAW LIQUEUR
                </h1>

                {/* Bengali Tagline */}
                <p className="text-2xl sm:text-3xl md:text-4xl text-[#D4AF37] font-serif mb-8">
                    বাঙালির প্রাণে
                </p>

                {/* Current Slide Label */}
                <div className="flex items-center gap-2 mb-8">
                    <div className="w-2 h-2 rounded-full bg-[#C41E3A]" />
                    <span className="text-white/60 text-sm">
                        {lang === 'bn' ? slides[current].title : slides[current].titleEn}
                    </span>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <a
                        href="/submit-talent"
                        className="px-8 py-4 bg-gradient-to-r from-[#C41E3A] to-[#8B0000] text-white font-semibold rounded-full hover:from-[#D42B4B] hover:to-[#A00000] transition-all shadow-xl shadow-[#C41E3A]/30 hover:shadow-[#C41E3A]/50 text-lg"
                    >
                        {lang === 'bn' ? 'এখনই জমা দিন' : 'Submit Now'}
                    </a>
                    <a
                        href="/artists"
                        className="px-8 py-4 border-2 border-[#D4AF37]/50 text-[#D4AF37] font-semibold rounded-full hover:bg-[#D4AF37]/10 transition-all text-lg"
                    >
                        {lang === 'bn' ? 'শিল্পীদের দেখুন' : 'View Artists'}
                    </a>
                </div>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                            index === current
                                ? 'bg-[#D4AF37] w-8'
                                : 'bg-white/30 hover:bg-white/50'
                        }`}
                    />
                ))}
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 right-8 z-10 hidden sm:flex flex-col items-center gap-2 text-white/40">
                <span className="text-xs tracking-widest rotate-90 origin-center mb-8">
                    {lang === 'bn' ? 'স্ক্রল' : 'SCROLL'}
                </span>
                <div className="w-px h-12 bg-gradient-to-b from-[#D4AF37] to-transparent" />
            </div>
        </section>
    );
}
