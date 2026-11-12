export type Light = 'night' | 'dusk' | 'dawn' | 'day';

const RAMPS: Record<1 | 2 | 3, readonly Light[]> = {
  1: ['day'],
  2: ['dawn', 'day'],
  3: ['dusk', 'dawn', 'day'],
};

/** Ground for the nth event panel. The page runs from the night hero toward day, so the last panel is always day. */
export function lightFor(index: number, count: number): Light {
  const ramp = RAMPS[Math.min(Math.max(count, 1), 3) as 1 | 2 | 3];
  return ramp[index] ?? 'day';
}
