import { useState, useEffect } from 'react';

export default function SubmitTalentModal({ open, onClose, lang = 'bn' }) {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        name: '',
        age: '',
        gender: '',
        address: '',
        phone: '',
        talentType: '',
        isRaw: '',
        duration: '',
        consentPublish: false,
        consentFuture: false,
        consentTerms: false,
        photo: null,
        video: null,
    });
    const [photoPreview, setPhotoPreview] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);

    useEffect(() => {
        if (!open) {
            setStep(1);
            setForm({
                name: '', age: '', gender: '', address: '', phone: '',
                talentType: '', isRaw: '', duration: '',
                consentPublish: false, consentFuture: false, consentTerms: false,
                photo: null, video: null,
            });
            setPhotoPreview(null);
            setVideoPreview(null);
            document.body.style.overflow = 'auto';
        } else {
            document.body.style.overflow = 'hidden';
        }
    }, [open]);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && open) onClose();
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [open, onClose]);

    if (!open) return null;

    const t = (bn, en) => lang === 'bn' ? bn : en;

    const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

    const handlePhoto = (e) => {
        const file = e.target.files[0];
        if (file) {
            update('photo', file);
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleVideo = (e) => {
        const file = e.target.files[0];
        if (file) {
            update('video', file);
            setVideoPreview(URL.createObjectURL(file));
        }
    };

    const steps = [
        { num: 1, label: t('ব্যক্তিগত তথ্য', 'Personal Info') },
        { num: 2, label: t('প্রতিভা তথ্য', 'Talent Info') },
        { num: 3, label: t('ভিডিও তথ্য', 'Video Info') },
        { num: 4, label: t('সম্মতি ও আপলোড', 'Consent & Upload') },
    ];

    const canNext = () => {
        if (step === 1) return form.name && form.age && form.gender && form.phone;
        if (step === 2) return form.talentType;
        if (step === 3) return form.isRaw && form.duration;
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(t('সফলভাবে জমা হয়েছে!', 'Submitted successfully!'));
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
            <div
                className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-6 py-4 bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border-b border-gray-700 shrink-0">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-white font-serif">
                                {t('প্রতিভা জমা দিন', 'Submit Your Talent')}
                            </h2>
                            <p className="text-[#C9A84C] text-xs mt-0.5">
                                {t('Raw Liqueur-এ YouTube চ্যানেলে', 'To Raw Liqueur YouTube Channel')}
                            </p>
                        </div>
                        <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex gap-1.5 mt-4">
                        {steps.map((s) => (
                            <div key={s.num} className="flex-1">
                                <div className={`h-1 rounded-full transition-all ${step >= s.num ? 'bg-[#C9A84C]' : 'bg-white/20'}`} />
                                <p className={`text-[9px] mt-1 ${step >= s.num ? 'text-[#C9A84C]' : 'text-white/40'}`}>{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Notice */}
                {step === 1 && (
                    <div className="px-6 py-4 bg-[#C9A84C]/5 border-b border-[#C9A84C]/10 shrink-0">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#C9A84C]/10 flex items-center justify-center shrink-0 mt-0.5">
                                <svg className="w-4 h-4 text-[#C9A84C]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-[#1a1a1a] text-sm font-serif font-bold mb-1">
                                    {t('প্রতিভা ও কবিতা গানে', 'In Talent & Poetry & Song')}
                                </p>
                                <p className="text-gray-500 text-[11px] leading-relaxed">
                                    {t(
                                        'বাংলার অসাধারণ প্রতিভাদের বিশ্বদরবারে তুলে ধরার স্বপ্ন নিয়ে আপনাকে স্বাগতম Raw Liqueur-এর YouTube চ্যানেলে। আপনার গান, কবিতা, আবৃত্তি, গল্প বলা, নাট্যাভিনয়, লোকসঙ্গীত কিংবা যেকোনো অন্য প্রতিভার ভিডিও আমাদের কাছে পাঠান। ভিডিওটি অবশ্যই কোনো এডিট, ব্যাকগ্রাউন্ড মিউজিক বা AI ব্যবহার ছাড়া স্বাভাবিকভাবে ধারণ করা হতে হবে, যাতে আপনার আসল প্রতিভাই সবার সামনে উঠে আসে। নির্বাচিত ভিডিওগুলো আমাদের YouTube চ্যানেলে প্রকাশ করা হবে। এছাড়াও, বছরের শেষে সর্বাধিক ভিউ, লাইক ও দর্শকদের ইতিবাচক সাড়া বিবেচনা করে সেরা প্রতিভাদের জন্য থাকবে আকর্ষণীয় পুরস্কার ও বিশেষ স্বীকৃতি।',
                                        'Welcome to Raw Liqueur YouTube channel with the dream of showcasing the extraordinary talents of Bengal to the world. Send us your songs, poetry, recitation, storytelling, drama, folk music or any other talent video. The video must be recorded naturally without any edit, background music or AI, so that your real talent comes to the forefront. Selected videos will be published on our YouTube channel. Additionally, at the end of the year, attractive prizes and special recognition await the best talents based on most views, likes and positive audience response.'
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                    {/* Step 1: Personal Info */}
                    {step === 1 && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[#1a1a1a] text-xs font-medium mb-1.5">{t('আপনার পূর্ণ নাম', 'Full Name')} *</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => update('name', e.target.value)}
                                    placeholder={t('পূর্ণ নাম লিখুন', 'Enter full name')}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[#1a1a1a] text-sm placeholder-gray-400 focus:outline-none focus:border-[#C41E3A]/50 focus:ring-1 focus:ring-[#C41E3A]/20 transition-colors"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[#1a1a1a] text-xs font-medium mb-1.5">{t('বয়স', 'Age')} *</label>
                                    <input
                                        type="number"
                                        value={form.age}
                                        onChange={(e) => update('age', e.target.value)}
                                        placeholder={t('যেমন: 24', 'e.g. 24')}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[#1a1a1a] text-sm placeholder-gray-400 focus:outline-none focus:border-[#C41E3A]/50 focus:ring-1 focus:ring-[#C41E3A]/20 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[#1a1a1a] text-xs font-medium mb-1.5">{t('লিঙ্গ', 'Gender')} *</label>
                                    <select
                                        value={form.gender}
                                        onChange={(e) => update('gender', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[#1a1a1a] text-sm focus:outline-none focus:border-[#C41E3A]/50 focus:ring-1 focus:ring-[#C41E3A]/20 transition-colors"
                                    >
                                        <option value="">{t('নির্বাচন করুন', 'Select')}</option>
                                        <option value="male">{t('পুরুষ', 'Male')}</option>
                                        <option value="female">{t('নারী', 'Female')}</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-[#1a1a1a] text-xs font-medium mb-1.5">{t('বর্তমান ঠিকানা', 'Address')}</label>
                                <input
                                    type="text"
                                    value={form.address}
                                    onChange={(e) => update('address', e.target.value)}
                                    placeholder={t('ঠিকানা লিখুন', 'Enter address')}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[#1a1a1a] text-sm placeholder-gray-400 focus:outline-none focus:border-[#C41E3A]/50 focus:ring-1 focus:ring-[#C41E3A]/20 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-[#1a1a1a] text-xs font-medium mb-1.5">{t('মোবাইল নম্বর / WhatsApp', 'Mobile / WhatsApp')} *</label>
                                <input
                                    type="tel"
                                    value={form.phone}
                                    onChange={(e) => update('phone', e.target.value)}
                                    placeholder="+880 1XXX-XXXXXX"
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[#1a1a1a] text-sm placeholder-gray-400 focus:outline-none focus:border-[#C41E3A]/50 focus:ring-1 focus:ring-[#C41E3A]/20 transition-colors"
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 2: Talent Info */}
                    {step === 2 && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[#1a1a1a] text-xs font-medium mb-2">{t('কোন ধরনের প্রতিভা?', 'What type of talent?')} *</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {[
                                        { key: 'singing', bn: 'গান', en: 'Singing', icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3' },
                                        { key: 'poetry', bn: 'কবিতা', en: 'Poetry', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
                                        { key: 'dance', bn: 'নৃত্য', en: 'Dance', icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                                        { key: 'folk', bn: 'লোকসংগীত', en: 'Folk Music', icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z' },
                                        { key: 'other', bn: 'অন্যান্য', en: 'Others', icon: 'M5 12h14M12 5l7 7-7 7' },
                                    ].map((item) => (
                                        <button
                                            type="button"
                                            key={item.key}
                                            onClick={() => update('talentType', item.key)}
                                            className={`flex items-center gap-2 p-3 rounded-xl border transition-all text-left ${
                                                form.talentType === item.key
                                                    ? 'bg-[#C41E3A]/5 border-[#C41E3A]/30 text-[#C41E3A]'
                                                    : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300'
                                            }`}
                                        >
                                            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                                            </svg>
                                            <span className="text-xs font-medium">{item.bn}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Video Info */}
                    {step === 3 && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[#1a1a1a] text-xs font-medium mb-2">{t('ভিডিওটি কি RAW?', 'Is the video RAW?')} *</label>
                                <p className="text-gray-500 text-[10px] mb-2">{t('অর্থাৎ কোনো Edit / Filter / AI ব্যবহার করা হয়নি?', 'No Edit / Filter / AI used?')}</p>
                                <div className="flex gap-2">
                                    <button type="button" onClick={() => update('isRaw', 'yes')} className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-all ${form.isRaw === 'yes' ? 'bg-green-50 border-green-300 text-green-600' : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                                        {t('হ্যাঁ', 'Yes')}
                                    </button>
                                    <button type="button" onClick={() => update('isRaw', 'no')} className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-all ${form.isRaw === 'no' ? 'bg-red-50 border-red-300 text-red-500' : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                                        {t('না', 'No')}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-[#1a1a1a] text-xs font-medium mb-2">{t('ভিডিওর দৈর্ঘ্য', 'Video Duration')} *</label>
                                <div className="space-y-2">
                                    {[
                                        { key: 'under1', label: t('১ মিনিটের নিচে', 'Under 1 minute') },
                                        { key: '1to3', label: t('১–৩ মিনিট', '1–3 minutes') },
                                        { key: '3to5', label: t('৩–৫ মিনিট', '3–5 minutes') },
                                        { key: 'over5', label: t('৫ মিনিটের বেশি', 'Over 5 minutes') },
                                    ].map((item) => (
                                        <button
                                            type="button"
                                            key={item.key}
                                            onClick={() => update('duration', item.key)}
                                            className={`w-full py-2.5 px-4 rounded-lg border text-sm text-left transition-all ${
                                                form.duration === item.key
                                                    ? 'bg-[#C9A84C]/10 border-[#C9A84C]/30 text-[#1a1a1a]'
                                                    : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300'
                                            }`}
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Consent & Upload */}
                    {step === 4 && (
                        <div className="space-y-4">
                            <div className="space-y-2.5">
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <input type="checkbox" checked={form.consentPublish} onChange={(e) => update('consentPublish', e.target.checked)} className="mt-0.5 w-4 h-4 rounded border-gray-300 bg-white text-[#C41E3A] focus:ring-[#C41E3A]/50" />
                                    <span className="text-gray-600 text-xs leading-relaxed group-hover:text-[#1a1a1a] transition-colors">
                                        {t('আমি RAW LIQUEUR-কে আমার জমাকৃত ছবি ও ভিডিও তাদের অফিসিয়াল YouTube, ওয়েবসাইট ও সামাজিক যোগাযোগ মাধ্যমে প্রকাশ ও প্রচারের অনুমতি দিচ্ছি।', 'I give permission to publish my photo and video on their official YouTube, website & social media.')} *
                                    </span>
                                </label>
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <input type="checkbox" checked={form.consentFuture} onChange={(e) => update('consentFuture', e.target.checked)} className="mt-0.5 w-4 h-4 rounded border-gray-300 bg-white text-[#C41E3A] focus:ring-[#C41E3A]/50" />
                                    <span className="text-gray-600 text-xs leading-relaxed group-hover:text-[#1a1a1a] transition-colors">
                                        {t('আমি ভবিষ্যতে RAW LIQUEUR-এর প্রতিযোগিতা, লাইভ শো, প্রোগ্রাম বা প্রচারণামূলক অনুষ্ঠানে অংশগ্রহণের আগ্রহী।', 'I am interested in participating in future events by Raw Liqueur.')} *
                                    </span>
                                </label>
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <input type="checkbox" checked={form.consentTerms} onChange={(e) => update('consentTerms', e.target.checked)} className="mt-0.5 w-4 h-4 rounded border-gray-300 bg-white text-[#C41E3A] focus:ring-[#C41E3A]/50" />
                                    <span className="text-gray-600 text-xs leading-relaxed group-hover:text-[#1a1a1a] transition-colors">
                                        {t('আমি উপরের সকল শর্তাবলী পড়েছি এবং তাতে সম্মত আছি।', 'I have read and agree to all terms & conditions above.')} *
                                    </span>
                                </label>
                            </div>

                            <div>
                                <label className="block text-[#1a1a1a] text-xs font-medium mb-1.5">{t('আপনার ছবি', 'Your Photo')} *</label>
                                <p className="text-gray-400 text-[10px] mb-2">JPG / JPEG / PNG — {t('সর্বোচ্চ 5MB', 'Max 5MB')}</p>
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-[#C41E3A]/30 transition-colors bg-gray-50">
                                    {photoPreview ? (
                                        <img src={photoPreview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                                    ) : (
                                        <div className="text-center">
                                            <svg className="w-8 h-8 mx-auto text-gray-300 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-gray-400 text-[10px]">{t('ছবি নির্বাচন করুন', 'Select photo')}</span>
                                        </div>
                                    )}
                                    <input type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
                                </label>
                            </div>

                            <div>
                                <label className="block text-[#1a1a1a] text-xs font-medium mb-1.5">{t('প্রতিভার ভিডিও', 'Talent Video')} *</label>
                                <p className="text-gray-400 text-[10px] mb-2">MP4 / MOV / WebM — {t('সর্বোচ্চ 500MB', 'Max 500MB')}</p>
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-[#C41E3A]/30 transition-colors bg-gray-50">
                                    {videoPreview ? (
                                        <div className="flex items-center gap-2 text-[#C41E3A]">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-xs font-medium">{video.name}</span>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <svg className="w-8 h-8 mx-auto text-gray-300 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-gray-400 text-[10px]">{t('ভিডিও নির্বাচন করুন', 'Select video')}</span>
                                        </div>
                                    )}
                                    <input type="file" accept="video/*" onChange={handleVideo} className="hidden" />
                                </label>
                            </div>

                            <p className="text-gray-400 text-[10px] leading-relaxed">
                                {t('বি. দ্র.: Raw Liqueur কোনো প্রকার প্রতিযোগিতা বা পুরস্কারমূলক আয়োজন নয়।', 'Note: Raw Liqueur is not a competition or prize event.')}
                            </p>
                        </div>
                    )}
                </form>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 shrink-0">
                    <div className="flex items-center justify-between gap-3">
                        {step > 1 ? (
                            <button
                                type="button"
                                onClick={() => setStep(step - 1)}
                                className="px-5 py-2.5 text-sm text-gray-500 hover:text-[#1a1a1a] border border-gray-200 rounded-full transition-colors"
                            >
                                {t('আগে', 'Back')}
                            </button>
                        ) : <div />}

                        {step < 4 ? (
                            <button
                                type="button"
                                onClick={() => canNext() && setStep(step + 1)}
                                disabled={!canNext()}
                                className={`px-6 py-2.5 text-sm font-semibold rounded-full transition-all ${
                                    canNext()
                                        ? 'bg-gradient-to-r from-[#C41E3A] to-[#8B0000] text-white shadow-lg shadow-[#C41E3A]/20 hover:shadow-[#C41E3A]/40'
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                            >
                                {t('পরবর্তী', 'Next')}
                            </button>
                        ) : (
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                disabled={!form.consentPublish || !form.consentFuture || !form.consentTerms || !form.photo || !form.video}
                                className={`px-6 py-2.5 text-sm font-semibold rounded-full transition-all ${
                                    form.consentPublish && form.consentFuture && form.consentTerms && form.photo && form.video
                                        ? 'bg-gradient-to-r from-[#C9A84C] to-[#B8860B] text-[#1a1a1a] shadow-lg shadow-[#C9A84C]/30 hover:shadow-[#C9A84C]/50'
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                            >
                                {t('জমা দিন', 'Submit')}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
