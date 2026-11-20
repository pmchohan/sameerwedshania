import { describe, expect, it } from 'vitest';
import { resolveLang } from './resolveLang';

describe('resolveLang', () => {
  it('follows the order: link, saved choice, guest default, browser, English', () => {
    expect(resolveLang({ query: 'ur', stored: 'en', guest: 'en', browser: 'en-GB' })).toBe('ur');
    expect(resolveLang({ query: null, stored: 'ur', guest: 'en', browser: 'en-GB' })).toBe('ur');
    expect(resolveLang({ stored: null, guest: 'ur', browser: 'en-GB' })).toBe('ur');
    expect(resolveLang({ browser: 'ur-PK' })).toBe('ur');
    expect(resolveLang({ browser: 'en-GB' })).toBe('en');
    expect(resolveLang({})).toBe('en');
  });

  it('ignores values that are not a supported language', () => {
    expect(resolveLang({ query: 'fr', stored: 'xx', guest: 'ur' })).toBe('ur');
  });
});
