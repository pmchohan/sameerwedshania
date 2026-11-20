import type { Lang } from '@/config/types';

/** Formats a YYYY-MM-DD date into its Islamic Hijri equivalent (e.g. 23 Jumada II, 1448 AH). */
export function formatHijriDate(dateStr: string, lang: Lang): string {
  try {
    const [year, month, day] = dateStr.split('-').map(Number) as [number, number, number];
    const date = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
    const locale = lang === 'ur' ? 'ur-PK-u-ca-islamic-umalqura-nu-latn' : 'en-u-ca-islamic-umalqura';
    
    const formatter = new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    });
    
    return formatter.format(date);
  } catch {
    return '';
  }
}
