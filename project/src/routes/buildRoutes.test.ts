import { describe, expect, it } from 'vitest';
import { guests } from '@/config/invitation.config';
import { buildRoutes } from './buildRoutes';

describe('buildRoutes', () => {
  it('has the code screen at / and one route per guest', () => {
    const routes = buildRoutes(guests);
    expect(routes[0]).toEqual({ path: '/', page: 'codeEntry' });
    expect(routes.slice(1).map((r) => r.path)).toEqual(guests.map((g) => `/${g.code}`));
    expect(routes).toHaveLength(guests.length + 1);
  });

  it('lowercases paths and keeps the guest code', () => {
    const routes = buildRoutes([{ code: 'AchunP', name: 'Ali', events: ['walima'] }]);
    expect(routes[1]).toEqual({ path: '/achunp', page: 'invitation', code: 'AchunP' });
  });
});
