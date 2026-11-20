import { normalizeCode } from '@/config/lookup';
import type { Guest } from '@/config/types';

/** Route data only. App.tsx is the one file that turns this into router objects. */
export type RouteDef = { path: string; page: 'codeEntry' } | { path: string; page: 'invitation'; code: string };

/** `/` asks for a code; every guest in config gets `/<code>`. */
export function buildRoutes(guests: readonly Guest[]): RouteDef[] {
  return [
    { path: '/', page: 'codeEntry' },
    ...guests.map((guest): RouteDef => ({ path: `/${normalizeCode(guest.code)}`, page: 'invitation', code: guest.code })),
  ];
}
