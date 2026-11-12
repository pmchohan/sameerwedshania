import { useEffect, useState } from 'react';
import { useLang } from '@/i18n/useLang';
import s from './ScrollCue.module.css';

/** Tells the guest to scroll. Shows once the arch is built and goes away at the first scroll. */
export function ScrollCue({ active }: { active: boolean }) {
  const { s: text } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!active) return;
    const onScroll = () => {
      if (window.scrollY > 24) setScrolled(true);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [active]);

  return (
    <div className={s.cue} data-visible={active && !scrolled} aria-hidden="true">
      <span className={s.label}>{text('scroll')}</span>
      <svg className={s.chevrons} viewBox="0 0 24 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" focusable="false">
        <path d="M4 5 L12 13 L20 5" />
        <path d="M4 14 L12 22 L20 14" />
      </svg>
    </div>
  );
}
