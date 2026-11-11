import { describe, expect, it } from 'vitest';
import { guests } from './invitation.config';
import { findGuest, normalizeCode, visibleEvents } from './lookup';
import { EVENT_ORDER, type EventKey, type WeddingEvent } from './types';

// Distinct text per event, so a leak is easy to spot (the real config has shared TODO placeholders).
const make = (name: string, date: string, ur: string): WeddingEvent => ({
  title: { en: name, ur },
  date,
  time: '19:00',
  venue: { name: { en: `${name} Hall`, ur: `${ur} ہال` }, address: `${name} Road`, mapUrl: `https://maps.example/${name}` },
});
const fixtures: Record<EventKey, WeddingEvent> = {
  mehndi: make('Mehndi', '2099-01-01', 'مہندی'),
  barat: make('Barat', '2099-01-02', 'بارات'),
  walima: make('Walima', '2099-01-03', 'ولیمہ'),
};

describe('normalizeCode', () => {
  it('trims, drops inner spaces and lowercases', () => {
    expect(normalizeCode('  AchunP ')).toBe('achunp');
    expect(normalizeCode('ach unp')).toBe('achunp');
  });
});

describe('findGuest', () => {
  it('finds a guest from messy input', () => {
    expect(findGuest(' ACHUNP', guests)?.code).toBe('achunp');
  });
  it('returns nothing for empty or unknown codes', () => {
    expect(findGuest('', guests)).toBeUndefined();
    expect(findGuest('   ', guests)).toBeUndefined();
    expect(findGuest('nobody', guests)).toBeUndefined();
  });
});

describe('visibleEvents', () => {
  it('uses the fixed order whatever order the guest list has', () => {
    const guest = { code: 'x', name: 'X', events: ['walima', 'mehndi'] } as const;
    expect(visibleEvents(guest, fixtures).map((v) => v.key)).toEqual(['mehndi', 'walima']);
  });

  it.each(guests.map((guest) => [guest.code, guest] as const))('%s sees nothing of events they are not invited to', (_code, guest) => {
    const shown = JSON.stringify(visibleEvents(guest, fixtures));
    for (const key of EVENT_ORDER.filter((k) => !guest.events.includes(k))) {
      const hidden = fixtures[key];
      const secrets = [hidden.title, hidden.date, hidden.venue.name, hidden.venue.address, hidden.venue.mapUrl].flatMap((text) =>
        typeof text === 'string' ? [text] : [text.en, text.ur],
      );
      for (const secret of secrets) expect(shown).not.toContain(secret);
    }
  });
});
