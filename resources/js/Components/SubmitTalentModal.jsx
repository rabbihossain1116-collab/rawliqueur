import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { router } from '@inertiajs/react';
import Display from '@/Components/Display';
import { AlponaCorner, Lotus } from '@/Components/Ornament';
import {
    Field,
    Input,
    Textarea,
    Select,
    Option,
    OptionGrid,
    Consent,
    FileDrop,
} from '@/Components/Form';
import { useLang } from '@/hooks/useLang';
import { CONTACT_EMAIL, YOUTUBE_CHANNEL } from '@/brand';
import { counter, localeDigits } from '@/lib/format';

/**
 * SubmitTalentModal — the submission form.
 *
 * The brief calls this the most important surface on the site, so a few things
 * are deliberate rather than convenient:
 *
 *  · Four short steps, not one long scroll. The form asks for two files and
 *    three consents; presented as a single page it reads as work, and the
 *    drop-off is on the upload, which is the last thing you want to lose.
 *
 *  · Validation runs on *advance*, not on keystroke. Live-validating a name
 *    field tells someone their name is invalid while they are still typing it.
 *
 *  · The language toggle is repeated inside the panel. The header toggle is
 *    behind the overlay, and the brief singles this out: a visitor who cannot
 *    read the form must be able to switch without dismissing it.
 *
 *  · "Is the video raw?" answered "no" is not a validation error — it is a
 *    teaching moment, and it gets an explanation instead of a red message.
 *
 * Posts multipart to `talent.store`. See TalentSubmissionController for the
 * server-side rules; the client checks mirror them but are not the authority.
 */

const MAX_PHOTO_BYTES = 5 * 1024 * 1024; // 5MB
const MAX_VIDEO_BYTES = 500 * 1024 * 1024; // 500MB

const DIVISIONS = [
    { key: 'dhaka', bn: 'ঢাকা', en: 'Dhaka' },
    { key: 'chattogram', bn: 'চট্টগ্রাম', en: 'Chattogram' },
    { key: 'rajshahi', bn: 'রাজশাহী', en: 'Rajshahi' },
    { key: 'khulna', bn: 'খুলনা', en: 'Khulna' },
    { key: 'barishal', bn: 'বরিশাল', en: 'Barishal' },
    { key: 'sylhet', bn: 'সিলেট', en: 'Sylhet' },
    { key: 'rangpur', bn: 'রংপুর', en: 'Rangpur' },
    { key: 'mymensingh', bn: 'ময়মনসিংহ', en: 'Mymensingh' },
];

const EMPTY_FORM = {
    name: '',
    age: '',
    gender: '',
    division: '',
    district: '',
    phone: '',
    email: '',
    talentType: '',
    performanceTitle: '',
    note: '',
    isRaw: '',
    duration: '',
    consentPublish: false,
    consentFuture: false,
    consentTerms: false,
    photo: null,
    video: null,
};

/** Bangladeshi mobile: optional +880 or leading 0, then 1[3-9] and 8 digits. */
const BD_PHONE = /^(?:\+?880|0)1[3-9]\d{8}$/;

export default function SubmitTalentModal({ open, onClose }) {
    const { lang, isBn, setLang, t } = useLang();

    const [step, setStep] = useState(1);
    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [done, setDone] = useState(false);

    // Object URLs are kept in state so they can be revoked deterministically —
    // deriving them at render time would create a new blob URL every frame.
    const [photoPreview, setPhotoPreview] = useState(null);

    const panelRef = useRef(null);
    const bodyRef = useRef(null);
    const restoreFocusTo = useRef(null);

    const totalSteps = 4;

    /* ── Lifecycle ──────────────────────────────────────────────────────── */

    // Reset on close rather than on open, so the closing panel does not visibly
    // snap back to step 1 while it is still on screen.
    useEffect(() => {
        if (open) return;

        setStep(1);
        setForm(EMPTY_FORM);
        setErrors({});
        setDone(false);
        setSubmitting(false);
    }, [open]);

    // Revoke the previous preview whenever it is replaced or the modal unmounts.
    // Without this, every re-pick leaks the full image into memory.
    useEffect(
        () => () => {
            if (photoPreview) URL.revokeObjectURL(photoPreview);
        },
        [photoPreview],
    );

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    // Focus management: trap Tab inside the panel, close on Escape, and hand
    // focus back to whatever opened the modal on the way out.
    useEffect(() => {
        if (!open) return;

        restoreFocusTo.current = document.activeElement;
        panelRef.current?.focus();

        const onKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
                return;
            }

            if (event.key !== 'Tab') return;

            const focusable = panelRef.current?.querySelectorAll(
                'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
            );
            if (!focusable?.length) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
            restoreFocusTo.current?.focus?.();
        };
    }, [open, onClose]);

    /* ── State helpers ──────────────────────────────────────────────────── */

    const update = useCallback((field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));

        // Clear this field's error as soon as it is touched again — leaving a
        // stale message under a field someone is actively fixing is hostile.
        setErrors((prev) => {
            if (!prev[field]) return prev;
            const next = { ...prev };
            delete next[field];
            return next;
        });
    }, []);

    const handlePhoto = useCallback(
        (file) => {
            if (photoPreview) URL.revokeObjectURL(photoPreview);
            setPhotoPreview(file ? URL.createObjectURL(file) : null);
            update('photo', file);
        },
        [photoPreview, update],
    );

    /* ── Validation ─────────────────────────────────────────────────────── */

    const validate = useCallback(
        (which) => {
            const next = {};
            const req = t('এই ঘরটি পূরণ করুন', 'This field is required');

            if (which === 1) {
                if (form.name.trim().length < 2)
                    next.name = t('পুরো নাম লিখুন', 'Enter your full name');

                const age = Number(form.age);
                if (!form.age) next.age = req;
                else if (!Number.isFinite(age) || age < 5 || age > 100)
                    next.age = t('বয়স ৫ থেকে ১০০-এর মধ্যে হতে হবে', 'Age must be between 5 and 100');

                if (!form.gender) next.gender = req;
                if (!form.division) next.division = req;
                if (!form.district.trim()) next.district = req;

                const phone = form.phone.replace(/[\s-]/g, '');
                if (!phone) next.phone = req;
                else if (!BD_PHONE.test(phone))
                    next.phone = t(
                        'সঠিক মোবাইল নম্বর লিখুন — যেমন ০১৭XXXXXXXX',
                        'Enter a valid mobile number — e.g. 017XXXXXXXX',
                    );

                // Email is optional, but a typo'd one is worse than none.
                if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email))
                    next.email = t('সঠিক ইমেইল লিখুন', 'Enter a valid email address');
            }

            if (which === 2) {
                if (!form.talentType) next.talentType = req;
            }

            if (which === 3) {
                if (!form.isRaw) next.isRaw = req;
                if (!form.duration) next.duration = req;
            }

            if (which === 4) {
                if (!form.consentPublish)
                    next.consentPublish = t('সম্মতি দিতে হবে', 'Consent is required');
                if (!form.consentTerms)
                    next.consentTerms = t('সম্মতি দিতে হবে', 'Consent is required');

                if (!form.photo) next.photo = t('একটি ছবি দিন', 'A photo is required');
                else if (form.photo.size > MAX_PHOTO_BYTES)
                    next.photo = t('ছবিটি ৫MB-এর কম হতে হবে', 'Photo must be under 5MB');

                if (!form.video) next.video = t('ভিডিও দিন', 'A video is required');
                else if (form.video.size > MAX_VIDEO_BYTES)
                    next.video = t('ভিডিওটি ৫০০MB-এর কম হতে হবে', 'Video must be under 500MB');
            }

            return next;
        },
        [form, t],
    );

    const goNext = useCallback(() => {
        const found = validate(step);
        setErrors(found);
        if (Object.keys(found).length > 0) return;

        setStep((current) => Math.min(current + 1, totalSteps));
        // Each step is a new screen; leaving the panel mid-scroll makes it look
        // like nothing happened.
        bodyRef.current?.scrollTo({ top: 0 });
    }, [step, validate]);

    const goBack = useCallback(() => {
        setErrors({});
        setStep((current) => Math.max(current - 1, 1));
        bodyRef.current?.scrollTo({ top: 0 });
    }, []);

    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();

            // A form submit from any step should advance rather than post —
            // pressing Enter in a text field on step 1 must not send the form.
            if (step < totalSteps) {
                goNext();
                return;
            }

            const found = validate(4);
            setErrors(found);
            if (Object.keys(found).length > 0) return;

            router.post(
                '/submit-talent',
                {
                    ...form,
                    // Normalised before it leaves the browser so the inbox gets
                    // one consistent format.
                    phone: form.phone.replace(/[\s-]/g, ''),
                    language: lang,
                },
                {
                    forceFormData: true, // required: two File fields
                    preserveScroll: true,
                    preserveState: true,
                    onStart: () => setSubmitting(true),
                    onFinish: () => setSubmitting(false),
                    onSuccess: () => setDone(true),
                    // Laravel returns field-keyed messages, which is the shape
                    // this component already renders.
                    onError: (serverErrors) => setErrors(serverErrors),
                },
            );
        },
        [form, goNext, lang, step, validate],
    );

    /* ── Option sets ────────────────────────────────────────────────────── */

    const talentOptions = useMemo(
        () => [
            { key: 'singing', label: t('গান', 'Singing') },
            { key: 'poetry', label: t('কবিতা / আবৃত্তি', 'Poetry / Recitation') },
            { key: 'dance', label: t('নৃত্য', 'Dance') },
            { key: 'folk', label: t('লোকসংগীত', 'Folk music') },
            { key: 'instrument', label: t('বাদ্যযন্ত্র', 'Instrument') },
            { key: 'storytelling', label: t('গল্প বলা / অভিনয়', 'Storytelling / Acting') },
        ],
        [t],
    );

    const durationOptions = useMemo(
        () => [
            { key: 'under1', label: t('১ মিনিটের কম', 'Under 1 minute') },
            { key: '1to3', label: t('১–৩ মিনিট', '1–3 minutes') },
            { key: '3to5', label: t('৩–৫ মিনিট', '3–5 minutes') },
            { key: 'over5', label: t('৫ মিনিটের বেশি', 'Over 5 minutes') },
        ],
        [t],
    );

    const stepLabels = useMemo(
        () => [
            t('পরিচয়', 'Identity'),
            t('প্রতিভা', 'Talent'),
            t('ভিডিও', 'Video'),
            t('সম্মতি ও আপলোড', 'Consent & upload'),
        ],
        [t],
    );

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-[60] flex items-end justify-center bg-paper/92 p-0 backdrop-blur-md sm:items-center sm:p-6"
            onMouseDown={(event) => {
                // Only a press that both starts and ends on the backdrop closes
                // the modal — otherwise a text selection that drifts outside the
                // panel would discard a half-filled form.
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <div
                ref={panelRef}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                aria-labelledby="submit-modal-title"
                className="grain relative flex max-h-[94vh] w-full max-w-3xl flex-col border border-brass/25 bg-surface outline-none sm:max-h-[90vh]"
            >
                <span aria-hidden="true" className="pointer-events-none text-brass/45">
                    <AlponaCorner corner="tl" className="absolute -left-px -top-px h-10 w-10" />
                    <AlponaCorner corner="br" className="absolute -bottom-px -right-px h-10 w-10" />
                </span>

                {done ? (
                    <SuccessPanel onClose={onClose} t={t} lang={lang} />
                ) : (
                    <>
                        {/* ── Header ───────────────────────────────────────── */}
                        <header className="shrink-0 border-b border-brass/15 px-6 pb-5 pt-6 sm:px-9 sm:pt-8">
                            <div className="flex items-start justify-between gap-5">
                                <div>
                                    <p className="caps text-[8px] text-brass">
                                        {t('ধাপ', 'Step')} {counter(step - 1, lang)} /{' '}
                                        {localeDigits(totalSteps, lang)}
                                    </p>

                                    <Display
                                        size="sm"
                                        as="h2"
                                        id="submit-modal-title"
                                        className="mt-2.5 text-ink"
                                    >
                                        {stepLabels[step - 1]}
                                    </Display>
                                </div>

                                <div className="flex shrink-0 items-center gap-3">
                                    {/* Repeated language toggle — see the note at
                                        the top of this file. */}
                                    <div className="flex border border-ink/15">
                                        {[
                                            { code: 'bn', label: 'বাং' },
                                            { code: 'en', label: 'EN' },
                                        ].map(({ code, label }) => (
                                            <button
                                                key={code}
                                                type="button"
                                                onClick={() => setLang(code)}
                                                aria-pressed={lang === code}
                                                className={`caps px-2.5 py-1.5 text-[8px] transition-colors duration-400 ${
                                                    lang === code
                                                        ? 'bg-brass/90 text-paper'
                                                        : 'text-ink-soft hover:text-ink'
                                                }`}
                                            >
                                                {label}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={onClose}
                                        aria-label={t('বন্ধ করুন', 'Close')}
                                        className="flex h-8 w-8 items-center justify-center border border-ink/15 text-ink-soft transition-colors duration-500 hover:border-crimson/60 hover:text-crimson"
                                    >
                                        <svg
                                            className="h-3.5 w-3.5"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.75"
                                            aria-hidden="true"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Progress: four segments, filled up to the current
                                step. Labels are hidden on mobile where four of
                                them cannot fit legibly. */}
                            <ol className="mt-6 flex gap-1.5">
                                {stepLabels.map((label, index) => (
                                    <li key={label} className="flex-1">
                                        <span
                                            className={`block h-[2px] transition-colors duration-700 ${
                                                index < step ? 'bg-brass' : 'bg-ink/12'
                                            }`}
                                        />
                                        <span
                                            lang={lang}
                                            className={`caps mt-2 hidden text-[7px] sm:block ${
                                                index < step ? 'text-brass/80' : 'text-ink-mute'
                                            }`}
                                        >
                                            {label}
                                        </span>
                                    </li>
                                ))}
                            </ol>
                        </header>

                        {/* ── Body ─────────────────────────────────────────── */}
                        <form
                            onSubmit={handleSubmit}
                            className="flex min-h-0 flex-1 flex-col"
                        >
                            <div
                                ref={bodyRef}
                                className="min-h-0 flex-1 overflow-y-auto px-6 py-7 sm:px-9 sm:py-8"
                            >
                                {step === 1 && (
                                    <div className="space-y-7">
                                        <Field
                                            label={t('পুরো নাম', 'Full name')}
                                            required
                                            error={errors.name}
                                        >
                                            {(props) => (
                                                <Input
                                                    {...props}
                                                    type="text"
                                                    value={form.name}
                                                    onChange={(e) => update('name', e.target.value)}
                                                    placeholder={t('আপনার নাম', 'Your name')}
                                                    invalid={Boolean(errors.name)}
                                                    autoComplete="name"
                                                />
                                            )}
                                        </Field>

                                        <div className="grid gap-7 sm:grid-cols-2">
                                            <Field
                                                label={t('বয়স', 'Age')}
                                                required
                                                error={errors.age}
                                            >
                                                {(props) => (
                                                    <Input
                                                        {...props}
                                                        type="number"
                                                        min="5"
                                                        max="100"
                                                        value={form.age}
                                                        onChange={(e) => update('age', e.target.value)}
                                                        placeholder={t('যেমন ২৪', 'e.g. 24')}
                                                        invalid={Boolean(errors.age)}
                                                    />
                                                )}
                                            </Field>

                                            <Field
                                                label={t('লিঙ্গ', 'Gender')}
                                                required
                                                error={errors.gender}
                                            >
                                                {(props) => (
                                                    <Select
                                                        {...props}
                                                        value={form.gender}
                                                        onChange={(e) => update('gender', e.target.value)}
                                                        invalid={Boolean(errors.gender)}
                                                    >
                                                        <Option value="">
                                                            {t('নির্বাচন করুন', 'Select')}
                                                        </Option>
                                                        <Option value="female">
                                                            {t('নারী', 'Female')}
                                                        </Option>
                                                        <Option value="male">
                                                            {t('পুরুষ', 'Male')}
                                                        </Option>
                                                        <Option value="other">
                                                            {t('অন্য', 'Other')}
                                                        </Option>
                                                    </Select>
                                                )}
                                            </Field>
                                        </div>

                                        <div className="grid gap-7 sm:grid-cols-2">
                                            <Field
                                                label={t('বিভাগ', 'Division')}
                                                required
                                                error={errors.division}
                                            >
                                                {(props) => (
                                                    <Select
                                                        {...props}
                                                        value={form.division}
                                                        onChange={(e) => update('division', e.target.value)}
                                                        invalid={Boolean(errors.division)}
                                                    >
                                                        <Option value="">
                                                            {t('নির্বাচন করুন', 'Select')}
                                                        </Option>
                                                        {DIVISIONS.map((division) => (
                                                            <Option key={division.key} value={division.key}>
                                                                {division[lang]}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                )}
                                            </Field>

                                            <Field
                                                label={t('জেলা', 'District')}
                                                required
                                                error={errors.district}
                                            >
                                                {(props) => (
                                                    <Input
                                                        {...props}
                                                        type="text"
                                                        value={form.district}
                                                        onChange={(e) => update('district', e.target.value)}
                                                        placeholder={t('যেমন কুষ্টিয়া', 'e.g. Kushtia')}
                                                        invalid={Boolean(errors.district)}
                                                    />
                                                )}
                                            </Field>
                                        </div>

                                        <div className="grid gap-7 sm:grid-cols-2">
                                            <Field
                                                label={t('মোবাইল / হোয়াটসঅ্যাপ', 'Mobile / WhatsApp')}
                                                required
                                                error={errors.phone}
                                            >
                                                {(props) => (
                                                    <Input
                                                        {...props}
                                                        type="tel"
                                                        value={form.phone}
                                                        onChange={(e) => update('phone', e.target.value)}
                                                        placeholder="01XXXXXXXXX"
                                                        invalid={Boolean(errors.phone)}
                                                        autoComplete="tel"
                                                    />
                                                )}
                                            </Field>

                                            <Field
                                                label={t('ইমেইল', 'Email')}
                                                hint={t('না থাকলে খালি রাখুন', 'Leave blank if you have none')}
                                                error={errors.email}
                                            >
                                                {(props) => (
                                                    <Input
                                                        {...props}
                                                        type="email"
                                                        value={form.email}
                                                        onChange={(e) => update('email', e.target.value)}
                                                        placeholder="you@example.com"
                                                        invalid={Boolean(errors.email)}
                                                        autoComplete="email"
                                                    />
                                                )}
                                            </Field>
                                        </div>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="space-y-8">
                                        <Field
                                            label={t('কোন ধরনের প্রতিভা?', 'What kind of talent?')}
                                            required
                                            error={errors.talentType}
                                        >
                                            {() => (
                                                <OptionGrid
                                                    label={t('প্রতিভার ধরন', 'Talent type')}
                                                    options={talentOptions}
                                                    value={form.talentType}
                                                    onChange={(value) => update('talentType', value)}
                                                />
                                            )}
                                        </Field>

                                        <Field
                                            label={t('পরিবেশনার নাম', 'Title of the performance')}
                                            hint={t(
                                                'গানের বা কবিতার নাম — জানা থাকলে',
                                                'Name of the song or poem, if you know it',
                                            )}
                                        >
                                            {(props) => (
                                                <Input
                                                    {...props}
                                                    type="text"
                                                    value={form.performanceTitle}
                                                    onChange={(e) => update('performanceTitle', e.target.value)}
                                                    placeholder={t('যেমন একলা চলো রে', 'e.g. Ekla Cholo Re')}
                                                />
                                            )}
                                        </Field>

                                        <Field
                                            label={t('কিছু বলতে চান?', 'Anything to tell us?')}
                                            hint={t('ইচ্ছা হলে লিখুন', 'Optional')}
                                        >
                                            {(props) => (
                                                <Textarea
                                                    {...props}
                                                    rows={4}
                                                    value={form.note}
                                                    onChange={(e) => update('note', e.target.value)}
                                                    placeholder={t(
                                                        'নিজের সম্পর্কে বা এই পরিবেশনা সম্পর্কে দুই লাইন',
                                                        'A line or two about yourself or this performance',
                                                    )}
                                                />
                                            )}
                                        </Field>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="space-y-8">
                                        <Field
                                            label={t('ভিডিওটি কি সম্পূর্ণ কাঁচা?', 'Is the video fully raw?')}
                                            hint={t(
                                                'অর্থাৎ কোনো এডিট, ফিল্টার, ব্যাকগ্রাউন্ড মিউজিক বা এআই ব্যবহার করা হয়নি',
                                                'Meaning no editing, filters, backing music or AI was used',
                                            )}
                                            required
                                            error={errors.isRaw}
                                        >
                                            {() => (
                                                <OptionGrid
                                                    label={t('ভিডিও কাঁচা কি না', 'Whether the video is raw')}
                                                    options={[
                                                        { key: 'yes', label: t('হ্যাঁ', 'Yes') },
                                                        { key: 'no', label: t('না', 'No') },
                                                    ]}
                                                    value={form.isRaw}
                                                    onChange={(value) => update('isRaw', value)}
                                                />
                                            )}
                                        </Field>

                                        {/* Not an error state — an explanation. */}
                                        {form.isRaw === 'no' && (
                                            <div className="flex gap-4 border border-brass/30 bg-brass/[0.05] p-5">
                                                <Lotus
                                                    className="mt-0.5 h-5 w-5 shrink-0 text-brass"
                                                    strokeWidth="1.3"
                                                />
                                                <p
                                                    lang={lang}
                                                    className="text-xs leading-relaxed text-ink-soft"
                                                >
                                                    {t(
                                                        'সম্পাদিত ভিডিও আমরা চ্যানেলে প্রকাশ করতে পারি না — এটাই আমাদের একমাত্র শর্ত। ফোনে এক টেকে আবার তুলে পাঠিয়ে দিন, আমরা অপেক্ষা করছি।',
                                                        'We cannot publish an edited video — that is our one condition. Record it again on your phone in a single take and send that instead; we will be waiting.',
                                                    )}
                                                </p>
                                            </div>
                                        )}

                                        <Field
                                            label={t('ভিডিওর দৈর্ঘ্য', 'Length of the video')}
                                            required
                                            error={errors.duration}
                                        >
                                            {() => (
                                                <OptionGrid
                                                    label={t('দৈর্ঘ্য', 'Duration')}
                                                    options={durationOptions}
                                                    value={form.duration}
                                                    onChange={(value) => update('duration', value)}
                                                />
                                            )}
                                        </Field>
                                    </div>
                                )}

                                {step === 4 && (
                                    <div className="space-y-8">
                                        <div className="space-y-3">
                                            <p className="caps text-[9px] text-ink/80">
                                                {t('সম্মতি', 'Consent')}
                                                <span className="ml-1.5 text-crimson-lit">*</span>
                                            </p>

                                            <Consent
                                                checked={form.consentPublish}
                                                onChange={(value) => update('consentPublish', value)}
                                                invalid={Boolean(errors.consentPublish)}
                                            >
                                                {t(
                                                    'আমি RAW LIQUEUR-কে আমার জমা দেওয়া ছবি ও ভিডিও তাদের ইউটিউব চ্যানেল, ওয়েবসাইট ও সামাজিক মাধ্যমে প্রকাশের অনুমতি দিচ্ছি।',
                                                    'I permit RAW LIQUEUR to publish the photo and video I have submitted on their YouTube channel, website and social media.',
                                                )}
                                            </Consent>

                                            <Consent
                                                checked={form.consentTerms}
                                                onChange={(value) => update('consentTerms', value)}
                                                invalid={Boolean(errors.consentTerms)}
                                            >
                                                {t(
                                                    'আমি নিশ্চিত করছি যে ভিডিওটি আমার নিজের, এক টেকে তোলা, এবং কোনো এডিট, ফিল্টার বা এআই ব্যবহার করা হয়নি।',
                                                    'I confirm the video is my own, recorded in a single take, with no editing, filters or AI used.',
                                                )}
                                            </Consent>

                                            <Consent
                                                checked={form.consentFuture}
                                                onChange={(value) => update('consentFuture', value)}
                                            >
                                                {t(
                                                    'ভবিষ্যতে RAW LIQUEUR-এর অনুষ্ঠান বা লাইভ শোতে অংশ নিতে আমি আগ্রহী। (ইচ্ছাধীন)',
                                                    'I would be interested in taking part in future RAW LIQUEUR events or live shows. (Optional)',
                                                )}
                                            </Consent>
                                        </div>

                                        <div className="grid gap-7 sm:grid-cols-2">
                                            <Field
                                                label={t('আপনার ছবি', 'Your photo')}
                                                required
                                                error={errors.photo}
                                            >
                                                {() => (
                                                    <FileDrop
                                                        kind="image"
                                                        accept="image/jpeg,image/png,image/webp"
                                                        onSelect={handlePhoto}
                                                        previewUrl={photoPreview}
                                                        fileName={form.photo?.name}
                                                        invalid={Boolean(errors.photo)}
                                                        emptyLabel={t('ছবি বাছুন', 'Choose photo')}
                                                        hint={t('JPG / PNG · সর্বোচ্চ ৫MB', 'JPG / PNG · max 5MB')}
                                                    />
                                                )}
                                            </Field>

                                            <Field
                                                label={t('প্রতিভার ভিডিও', 'Your talent video')}
                                                required
                                                error={errors.video}
                                            >
                                                {() => (
                                                    <FileDrop
                                                        kind="video"
                                                        accept="video/mp4,video/quicktime,video/webm"
                                                        onSelect={(file) => update('video', file)}
                                                        fileName={form.video?.name}
                                                        invalid={Boolean(errors.video)}
                                                        emptyLabel={t('ভিডিও বাছুন', 'Choose video')}
                                                        hint={t(
                                                            'MP4 / MOV · সর্বোচ্চ ৫০০MB',
                                                            'MP4 / MOV · max 500MB',
                                                        )}
                                                    />
                                                )}
                                            </Field>
                                        </div>

                                        <p lang={lang} className="text-[11px] leading-relaxed text-ink-mute">
                                            {t(
                                                'বি. দ্র. — RAW LIQUEUR কোনো প্রতিযোগিতা নয়। প্রতিটি ভিডিও যাচাই করে প্রকাশ করা হয় এবং আপনাকে জানিয়ে দেওয়া হয়।',
                                                'Note — RAW LIQUEUR is not a competition. Every video is verified before publishing, and we let you know either way.',
                                            )}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* ── Footer ───────────────────────────────────── */}
                            <footer className="shrink-0 border-t border-brass/15 px-6 py-5 sm:px-9">
                                <div className="flex items-center justify-between gap-4">
                                    {step > 1 ? (
                                        <button
                                            type="button"
                                            onClick={goBack}
                                            className="caps border border-ink/15 px-6 py-3.5 text-[9px] text-ink-soft transition-colors duration-500 hover:border-ink/35 hover:text-ink"
                                        >
                                            {t('পিছনে', 'Back')}
                                        </button>
                                    ) : (
                                        <span />
                                    )}

                                    {/* Always enabled. A greyed-out Next with no
                                        explanation is the most common dead end in
                                        multi-step forms — pressing it and getting
                                        told exactly what is missing is better. */}
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="caps group inline-flex items-center gap-3 bg-crimson px-8 py-3.5 text-[9px] text-ink transition-colors duration-500 hover:bg-crimson-deep disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {submitting
                                            ? t('পাঠানো হচ্ছে…', 'Sending…')
                                            : step < totalSteps
                                              ? t('পরবর্তী', 'Next')
                                              : t('জমা দিন', 'Submit')}

                                        {!submitting && (
                                            <svg
                                                className="h-2.5 w-2.5 transition-transform duration-500 group-hover:translate-x-1"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2.5"
                                                aria-hidden="true"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7 7 7-7 7" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </footer>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

/**
 * SuccessPanel — replaces the form once the post lands.
 *
 * Deliberately quiet and specific: it says what happens next and how long it
 * takes, because "Submitted successfully!" answers neither and is the point at
 * which someone decides whether this operation is real.
 */
function SuccessPanel({ onClose, t, lang }) {
    return (
        <div className="flex flex-col items-center px-8 py-16 text-center sm:px-14 sm:py-20">
            <span className="relative flex h-20 w-20 items-center justify-center rounded-full border border-brass/40">
                <span
                    aria-hidden="true"
                    className="absolute inset-2 rounded-full border border-brass/15"
                />
                <Lotus className="h-9 w-9 text-brass" strokeWidth="1.1" />
            </span>

            <Display size="md" className="mt-9 text-ink">
                {t('জমা হয়েছে', 'Received')}
            </Display>

            <p lang={lang} className="mt-5 max-w-md text-sm leading-relaxed text-ink-soft">
                {t(
                    'আপনার ভিডিও আমাদের কাছে পৌঁছেছে। আমরা এটি যাচাই করব এবং সাত দিনের মধ্যে আপনাকে জানিয়ে দেব — প্রকাশিত হলে চ্যানেলের লিংকও পাঠিয়ে দেব।',
                    'Your video has reached us. We will verify it and get back to you within seven days — and send you the channel link if it is published.',
                )}
            </p>

            <p className="mt-5 text-xs text-ink-mute">
                {t('কোনো প্রশ্ন থাকলে', 'Any questions')} —{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="link-underline text-brass/80">
                    {CONTACT_EMAIL}
                </a>
            </p>

            <div className="mt-11 flex flex-col gap-3 sm:flex-row">
                <a
                    href={YOUTUBE_CHANNEL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="caps border border-brass/40 px-8 py-4 text-[9px] text-brass transition-colors duration-500 hover:bg-brass hover:text-paper"
                >
                    {t('চ্যানেল দেখুন', 'Visit the channel')}
                </a>

                <button
                    type="button"
                    onClick={onClose}
                    className="caps border border-ink/15 px-8 py-4 text-[9px] text-ink-soft transition-colors duration-500 hover:border-ink/35 hover:text-ink"
                >
                    {t('বন্ধ করুন', 'Close')}
                </button>
            </div>
        </div>
    );
}
