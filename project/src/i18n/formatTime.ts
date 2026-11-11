import type { Lang } from '@/config/types';

// shortcut: Urdu day-period words are a draft, need a native reader's review before launch.
function urduPeriod(hour: number): string {
  if (hour >= 4 && hour < 12) return 'صبح';
  if (hour >= 12 && hour < 16) return 'دوپہر';
  if (hour >= 16 && hour < 20) return 'شام';
  return 'رات';
}

/** "19:00" becomes "7:00 PM" in English and "شام 7:00 بجے" in Urdu. */
export function formatTime(hhmm: string, lang: Lang): string {
  const [hour, minute] = hhmm.split(':').map(Number) as [number, number];
  const clock = `${hour % 12 === 0 ? 12 : hour % 12}:${String(minute).padStart(2, '0')}`;
  return lang === 'en' ? `${clock} ${hour < 12 ? 'AM' : 'PM'}` : `${urduPeriod(hour)} ${clock} بجے`;
}
