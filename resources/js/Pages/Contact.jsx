import { useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Link } from '@inertiajs/react';

const contactInfo = [
    {
        icon: '📍',
        title: 'Our Office',
        details: ['House 42, Road 11', 'Dhanmondi, Dhaka 1205', 'Bangladesh'],
    },
    {
        icon: '📞',
        title: 'Call Us',
        details: ['+880 1712-345678', '+880 2-55667788', 'Mon-Sat: 10AM - 7PM'],
    },
    {
        icon: '✉️',
        title: 'Email Us',
        details: ['info@rawliqueur.com', 'talent@rawliqueur.com', 'support@rawliqueur.com'],
    },
    {
        icon: '🌐',
        title: 'Follow Us',
        details: ['Facebook', 'YouTube', 'Instagram'],
    },
];

const faqs = [
    {
        question: 'How do I submit my talent?',
        answer: 'Click the "Submit Your Talent" button and fill out the form with your details, talent category, and a video link. Our team will review your submission within 48 hours.',
    },
    {
        question: 'What are the eligibility criteria?',
        answer: 'Anyone from Bangladesh or India aged 14 or above can participate. We welcome all forms of raw talent — singing, dancing, poetry, storytelling, instrumental, and more.',
    },
    {
        question: 'How are winners selected?',
        answer: 'Winners are selected through a combination of public voting and expert judge evaluation. Each season culminates in a grand finale where the champion is crowned.',
    },
    {
        question: 'Can I submit multiple entries?',
        answer: 'Yes! You can submit multiple entries in different categories. However, each submission must be a unique performance that hasn\'t been submitted before.',
    },
    {
        question: 'Is there a participation fee?',
        answer: 'No! RAW LIQUEUR is completely free to participate in. We believe talent should have no barriers.',
    },
];

const socialLinks = [
    { name: 'Facebook', icon: 'f', url: '#', color: 'hover:bg-blue-600 hover:text-white' },
    { name: 'YouTube', icon: '▶', url: '#', color: 'hover:bg-red-600 hover:text-white' },
    { name: 'Instagram', icon: '◎', url: '#', color: 'hover:bg-pink hover:text-white' },
    { name: 'TikTok', icon: '♪', url: '#', color: 'hover:bg-ink hover:text-white' },
    { name: 'Twitter', icon: '𝕏', url: '#', color: 'hover:bg-black hover:text-white' },
];

export default function Contact() {
    const [showTalentForm, setShowTalentForm] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you within 24 hours.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <PublicLayout onSubmitTalent={() => setShowTalentForm(true)}>
            {/* Hero Section */}
            <section className="px-8 pt-6 pb-0 max-[600px]:px-4">
                <div className="max-w-[1180px] mx-auto relative rounded-2xl overflow-hidden min-h-[340px] flex items-center bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/slider 1.png')" }}>
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute right-[6%] bottom-[14%] text-[44px] opacity-85 tracking-[18px] max-[600px]:hidden">📬 ✉️ 📞 🌐</div>
                    <div className="relative z-10 p-14 max-w-[560px] max-[600px]:p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-4xl">📬</span>
                            <span className="text-[#E9C784] font-bold text-[12px] tracking-[3px] uppercase">Get in Touch</span>
                        </div>
                        <div className="font-hind text-[34px] font-bold text-white text-shadow-lg mb-1.5 max-[600px]:text-[24px]">We'd Love to Hear</div>
                        <div className="text-[22px] font-semibold text-[#f3d9a8] max-[600px]:text-[16px]"><span className="text-white">From You</span> — RAW LIQUEUR</div>
                        <div className="flex gap-4 flex-wrap mt-8">
                            <a href="#contact-form" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm bg-gradient-to-r from-orange to-pink text-white shadow-[0_8px_25px_-6px_rgba(236,30,99,.6)] hover:brightness-110 transition-all">
                                ✉️ Send a Message
                            </a>
                            <a href="#faq" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm bg-white/10 text-white border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all">
                                ❓ FAQ
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-[70px] max-[480px]:py-[50px]">
                <div className="max-w-[1160px] mx-auto px-8 max-[980px]:px-5">
                    <div className="grid grid-cols-4 gap-6 max-[980px]:grid-cols-2 max-[480px]:grid-cols-1">
                        {contactInfo.map((info, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-[0_10px_40px_-10px_rgba(0,0,0,.06)] hover:shadow-[0_15px_50px_-10px_rgba(236,30,99,.12)] transition-all duration-300 hover:-translate-y-1">
                                <span className="text-4xl mb-4 block">{info.icon}</span>
                                <h3 className="text-[16px] font-bold text-ink mb-3">{info.title}</h3>
                                <div className="space-y-1">
                                    {info.details.map((detail, j) => (
                                        <p key={j} className="text-muted text-[13px]">{detail}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form + Map */}
            <section id="contact-form" className="py-[70px] bg-[#fdf8f5] max-[480px]:py-[50px]">
                <div className="max-w-[1160px] mx-auto px-8 max-[980px]:px-5">
                    <div className="flex items-center justify-center gap-3.5 text-pink font-bold text-[13px] tracking-[2px] mb-4">
                        <span className="w-[50px] h-px bg-[#f0c9d3]" />
                        SEND US A MESSAGE
                        <span className="w-[50px] h-px bg-[#f0c9d3]" />
                    </div>
                    <h2 className="text-center font-playfair italic font-normal text-[34px] mb-[50px] max-[480px]:text-[26px]">Let's start a conversation</h2>

                    <div className="grid grid-cols-2 gap-10 max-[700px]:grid-cols-1">
                        {/* Form */}
                        <div className="bg-white rounded-2xl p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,.06)]">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-2 gap-5 max-[480px]:grid-cols-1">
                                    <div>
                                        <label className="block text-[13px] font-semibold text-ink mb-2">Your Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Enter your name"
                                            className="w-full px-4 py-3 rounded-xl bg-[#fdf8f5] border border-[#f0e8e0] text-ink text-[14px] focus:border-pink focus:ring-2 focus:ring-pink/20 outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[13px] font-semibold text-ink mb-2">Email Address *</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="Enter your email"
                                            className="w-full px-4 py-3 rounded-xl bg-[#fdf8f5] border border-[#f0e8e0] text-ink text-[14px] focus:border-pink focus:ring-2 focus:ring-pink/20 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[13px] font-semibold text-ink mb-2">Subject *</label>
                                    <select
                                        required
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-[#fdf8f5] border border-[#f0e8e0] text-ink text-[14px] focus:border-pink focus:ring-2 focus:ring-pink/20 outline-none transition-all cursor-pointer"
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="general">General Inquiry</option>
                                        <option value="talent">Talent Submission</option>
                                        <option value="partnership">Partnership</option>
                                        <option value="support">Technical Support</option>
                                        <option value="media">Media & Press</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[13px] font-semibold text-ink mb-2">Message *</label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="Write your message here..."
                                        className="w-full px-4 py-3 rounded-xl bg-[#fdf8f5] border border-[#f0e8e0] text-ink text-[14px] focus:border-pink focus:ring-2 focus:ring-pink/20 outline-none transition-all resize-none"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-orange to-pink text-white shadow-[0_8px_25px_-6px_rgba(236,30,99,.5)] hover:brightness-110 transition-all cursor-pointer"
                                >
                                    Send Message ✉️
                                </button>
                            </form>
                        </div>

                        {/* Map & Social */}
                        <div className="space-y-6">
                            {/* Map Placeholder */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,.06)] h-[280px] relative">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.8437572668957!2d90.3862!3d23.7509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b33cfffc33%3A0x4a826f4e361d7b4b!2sDhanmondi%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1234567890"
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
                            <div className="bg-white rounded-2xl p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,.06)]">
                                <h3 className="text-[16px] font-bold text-ink mb-4">Connect With Us</h3>
                                <div className="flex gap-3">
                                    {socialLinks.map((social, i) => (
                                        <a
                                            key={i}
                                            href={social.url}
                                            className={`w-12 h-12 rounded-full bg-[#fdf8f5] flex items-center justify-center text-ink font-semibold transition-all ${social.color}`}
                                            title={social.name}
                                        >
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Business Hours */}
                            <div className="bg-white rounded-2xl p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,.06)]">
                                <h3 className="text-[16px] font-bold text-ink mb-4">🕐 Business Hours</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[13px]">
                                        <span className="text-muted">Monday - Friday</span>
                                        <span className="font-semibold text-ink">10:00 AM - 7:00 PM</span>
                                    </div>
                                    <div className="flex justify-between text-[13px]">
                                        <span className="text-muted">Saturday</span>
                                        <span className="font-semibold text-ink">10:00 AM - 5:00 PM</span>
                                    </div>
                                    <div className="flex justify-between text-[13px]">
                                        <span className="text-muted">Sunday</span>
                                        <span className="font-semibold text-pink">Closed</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-[70px] max-[480px]:py-[50px]">
                <div className="max-w-[800px] mx-auto px-8 max-[480px]:px-4">
                    <div className="flex items-center justify-center gap-3.5 text-pink font-bold text-[13px] tracking-[2px] mb-4">
                        <span className="w-[50px] h-px bg-[#f0c9d3]" />
                        FAQ
                        <span className="w-[50px] h-px bg-[#f0c9d3]" />
                    </div>
                    <h2 className="text-center font-playfair italic font-normal text-[34px] mb-[50px] max-[480px]:text-[26px]">Frequently asked questions</h2>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,.06)]"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
                                >
                                    <span className="text-[15px] font-semibold text-ink pr-4">{faq.question}</span>
                                    <span className={`text-2xl text-muted transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}>
                                        +
                                    </span>
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${
                                        openFaq === i ? 'max-h-[200px] pb-6' : 'max-h-0'
                                    }`}
                                >
                                    <p className="px-6 text-muted text-[14px] leading-[1.8]">{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-[70px] bg-gradient-to-br from-ink via-[#2a1f3d] to-[#1a0f2e] max-[480px]:py-[50px]">
                <div className="max-w-[800px] mx-auto px-8 text-center max-[480px]:px-4">
                    <span className="text-5xl mb-4 block">🎤</span>
                    <h2 className="font-playfair italic text-[36px] text-white mb-5 max-[480px]:text-[28px]">
                        Ready to showcase your
                        <span className="bg-gradient-to-r from-orange to-pink bg-clip-text text-transparent"> talent</span>?
                    </h2>
                    <p className="text-white/70 text-[16px] leading-[1.8] mb-8 max-w-[500px] mx-auto">
                        Join thousands of artists who have shared their raw, unedited performances with the world. Your journey starts with one submission.
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <button onClick={() => setShowTalentForm(true)} className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm bg-gradient-to-r from-orange to-pink text-white shadow-[0_10px_30px_-6px_rgba(236,30,99,.55)] hover:brightness-110 transition-all cursor-pointer">
                            &#9733; SUBMIT YOUR TALENT
                        </button>
                        <Link href="/winners" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm border-2 border-white/20 text-white hover:bg-white/10 transition-colors">
                            View Winners 🏆
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
