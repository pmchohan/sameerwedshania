import { afterEach, describe, expect, it, vi } from 'vitest';
import { formatDate } from './formatDate';
import { formatTime } from './formatTime';

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('formatDate', () => {
  it('gives English parts', () => {
    expect(formatDate('2026-11-11', 'en')).toMatchObject({ weekday: 'Wednesday', day: '11', month: 'November', year: '2026' });
  });

  it('gives Urdu parts with Latin digits', () => {
    expect(formatDate('2026-11-11', 'ur')).toMatchObject({ weekday: 'بدھ', day: '11', month: 'نومبر', year: '2026' });
  });

  it('never shifts the day with the guest timezone', () => {
    for (const tz of ['Pacific/Kiritimati', 'Pacific/Pago_Pago', 'Asia/Karachi']) {
      vi.stubEnv('TZ', tz);
      expect(formatDate('2026-11-11', 'en').day).toBe('11');
      expect(formatDate('2026-11-11', 'en').weekday).toBe('Wednesday');
    }
  });
});

describe('formatTime', () => {
  it('formats English 12-hour time', () => {
    expect(formatTime('07:00', 'en')).toBe('7:00 AM');
    expect(formatTime('19:00', 'en')).toBe('7:00 PM');
    expect(formatTime('00:30', 'en')).toBe('12:30 AM');
    expect(formatTime('12:00', 'en')).toBe('12:00 PM');
  });

  it('adds the Urdu day-period word', () => {
    expect(formatTime('07:00', 'ur')).toBe('صبح 7:00 بجے');
    expect(formatTime('13:15', 'ur')).toBe('دوپہر 1:15 بجے');
    expect(formatTime('19:00', 'ur')).toBe('شام 7:00 بجے');
    expect(formatTime('21:30', 'ur')).toBe('رات 9:30 بجے');
  });
});
