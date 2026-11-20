import { Invitation, CreateInvitationInput, WeddingSettings } from './types';

const DEFAULT_API = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';
const DEFAULT_CARD_BASE = 'https://pmchohan.github.io/sameerwedshania';

export function getApiBase(): string {
  return localStorage.getItem('wedding_api_url') || DEFAULT_API;
}

export function setApiBase(url: string) {
  localStorage.setItem('wedding_api_url', url.replace(/\/+$/, ''));
}

export function getCardBaseUrl(): string {
  return localStorage.getItem('wedding_card_base_url') || DEFAULT_CARD_BASE;
}

export function setCardBaseUrl(url: string) {
  localStorage.setItem('wedding_card_base_url', url.replace(/\/+$/, ''));
}

async function fetchJson<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const base = getApiBase();
  const url = `${base}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    let msg = `API request failed with status ${res.status}`;
    try {
      const err = await res.json();
      if (err.message) msg = Array.isArray(err.message) ? err.message.join(', ') : err.message;
    } catch {}
    throw new Error(msg);
  }

  return res.json();
}

export async function fetchInvitations(search?: string, event?: string): Promise<Invitation[]> {
  const params = new URLSearchParams();
  if (search && search.trim()) params.append('q', search.trim());
  if (event && event.trim()) params.append('event', event.trim());

  const qs = params.toString() ? `?${params.toString()}` : '';
  const res = await fetchJson<{ success: boolean; data: Invitation[] }>(`/admin/invitations${qs}`);
  return res.data;
}

export async function fetchInvitation(id: number): Promise<Invitation> {
  const res = await fetchJson<{ success: boolean; data: Invitation }>(`/admin/invitations/${id}`);
  return res.data;
}

export async function createInvitation(input: CreateInvitationInput): Promise<Invitation> {
  const res = await fetchJson<{ success: boolean; data: Invitation }>(`/admin/invitations`, {
    method: 'POST',
    body: JSON.stringify(input),
  });
  return res.data;
}

export async function updateInvitation(id: number, input: Partial<CreateInvitationInput>): Promise<Invitation> {
  const res = await fetchJson<{ success: boolean; data: Invitation }>(`/admin/invitations/${id}`, {
    method: 'PUT',
    body: JSON.stringify(input),
  });
  return res.data;
}

export async function deleteInvitation(id: number): Promise<void> {
  await fetchJson<{ success: boolean }>(`/admin/invitations/${id}`, {
    method: 'DELETE',
  });
}

export async function fetchSettings(): Promise<WeddingSettings> {
  const res = await fetchJson<{ success: boolean; data: WeddingSettings }>(`/wedding-details`);
  return res.data;
}

export async function updateSettings(settings: Partial<WeddingSettings>): Promise<WeddingSettings> {
  const res = await fetchJson<{ success: boolean; data: WeddingSettings }>(`/admin/settings`, {
    method: 'PUT',
    body: JSON.stringify(settings),
  });
  return res.data;
}
