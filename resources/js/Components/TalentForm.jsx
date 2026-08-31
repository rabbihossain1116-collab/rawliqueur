import { useState } from 'react';

export default function TalentForm({ onClose }) {
    const [form, setForm] = useState({
        name: '', age: '', gender: '', address: '', phone: '',
        talentType: '', isRaw: '', duration: '',
        photo: null, video: null,
        consentPublish: false, consentFuture: false, consentTerms: false,
    });

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleRadio = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const validate = () => {
        const errs = {};
        if (!form.name || form.name.length < 2) errs.name = 'নাম কমপক্ষে ২ অক্ষর হতে হবে';
        if (!form.age || parseInt(form.age) < 5 || parseInt(form.age) > 100) errs.age = 'সঠিক বয়স দিন (৫-১০০)';
        if (!form.gender) errs.gender = 'জেন্ডার নির্বাচন করুন';
        if (!form.phone || !/^(?:\+?880|0)1[3-9]\d{8}$/.test(form.phone)) errs.phone = 'সঠিক মোবাইল নম্বর দিন';
        if (!form.talentType) errs.talentType = 'প্রতিভার ধরন নির্বাচন করুন';
        if (!form.isRaw) errs.isRaw = 'ভিডিও RAW কিনা নির্বাচন করুন';
        if (!form.duration) errs.duration = 'ভিডিওর দৈর্ঘ্য নির্বাচন করুন';
        if (!form.consentPublish) errs.consentPublish = 'প্রকাশের অনুমতি দিন';
        if (!form.consentFuture) errs.consentFuture = 'ভবিষ্যতের অনুষ্ঠানে সম্মতি দিন';
        if (!form.consentTerms) errs.consentTerms = 'শর্তাবলীতে সম্মতি দিন';
        if (!form.photo) errs.photo = 'ছবি আপলোড করুন';
        if (!form.video) errs.video = 'ভিডিও আপলোড করুন';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('name', form.name);
            formData.append('age', form.age);
            formData.append('gender', form.gender === 'পুরুষ' ? 'male' : 'female');
            formData.append('address', form.address || '');
            formData.append('phone', form.phone);
            formData.append('talentType', form.talentType);
            formData.append('isRaw', form.isRaw === 'হ্যাঁ' ? '1' : '0');
            formData.append('duration', form.duration);
            formData.append('consentPublish', '1');
            formData.append('consentFuture', form.consentFuture ? '1' : '0');
            formData.append('consentTerms', '1');
            formData.append('language', 'bn');
            if (form.photo) formData.append('photo', form.photo);
            if (form.video) formData.append('video', form.video);

            const response = await fetch('/submit-talent', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
                    'Accept': 'application/json',
                },
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                const result = await response.json();
                if (result.errors) {
                    setErrors(result.errors);
                }
            }
        } catch (error) {
            console.error('Submit failed:', error);
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999] p-4" onClick={onClose}>
                <div className="bg-white rounded-3xl p-10 max-w-[480px] w-full text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="font-playfair text-[28px] font-bold text-[#1b1410] mb-3">ধন্যবাদ!</h2>
                    <p className="text-[#5b5142] text-[15px] leading-[1.8] mb-2">আপনার প্রতিভা সফলভাবে জমা হয়েছে।</p>
                    <p className="text-[#8a7f6c] text-[13px] leading-[1.7] mb-8">আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
                    <button onClick={onClose} className="w-full py-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-orange to-pink text-white shadow-lg hover:brightness-110 transition-all cursor-pointer">
                        বন্ধ করুন
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/80 flex items-start justify-center z-[9999] overflow-y-auto py-6 px-4" onClick={onClose}>
            <div className="w-full max-w-[1100px] flex rounded-2xl overflow-hidden shadow-2xl min-h-[80vh]" onClick={(e) => e.stopPropagation()}>

                {/* Close button */}
                <button onClick={onClose} className="fixed top-5 right-5 z-[10000] w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-[#2b2115] text-xl cursor-pointer hover:bg-[#a83c50] hover:text-white transition-colors">✕</button>

                {/* SIDEBAR */}
                <aside className="w-[250px] flex-shrink-0 bg-gradient-to-br from-[#1c140d] to-[#3a2718] text-[#efe6d8] p-[34px_26px] flex flex-col max-[900px]:hidden">
                    <div className="w-[52px] h-[52px] rounded-full bg-[radial-gradient(circle_at_30%_30%,#4a3520,#241a10)] border border-[rgba(230,197,132,.35)] flex items-center justify-center text-[20px] text-[#e6c584] mb-[26px]">♪</div>
                    <div className="text-[10.5px] tracking-[.14em] text-[#e6c584] font-semibold mb-1.5">BE THE NEXT FEATURED ARTIST</div>
                    <h2 className="font-playfair text-[22px] font-bold text-[#f7efe1] mb-1 leading-[1.2]">RAW LIQUEUR</h2>
                    <p className="text-[14.5px] text-[#cbb98f] mb-[22px]">বাঙালির প্রাণে</p>
                    <div className="w-[34px] h-[2px] bg-[#c99a4a] mb-5"></div>
                    <p className="text-[12.5px] text-[#a99a80] italic leading-[1.55] mb-auto">No AI. No Edit.<br/>Just You.</p>
                    <div className="flex flex-wrap gap-2 mt-[30px]">
                        {['গান', 'কবিতা', 'নৃত্য', 'লোকসংগীত'].map(tag => (
                            <span key={tag} className="text-[12.5px] py-[7px] px-[13px] border border-[rgba(230,197,132,.3)] rounded-full text-[#e6dcc7] whitespace-nowrap">{tag}</span>
                        ))}
                    </div>
                </aside>

                {/* MAIN */}
                <main className="flex-1 bg-[#faf6ee] p-[36px_40px_80px] overflow-y-auto max-w-[860px] max-[900px]:p-[24px_18px_60px]">

                    {/* Hero Card */}
                    <section className="bg-gradient-to-br from-[#f4ead9] to-[#efe2ca] border border-[#e2d3b4] rounded-[18px] p-[34px_38px] mb-[34px] max-[900px]:p-[24px_20px] max-[900px]:rounded-[14px]">
                        <h1 className="font-playfair text-[26px] font-bold text-[#2b2115] mb-1 max-[900px]:text-[21px]">
                            প্রতিভা ও কবিতা গানে<br/><em className="italic text-[#a5372c] font-bold">RAW LIQUEUR</em> বাঙালির প্রাণে
                        </h1>
                        <p className="text-[14.5px] text-[#4a3d2a] mt-3.5">বাংলার অসাধারণ প্রতিভাদের বিশ্বদরবারে তুলে ধরার লক্ষ্য নিয়ে আপনাকে স্বাগতম <strong className="font-bold text-[#2b2115]">Raw Liqueur</strong>-এর YouTube চ্যানেলে।</p>
                        <p className="text-[14.5px] text-[#4a3d2a] mt-3">আপনার গান, কবিতা, আবৃত্তি, গল্প বলা, নাচগানিয়া, লোকসঙ্গীত কিংবা যেকোনো অন্য প্রতিভার ভিডিও আমাদের কাছে পাঠান। ভিডিওটি অবশ্যই কোনো এডিট, ব্যাকগ্রাউন্ড মিউজিক বা AI ব্যবহার ছাড়া স্বাভাবিকভাবে ধারণ করা হবে, যাতে আপনার আসল প্রতিভাই সবার সামনে উঠে আসে।</p>
                        <p className="text-[14.5px] text-[#4a3d2a] mt-3">নির্বাচিত ভিডিওগুলো আমাদের YouTube চ্যানেলে প্রকাশ করা হবে। এছাড়াও, বছরের শেষে সর্বাধিক ভিউ, লাইক ও দর্শকদের ইতিবাচক সাড়া বিবেচনা করে সেরা প্রতিভাদের জন্য থাকবে <strong className="font-bold text-[#a5372c]">আকর্ষণীয় পুরস্কার ও বিশেষ স্বীকৃতি</strong>।</p>
                        <p className="mt-4 text-[14.5px] font-bold text-[#8a2c22]">আপনার প্রতিভাকে সবার সামনে তুলে ধরতে নিচের তথ্যগুলো সঠিকভাবে পূরণ করুন।</p>
                    </section>

                    <form onSubmit={handleSubmit}>

                        {/* SECTION 01 - ব্যক্তিগত তথ্য */}
                        <section className="mb-[34px]">
                            <div className="flex items-center gap-3 mb-[18px]">
                                <span className="font-playfair font-bold text-[13px] text-[#a5372c] border border-[#a5372c] rounded-[6px] py-[3px] px-[9px]">01</span>
                                <div>
                                    <h2 className="text-[18px] font-bold text-[#2b2115]">ব্যক্তিগত তথ্য</h2>
                                    <span className="text-[10.5px] tracking-[.12em] text-[#a5372c] font-bold">PERSONAL INFORMATION</span>
                                </div>
                            </div>
                            <hr className="border-none border-t border-[#e2d3b4] mb-[22px]"/>

                            <div className="grid grid-cols-2 gap-[22px] mb-5 max-[700px]:grid-cols-1 max-[900px]:gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[14px] font-semibold text-[#2b2115]">আপনার পূর্ণ নাম <span className="text-[#a5372c]">*</span></label>
                                    <input type="text" className="w-full border border-[#e0d3b8] bg-white rounded-[10px] py-3 px-3.5 text-[14px] text-[#2b2115] outline-none focus:border-[#a5372c] focus:shadow-[0_0_0_3px_rgba(165,55,44,.12)] placeholder:text-[#a99a80]" placeholder="আপনার পূর্ণ নাম লিখুন" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                                    {errors.name && <p className="text-red-500 text-[11px]">{errors.name}</p>}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[14px] font-semibold text-[#2b2115]">আপনার বয়স <span className="text-[#a5372c]">*</span></label>
                                    <input type="number" className="w-full border border-[#e0d3b8] bg-white rounded-[10px] py-3 px-3.5 text-[14px] text-[#2b2115] outline-none focus:border-[#a5372c] focus:shadow-[0_0_0_3px_rgba(165,55,44,.12)] placeholder:text-[#a99a80]" placeholder="যেমন: 24" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} />
                                    {errors.age && <p className="text-red-500 text-[11px]">{errors.age}</p>}
                                </div>
                            </div>

                            <div className="mb-5">
                                <label className="text-[14px] font-semibold text-[#2b2115] mb-2 block">আপনি কোন লিঙ্গের? <span className="text-[#a5372c]">*</span></label>
                                <div className="flex flex-wrap gap-3">
                                    {['পুরুষ', 'নারী'].map(g => (
                                        <label key={g} className={`flex-1 min-w-[130px] text-center py-[13px] px-4 border rounded-[10px] text-[14px] font-semibold cursor-pointer select-none transition-all ${form.gender === g ? 'bg-[#a5372c] border-[#a5372c] text-white' : 'border-[#e0d3b8] bg-white text-[#2b2115] hover:border-[#c99a4a]'}`}>
                                            <input type="radio" name="gender" className="sr-only" checked={form.gender === g} onChange={() => handleRadio('gender', g)} />
                                            {g}
                                        </label>
                                    ))}
                                </div>
                                {errors.gender && <p className="text-red-500 text-[11px] mt-1">{errors.gender}</p>}
                            </div>

                            <div className="mb-5">
                                <label className="text-[14px] font-semibold text-[#2b2115] mb-2 block">আপনার বর্তমান ঠিকানা</label>
                                <textarea className="w-full border border-[#e0d3b8] bg-white rounded-[10px] py-3 px-3.5 text-[14px] text-[#2b2115] outline-none focus:border-[#a5372c] focus:shadow-[0_0_0_3px_rgba(165,55,44,.12)] placeholder:text-[#a99a80] resize-y min-h-[78px]" placeholder="ঠিকানা লিখুন" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                            </div>

                            <div>
                                <label className="text-[14px] font-semibold text-[#2b2115] mb-2 block">মোবাইল নম্বর / WhatsApp <span className="text-[#a5372c]">*</span></label>
                                <input type="tel" className="w-full border border-[#e0d3b8] bg-white rounded-[10px] py-3 px-3.5 text-[14px] text-[#2b2115] outline-none focus:border-[#a5372c] focus:shadow-[0_0_0_3px_rgba(165,55,44,.12)] placeholder:text-[#a99a80]" placeholder="+880 1XXX-XXXXXX" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                                {errors.phone && <p className="text-red-500 text-[11px] mt-1">{errors.phone}</p>}
                            </div>
                        </section>

                        {/* SECTION 02 - প্রতিভা সম্পর্কিত তথ্য */}
                        <section className="mb-[34px]">
                            <div className="flex items-center gap-3 mb-[18px]">
                                <span className="font-playfair font-bold text-[13px] text-[#a5372c] border border-[#a5372c] rounded-[6px] py-[3px] px-[9px]">02</span>
                                <div>
                                    <h2 className="text-[18px] font-bold text-[#2b2115]">প্রতিভা সম্পর্কিত তথ্য</h2>
                                    <span className="text-[10.5px] tracking-[.12em] text-[#a5372c] font-bold">TALENT INFORMATION</span>
                                </div>
                            </div>
                            <hr className="border-none border-t border-[#e2d3b4] mb-[22px]"/>

                            <div className="mb-2">
                                <label className="text-[14px] font-semibold text-[#2b2115] mb-2 block">আপনি কোন ধরনের প্রতিভা প্রদর্শন করছেন? <span className="text-[#a5372c]">*</span></label>
                                <div className="flex flex-wrap gap-3">
                                    {['গান', 'কবিতা', 'নৃত্য', 'লোকসংগীত', 'অন্যান্য'].map(t => (
                                        <label key={t} className={`flex-1 min-w-[130px] text-center py-[13px] px-4 border rounded-[10px] text-[14px] font-semibold cursor-pointer select-none transition-all ${form.talentType === t ? 'bg-[#a5372c] border-[#a5372c] text-white' : 'border-[#e0d3b8] bg-white text-[#2b2115] hover:border-[#c99a4a]'}`}>
                                            <input type="radio" name="talent" className="sr-only" checked={form.talentType === t} onChange={() => handleRadio('talentType', t)} />
                                            {t}
                                        </label>
                                    ))}
                                </div>
                                {errors.talentType && <p className="text-red-500 text-[11px] mt-1">{errors.talentType}</p>}
                            </div>

                            <p className="font-noto-serif-bengali text-[16px] font-bold mt-6 mb-1">RAW ভিডিও সংক্রান্ত প্রশ্ন</p>
                            <span className="text-[10px] tracking-[.12em] text-[#a5372c] font-bold mb-3.5 block">ABOUT YOUR VIDEO</span>

                            <div className="mb-5">
                                <label className="text-[14px] font-semibold text-[#2b2115] mb-1 block">ভিডিওটি কি RAW? <span className="text-[#a5372c]">*</span></label>
                                <p className="text-[12.5px] text-[#7a7488] mb-2">অর্থাৎ কোনো Edit / Filter / AI ব্যবহার করা হয়নি?</p>
                                <div className="flex gap-3 flex-wrap">
                                    {['হ্যাঁ', 'না'].map(y => (
                                        <label key={y} className={`flex-1 min-w-[130px] text-center py-[13px] px-4 border rounded-[10px] text-[14px] font-semibold cursor-pointer select-none transition-all ${form.isRaw === y ? 'bg-[#a5372c] border-[#a5372c] text-white' : 'border-[#e0d3b8] bg-white text-[#2b2115] hover:border-[#c99a4a]'}`}>
                                            <input type="radio" name="raw" className="sr-only" checked={form.isRaw === y} onChange={() => handleRadio('isRaw', y)} />
                                            {y}
                                        </label>
                                    ))}
                                </div>
                                {errors.isRaw && <p className="text-red-500 text-[11px] mt-1">{errors.isRaw}</p>}
                            </div>

                            <div>
                                <label className="text-[14px] font-semibold text-[#2b2115] mb-2 block">ভিডিওর দৈর্ঘ্য <span className="text-[#a5372c]">*</span></label>
                                <div className="flex flex-wrap gap-3">
                                    {[
                                        { value: 'under1', label: '১ মিনিটের নিচে' },
                                        { value: '1to3', label: '১–৩ মিনিট' },
                                        { value: '3to5', label: '৩–৫ মিনিট' },
                                        { value: 'over5', label: '৫ মিনিটের বেশি' },
                                    ].map(d => (
                                        <label key={d.value} className={`flex-1 min-w-[130px] text-center py-[13px] px-4 border rounded-[10px] text-[14px] font-semibold cursor-pointer select-none transition-all ${form.duration === d.value ? 'bg-[#a5372c] border-[#a5372c] text-white' : 'border-[#e0d3b8] bg-white text-[#2b2115] hover:border-[#c99a4a]'}`}>
                                            <input type="radio" name="length" className="sr-only" checked={form.duration === d.value} onChange={() => handleRadio('duration', d.value)} />
                                            {d.label}
                                        </label>
                                    ))}
                                </div>
                                {errors.duration && <p className="text-red-500 text-[11px] mt-1">{errors.duration}</p>}
                            </div>
                        </section>

                        {/* CONSENT & অনুমতি */}
                        <section className="mb-[34px]">
                            <div className="mb-1.5">
                                <h2 className="text-[18px] font-bold text-[#2b2115]">Consent &amp; অনুমতি</h2>
                                <span className="text-[10.5px] tracking-[.12em] text-[#a5372c] font-bold">CONSENT &amp; PERMISSION</span>
                            </div>
                            <hr className="border-none border-t border-[#e2d3b4] mt-3.5 mb-[22px]"/>

                            <label className="flex gap-3.5 items-start bg-[#f4ead9] border border-[#e2d3b4] rounded-xl p-[16px_18px] mb-3.5 cursor-pointer">
                                <input type="checkbox" className="mt-[3px] w-[17px] h-[17px] accent-[#a5372c] flex-shrink-0 cursor-pointer" checked={form.consentPublish} onChange={(e) => setForm({ ...form, consentPublish: e.target.checked })} />
                                <span>
                                    <strong className="block text-[14.5px] font-bold mb-[3px] text-[#2b2115]">প্রকাশের অনুমতি</strong>
                                    <span className="text-[13px] text-[#7a7488] leading-[1.55]">আমি RAW LIQUEUR-কে আমার জমাকৃত ছবি ও ভিডিও তাদের অফিসিয়াল YouTube, ওয়েবসাইট ও সামাজিক যোগাযোগ মাধ্যমে প্রকাশ ও প্রচারের অনুমতি দিচ্ছি। *</span>
                                </span>
                            </label>
                            {errors.consentPublish && <p className="text-red-500 text-[11px] mb-2 ml-8">{errors.consentPublish}</p>}

                            <label className="flex gap-3.5 items-start bg-[#f4ead9] border border-[#e2d3b4] rounded-xl p-[16px_18px] cursor-pointer">
                                <input type="checkbox" className="mt-[3px] w-[17px] h-[17px] accent-[#a5372c] flex-shrink-0 cursor-pointer" checked={form.consentFuture} onChange={(e) => setForm({ ...form, consentFuture: e.target.checked })} />
                                <span>
                                    <strong className="block text-[14.5px] font-bold mb-[3px] text-[#2b2115]">ভবিষ্যতের অনুষ্ঠান</strong>
                                    <span className="text-[13px] text-[#7a7488] leading-[1.55]">আমি ভবিষ্যতে RAW LIQUEUR-এর প্রতিযোগিতা, লাইভ শো, প্রোগ্রাম বা প্রচারণামূলক অনুষ্ঠানে অংশগ্রহণে আগ্রহী। *</span>
                                </span>
                            </label>
                            {errors.consentFuture && <p className="text-red-500 text-[11px] mt-1 ml-8">{errors.consentFuture}</p>}
                        </section>

                        {/* শর্তাবলী */}
                        <section className="mb-[34px]">
                            <div className="mb-1.5">
                                <h2 className="text-[18px] font-bold text-[#2b2115]">শর্তাবলী</h2>
                                <span className="text-[10.5px] tracking-[.12em] text-[#a5372c] font-bold">TERMS &amp; CONDITIONS</span>
                            </div>
                            <hr className="border-none border-t border-[#e2d3b4] mt-3.5 mb-[22px]"/>

                            <div className="bg-[#fffdf9] border border-[#e2d3b4] rounded-xl p-[22px_24px] max-h-[280px] overflow-y-auto mb-4">
                                <div className="mb-4">
                                    <h4 className="text-[14px] font-bold text-[#2b2115] mb-1">Artist Must Remain in Frame</h4>
                                    <p className="text-[13px] text-[#7a7488]">ভিডিও ধারণের পুরো সময় artist-কে camera frame-এর মধ্যে থাকতে হবে। পারফরম্যান্সের মাঝখানে camera frame-এর বাইরে চলে যাওয়া গ্রহণযোগ্য হবে না।</p>
                                </div>
                                <div className="mb-4">
                                    <h4 className="text-[14px] font-bold text-[#2b2115] mb-1">Single Continuous Shot</h4>
                                    <p className="text-[13px] text-[#7a7488]">Single Continuous Shot.</p>
                                </div>
                                <div className="mb-4 last:mb-0">
                                    <p className="text-[14.5px] font-bold mb-3">Performance Rules</p>
                                    <h4 className="text-[14px] font-bold text-[#2b2115] mb-1">Instrument Must Remain Visible</h4>
                                    <p className="text-[13px] text-[#7a7488] mb-3">কোনো manual/acoustic instrument ব্যবহার করলে সেটি যথাযথ সম্পূর্ণ camera frame এবং focus-এর মধ্যে পরিষ্কারভাবে দৃশ্যমান থাকতে হবে। Instrument এমনভাবে ব্যবহার করা যাবে না যাতে বোঝা না যায় যে artist নিজে live ভাবে বাজাচ্ছেন।</p>
                                    <h4 className="text-[14px] font-bold text-[#2b2115] mb-1">Unnecessary Activities</h4>
                                    <p className="text-[13px] text-[#7a7488] mb-3">ভিডিওর মধ্যে কোনো ধরনের অপ্রয়োজনীয় conversation বা activity গ্রহণযোগ্য হবে না।</p>
                                    <h4 className="text-[14px] font-bold text-[#2b2115] mb-1">Original Performance</h4>
                                    <p className="text-[13px] text-[#7a7488] mb-3">জমা দেওয়া performance অবশ্যই submit করা artist-এর নিজস্ব performance হতে হবে।</p>
                                    <h4 className="text-[14px] font-bold text-[#2b2115] mb-1">Safety</h4>
                                    <p className="text-[13px] text-[#7a7488]">Artist নিজের recording environment এবং performance-এর নিরাপত্তার জন্য নিজেই দায়ী থাকবেন। কোনো বিপজ্জনক stunt, unsafe activity বা নিজের/অন্যের ক্ষতি হতে পারে এমন performance জমা দেওয়া উচিত নয়।</p>
                                </div>
                            </div>

                            <label className="flex gap-3.5 items-start bg-[#f4ead9] border border-[#e2d3b4] rounded-xl p-[16px_18px] cursor-pointer">
                                <input type="checkbox" className="mt-[3px] w-[17px] h-[17px] accent-[#a5372c] flex-shrink-0 cursor-pointer" checked={form.consentTerms} onChange={(e) => setForm({ ...form, consentTerms: e.target.checked })} />
                                <span>
                                    <strong className="block text-[14.5px] font-bold mb-[3px] text-[#2b2115]">শর্তাবলীতে সম্মতি</strong>
                                    <span className="text-[13px] text-[#7a7488] leading-[1.55]">আমি উপরের সকল শর্তাবলী পড়েছি এবং তাতে সম্মত রয়েছি। *</span>
                                </span>
                            </label>
                            {errors.consentTerms && <p className="text-red-500 text-[11px] mt-1 ml-8">{errors.consentTerms}</p>}
                        </section>

                        {/* UPLOADS */}
                        <section className="mb-[34px]">
                            <div className="mb-1.5">
                                <h2 className="text-[18px] font-bold text-[#2b2115]">ফাইল আপলোড</h2>
                                <span className="text-[10.5px] tracking-[.12em] text-[#a5372c] font-bold">UPLOADS</span>
                            </div>
                            <hr className="border-none border-t border-[#e2d3b4] mt-3.5 mb-[22px]"/>

                            <div className="mb-2">
                                <label className="text-[14px] font-semibold text-[#2b2115]">আপনার একটি ছবি আপলোড করুন <span className="text-[#a5372c]">*</span></label>
                            </div>
                            <p className="text-[12px] text-[#7a7488] mb-3">JPG / JPEG / PNG — সর্বোচ্চ 5MB</p>
                            <label className="border-2 border-dashed border-[#c99a4a] rounded-[14px] bg-[#fffdf8] py-[44px] px-5 text-center cursor-pointer block mb-6 hover:bg-[#fdf6e8] hover:border-[#a5372c] transition-all">
                                <input type="file" accept=".jpg,.jpeg,.png" className="hidden" onChange={(e) => setForm({ ...form, photo: e.target.files[0] })} />
                                <div className="w-[52px] h-[52px] rounded-full bg-[#f4ead9] text-[#a5372c] flex items-center justify-center mx-auto mb-3.5 text-[22px]">⬆</div>
                                <div className="text-[14.5px] font-bold text-[#2b2115] mb-1">{form.photo ? form.photo.name : 'ছবি নির্বাচন করতে ক্লিক করুন'}</div>
                                <div className="text-[12.5px] text-[#7a7488]">অথবা ড্র্যাগ করুন</div>
                            </label>
                            {errors.photo && <p className="text-red-500 text-[11px] mb-3">{errors.photo}</p>}

                            <div className="mb-2">
                                <label className="text-[14px] font-semibold text-[#2b2115]">আপনার প্রতিভার ভিডিও আপলোড করুন <span className="text-[#a5372c]">*</span></label>
                            </div>
                            <p className="text-[12px] text-[#7a7488] mb-3">MP4 / MOV / WebM — সর্বোচ্চ 500MB</p>
                            <label className="border-2 border-dashed border-[#c99a4a] rounded-[14px] bg-[#fffdf8] py-[44px] px-5 text-center cursor-pointer block hover:bg-[#fdf6e8] hover:border-[#a5372c] transition-all">
                                <input type="file" accept=".mp4,.mov,.webm" className="hidden" onChange={(e) => setForm({ ...form, video: e.target.files[0] })} />
                                <div className="w-[52px] h-[52px] rounded-full bg-[#f4ead9] text-[#a5372c] flex items-center justify-center mx-auto mb-3.5 text-[22px]">▶</div>
                                <div className="text-[14.5px] font-bold text-[#2b2115] mb-1">{form.video ? form.video.name : 'ভিডিও নির্বাচন করতে ক্লিক করুন'}</div>
                                <div className="text-[12.5px] text-[#7a7488]">MP4, MOV, WebM ফরম্যাটে আপলোড করুন</div>
                            </label>
                            {errors.video && <p className="text-red-500 text-[11px] mt-1">{errors.video}</p>}
                        </section>

                        {/* SUBMIT */}
                        <button type="submit" disabled={submitting} className="w-full py-[18px] border-none rounded-[14px] bg-gradient-to-br from-[#e6c584] to-[#c99a4a] text-[#3a2712] text-[16.5px] font-bold font-noto-serif-bengali cursor-pointer transition-all hover:brightness-[1.04] active:translate-y-[1px] shadow-[0_8px_18px_rgba(201,154,74,.28)] disabled:opacity-50 disabled:cursor-not-allowed">
                            {submitting ? '⏳ জমা হচ্ছে...' : 'Submit — আপনার প্রতিভা জমা দিন'}
                        </button>
                        <p className="text-center text-[11.5px] text-[#7a7488] mt-4 leading-[1.7]">
                            বি. দ্র.: Raw Liqueur কোনো প্রকার প্রতিযোগিতা বা পুরষ্কারমূলক আয়োজন নয়।<br/>
                            "আপনার জীবনের অজানা গল্প ও প্রতিভাই Raw Liqueur-এর মূল লক্ষ্য।"
                        </p>
                    </form>
                </main>
            </div>
        </div>
    );
}
