// Small pure shape-makers for the SVG ornaments. Drawing them from numbers keeps every motif symmetrical and exact.
const round = (n: number) => Math.round(n * 1000) / 1000;

/** An n-pointed star polygon centred on (cx, cy). `rotation` is in degrees; -90 puts a point straight up. */
export function starPath(points: number, outer: number, inner: number, cx = 0, cy = 0, rotation = -90): string {
  const steps = points * 2;
  const vertices = Array.from({ length: steps }, (_, i) => {
    const radius = i % 2 === 0 ? outer : inner;
    const angle = ((rotation + (360 / steps) * i) * Math.PI) / 180;
    return `${round(cx + radius * Math.cos(angle))} ${round(cy + radius * Math.sin(angle))}`;
  });
  return `M${vertices.join(' L')} Z`;
}

/** A diamond centred on (cx, cy). */
export const diamondPath = (cx: number, cy: number, r: number) => `M${cx} ${round(cy - r)} L${round(cx + r)} ${cy} L${cx} ${round(cy + r)} L${round(cx - r)} ${cy} Z`;

/** A filled band whose lower edge is a row of half-circle scallops (the gota-edge look). Spans x 0..width, y -height..size/2. */
export function scallopBand(width: number, size: number, height: number): string {
  const count = Math.ceil(width / size);
  const r = size / 2;
  const span = count * size;
  return `M0 ${-height} H${span} V0 ${Array.from({ length: count }, () => `a${r} ${r} 0 0 1 ${-size} 0`).join(' ')} Z`;
}

/** A strung line that sags `sag` below the straight line between two points, with evenly spaced bulbs along it. */
export function sagLine(x1: number, y1: number, x2: number, y2: number, sag: number, bulbs: number) {
  const cx = (x1 + x2) / 2;
  const cy = (y1 + y2) / 2 + sag * 2; // a quadratic curve dips by half the control offset
  const at = (t: number) => ({
    x: round((1 - t) ** 2 * x1 + 2 * (1 - t) * t * cx + t * t * x2),
    y: round((1 - t) ** 2 * y1 + 2 * (1 - t) * t * cy + t * t * y2),
  });
  return {
    path: `M${x1} ${y1} Q${cx} ${round(cy)} ${x2} ${y2}`,
    bulbs: Array.from({ length: bulbs }, (_, i) => at((i + 1) / (bulbs + 1))),
  };
}

/** Repeatable noise in 0..1, so scattered stars and sparks always fall in the same places. */
export function noise(n: number): number {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}
