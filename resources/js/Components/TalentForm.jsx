import { useState } from 'react';

export default function TalentForm({ onClose }) {
    const [form, setForm] = useState({
        name: '', age: '', gender: 'পুরুষ', address: '', phone: '',
        talentType: '', isRaw: 'হ্যাঁ', duration: '', photo: null, video: null,
        consentContent: false, consentCommercial: false, consentTerms: false,
    });

    const [dragOver, setDragOver] = useState(null);

    const handlePillClick = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thanks! Your talent has been submitted. We will review it soon.');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-start justify-center z-[9999] overflow-y-auto py-6 px-4" onClick={onClose}>
            <div className="w-full max-w-[920px]" onClick={(e) => e.stopPropagation()}>

                {/* Close button */}
                <button onClick={onClose} className="fixed top-5 right-5 z-[10000] w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-ink text-xl cursor-pointer hover:bg-pink hover:text-white transition-colors">✕</button>

                {/* Hero */}
                <section className="relative rounded-t-[18px] overflow-hidden text-center py-[52px] px-6 pb-[68px] border-b border-[#e9dfc9]"
                    style={{
                        background: 'radial-gradient(circle at 82% 8%, rgba(200,148,79,0.30), transparent 45%), radial-gradient(circle at 6% 92%, rgba(198,91,110,0.10), transparent 50%), linear-gradient(200deg, #fbf3e2 0%, #f6ead0 55%, #f1dfb6 100%)'
                    }}>
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
                        <circle cx="680" cy="60" r="150" fill="none" stroke="rgba(169,117,54,0.28)" strokeWidth="1"/>
                        <circle cx="680" cy="60" r="200" fill="none" stroke="rgba(169,117,54,0.16)" strokeWidth="1"/>
                        <circle cx="60" cy="360" r="120" fill="none" stroke="rgba(198,91,110,0.20)" strokeWidth="1"/>
                        <circle cx="60" cy="360" r="170" fill="none" stroke="rgba(198,91,110,0.12)" strokeWidth="1"/>
                    </svg>
                    <div className="relative z-10 max-w-[640px] mx-auto">
                        <div className="w-14 h-14 rounded-full border border-[#a97536] flex items-center justify-center text-[#a97536] text-2xl mx-auto mb-3.5 bg-white/50">♪</div>
                        <div className="text-xs tracking-[.16em] text-[#a83c50] font-bold mb-2 uppercase">Be the next featured artist</div>
                        <h1 className="font-playfair text-[clamp(26px,6vw,40px)] font-bold text-[#1b1410] leading-[1.15]">
                            RAW LIQUEUR
                            <span className="block italic text-[clamp(18px,4vw,26px)] mt-1 text-[#a83c50]">বাঙালির প্রাণে</span>
                        </h1>
                        <p className="text-[13.5px] leading-[1.9] text-[#5b5142] mt-5 max-w-[560px] mx-auto">
                            প্রতিভাবান তরুণ-তরুণীদের নিজেদের প্রতিভা তুলে ধরার একটি প্ল্যাটফর্ম RAW LIQUEUR-এর ইউটিউব চ্যানেলে।
                            গান, নাচ, কবিতা, অভিনয়, কথকতা — যেকোনো মাধ্যমে নিজের প্রতিভা তুলে ধরুন সরাসরি ক্যামেরার সামনে,
                            কোনো এডিট, ফিল্টার বা এআই সহায়তা ছাড়াই।
                        </p>
                        <div className="flex items-end justify-center gap-[3px] h-[26px] mt-6">
                            {Array.from({ length: 32 }).map((_, i) => (
                                <span key={i} className="w-[3px] bg-[#a97536] opacity-65 rounded-[2px]" style={{ height: `${6 + Math.random() * 20}px` }} />
                            ))}
                        </div>
                        <div className="inline-block mt-5 px-5 py-2.5 border border-[rgba(169,117,54,.35)] rounded-full font-playfair italic text-sm text-[#a97536] bg-white/55">"No AI. No Edit, Just You."</div>
                    </div>
                    <div className="relative z-10 max-w-[640px] mx-auto mt-6 bg-white/[.94] border border-[#f0c3cd] text-[#8a2f42] py-3 px-[18px] rounded-xl text-[13.5px] font-semibold flex items-center gap-2 text-left shadow-[0_14px_30px_-18px_rgba(0,0,0,.5)]">
                        💡 আপনার প্রতিভাকে সবার সামনে তুলে ধরতে নিচের তথ্যগুলো সঠিকভাবে পূরণ করুন।
                    </div>
                </section>

                <form onSubmit={handleSubmit}>
                    {/* 01 PERSONAL */}
                    <section className="bg-white border border-[#e9dfc9] p-[26px] mt-[18px] shadow-[0_12px_30px_-22px_rgba(60,40,10,.35)]">
                        <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
                            <div className="flex items-center gap-3.5">
                                <div className="w-[38px] h-[38px] rounded-[11px] flex-none bg-gradient-to-br from-[#fbe4e8] to-[#f6d4dc] text-[#a83c50] font-bold text-sm flex items-center justify-center font-playfair">01</div>
                                <div>
                                    <div className="text-base font-bold text-[#1b1410]">ব্যক্তিগত তথ্য</div>
                                    <div className="text-[10.5px] tracking-[.1em] text-[#c65b6e] font-bold mt-0.5">PERSONAL INFORMATION</div>
                                </div>
                            </div>
                            <div className="text-xs text-[#8a7f6c]">আপনার মৌলিক তথ্য দিয়ে শুরু করুন</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 max-[700px]:grid-cols-1">
                            <div className="mb-4">
                                <label className="block text-[13.5px] font-semibold mb-2 text-[#3b3327]">আপনার পূর্ণ নাম <span className="text-[#c65b6e]">*</span></label>
                                <div className="flex items-center gap-2.5 border-[1.4px] border-[#e9dfc9] rounded-[11px] py-[11px] px-3.5 bg-[#fdfaf3] focus-within:border-[#c8944f]">
                                    <span className="text-[#a97536] text-sm w-4 text-center flex-none">👤</span>
                                    <input className="border-none outline-none bg-transparent font-hind text-sm w-full text-[#1b1410] min-w-0 placeholder:text-[#b3a68c]" placeholder="আপনার পূর্ণ নাম লিখুন" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-[13.5px] font-semibold mb-2 text-[#3b3327]">আপনার বয়স <span className="text-[#c65b6e]">*</span></label>
                                <div className="flex items-center gap-2.5 border-[1.4px] border-[#e9dfc9] rounded-[11px] py-[11px] px-3.5 bg-[#fdfaf3] focus-within:border-[#c8944f]">
                                    <span className="text-[#a97536] text-sm w-4 text-center flex-none">📅</span>
                                    <input className="border-none outline-none bg-transparent font-hind text-sm w-full text-[#1b1410] min-w-0 placeholder:text-[#b3a68c]" placeholder="যেমন: 24" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} />
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-[13.5px] font-semibold mb-2 text-[#3b3327]">আপনি কোন জেন্ডার? <span className="text-[#c65b6e]">*</span></label>
                            <div className="flex flex-wrap gap-2.5">
                                {['পুরুষ', 'মহিলা'].map(g => (
                                    <div key={g} onClick={() => handlePillClick('gender', g)} className={`flex items-center gap-2 border-[1.4px] rounded-[11px] py-2.5 px-4 text-[13px] font-semibold cursor-pointer select-none whitespace-nowrap ${form.gender === g ? 'bg-[#f1dcb2] border-[#c8944f] text-[#a97536]' : 'border-[#e9dfc9] text-[#4a4030] bg-[#fdfaf3]'}`}>
                                        <span className="text-sm">{g === 'পুরুষ' ? '♂' : '♀'}</span> {g}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-[13.5px] font-semibold mb-2 text-[#3b3327]">আপনার বর্তমান ঠিকানা</label>
                            <div className="flex items-center gap-2.5 border-[1.4px] border-[#e9dfc9] rounded-[11px] py-[11px] px-3.5 bg-[#fdfaf3] focus-within:border-[#c8944f]">
                                <span className="text-[#a97536] text-sm w-4 text-center flex-none">📍</span>
                                <input className="border-none outline-none bg-transparent font-hind text-sm w-full text-[#1b1410] min-w-0 placeholder:text-[#b3a68c]" placeholder="ঠিকানা লিখুন" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                            </div>
                        </div>
                        <div className="mb-0">
                            <label className="block text-[13.5px] font-semibold mb-2 text-[#3b3327]">মোবাইল নম্বর / WhatsApp <span className="text-[#c65b6e]">*</span></label>
                            <div className="flex items-center gap-2.5 border-[1.4px] border-[#e9dfc9] rounded-[11px] py-[11px] px-3.5 bg-[#fdfaf3] focus-within:border-[#c8944f]">
                                <span className="text-[#a97536] text-sm w-4 text-center flex-none">📱</span>
                                <input className="border-none outline-none bg-transparent font-hind text-sm w-full text-[#1b1410] min-w-0 placeholder:text-[#b3a68c]" placeholder="+880 1XXX-XXXXXX" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                            </div>
                        </div>
                    </section>

                    {/* 02 TALENT */}
                    <section className="bg-white border border-[#e9dfc9] p-[26px] mt-[18px] shadow-[0_12px_30px_-22px_rgba(60,40,10,.35)]">
                        <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
                            <div className="flex items-center gap-3.5">
                                <div className="w-[38px] h-[38px] rounded-[11px] flex-none bg-gradient-to-br from-[#fbe4e8] to-[#f6d4dc] text-[#a83c50] font-bold text-sm flex items-center justify-center font-playfair">02</div>
                                <div>
                                    <div className="text-base font-bold text-[#1b1410]">প্রতিভা সম্পর্কিত তথ্য</div>
                                    <div className="text-[10.5px] tracking-[.1em] text-[#c65b6e] font-bold mt-0.5">TALENT INFORMATION</div>
                                </div>
                            </div>
                            <div className="text-xs text-[#8a7f6c]">আপনার প্রতিভা সম্পর্কে জানান</div>
                        </div>
                        <div className="mb-0">
                            <label className="block text-[13.5px] font-semibold mb-2 text-[#3b3327]">আপনি কোন ধরনের প্রতিভা প্রদর্শন করবেন? <span className="text-[#c65b6e]">*</span></label>
                            <div className="flex flex-wrap gap-2.5">
                                {[
                                    { icon: '🎵', label: 'গান' }, { icon: '💃', label: 'নাচ' }, { icon: '📖', label: 'কবিতা' },
                                    { icon: '🎤', label: 'কথকতা' }, { icon: '🎭', label: 'অভিনয়' }, { icon: '⋯', label: 'অন্যান্য' },
                                ].map(t => (
                                    <div key={t.label} onClick={() => handlePillClick('talentType', t.label)} className={`flex items-center gap-2 border-[1.4px] rounded-[11px] py-2.5 px-4 text-[13px] font-semibold cursor-pointer select-none whitespace-nowrap ${form.talentType === t.label ? 'bg-[#f1dcb2] border-[#c8944f] text-[#a97536]' : 'border-[#e9dfc9] text-[#4a4030] bg-[#fdfaf3]'}`}>
                                        <span className="text-sm">{t.icon}</span> {t.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* 03 VIDEO */}
                    <section className="bg-white border border-[#e9dfc9] p-[26px] mt-[18px] shadow-[0_12px_30px_-22px_rgba(60,40,10,.35)]">
                        <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
                            <div className="flex items-center gap-3.5">
                                <div className="w-[38px] h-[38px] rounded-[11px] flex-none bg-gradient-to-br from-[#fbe4e8] to-[#f6d4dc] text-[#a83c50] font-bold text-sm flex items-center justify-center font-playfair">03</div>
                                <div>
                                    <div className="text-base font-bold text-[#1b1410]">RAW ভিডিও সম্পর্কিত প্রশ্ন</div>
                                    <div className="text-[10.5px] tracking-[.1em] text-[#c65b6e] font-bold mt-0.5">ABOUT YOUR VIDEO</div>
                                </div>
                            </div>
                            <div className="text-xs text-[#8a7f6c]">আপনার ভিডিও সম্পর্কে কিছু তথ্য দিন</div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-[13.5px] font-semibold mb-2 text-[#3b3327]">ভিডিওটি কি RAW? <span className="text-[#c65b6e]">*</span></label>
                            <div className="text-[12px] text-[#8a7f6c] mb-2.5">অর্থাৎ কোনো Edit / Filter / AI ব্যবহার করা হয়নি?</div>
                            <div className="flex gap-3 flex-wrap">
                                {['হ্যাঁ', 'না'].map(y => (
                                    <div key={y} onClick={() => handlePillClick('isRaw', y)} className={`flex items-center gap-2 border-[1.4px] rounded-[11px] py-2.5 px-4 text-[13px] font-semibold cursor-pointer select-none whitespace-nowrap min-w-[110px] justify-center ${form.isRaw === y ? (y === 'হ্যাঁ' ? 'bg-[#dff0e2] border-[#7fbf8e] text-[#2c6b3a]' : 'bg-[#f1dcb2] border-[#c8944f] text-[#a97536]') : 'border-[#e9dfc9] text-[#4a4030] bg-[#fdfaf3]'}`}>
                                        <span className="text-sm">{y === 'হ্যাঁ' ? '✓' : '○'}</span> {y}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mb-0">
                            <label className="block text-[13.5px] font-semibold mb-2 text-[#3b3327]">ভিডিওর দৈর্ঘ্য <span className="text-[#c65b6e]">*</span></label>
                            <div className="flex flex-wrap gap-2.5">
                                {['১ মিনিটের নিচে', '১–৩ মিনিট', '৩–৫ মিনিট', '৫ মিনিটের বেশি'].map(d => (
                                    <div key={d} onClick={() => handlePillClick('duration', d)} className={`flex items-center gap-2 border-[1.4px] rounded-[11px] py-2.5 px-4 text-[13px] font-semibold cursor-pointer select-none whitespace-nowrap ${form.duration === d ? 'bg-[#f1dcb2] border-[#c8944f] text-[#a97536]' : 'border-[#e9dfc9] text-[#4a4030] bg-[#fdfaf3]'}`}>
                                        <span className="text-sm">⏱</span> {d}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* 04 CONSENT */}
                    <section className="bg-white border border-[#e9dfc9] p-[26px] mt-[18px] shadow-[0_12px_30px_-22px_rgba(60,40,10,.35)]">
                        <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
                            <div className="flex items-center gap-3.5">
                                <div className="w-[38px] h-[38px] rounded-[11px] flex-none bg-gradient-to-br from-[#fbe4e8] to-[#f6d4dc] text-[#a83c50] font-bold text-sm flex items-center justify-center font-playfair">04</div>
                                <div>
                                    <div className="text-base font-bold text-[#1b1410]">Consent &amp; অনুমতি</div>
                                    <div className="text-[10.5px] tracking-[.1em] text-[#c65b6e] font-bold mt-0.5">CONSENT &amp; PERMISSION</div>
                                </div>
                            </div>
                            <div className="text-xs text-[#8a7f6c]">অনুমতি প্রদান করুন</div>
                        </div>
                        <div onClick={() => setForm({ ...form, consentContent: !form.consentContent })} className={`flex items-start gap-3 p-3.5 border-[1.4px] rounded-xl mb-2.5 cursor-pointer ${form.consentContent ? 'border-[#7fbf8e] bg-[#dff0e2]' : 'border-[#e9dfc9] bg-[#fdfaf3]'}`}>
                            <div className="w-5 h-5 rounded-[6px] flex-none mt-0.5 bg-gradient-to-br from-[#7fbf8e] to-[#3f8f52] text-white flex items-center justify-center text-xs">{form.consentContent ? '✓' : ''}</div>
                            <div>
                                <strong className="text-[13.5px] text-[#1b1410]">কনটেন্টের অনুমতি *</strong>
                                <p className="text-xs text-[#8a7f6c] mt-1 leading-[1.7]">আমি RAW LIQUEUR-কে আমার কনটেন্ট YouTube, সোশ্যাল মিডিয়া ও অন্যান্য প্রচারণার মাধ্যমে প্রকাশ করার অনুমতি দিচ্ছি।</p>
                            </div>
                        </div>
                        <div onClick={() => setForm({ ...form, consentCommercial: !form.consentCommercial })} className={`flex items-start gap-3 p-3.5 border-[1.4px] rounded-xl mb-0 cursor-pointer ${form.consentCommercial ? 'border-[#7fbf8e] bg-[#dff0e2]' : 'border-[#e9dfc9] bg-[#fdfaf3]'}`}>
                            <div className="w-5 h-5 rounded-[6px] flex-none mt-0.5 bg-gradient-to-br from-[#7fbf8e] to-[#3f8f52] text-white flex items-center justify-center text-xs">{form.consentCommercial ? '✓' : ''}</div>
                            <div>
                                <strong className="text-[13.5px] text-[#1b1410]">বাণিজ্যিক অনুমতি *</strong>
                                <p className="text-xs text-[#8a7f6c] mt-1 leading-[1.7]">আমি নিশ্চিত করছি RAW LIQUEUR-এর প্রচারাভিযান, শর্টস, পোস্ট, রিলসে বা অন্য কোনো মাধ্যম ব্যবহারের অনুমতি রয়েছে।</p>
                            </div>
                        </div>
                    </section>

                    {/* 05 TERMS */}
                    <section className="bg-white border border-[#e9dfc9] p-[26px] mt-[18px] shadow-[0_12px_30px_-22px_rgba(60,40,10,.35)]">
                        <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
                            <div className="flex items-center gap-3.5">
                                <div className="w-[38px] h-[38px] rounded-[11px] flex-none bg-gradient-to-br from-[#fbe4e8] to-[#f6d4dc] text-[#a83c50] font-bold text-sm flex items-center justify-center font-playfair">05</div>
                                <div>
                                    <div className="text-base font-bold text-[#1b1410]">শর্তাবলী</div>
                                    <div className="text-[10.5px] tracking-[.1em] text-[#c65b6e] font-bold mt-0.5">TERMS &amp; CONDITIONS</div>
                                </div>
                            </div>
                            <div className="text-xs text-[#8a7f6c]">অনুগ্রহ করে শর্তাবলী পড়ুন</div>
                        </div>

                        <div className="text-[13px] text-[#5b5142] leading-[1.8] mb-4 p-3.5 bg-[#fdfaf3] border border-[#e9dfc9] rounded-xl">
                            RAW LIQUEUR-এ আপনার প্রতিভা জমা দেওয়ার জন্য আপনাকে ধন্যবাদ। RAW LIQUEUR একটি authentic talent platform, যেখানে আমরা মানুষের স্বাভাবিক প্রতিভা, কণ্ঠ, সৃজনশীলতা এবং পারফরম্যান্স কোনো অপ্রয়োজনীয় artificial enhancement ছাড়াই তুলে ধরতে চাই। ভিডিও Submit করার আগে নিচের সকল নিয়ম ও শর্ত ভালোভাবে পড়ে সম্মতি প্রদান করুন।
                        </div>

                        <div className="text-[14px] font-bold text-[#1b1410] mb-3">Recording Requirements</div>
                        {[
                            'Fixed Camera Position — ভিডিও ধারণের সময় মোবাইল ফোন বা recording device অবশ্যই একটি স্থির অবস্থানে রাখতে হবে। হাতে ধরে বা বারবার camera position পরিবর্তন করে ভিডিও ধারণ করা যাবে না।',
                            'Artist Must Remain in Frame — ভিডিও ধারণের পুরো সময় artist-কে camera frame-এর মধ্যে থাকতে হবে। পারফরম্যান্সের মাঝখানে camera frame-এর বাইরে চলে যাওয়া গ্রহণযোগ্য হবে না।',
                            'Single Continuous Shot — Single Continuous Shot.',
                        ].map((term, i) => (
                            <div key={i} className="flex items-start gap-3 py-3 px-4 border-[1.4px] border-[#e9dfc9] rounded-xl bg-[#fdfaf3] mb-2.5">
                                <div className="w-5 h-5 rounded-[6px] flex-none mt-0.5 bg-gradient-to-br from-[#7fbf8e] to-[#3f8f52] text-white flex items-center justify-center text-xs">✓</div>
                                <div className="text-[13px] leading-[1.7]"><strong className="text-[#1b1410]">{term.split(' — ')[0]}</strong> — {term.split(' — ').slice(1).join(' — ')}</div>
                            </div>
                        ))}

                        <div className="text-[14px] font-bold text-[#1b1410] mb-3 mt-4">Performance Rules</div>
                        {[
                            'Instrument Must Remain Visible — কোনো manual/acoustic instrument ব্যবহার করলে সেটি যতটা সম্ভব camera frame এবং focus-এর মধ্যে পরিষ্কারভাবে দৃশ্যমান থাকতে হবে। Instrument এমনভাবে ব্যবহার করা যাবে না যাতে বোঝা না যায় যে এটি artist নিজে live ভাবে বাজাচ্ছেন।',
                            'Unnecessary Activities — ভিডিওর মধ্যে কোনো ধরনের অপ্রয়োজনীয় conversation বা activity গ্রহণযোগ্য হবে না।',
                            'Original Performance — Submitted performance অবশ্যই submit করা artist-এর নিজস্ব performance হতে হবে।',
                            'Safety — Artist নিজের recording environment এবং performance-এর নিরাপত্তার জন্য নিজেই দায়ী থাকবেন। কোনো বিপজ্জনক stunt, unsafe activity বা নিজের/অন্যের ক্ষতি হতে পারে এমন performance Submit করা উচিত নয়।',
                        ].map((term, i) => (
                            <div key={i} className={`flex items-start gap-3 py-3 px-4 border-[1.4px] border-[#e9dfc9] rounded-xl bg-[#fdfaf3] ${i === 3 ? 'mb-3' : 'mb-2.5'}`}>
                                <div className="w-5 h-5 rounded-[6px] flex-none mt-0.5 bg-gradient-to-br from-[#7fbf8e] to-[#3f8f52] text-white flex items-center justify-center text-xs">✓</div>
                                <div className="text-[13px] leading-[1.7]"><strong className="text-[#1b1410]">{term.split(' — ')[0]}</strong> — {term.split(' — ').slice(1).join(' — ')}</div>
                            </div>
                        ))}

                        <div onClick={() => setForm({ ...form, consentTerms: !form.consentTerms })} className={`flex items-start gap-3 p-3.5 border-[1.4px] rounded-xl mt-3 cursor-pointer ${form.consentTerms ? 'border-[#c8944f] bg-[#f1dcb2]' : 'border-[#e9dfc9] bg-[#fdfaf3]'}`}>
                            <div className="w-5 h-5 rounded-[6px] flex-none mt-0.5 bg-gradient-to-br from-[#7fbf8e] to-[#3f8f52] text-white flex items-center justify-center text-xs">{form.consentTerms ? '✓' : ''}</div>
                            <div>
                                <strong className="text-[13.5px] text-[#1b1410]">শর্তাবলীতে সম্মতি *</strong>
                                <p className="text-xs text-[#8a7f6c] mt-1 leading-[1.7]">আমি উপরোক্ত সকল শর্তাবলী পড়েছি এবং সম্মত হচ্ছি।</p>
                            </div>
                        </div>
                    </section>

                    {/* 06 UPLOADS */}
                    <section className="bg-white border border-[#e9dfc9] p-[26px] mt-[18px] shadow-[0_12px_30px_-22px_rgba(60,40,10,.35)]">
                        <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
                            <div className="flex items-center gap-3.5">
                                <div className="w-[38px] h-[38px] rounded-[11px] flex-none bg-gradient-to-br from-[#fbe4e8] to-[#f6d4dc] text-[#a83c50] font-bold text-sm flex items-center justify-center font-playfair">06</div>
                                <div>
                                    <div className="text-base font-bold text-[#1b1410]">ফাইল আপলোড</div>
                                    <div className="text-[10.5px] tracking-[.1em] text-[#c65b6e] font-bold mt-0.5">UPLOADS</div>
                                </div>
                            </div>
                            <div className="text-xs text-[#8a7f6c]">আপনার ফাইলগুলো আপলোড করুন</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 max-[700px]:grid-cols-1">
                            <div>
                                <div className="text-[13.5px] font-semibold mb-0.5 text-[#3b3327]">আপনার একটি ছবি আপলোড করুন <span className="text-[#c65b6e]">*</span></div>
                                <div className="text-[11.5px] text-[#8a7f6c] mb-2.5">JPG / JPEG / PNG — সর্বোচ্চ 5MB</div>
                                <label className={`border-2 border-dashed ${dragOver === 'photo' ? 'border-[#c8944f]' : 'border-[#dccca2]'} rounded-[14px] py-6 px-4 text-center bg-[#fdfaf3] text-[#8a7f6c] cursor-pointer block`}>
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => setForm({ ...form, photo: e.target.files[0] })} />
                                    <div className="w-11 h-11 rounded-full bg-[#f1dcb2] text-[#a97536] flex items-center justify-center mx-auto mb-2.5 text-lg">🖼️</div>
                                    <div className="text-[13px] font-semibold text-[#3b3327]">{form.photo ? form.photo.name : 'ছবি নির্বাচন করতে ক্লিক করুন'}</div>
                                    <div className="text-[11.5px] mt-0.5">অথবা এখানে ড্র্যাগ করুন</div>
                                </label>
                            </div>
                            <div>
                                <div className="text-[13.5px] font-semibold mb-0.5 text-[#3b3327]">আপনার প্রতিভার ভিডিও আপলোড করুন <span className="text-[#c65b6e]">*</span></div>
                                <div className="text-[11.5px] text-[#8a7f6c] mb-2.5">MP4 / MOV / WebM — সর্বোচ্চ 500MB</div>
                                <label className={`border-2 border-dashed ${dragOver === 'video' ? 'border-[#c8944f]' : 'border-[#dccca2]'} rounded-[14px] py-6 px-4 text-center bg-[#fdfaf3] text-[#8a7f6c] cursor-pointer block`}>
                                    <input type="file" accept="video/*" className="hidden" onChange={(e) => setForm({ ...form, video: e.target.files[0] })} />
                                    <div className="w-11 h-11 rounded-full bg-[#f1dcb2] text-[#a97536] flex items-center justify-center mx-auto mb-2.5 text-lg">🎬</div>
                                    <div className="text-[13px] font-semibold text-[#3b3327]">{form.video ? form.video.name : 'ভিডিও নির্বাচন করতে ক্লিক করুন'}</div>
                                    <div className="text-[11.5px] mt-0.5">অথবা এখানে ড্র্যাগ করুন</div>
                                </label>
                            </div>
                        </div>
                    </section>

                    {/* Submit */}
                    <div className="mt-6 bg-gradient-to-r from-[#c8944f] to-[#a97536] rounded-2xl py-4 px-[17px] text-center text-[#2a1a08] font-bold text-[15.5px] tracking-[.01em] cursor-pointer shadow-[0_14px_30px_-14px_rgba(169,117,54,.55)]" onClick={handleSubmit}>
                        ✈ Submit — আপনার প্রতিভা জমা দিন →
                    </div>
                    <div className="text-center text-[11.5px] text-[#8a7f6c] mt-3.5 leading-[1.8] pb-4">
                        নিভয়ন, RAW LIQUEUR সেরা প্রতিভাদের সবার সামনে তুলে ধরতে প্রতিশ্রুতিবদ্ধ।<br/>
                        আপনার প্রতিভাই হতে পারে পরবর্তী তারকা!
                    </div>
                </form>
            </div>
        </div>
    );
}
