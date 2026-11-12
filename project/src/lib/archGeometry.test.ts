import { describe, expect, it } from 'vitest';
import { ARCH_COLS, ARCH_ROWS, ARCH_TILES, INNER_LINE, NICHE_PATH, OUTER_LINE, SPRING, scatterOf } from './archGeometry';

describe('arch geometry', () => {
  it('has exactly one keystone, at the top centre', () => {
    const keys = ARCH_TILES.filter((tile) => tile.role === 'key');
    expect(keys).toHaveLength(1);
    expect(keys[0]).toMatchObject({ col: 5, row: 0, order: 1 });
  });

  it('places every tile once, inside the grid', () => {
    const seen = new Set<string>();
    for (const { col, row } of ARCH_TILES) {
      expect(col).toBeGreaterThanOrEqual(0);
      expect(col).toBeLessThan(ARCH_COLS);
      expect(row).toBeGreaterThanOrEqual(0);
      expect(row).toBeLessThan(ARCH_ROWS);
      seen.add(`${col},${row}`);
    }
    expect(seen.size).toBe(ARCH_TILES.length);
  });

  it('is mirror-symmetric', () => {
    const roles = new Map(ARCH_TILES.map((tile) => [`${tile.col},${tile.row}`, tile.role]));
    for (const tile of ARCH_TILES) expect(roles.get(`${ARCH_COLS - 1 - tile.col},${tile.row}`)).toBe(tile.role);
  });

  it('keeps the frame two tiles thick below the springing line and spandrels above it', () => {
    const wall = ARCH_TILES.filter((tile) => tile.row >= SPRING);
    expect(wall.every((tile) => tile.role === 'frame')).toBe(true);
    expect(wall.filter((tile) => tile.row === ARCH_ROWS - 1)).toHaveLength(4);
    expect(ARCH_TILES.some((tile) => tile.role === 'spandrel')).toBe(true);
  });

  it('lays frame tiles from the base up, keystone last', () => {
    for (const tile of ARCH_TILES.filter((t) => t.role === 'frame')) expect(tile.order).toBeLessThan(1);
  });

  it('builds finite SVG paths', () => {
    for (const path of [OUTER_LINE, INNER_LINE, NICHE_PATH]) expect(path).not.toMatch(/NaN|Infinity/);
  });

  it('scatters the same way every time and stays near the arch', () => {
    for (const tile of ARCH_TILES) {
      expect(scatterOf(tile)).toEqual(scatterOf(tile));
      expect(Math.abs(scatterOf(tile).x)).toBeLessThanOrEqual(3.5);
      expect(Math.abs(scatterOf(tile).y)).toBeLessThanOrEqual(3.5);
    }
  });
});
