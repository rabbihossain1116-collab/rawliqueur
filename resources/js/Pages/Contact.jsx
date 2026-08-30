import { useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import TalentForm from '@/Components/TalentForm';
import { Link } from '@inertiajs/react';

export default function Contact({ contactContent }) {
    const [showTalentForm, setShowTalentForm] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const hero = contactContent?.hero || { bgImage: '/images/slider 1.png', label: 'Get in Touch', title: "We'd Love to Hear", subtitle: 'From You — RAW LIQUEUR', button1Text: '✉️ Send a Message', button2Text: '❓ FAQ' };
    const contactInfo = contactContent?.contact_info || [];
    const formSettings = contactContent?.form || { heading: 'SEND US A MESSAGE', title: "Let's start a conversation", subjects: [], mapEmbedUrl: '' };
    const faqs = contactContent?.faqs || [];
    const socialLinks = contactContent?.social_links || [];
    const businessHours = contactContent?.business_hours || { title: '🕐 Business Hours', hours: [] };
    const cta = contactContent?.cta || { icon: '🎤', title: 'Ready to showcase your', titleHighlight: ' talent', titleSuffix: '?', description: '', button1Text: '★ SUBMIT YOUR TALENT', button2Text: 'View Winners 🏆', button2Link: '/winners' };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you within 24 hours.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <PublicLayout onSubmitTalent={() => setShowTalentForm(true)}>
            {/* Hero Section */}
            <section className="px-4 sm:px-8 pt-5 sm:pt-6 pb-0">
                <div className="max-w-[1180px] mx-auto relative rounded-xl sm:rounded-2xl overflow-hidden min-h-[240px] sm:min-h-[300px] md:min-h-[340px] flex items-center bg-cover bg-center"
                    style={{ backgroundImage: `url('${hero.bgImage}')` }}>
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="relative z-10 p-6 sm:p-10 md:p-14 max-w-[560px]">
                        <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                            <span className="text-2xl sm:text-3xl md:text-4xl">📬</span>
                            <span className="text-[#E9C784] font-bold text-[10px] sm:text-[11px] md:text-[12px] tracking-[2px] sm:tracking-[3px] uppercase">{hero.label}</span>
                        </div>
                        <div className="font-hind text-[22px] sm:text-[28px] md:text-[34px] font-bold text-white text-shadow-lg mb-1.5">{hero.title}</div>
                        <div className="text-[16px] sm:text-[18px] md:text-[22px] font-semibold text-[#f3d9a8]"><span className="text-white">{hero.subtitle}</span></div>
                        <div className="flex gap-3 sm:gap-4 flex-wrap mt-5 sm:mt-6 md:mt-8">
                            <a href="#contact-form" className="inline-flex items-center gap-2 px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 md:py-3.5 rounded-full font-semibold text-xs sm:text-sm bg-gradient-to-r from-orange to-pink text-white shadow-[0_8px_25px_-6px_rgba(236,30,99,.6)] hover:brightness-110 transition-all">
                                {hero.button1Text}
                            </a>
                            <a href="#faq" className="inline-flex items-center gap-2 px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 md:py-3.5 rounded-full font-semibold text-xs sm:text-sm bg-white/10 text-white border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all">
                                {hero.button2Text}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-10 sm:py-12 md:py-[70px]">
                <div className="max-w-[1160px] mx-auto px-4 sm:px-5 md:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                        {contactInfo.map((info, i) => (
                            <div key={i} className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 text-center shadow-[0_10px_40px_-10px_rgba(0,0,0,.06)] hover:shadow-[0_15px_50px_-10px_rgba(236,30,99,.12)] transition-all duration-300 hover:-translate-y-1">
                                <span className="text-3xl sm:text-4xl mb-3 sm:mb-4 block">{info.icon}</span>
                                <h3 className="text-[14px] sm:text-[15px] md:text-[16px] font-bold text-ink mb-2.5 sm:mb-3">{info.title}</h3>
                                <div className="space-y-0.5 sm:space-y-1">
                                    {info.details?.map((detail, j) => (
                                        <p key={j} className="text-muted text-[12px] sm:text-[13px]">{detail}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form + Map */}
            <section id="contact-form" className="py-10 sm:py-12 md:py-[70px] bg-[#fdf8f5]">
                <div className="max-w-[1160px] mx-auto px-4 sm:px-5 md:px-8">
                    <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 text-pink font-bold text-[11px] sm:text-[12px] md:text-[13px] tracking-[1.5px] sm:tracking-[2px] mb-3 sm:mb-4">
                        <span className="w-8 sm:w-10 md:w-[50px] h-px bg-[#f0c9d3]" />
                        {formSettings.heading}
                        <span className="w-8 sm:w-10 md:w-[50px] h-px bg-[#f0c9d3]" />
                    </div>
                    <h2 className="text-center font-playfair italic font-normal text-[24px] sm:text-[28px] md:text-[34px] mb-8 sm:mb-9 md:mb-[50px]">{formSettings.title}</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 sm:gap-8 md:gap-10">
                        {/* Form */}
                        <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,.06)]">
                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                                    <div>
                                        <label className="block text-[12px] sm:text-[13px] font-semibold text-ink mb-1.5 sm:mb-2">Your Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Enter your name"
                                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#fdf8f5] border border-[#f0e8e0] text-ink text-[13px] sm:text-[14px] focus:border-pink focus:ring-2 focus:ring-pink/20 outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[12px] sm:text-[13px] font-semibold text-ink mb-1.5 sm:mb-2">Email Address *</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="Enter your email"
                                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#fdf8f5] border border-[#f0e8e0] text-ink text-[13px] sm:text-[14px] focus:border-pink focus:ring-2 focus:ring-pink/20 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[12px] sm:text-[13px] font-semibold text-ink mb-1.5 sm:mb-2">Subject *</label>
                                    <select
                                        required
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#fdf8f5] border border-[#f0e8e0] text-ink text-[13px] sm:text-[14px] focus:border-pink focus:ring-2 focus:ring-pink/20 outline-none transition-all cursor-pointer"
                                    >
                                        <option value="">Select a subject</option>
                                        {formSettings.subjects?.map((subj) => (
                                            <option key={subj.value} value={subj.value}>{subj.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[12px] sm:text-[13px] font-semibold text-ink mb-1.5 sm:mb-2">Message *</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="Write your message here..."
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#fdf8f5] border border-[#f0e8e0] text-ink text-[13px] sm:text-[14px] focus:border-pink focus:ring-2 focus:ring-pink/20 outline-none transition-all resize-none"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-3 sm:py-3.5 md:py-4 rounded-xl font-semibold text-xs sm:text-sm bg-gradient-to-r from-orange to-pink text-white shadow-[0_8px_25px_-6px_rgba(236,30,99,.5)] hover:brightness-110 transition-all cursor-pointer"
                                >
                                    Send Message ✉️
                                </button>
                            </form>
                        </div>

                        {/* Map & Social */}
                        <div className="space-y-4 sm:space-y-5 md:space-y-6">
                            {/* Map */}
                            <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,.06)] h-[220px] sm:h-[250px] md:h-[280px] relative">
                                <iframe
                                    src={formSettings.mapEmbedUrl}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Office Location"
                                />
                            </div>

                            {/* Social Links */}
                            <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,.06)]">
                                <h3 className="text-[14px] sm:text-[15px] md:text-[16px] font-bold text-ink mb-3 sm:mb-4">Connect With Us</h3>
                                <div className="flex gap-2.5 sm:gap-3">
                                    {socialLinks.map((social, i) => (
                                        <a
                                            key={i}
                                            href={social.url}
                                            className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-[#fdf8f5] flex items-center justify-center text-ink font-semibold transition-all ${social.color}`}
                                            title={social.name}
                                        >
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Business Hours */}
                            <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,.06)]">
                                <h3 className="text-[14px] sm:text-[15px] md:text-[16px] font-bold text-ink mb-3 sm:mb-4">{businessHours.title}</h3>
                                <div className="space-y-1.5 sm:space-y-2">
                                    {businessHours.hours?.map((hour, i) => (
                                        <div key={i} className="flex justify-between text-[11px] sm:text-[12px] md:text-[13px]">
                                            <span className="text-muted">{hour.days}</span>
                                            <span className={`font-semibold ${hour.isOpen ? 'text-ink' : 'text-pink'}`}>{hour.time}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-10 sm:py-12 md:py-[70px]">
                <div className="max-w-[800px] mx-auto px-4 sm:px-6 md:px-8">
                    <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 text-pink font-bold text-[11px] sm:text-[12px] md:text-[13px] tracking-[1.5px] sm:tracking-[2px] mb-3 sm:mb-4">
                        <span className="w-8 sm:w-10 md:w-[50px] h-px bg-[#f0c9d3]" />
                        FAQ
                        <span className="w-8 sm:w-10 md:w-[50px] h-px bg-[#f0c9d3]" />
                    </div>
                    <h2 className="text-center font-playfair italic font-normal text-[24px] sm:text-[28px] md:text-[34px] mb-8 sm:mb-9 md:mb-[50px]">Frequently asked questions</h2>

                    <div className="space-y-3 sm:space-y-4">
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,.06)]"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full flex items-center justify-between p-4 sm:p-5 md:p-6 text-left cursor-pointer"
                                >
                                    <span className="text-[13px] sm:text-[14px] md:text-[15px] font-semibold text-ink pr-3 sm:pr-4">{faq.question}</span>
                                    <span className={`text-xl sm:text-2xl text-muted transition-transform duration-300 flex-shrink-0 ${openFaq === i ? 'rotate-45' : ''}`}>
                                        +
                                    </span>
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${
                                        openFaq === i ? 'max-h-[200px] pb-4 sm:pb-5 md:pb-6' : 'max-h-0'
                                    }`}
                                >
                                    <p className="px-4 sm:px-5 md:px-6 text-muted text-[12px] sm:text-[13px] md:text-[14px] leading-[1.8]">{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-10 sm:py-12 md:py-[70px] bg-gradient-to-br from-ink via-[#2a1f3d] to-[#1a0f2e]">
                <div className="max-w-[800px] mx-auto px-4 sm:px-6 md:px-8 text-center">
                    <span className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 block">{cta.icon}</span>
                    <h2 className="font-playfair italic text-[26px] sm:text-[30px] md:text-[36px] text-white mb-4 sm:mb-5">
                        {cta.title}
                        <span className="bg-gradient-to-r from-orange to-pink bg-clip-text text-transparent">{cta.titleHighlight}</span>
                        {cta.titleSuffix}
                    </h2>
                    <p className="text-white/70 text-[13px] sm:text-[14px] md:text-[16px] leading-[1.8] mb-6 sm:mb-7 md:mb-8 max-w-[500px] mx-auto">
                        {cta.description}
                    </p>
                    <div className="flex gap-3 sm:gap-4 justify-center flex-wrap">
                        <button onClick={() => setShowTalentForm(true)} className="inline-flex items-center gap-2 px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-full font-semibold text-xs sm:text-sm bg-gradient-to-r from-orange to-pink text-white shadow-[0_10px_30px_-6px_rgba(236,30,99,.55)] hover:brightness-110 transition-all cursor-pointer">
                            {cta.button1Text}
                        </button>
                        <Link href={cta.button2Link} className="inline-flex items-center gap-2 px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-full font-semibold text-xs sm:text-sm border-2 border-white/20 text-white hover:bg-white/10 transition-colors">
                            {cta.button2Text}
                        </Link>
                    </div>
                </div>
            </section>
            {showTalentForm && <TalentForm onClose={() => setShowTalentForm(false)} />}
        </PublicLayout>
    );
}
