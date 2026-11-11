// THE file the owner edits: couple, events and guests. Routes are built from `guests`.
// Dates, times and venues below are obvious placeholders (year 2099, "TODO"); replace them.
import type { Couple, EventKey, Guest, WeddingEvent } from './types';

export const couple: Couple = {
  groom: { en: 'Sameer', ur: 'سمیر' },
  bride: { en: 'Hania', ur: 'ہانیہ' },
};

export const events: Record<EventKey, WeddingEvent> = {
  mehndi: {
    title: { en: 'Mehndi', ur: 'مہندی' },
    date: '2099-01-01',
    time: '19:00',
    venue: {
      name: 'TODO: venue name',
      address: 'TODO: full address',
      mapUrl: 'https://maps.google.com/',
    },
    dressCode: 'TODO: dress code',
  },
  barat: {
    title: { en: 'Barat', ur: 'بارات' },
    date: '2099-01-02',
    time: '18:00',
    venue: {
      name: 'TODO: venue name',
      address: 'TODO: full address',
      mapUrl: 'https://maps.google.com/',
    },
  },
  walima: {
    title: { en: 'Walima', ur: 'ولیمہ' },
    date: '2099-01-03',
    time: '19:30',
    venue: {
      name: 'TODO: venue name',
      address: 'TODO: full address',
      mapUrl: 'https://maps.google.com/',
    },
    dressCode: 'TODO: dress code',
  },
};

export const guests: Guest[] = [
  // Owner's example: Ali is invited to the walima only.
  { code: 'achunp', name: { en: 'Ali', ur: 'علی' }, events: ['walima'] },
  // Test guests: remove before launch.
  { code: 'family-test', name: { en: 'The Test Family', ur: 'ٹیسٹ فیملی' }, events: ['mehndi', 'barat', 'walima'] },
  { code: 'friend-test', name: { en: 'Test Friend', ur: 'ٹیسٹ دوست' }, events: ['mehndi', 'barat'], lang: 'ur' },
];
