import { useState } from 'react';
import type { Lang } from '@/config/types';
import { LANGUAGE_NAME } from '@/i18n/strings';
import { useLang } from '@/i18n/useLang';
import s from './LanguageToggle.module.css';

/** One quiet button labelled with the language you can switch to, written in that language. */
export function LanguageToggle() {
  const { lang, setLang, s: text } = useLang();
  const [busy, setBusy] = useState(false);
  const other: Lang = lang === 'en' ? 'ur' : 'en';

  const onClick = async () => {
    if (busy) return;
    setBusy(true);
    await setLang(other);
    setBusy(false);
  };

  return (
    <button type="button" className={s.toggle} lang={other} aria-label={text('switchLanguage')} onClick={onClick}>
      {LANGUAGE_NAME[other]}
    </button>
  );
}
