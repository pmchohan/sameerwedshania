import type { InvitationConfig, Text } from './types';
import { EVENT_ORDER } from './types';

const CODE = /^[a-z0-9-]+$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;
// Paths the host already serves; a guest code with one of these names would never reach the app.
const RESERVED_CODES = ['assets', 'cname', '404', 'index'];

function validText(text: Text | undefined): boolean {
  if (typeof text === 'string') return text.trim() !== '';
  return text !== undefined && text.en.trim() !== '' && text.ur.trim() !== '';
}

function realDate(value: string): boolean {
  if (!DATE.test(value)) return false;
  const [y, m, d] = value.split('-').map(Number) as [number, number, number];
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
}

function httpsUrl(value: string): boolean {
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}

/** Returns a list of problems; an empty list means the config is usable. */
export function validateConfig(config: InvitationConfig): string[] {
  const errors: string[] = [];
  const need = (ok: boolean, message: string) => {
    if (!ok) errors.push(message);
  };

  need(validText(config.couple.groom) && validText(config.couple.bride), 'couple: groom and bride need text in both languages');

  for (const key of EVENT_ORDER) {
    const event = config.events[key];
    if (!event) {
      errors.push(`event ${key}: missing`);
      continue;
    }
    need(validText(event.title), `event ${key}: title needs text in both languages`);
    need(realDate(event.date), `event ${key}: date must be a real YYYY-MM-DD date`);
    need(TIME.test(event.time), `event ${key}: time must be HH:mm (24h)`);
    need(validText(event.venue.name), `event ${key}: venue name needs text in both languages`);
    need(validText(event.venue.address), `event ${key}: venue address needs text in both languages`);
    need(httpsUrl(event.venue.mapUrl), `event ${key}: mapUrl must be an https link`);
    need(event.dressCode === undefined || validText(event.dressCode), `event ${key}: dressCode needs text in both languages`);
    need(event.note === undefined || validText(event.note), `event ${key}: note needs text in both languages`);
  }

  const seen = new Set<string>();
  for (const guest of config.guests) {
    const label = `guest "${guest.code}"`;
    need(CODE.test(guest.code), `${label}: code must be lowercase letters, numbers and dashes`);
    need(!RESERVED_CODES.includes(guest.code.toLowerCase()), `${label}: code is reserved`);
    need(!seen.has(guest.code.toLowerCase()), `${label}: duplicate code`);
    seen.add(guest.code.toLowerCase());
    need(validText(guest.name), `${label}: name needs text in both languages`);
    need(guest.events.length > 0, `${label}: needs at least one event`);
    for (const key of guest.events) {
      need((EVENT_ORDER as readonly string[]).includes(key), `${label}: unknown event "${key}"`);
    }
    need(guest.note === undefined || validText(guest.note), `${label}: note needs text in both languages`);
    need(guest.lang === undefined || guest.lang === 'en' || guest.lang === 'ur', `${label}: lang must be "en" or "ur"`);
  }

  return errors;
}

export function assertValidConfig(config: InvitationConfig): void {
  const errors = validateConfig(config);
  if (errors.length > 0) throw new Error(`Invalid invitation config:\n- ${errors.join('\n- ')}`);
}
