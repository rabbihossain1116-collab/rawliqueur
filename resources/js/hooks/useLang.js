import { useSyncExternalStore, useCallback } from 'react';

/**
 * Language store — Bangla is the default, English is the opt-in.
 *
 * This is a module-level store rather than page-level `useState` because the
 * toggle lives in the Header while the copy lives in a dozen unrelated
 * components. Passing `lang` down from each page meant every new page had to
 * re-implement the same localStorage dance, and any component not on the prop
 * chain simply could not read it.
 *
 * `useSyncExternalStore` is used instead of Context so components can subscribe
 * without a provider, and so we get a correct hydration snapshot for free.
 */

const STORAGE_KEY = 'rl_lang';
const VALID = new Set(['bn', 'en']);

/** Bangla by default — see project brief: the site is Bengali first. */
const DEFAULT_LANG = 'bn';

let current = DEFAULT_LANG;
let hydrated = false;

const listeners = new Set();

/**
 * Read the persisted choice once, lazily.
 *
 * Deferred rather than done at module scope so this file stays importable in a
 * non-browser context (SSR, tests) without touching `window`.
 */
function hydrate() {
    if (hydrated || typeof window === 'undefined') return;
    hydrated = true;

    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (VALID.has(stored)) current = stored;
    } catch {
        // Private mode / disabled storage — the default is a fine outcome.
    }

    document.documentElement.lang = current;
}

function subscribe(listener) {
    hydrate();
    listeners.add(listener);

    // Keep tabs in sync. `storage` only fires in *other* tabs, so there is no
    // risk of this echoing our own write back at us.
    const onStorage = (event) => {
        if (event.key !== STORAGE_KEY || !VALID.has(event.newValue)) return;
        current = event.newValue;
        listeners.forEach((notify) => notify());
    };

    window.addEventListener('storage', onStorage);

    return () => {
        listeners.delete(listener);
        window.removeEventListener('storage', onStorage);
    };
}

function getSnapshot() {
    hydrate();
    return current;
}

/** The server has no stored preference, so it always renders Bangla. */
function getServerSnapshot() {
    return DEFAULT_LANG;
}

export function setLang(next) {
    if (!VALID.has(next) || next === current) return;
    current = next;

    try {
        window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
        // Non-fatal: the choice just will not survive a reload.
    }

    // Blade stamps the app locale onto <html lang>; keep it honest so screen
    // readers and hyphenation follow what is actually on screen.
    document.documentElement.lang = next;

    listeners.forEach((notify) => notify());
}

/**
 * @returns {{
 *   lang: 'bn' | 'en',
 *   isBn: boolean,
 *   setLang: (next: 'bn' | 'en') => void,
 *   toggle: () => void,
 *   t: <T>(bn: T, en: T) => T,
 * }}
 */
export function useLang() {
    const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    const toggle = useCallback(() => {
        setLang(current === 'bn' ? 'en' : 'bn');
    }, []);

    /**
     * Inline translation helper. Bangla first, matching the site's priority —
     * `t('বাংলা', 'English')`.
     */
    const t = useCallback((bn, en) => (lang === 'bn' ? bn : en), [lang]);

    return { lang, isBn: lang === 'bn', setLang, toggle, t };
}
