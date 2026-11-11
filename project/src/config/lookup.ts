import type { EventKey, Guest, WeddingEvent } from './types';
import { EVENT_ORDER } from './types';

export interface VisibleEvent {
  key: EventKey;
  event: WeddingEvent;
}

/** Trim, drop inner spaces, lowercase: "  AchunP " matches "achunp". */
export function normalizeCode(raw: string): string {
  return raw.replace(/\s+/g, '').toLowerCase();
}

export function findGuest(raw: string, guests: readonly Guest[]): Guest | undefined {
  const code = normalizeCode(raw);
  return code === '' ? undefined : guests.find((guest) => guest.code === code);
}

/** Only the guest's own events, in fixed order (Mehndi, Barat, Walima). */
export function visibleEvents(guest: Guest, events: Record<EventKey, WeddingEvent>): VisibleEvent[] {
  return EVENT_ORDER.filter((key) => guest.events.includes(key)).map((key) => ({ key, event: events[key] }));
}
