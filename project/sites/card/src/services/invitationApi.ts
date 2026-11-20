import { guests } from '@/config/invitation.config';
import { findGuest } from '@/config/lookup';
import type { Guest, EventKey } from '@/config/types';

const FALLBACK_API_URL = 'https://blink-moore-enrollment-deeply.trycloudflare.com/api';

function getApiBase(): string {
  if (typeof window !== 'undefined') {
    const custom = window.localStorage?.getItem('wedding_api_url');
    if (custom) return custom;
  }
  return import.meta.env.VITE_API_URL || FALLBACK_API_URL;
}

export async function resolveGuestByCode(code: string): Promise<Guest | undefined> {
  const normalized = code.trim().toLowerCase();
  const apiBase = getApiBase();

  // 1. If backend API is configured, try fetching live data from MySQL
  if (apiBase) {
    try {
      const url = `${apiBase.replace(/\/+$/, '')}/invitations/${encodeURIComponent(normalized)}`;
      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.invitation) {
          const inv = json.invitation;
          return {
            code: inv.code,
            name: {
              en: inv.name,
              ur: inv.nameUr || inv.name,
            },
            events: (inv.events || ['mehndi', 'barat', 'walima']) as EventKey[],
            note: inv.note
              ? {
                  en: inv.note,
                  ur: inv.noteUr || inv.note,
                }
              : undefined,
          };
        }
      }
    } catch (e) {
      console.warn('Backend API request failed, falling back to local guests config:', e);
    }
  }

  // 2. Fallback to static guests in config
  return findGuest(normalized, guests);
}

export async function fetchLiveWeddingDetails(): Promise<any | undefined> {
  const apiBase = getApiBase();
  if (!apiBase) return undefined;

  try {
    const url = `${apiBase.replace(/\/+$/, '')}/wedding-details`;
    const res = await fetch(url);
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        return json.data;
      }
    }
  } catch (e) {
    console.warn('Backend API request for wedding-details failed, falling back to local config:', e);
  }
  return undefined;
}
