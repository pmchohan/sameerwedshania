export type Lang = 'en' | 'ur';

/** A plain string is shown the same in both languages (proper nouns, TODO placeholders). */
export type Text = string | { readonly en: string; readonly ur: string };

export type EventKey = 'mehndi' | 'barat' | 'walima';

/** Fixed display order of events, whatever order a guest's list uses. */
export const EVENT_ORDER: readonly EventKey[] = ['mehndi', 'barat', 'walima'];

export interface Venue {
  name: Text;
  address: Text;
  /** A Google Maps share link (https). */
  mapUrl: string;
}

export interface WeddingEvent {
  title: Text;
  /** YYYY-MM-DD */
  date: string;
  /** HH:mm, 24h */
  time: string;
  venue: Venue;
  dressCode?: Text;
  note?: Text;
}

export interface Guest {
  /** URL path: lowercase letters, numbers and dashes, unique. */
  code: string;
  name: Text;
  events: readonly EventKey[];
  note?: Text;
  /** Default language for this guest. */
  lang?: Lang;
}

export interface Couple {
  groom: Text;
  bride: Text;
}

export interface InvitationConfig {
  couple: Couple;
  events: Record<EventKey, WeddingEvent>;
  guests: readonly Guest[];
}
