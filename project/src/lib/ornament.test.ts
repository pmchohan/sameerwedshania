import { describe, expect, it } from 'vitest';
import { diamondPath, noise, sagLine, scallopBand, starPath } from './ornament';

describe('ornament shapes', () => {
  it('draws a star with two vertices per point, all finite', () => {
    const path = starPath(8, 10, 5);
    expect(path.split(' L')).toHaveLength(16);
    expect(path).not.toMatch(/NaN|Infinity/);
  });

  it('puts a point straight up by default', () => {
    expect(starPath(4, 10, 5, 0, 0)).toMatch(/^M0 -10 /);
  });

  it('rounds the scallop count up so the band always covers the width', () => {
    const path = scallopBand(100, 24, 8);
    expect(path.match(/a12 12/g)).toHaveLength(5);
    expect(path).toContain('H120');
  });

  it('sags by exactly `sag` at the middle and keeps the bulbs inside the line', () => {
    const line = sagLine(0, 0, 100, 0, 20, 5);
    expect(line.bulbs).toHaveLength(5);
    const middle = line.bulbs[2];
    expect(middle?.x).toBe(50);
    expect(middle?.y).toBe(20);
    for (const bulb of line.bulbs) {
      expect(bulb.x).toBeGreaterThan(0);
      expect(bulb.x).toBeLessThan(100);
    }
  });

  it('makes a diamond and repeatable noise', () => {
    expect(diamondPath(10, 10, 4)).toBe('M10 6 L14 10 L10 14 L6 10 Z');
    expect(noise(3)).toBe(noise(3));
    expect(noise(3)).toBeGreaterThanOrEqual(0);
    expect(noise(3)).toBeLessThan(1);
  });
});
