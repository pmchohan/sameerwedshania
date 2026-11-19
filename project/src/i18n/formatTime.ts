import type { Lang } from '@/config/types';

// shortcut: Urdu day-period words are a draft, need a native reader's review before launch.
function urduPeriod(hour: number): string {
  if (hour >= 4 && hour < 12) return 'صبح';
  if (hour >= 12 && hour < 16) return 'دوپہر';
  if (hour >= 16 && hour < 20) return 'شام';
  return 'رات';
}

/** "19:00" becomes "7:00 PM" in English and "شام 7 بجے" in Urdu (hours only if minute is 0). */
export function formatTime(hhmm: string, lang: Lang): string {
  const [hour, minute] = hhmm.split(':').map(Number) as [number, number];
  const h12 = hour % 12 === 0 ? 12 : hour % 12;

  if (lang === 'en') {
    const clock = `${h12}:${String(minute).padStart(2, '0')}`;
    return `${clock} ${hour < 12 ? 'AM' : 'PM'}`;
  }

  const urduClock = minute === 0 ? `${h12}` : `${h12}:${String(minute).padStart(2, '0')}`;
  return `${urduPeriod(hour)} ${urduClock} بجے`;
}
