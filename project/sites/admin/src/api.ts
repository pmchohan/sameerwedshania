import { Invitation, CreateInvitationInput, WeddingSettings } from './types';

const DEFAULT_API = import.meta.env.VITE_API_URL || 'https://soft-decide-coordinated-manhattan.trycloudflare.com/api';
const DEFAULT_CARD_BASE = 'https://pmchohan.github.io/sameerwedshania';

export function getAuthToken(): string {
  return localStorage.getItem('wedding_admin_token') || '';
}

export function setAuthToken(token: string) {
  localStorage.setItem('wedding_admin_token', token);
}

export function clearAuthToken() {
  localStorage.removeItem('wedding_admin_token');
}

export function isAuthenticated(): boolean {
  return Boolean(getAuthToken());
}

export async function loginAdmin(password: string): Promise<string> {
  const base = getApiBase();
  const url = `${base}/admin/auth/login`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });

  if (!res.ok) {
    let msg = 'Authentication failed';
    try {
      const err = await res.json();
      if (err.message) msg = err.message;
    } catch {}
    throw new Error(msg);
  }

  const data = await res.json();
  if (data.token) {
    setAuthToken(data.token);
    return data.token;
  }
  throw new Error('No token returned');
}

export function getDefaultApiBase(): string {
  return DEFAULT_API;
}

export function resetApiBase() {
  localStorage.removeItem('wedding_api_url');
}

export function getApiBase(): string {
  const custom = localStorage.getItem('wedding_api_url');
  // If stored URL is an outdated trycloudflare tunnel and DEFAULT_API has changed, clean it up
  if (custom && custom.includes('trycloudflare.com') && DEFAULT_API.includes('trycloudflare.com') && custom !== DEFAULT_API) {
    localStorage.removeItem('wedding_api_url');
    return DEFAULT_API;
  }
  return custom || DEFAULT_API;
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

export function getGroqApiKey(): string {
  return localStorage.getItem('wedding_groq_api_key') || '';
}

export function setGroqApiKey(key: string) {
  if (key) {
    localStorage.setItem('wedding_groq_api_key', key.trim());
  } else {
    localStorage.removeItem('wedding_groq_api_key');
  }
}

export function getShareBaseUrl(code: string, lang?: 'en' | 'ur', version?: string): string {
  const base = getApiBase();
  const langParam = lang === 'ur' ? '?lang=ur' : '';
  const vParam = version ? `${langParam ? '&' : '?'}v=${encodeURIComponent(version)}` : '';
  return `${base}/share/${code}${langParam}${vParam}`;
}

export interface UrduAssistResult {
  text: string;
  model: string;
  downgraded: boolean;
  warning?: string | null;
}

export async function fetchUrduAssist(
  english?: string,
  urduOrRoman?: string,
  field?: string,
): Promise<UrduAssistResult> {
  const groqKey = getGroqApiKey();
  const headers: Record<string, string> = {};
  if (groqKey) {
    headers['x-groq-api-key'] = groqKey;
  }

  const res = await fetchJson<{
    success: boolean;
    text: string;
    model: string;
    downgraded: boolean;
    warning?: string | null;
  }>(`/admin/ai/urdu-assist`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ english, urduOrRoman, field, groqApiKey: groqKey || undefined }),
  });

  return {
    text: res.text,
    model: res.model,
    downgraded: res.downgraded,
    warning: res.warning,
  };
}

async function fetchJson<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const base = getApiBase();
  const url = `${base}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options?.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (res.status === 401) {
    clearAuthToken();
    window.dispatchEvent(new Event('admin:unauthorized'));
    throw new Error('Session expired or unauthorized. Please log in.');
  }

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
