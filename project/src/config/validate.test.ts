import { describe, expect, it } from 'vitest';
import { couple, events, guests } from './invitation.config';
import type { InvitationConfig } from './types';
import { assertValidConfig, validateConfig } from './validate';

const fresh = (): InvitationConfig => structuredClone({ couple, events, guests });
const problem = (config: InvitationConfig) => validateConfig(config).join('\n');

describe('validateConfig', () => {
  it('accepts the shipped config', () => {
    expect(validateConfig(fresh())).toEqual([]);
  });

  it('rejects impossible dates and bad times', () => {
    const config = fresh();
    config.events.walima.date = '2099-02-30';
    config.events.mehndi.time = '24:00';
    expect(problem(config)).toMatch(/walima: date/);
    expect(problem(config)).toMatch(/mehndi: time/);
  });

  it('rejects a map link that is not https', () => {
    const config = fresh();
    config.events.barat.venue.mapUrl = 'http://maps.example/';
    expect(problem(config)).toMatch(/barat: mapUrl/);
  });

  it('rejects text missing its Urdu side', () => {
    const config = fresh();
    config.events.walima.title = { en: 'Walima', ur: ' ' };
    expect(problem(config)).toMatch(/walima: title/);
  });

  it('rejects duplicate, uppercase and reserved guest codes', () => {
    const config = fresh();
    config.guests = [
      { code: 'ali', name: 'Ali', events: ['walima'] },
      { code: 'ali', name: 'Ali 2', events: ['walima'] },
      { code: 'Bad', name: 'Bad', events: ['walima'] },
      { code: 'assets', name: 'Assets', events: ['walima'] },
    ];
    const text = problem(config);
    expect(text).toMatch(/"ali": duplicate/);
    expect(text).toMatch(/"Bad": code must be/);
    expect(text).toMatch(/"assets": code is reserved/);
  });

  it('rejects guests with no events or an unknown event', () => {
    const config = fresh();
    config.guests = [
      { code: 'none', name: 'None', events: [] },
      { code: 'odd', name: 'Odd', events: ['nikkah' as never] },
    ];
    const text = problem(config);
    expect(text).toMatch(/"none": needs at least one event/);
    expect(text).toMatch(/"odd": unknown event/);
  });

  it('assertValidConfig throws with every problem listed', () => {
    const config = fresh();
    config.events.walima.date = 'tomorrow';
    expect(() => assertValidConfig(config)).toThrow(/Invalid invitation config/);
  });
});
