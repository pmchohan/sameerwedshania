import { createContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { couple } from '@/config/invitation.config';
import type { Lang, Text } from '@/config/types';
import { loadUrduFont } from './loadUrduFont';
import { resolveLang } from './resolveLang';
import { fill, STRINGS, type StringKey } from './strings';

const STORAGE_KEY = 'lang';
const FONT_WAIT_MS = 1500;

// In-app browsers can block storage, so every access is guarded.
const readStored = (): string | null => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};
const writeStored = (lang: Lang) => {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // nothing to do: the choice just lasts until the page closes
  }
};

export interface LanguageValue {
  lang: Lang;
  /** Switches language; for Urdu it waits (up to 1.5 s) for the font so text never flashes in the wrong face. */
  setLang: (lang: Lang) => Promise<void>;
  /** Called by the invite guard with the guest's default language. */
  setGuestLang: (lang: Lang | undefined) => void;
  /** Picks the current language from config text. */
  t: (text: Text) => string;
  /** Fixed interface string in the current language. */
  s: (key: StringKey) => string;
}

export const LanguageContext = createContext<LanguageValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [start] = useState(() => ({
    query: new URLSearchParams(window.location.search).get('lang'),
    stored: readStored(),
    browser: navigator.language,
  }));
  const [guestLang, setGuestLang] = useState<Lang | undefined>();
  const [chosen, setChosen] = useState<Lang | undefined>();
  const lang = chosen ?? resolveLang({ ...start, guest: guestLang });

  const value = useMemo<LanguageValue>(
    () => ({
      lang,
      setLang: async (next) => {
        if (next === 'ur') await Promise.race([loadUrduFont(), new Promise((done) => setTimeout(done, FONT_WAIT_MS))]);
        setChosen(next);
        writeStored(next);
      },
      setGuestLang,
      t: (text) => (typeof text === 'string' ? text : text[lang]),
      s: (key) => STRINGS[key][lang],
    }),
    [lang],
  );

  useEffect(() => {
    if (lang === 'ur') void loadUrduFont();
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === 'ur' ? 'rtl' : 'ltr';
    document.title = fill(STRINGS.title[lang], { groom: value.t(couple.groom), bride: value.t(couple.bride) });
  }, [lang, value]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
