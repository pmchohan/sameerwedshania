import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import s from './Reveal.module.css';

interface RevealProps {
  children: ReactNode;
  /** Milliseconds to wait once it scrolls into view, for stagger. */
  delay?: number;
}

/** Fades and lifts its content in once, the first time it scrolls into view. */
export function Reveal({ children, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={seen ? `${s.root} ${s.seen}` : s.root} style={{ '--delay': `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  );
}
