// Geometry of the hero arch, in tile units. One square module governs everything:
// the tile grid, both arch curves and the niche all come from these numbers.
export const ARCH_COLS = 11;
export const ARCH_ROWS = 14;
/** The springing line (where the curve starts) sits 4 tile rows above the base. */
export const SPRING = ARCH_ROWS - 4;

const MID = ARCH_COLS / 2;
/** Equilateral pointed arch: the radius equals the span. */
const OUTER_RADIUS = ARCH_COLS;
/** Concentric with the outer curve, so the frame is two tiles thick. */
const INNER_RADIUS = ARCH_COLS - 2;

const round = (n: number) => Math.round(n * 1000) / 1000;
const apexRise = (radius: number) => Math.sqrt(radius * radius - MID * MID);
const halfWidth = (radius: number, rise: number) => Math.sqrt(Math.max(radius * radius - Math.max(rise, 0) ** 2, 0)) - MID;
const isInside = (radius: number, dx: number, rise: number) => rise <= apexRise(radius) && Math.abs(dx) <= halfWidth(radius, rise);

export type TileRole = 'frame' | 'key' | 'spandrel';

export interface ArchTile {
  col: number;
  row: number;
  role: TileRole;
  /** 0 at the base, 1 at the top: the order the tiles are laid. */
  order: number;
}

function buildTiles(): ArchTile[] {
  const tiles: ArchTile[] = [];
  for (let row = 0; row < ARCH_ROWS; row++) {
    for (let col = 0; col < ARCH_COLS; col++) {
      const dx = col + 0.5 - MID;
      const rise = SPRING - (row + 0.5);
      if (isInside(INNER_RADIUS, dx, rise)) continue; // the niche is one shape, not tiles
      const order = (ARCH_ROWS - 1 - row) / (ARCH_ROWS - 1);
      const inOuter = isInside(OUTER_RADIUS, dx, rise);
      const isKey = inOuter && row === 0 && col === Math.floor(MID);
      tiles.push({ col, row, role: !inOuter ? 'spandrel' : isKey ? 'key' : 'frame', order });
    }
  }
  return tiles;
}

export const ARCH_TILES: readonly ArchTile[] = buildTiles();

const archLine = (radius: number) => {
  const apex = round(SPRING - apexRise(radius));
  return `M${ARCH_COLS - radius} ${ARCH_ROWS} V${SPRING} A${radius} ${radius} 0 0 1 ${MID} ${apex} A${radius} ${radius} 0 0 1 ${radius} ${SPRING} V${ARCH_ROWS}`;
};

export const OUTER_LINE = archLine(OUTER_RADIUS);
export const INNER_LINE = archLine(INNER_RADIUS);
export const NICHE_PATH = `${INNER_LINE} Z`;

// Cheap, repeatable noise so the loose tiles always scatter the same way.
const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/** Where a tile sits before the arch is built: pushed outward from the centre, with a little tumble. Units: tile widths, degrees. */
export function scatterOf({ col, row }: ArchTile) {
  const seed = col * 31 + row * 17;
  const dx = col + 0.5 - MID;
  const dy = row + 0.5 - ARCH_ROWS / 2;
  const length = Math.hypot(dx, dy) || 1;
  const push = 1.2 + hash(seed) * 1.6;
  return {
    x: round((dx / length) * push + (hash(seed + 1) - 0.5) * 1.4),
    y: round((dy / length) * push + (hash(seed + 2) - 0.5) * 1.4),
    r: round((hash(seed + 3) - 0.5) * 60),
  };
}
