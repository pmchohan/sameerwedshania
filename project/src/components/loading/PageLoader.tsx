import { useEffect, useState } from 'react';
import { couple } from '@/config/invitation.config';
import { useLang } from '@/i18n/useLang';
import s from './PageLoader.module.css';

interface PageLoaderProps {
  onComplete?: () => void;
}

export function PageLoader({ onComplete }: PageLoaderProps) {
  const { t, lang } = useLang();
  const [progress, setProgress] = useState(15);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isGone, setIsGone] = useState(false);

  useEffect(() => {
    if (import.meta.env.DEV && window.location.hash.startsWith('#open')) {
      setIsLoaded(true);
      setIsGone(true);
      if (onComplete) onComplete();
      return;
    }

    const base = import.meta.env.BASE_URL ?? '/';
    const imagesToPreload = [
      `${base}assets/img/door-left.webp`,
      `${base}assets/img/door-right.webp`,
      `${base}assets/img/courtyard-night.jpg`,
    ];

    let loadedCount = 0;
    const totalItems = imagesToPreload.length + 1; // +1 for fonts

    const updateProgress = () => {
      loadedCount++;
      const pct = Math.min(95, Math.round((loadedCount / totalItems) * 90) + 10);
      setProgress(pct);
    };

    // Preload critical door & hero images
    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = updateProgress;
      img.onerror = updateProgress;
    });

    // Check fonts ready
    if ('fonts' in document) {
      document.fonts.ready.then(updateProgress).catch(updateProgress);
    } else {
      updateProgress();
    }

    // Minimum display time for royal luxury entrance
    const minTimer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setIsLoaded(true);
        if (onComplete) onComplete();
        setTimeout(() => setIsGone(true), 800);
      }, 350);
    }, 1200);

    return () => clearTimeout(minTimer);
  }, [onComplete]);

  if (isGone) return null;

  return (
    <div
      className={s.loader}
      data-loaded={isLoaded}
      aria-hidden={isLoaded}
      role="status"
      aria-label="Loading invitation"
    >
      <div className={s.backdrop} />

      {/* Mughal Concentric Arches */}
      <svg className={s.arches} viewBox="0 0 400 400" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
        <path d="M140 400 V340 A60 60 0 0 1 260 340 V400" className={s.archLine} style={{ '--delay': '0s' } as React.CSSProperties} />
        <path d="M100 400 V330 A100 100 0 0 1 300 330 V400" className={s.archLine} style={{ '--delay': '0.15s' } as React.CSSProperties} />
        <path d="M60 400 V320 A140 140 0 0 1 340 320 V400" className={s.archLine} style={{ '--delay': '0.3s' } as React.CSSProperties} />
      </svg>

      <div className={s.content}>
        <div className={s.monogram}>
          <span>{t(couple.groom).charAt(0)}</span>
          <span className={s.amp}>&</span>
          <span>{t(couple.bride).charAt(0)}</span>
        </div>

        <p className={s.caption}>
          {lang === 'ur' ? 'دعوت نامہ تیار کیا جا رہا ہے...' : 'Loading your invitation...'}
        </p>

        <div className={s.track}>
          <div className={s.bar} style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
