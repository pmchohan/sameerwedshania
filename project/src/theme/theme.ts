export type Theme = 'darwaza' | 'kashi' | 'sehra' | 'standard';

const STORAGE_KEY = 'invitation-theme';

const THEME_COLOR: Record<Theme, string> = {
  darwaza: '#120a2b',
  kashi: '#061638',
  sehra: '#031713',
  standard: '#052e25',
};

/** How long the opening takes before the page starts to scroll, per theme (ms). */
export const OPEN_MS: Record<Theme, number> = { darwaza: 3800, kashi: 2800, sehra: 2800, standard: 2800 };

export function parseTheme(value: string | null | undefined): Theme | undefined {
  if (value === 'darwaza' || value === 'door') return 'darwaza';
  if (value === 'kashi' || value === 'sehra' || value === 'standard') return value;
  if (value === 'sehra-of-mogra') return 'sehra';
  if (value === 'category-standard') return 'standard';
  return undefined;
}

const readStoredTheme = (): string | null => {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

const storeTheme = (theme: Theme) => {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, theme);
  } catch {
    return;
  }
};

export function readTheme(): Theme {
  const query = parseTheme(new URLSearchParams(window.location.search).get('theme'));
  const stored = parseTheme(readStoredTheme());
  const theme = query ?? stored ?? 'darwaza';
  storeTheme(theme);
  return theme;
}

export function applyTheme(theme: Theme = readTheme()) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme]);
}

export function useTheme(): Theme {
  return (document.documentElement.dataset.theme as Theme | undefined) ?? 'darwaza';
}
