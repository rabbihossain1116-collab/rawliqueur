import { useId } from 'react';

/**
 * Form primitives, dark-luxury styling.
 *
 * Kept separate from the submit modal so the modal file stays about flow and
 * validation rather than about borders, and so any later form (contact, admin)
 * inherits the same look for free.
 *
 * ── Why underline inputs ─────────────────────────────────────────────────
 * Boxed inputs need a fill lighter than the page to read as editable, and on a
 * near-black canvas that fill turns into a row of grey slabs that dominates the
 * panel. A baseline rule that lights up brass on focus keeps the form
 * typographic, which is the only way a long form sits comfortably inside this
 * design.
 *
 * Every field is driven by `useId`, so labels, errors and `aria-describedby`
 * are wired without callers inventing unique ids.
 */

/**
 * Field — label, control, error message, in a fixed vertical rhythm.
 *
 * Uses a render prop rather than plain children because the control needs the
 * generated ids for `id`, `aria-invalid` and `aria-describedby`. Passing them
 * back is the only way to keep the wiring automatic.
 */
export function Field({ label, hint, error, required, children, className = '' }) {
    const id = useId();
    const hintId = `${id}-hint`;
    const errorId = `${id}-error`;

    // Only reference descriptions that actually exist, or screen readers
    // announce a dangling id.
    const describedBy = [hint ? hintId : null, error ? errorId : null]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={className}>
            <label htmlFor={id} className="caps block text-[9px] text-ink/80">
                {label}
                {required && <span className="ml-1.5 text-crimson-lit">*</span>}
            </label>

            {hint && (
                <p id={hintId} className="mt-2 text-[11px] leading-relaxed text-ink-mute">
                    {hint}
                </p>
            )}

            <div className="mt-3">
                {children({
                    id,
                    'aria-invalid': error ? true : undefined,
                    'aria-describedby': describedBy || undefined,
                })}
            </div>

            {/* `role="alert"` so the message is announced when it appears after
                a failed advance, not just when the field is focused. */}
            {error && (
                <p
                    id={errorId}
                    role="alert"
                    className="mt-2.5 text-[11px] text-crimson-lit"
                >
                    {error}
                </p>
            )}
        </div>
    );
}

const CONTROL_BASE =
    'w-full border-b bg-transparent px-0 py-3 text-sm text-ink placeholder:text-ink-mute/70 transition-colors duration-500 focus:outline-none';

const controlBorder = (invalid) =>
    invalid
        ? 'border-crimson/70 focus:border-crimson'
        : 'border-ink/15 hover:border-ink/30 focus:border-brass';

/** Single-line text / number / tel input. */
export function Input({ invalid, className = '', ...props }) {
    return (
        <input
            {...props}
            className={`${CONTROL_BASE} ${controlBorder(invalid)} ${className}`}
        />
    );
}

/** Multi-line input, for the optional note. */
export function Textarea({ invalid, className = '', ...props }) {
    return (
        <textarea
            {...props}
            className={`${CONTROL_BASE} resize-none ${controlBorder(invalid)} ${className}`}
        />
    );
}

/**
 * Select. Native, because a custom listbox on a form this important is a
 * liability — native keyboard handling and mobile pickers are worth more than a
 * matching dropdown panel. `appearance-none` plus an inline chevron is enough
 * to keep it visually consistent.
 *
 * `bg-surface` on the options is required: without it Chrome renders the
 * dropdown list white-on-white against the inherited dark colour.
 */
export function Select({ invalid, children, className = '', ...props }) {
    return (
        <div className="relative">
            <select
                {...props}
                className={`${CONTROL_BASE} ${controlBorder(invalid)} cursor-pointer appearance-none pr-8 ${className}`}
            >
                {children}
            </select>

            <svg
                className="pointer-events-none absolute right-1 top-1/2 h-3 w-3 -translate-y-1/2 text-brass"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
            </svg>
        </div>
    );
}

/** Wrap `<option>`s so callers do not repeat the dark-mode background fix. */
export function Option({ children, ...props }) {
    return (
        <option {...props} className="bg-surface text-ink">
            {children}
        </option>
    );
}

/**
 * OptionGrid — single-select as a grid of tiles.
 *
 * Used for talent type and duration. A radio group presented as tiles is far
 * faster to answer on a phone than a select, and it lets the options be read at
 * a glance, which matters when the categories are the whole point of the form.
 *
 * Implemented as a real `radiogroup` so arrow-key navigation and screen-reader
 * semantics survive the visual treatment.
 */
export function OptionGrid({
    options,
    value,
    onChange,
    columns = 2,
    label,
    className = '',
}) {
    return (
        <div
            role="radiogroup"
            aria-label={label}
            className={`grid gap-2.5 ${columns === 1 ? '' : 'sm:grid-cols-2'} ${className}`}
        >
            {options.map((option) => {
                const selected = value === option.key;

                return (
                    <button
                        key={option.key}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => onChange(option.key)}
                        className={`border px-4 py-3.5 text-left text-sm transition-colors duration-400 ${
                            selected
                                ? 'border-brass bg-brass/10 text-brass-deep'
                                : 'border-ink/12 text-ink-soft hover:border-ink/30 hover:text-ink'
                        }`}
                    >
                        <span className="block">{option.label}</span>
                        {option.note && (
                            <span className="mt-1 block text-[11px] text-ink-mute">
                                {option.note}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}

/**
 * Consent — a checkbox with a long legal label.
 *
 * The native input is kept (rather than hidden behind a styled span) so the
 * checked state, keyboard toggle and form semantics all come for free;
 * `accent-color` is enough to tint it to the palette.
 */
export function Consent({ checked, onChange, children, invalid }) {
    const id = useId();

    return (
        <label
            htmlFor={id}
            className={`flex cursor-pointer items-start gap-3.5 border p-4 transition-colors duration-500 ${
                invalid
                    ? 'border-crimson/50'
                    : checked
                      ? 'border-brass/40 bg-brass/[0.06]'
                      : 'border-ink/10 hover:border-ink/25'
            }`}
        >
            <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={(event) => onChange(event.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-brass"
            />
            <span className="text-xs leading-relaxed text-ink-soft">{children}</span>
        </label>
    );
}

/**
 * FileDrop — click-to-browse tile with an inline preview.
 *
 * `label` element wrapping a hidden input is the standard trick for a styled
 * file picker that still works with the keyboard.
 *
 * Callers own the object URL lifecycle (see the modal's cleanup effect):
 * `URL.createObjectURL` leaks the blob until it is revoked, which on a 500MB
 * video is not a rounding error.
 */
export function FileDrop({
    accept,
    onSelect,
    previewUrl,
    fileName,
    hint,
    invalid,
    kind = 'image',
    emptyLabel,
}) {
    return (
        <label
            className={`flex h-36 cursor-pointer flex-col items-center justify-center overflow-hidden border border-dashed transition-colors duration-500 ${
                invalid
                    ? 'border-crimson/60'
                    : previewUrl || fileName
                      ? 'border-brass/45 bg-brass/[0.04]'
                      : 'border-ink/20 hover:border-brass/50'
            }`}
        >
            {kind === 'image' && previewUrl ? (
                <img
                    src={previewUrl}
                    alt=""
                    className="h-full w-full object-cover"
                />
            ) : fileName ? (
                <div className="px-5 text-center">
                    <svg
                        className="mx-auto h-6 w-6 text-brass"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    {/* Long filenames must not push the tile wider than the panel. */}
                    <p className="mt-2.5 max-w-[16rem] truncate text-xs text-ink">
                        {fileName}
                    </p>
                </div>
            ) : (
                <div className="px-5 text-center">
                    <svg
                        className="mx-auto h-7 w-7 text-ink-mute"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 16.5V9m0 0L9 12m3-3 3 3M6.75 19.5a4.5 4.5 0 0 1-.53-8.97 5.25 5.25 0 0 1 10.23-2.06 4.5 4.5 0 0 1 .55 8.03"
                        />
                    </svg>
                    <p className="caps mt-3 text-[9px] text-ink-soft">{emptyLabel}</p>
                    {hint && <p className="mt-2 text-[10px] text-ink-mute">{hint}</p>}
                </div>
            )}

            <input
                type="file"
                accept={accept}
                onChange={(event) => onSelect(event.target.files?.[0] ?? null)}
                className="hidden"
            />
        </label>
    );
}
