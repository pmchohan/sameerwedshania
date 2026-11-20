import { describe, expect, it } from 'vitest';
import { parseTheme } from './theme';

describe('parseTheme', () => {
  it('accepts the short and long theme names', () => {
    expect(parseTheme('darwaza')).toBe('darwaza');
    expect(parseTheme('door')).toBe('darwaza');
    expect(parseTheme('kashi')).toBe('kashi');
    expect(parseTheme('sehra')).toBe('sehra');
    expect(parseTheme('sehra-of-mogra')).toBe('sehra');
    expect(parseTheme('standard')).toBe('standard');
    expect(parseTheme('category-standard')).toBe('standard');
  });

  it('ignores unknown and missing values', () => {
    expect(parseTheme('cream')).toBeUndefined();
    expect(parseTheme(null)).toBeUndefined();
  });
});
