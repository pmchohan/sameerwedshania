import { describe, expect, it } from 'vitest';
import { formatHijriDate } from './hijri';

describe('formatHijriDate', () => {
  it('formats hijri date in English and Urdu without throwing', () => {
    const en = formatHijriDate('2026-12-03', 'en');
    const ur = formatHijriDate('2026-12-03', 'ur');
    expect(en).toBeTruthy();
    expect(ur).toBeTruthy();
    expect(en).toContain('1448');
    expect(ur).toContain('1448');
  });
});
