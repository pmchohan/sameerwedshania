import type { CSSProperties, ReactNode } from 'react';
import { ARCH_COLS, ARCH_ROWS, ARCH_TILES, INNER_LINE, NICHE_PATH, OUTER_LINE, scatterOf, type ArchTile } from '@/lib/archGeometry';
import s from './Arch.module.css';

interface ArchProps {
  /** False while the tiles are loose; true once the tap has sent them home. */
  built: boolean;
  onOpen: () => void;
  openLabel: string;
  /** What sits inside the niche. */
  children: ReactNode;
}

interface TileView {
  key: string;
  tile: ArchTile;
  motif: 'star' | 'lozenge' | 'leaf';
  glaze: string;
  style: CSSProperties;
}

function viewOf(tile: ArchTile): TileView {
  const { col, row, role } = tile;
  const scatter = scatterOf(tile);
  const style = {
    gridColumn: col + 1,
    gridRow: row + 1,
    '--x': scatter.x,
    '--y': scatter.y,
    '--r': `${scatter.r}deg`,
    '--d': `${Math.round(tile.order * 900)}ms`,
  } as CSSProperties;
  const motif = role === 'spandrel' ? 'leaf' : (col + row) % 3 === 0 ? 'lozenge' : 'star';
  const glaze = (role === 'spandrel' ? s.glazeC : (col + row) % 2 === 0 ? s.glazeA : s.glazeB) ?? '';
  return { key: `${col}-${row}`, tile, motif, glaze, style };
}

// The tiles never change, so their views are built once.
const VIEWS = ARCH_TILES.map(viewOf);

/** The hero arch: loose tiles that lock into a pointed arch when tapped, leaving a niche for the names. */
export function Arch({ built, onOpen, openLabel, children }: ArchProps) {
  return (
    <div className={s.arch} data-state={built ? 'built' : 'loose'} style={{ '--cols': ARCH_COLS, '--rows': ARCH_ROWS } as CSSProperties}>
      <svg className={s.shape} viewBox={`0 0 ${ARCH_COLS} ${ARCH_ROWS}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path className={s.niche} d={NICHE_PATH} />
        <path className={s.line} d={OUTER_LINE} vectorEffect="non-scaling-stroke" />
        <path className={s.line} d={INNER_LINE} vectorEffect="non-scaling-stroke" />
      </svg>

      <div className={s.tiles} dir="ltr">
        {VIEWS.map(({ key, tile, motif, glaze, style }) =>
          tile.role === 'key' ? (
            <button key={key} type="button" className={`${s.tile} ${s.keystone}`} style={style} onClick={onOpen} disabled={built} aria-label={openLabel}>
              <svg viewBox="0 0 40 40" aria-hidden="true" focusable="false">
                <use href="#tile-star" />
              </svg>
            </button>
          ) : (
            <span key={key} className={`${s.tile} ${s[tile.role]} ${glaze}`} style={style} aria-hidden="true">
              <svg viewBox="0 0 40 40" focusable="false">
                <use href={`#tile-${motif}`} />
              </svg>
            </span>
          ),
        )}
      </div>

      <div className={s.content}>{children}</div>
    </div>
  );
}
