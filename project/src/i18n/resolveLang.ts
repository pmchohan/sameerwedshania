import type { Lang } from '@/config/types';

export interface LangInputs {
  /** `?lang=` from the link */
  query?: string | null;
  /** the guest's earlier choice, from localStorage */
  stored?: string | null;
  /** `lang` set for this guest in config */
  guest?: Lang;
  /** navigator.language */
  browser?: string;
}

const asLang = (value: string | null | undefined): Lang | undefined => (value === 'en' || value === 'ur' ? value : undefined);

/** First match wins: link, saved choice, guest default, browser language, English. */
export function resolveLang({ query, stored, guest, browser }: LangInputs): Lang {
  return asLang(query) ?? asLang(stored) ?? guest ?? (browser?.toLowerCase().startsWith('ur') ? 'ur' : 'en');
}
