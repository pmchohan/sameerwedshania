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
      `${base}assets/img/courtyard-night.webp`,
    ];

    let loadedCount = 0;
    const totalItems = imagesToPreload.length + 1; // +1 for fonts

    const updateProgress = () => {
      loadedCount++;
      const pct = Math.min(95, Math.round((loadedCount / totalItems) * 90) + 10);
      setProgress(pct);
    };

    // Preload & decode critical images into GPU memory
    const preloadImage = (src: string): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        const markDone = () => {
          updateProgress();
          resolve();
        };
        img
          .decode()
          .then(markDone)
          .catch(() => {
            img.onload = markDone;
            img.onerror = markDone;
          });
      });
    };

    const fontPromise =
      'fonts' in document
        ? document.fonts.ready.then(() => updateProgress()).catch(() => updateProgress())
        : Promise.resolve().then(() => updateProgress());

    const minTimePromise = new Promise((resolve) => setTimeout(resolve, 1100));
    const safetyTimeoutPromise = new Promise((resolve) => setTimeout(resolve, 8000));

    // Wait until ALL images are fully loaded & decoded, fonts are ready,
    // and minimum ceremonial presentation time has elapsed.
    Promise.race([
      Promise.all([
        ...imagesToPreload.map(preloadImage),
        fontPromise,
        minTimePromise,
      ]),
      safetyTimeoutPromise,
    ]).then(() => {
      setProgress(100);
      setTimeout(() => {
        setIsLoaded(true);
        if (onComplete) onComplete();
        setTimeout(() => setIsGone(true), 800);
      }, 350);
    });
  }, [onComplete]);

  if (isGone) return null;

  // Circumference for r = 100 is 2 * PI * 100 = 628.32
  const strokeOffset = 628.32 * (1 - progress / 100);

  return (
    <aside
      className={s.loader}
      data-loaded={isLoaded}
      aria-hidden={isLoaded}
      aria-label="Loading invitation"
    >
      <div className={s.backdrop} />
      <div className={s.ambientGlow} />

      <div className={s.container}>
        {/* Sacred Golden Kashi Khatam Medallion */}
        <div className={s.medallionWrap}>
          <svg
            className={s.medallionSvg}
            viewBox="0 0 240 240"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="loaderGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f7d978" />
                <stop offset="50%" stopColor="#d4af37" />
                <stop offset="100%" stopColor="#aa7c11" />
              </linearGradient>
              <radialGradient id="loaderCoreGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(247, 217, 120, 0.22)" />
                <stop offset="70%" stopColor="rgba(212, 175, 55, 0.08)" />
                <stop offset="100%" stopColor="rgba(4, 14, 38, 0)" />
              </radialGradient>
            </defs>

            {/* Core radial aura */}
            <circle cx="120" cy="120" r="100" fill="url(#loaderCoreGlow)" />

            {/* Circular hairline progress track */}
            <circle
              cx="120"
              cy="120"
              r="100"
              fill="none"
              stroke="rgba(247, 217, 120, 0.12)"
              strokeWidth="1.5"
            />
            <circle
              className={s.progressArc}
              cx="120"
              cy="120"
              r="100"
              fill="none"
              stroke="url(#loaderGoldGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="628.32"
              strokeDashoffset={strokeOffset}
            />

            {/* Beaded celestial ring */}
            <circle
              cx="120"
              cy="120"
              r="92"
              fill="none"
              stroke="rgba(247, 217, 120, 0.35)"
              strokeWidth="1"
              strokeDasharray="2 6"
            />

            {/* Rotating 8-Pointed Mughal Kashi Star */}
            <g className={s.rotatingStar}>
              <path
                d="M 120.0,38.0 L 143.0,64.6 L 178.0,62.0 L 175.4,97.0 L 202.0,120.0 L 175.4,143.0 L 178.0,178.0 L 143.0,175.4 L 120.0,202.0 L 97.0,175.4 L 62.0,178.0 L 64.6,143.0 L 38.0,120.0 L 64.6,97.0 L 62.0,62.0 L 97.0,64.6 Z"
                fill="none"
                stroke="url(#loaderGoldGrad)"
                strokeWidth="1.2"
                opacity="0.85"
              />
              <path
                d="M 120.0,66.0 L 136.1,81.2 L 158.2,81.8 L 158.8,103.9 L 174.0,120.0 L 158.8,136.1 L 158.2,158.2 L 136.1,158.8 L 120.0,174.0 L 103.9,158.8 L 81.8,158.2 L 81.2,136.1 L 66.0,120.0 L 81.2,103.9 L 81.8,81.8 L 103.9,81.2 Z"
                fill="none"
                stroke="rgba(247, 217, 120, 0.45)"
                strokeWidth="0.9"
              />
            </g>

            {/* Inner Sacred Rosette Frame */}
            <circle
              cx="120"
              cy="120"
              r="38"
              fill="rgba(4, 14, 38, 0.75)"
              stroke="url(#loaderGoldGrad)"
              strokeWidth="1"
            />
            <circle
              cx="120"
              cy="120"
              r="34"
              fill="none"
              stroke="rgba(247, 217, 120, 0.3)"
              strokeWidth="0.8"
            />

            {/* Central Calligraphic Monogram S & H */}
            <text
              x="120"
              y="126"
              textAnchor="middle"
              className={s.sealMonogram}
            >
              S❦H
            </text>
          </svg>
        </div>

        {/* Sacred Bismillah Calligraphy */}
        <div className={s.bismillah} aria-label="Bismillah ir-Rahman ir-Rahim">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </div>

        {/* Royal Couple Names */}
        <h1 className={s.coupleNames}>
          <span>{t(couple.groom)}</span>
          <span className={s.andSym}>&amp;</span>
          <span>{t(couple.bride)}</span>
        </h1>

        {/* Delicate Status Caption & Pulsing Gold Motes */}
        <div className={s.statusArea}>
          <p className={s.caption}>
            {lang === 'ur' ? 'دعوت نامہ پیش کیا جا رہا ہے' : 'Preparing Your Invitation'}
          </p>
          <div className={s.dots} aria-hidden="true">
            <span className={s.dot} style={{ '--d': '0s' } as React.CSSProperties} />
            <span className={s.dot} style={{ '--d': '0.2s' } as React.CSSProperties} />
            <span className={s.dot} style={{ '--d': '0.4s' } as React.CSSProperties} />
          </div>
        </div>
      </div>
    </aside>
  );
}
