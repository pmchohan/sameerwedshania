let loading: Promise<void> | undefined;

/** Urdu face is heavy, so it loads only when Urdu is chosen or expected. Safe to call many times. */
export function loadUrduFont(): Promise<void> {
  loading ??= import('./nastaliq.css')
    .then(() => document.fonts.load('1em "Noto Nastaliq Urdu"'))
    .then(() => undefined)
    .catch(() => undefined);
  return loading;
}
