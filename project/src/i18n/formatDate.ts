import type { Lang } from '@/config/types';

// Latin digits in Urdu too, so dates stay easy to scan.
const LOCALE: Record<Lang, string> = { en: 'en-GB', ur: 'ur-PK-u-nu-latn' };

/** Parts of a YYYY-MM-DD date. Built in UTC so the guest's timezone can never shift the day. */
export function formatDate(iso: string, lang: Lang) {
  const [y, m, d] = iso.split('-').map(Number) as [number, number, number];
  const date = new Date(Date.UTC(y, m - 1, d));
  const part = (options: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(LOCALE[lang], { timeZone: 'UTC', ...options }).format(date);
  return {
    weekday: part({ weekday: 'long' }),
    day: part({ day: 'numeric' }),
    month: part({ month: 'long' }),
    year: part({ year: 'numeric' }),
    full: part({ weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
  };
}
