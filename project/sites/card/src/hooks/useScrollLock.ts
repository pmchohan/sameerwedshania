import { useEffect } from 'react';

/** Holds the page still (and at the top) while `locked`. The matching rule is in theme/global.css. */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const root = document.documentElement;
    window.scrollTo(0, 0);
    root.dataset.scrollLock = 'true';
    return () => {
      delete root.dataset.scrollLock;
    };
  }, [locked]);
}
