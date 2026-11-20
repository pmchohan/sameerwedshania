import type { CSSProperties } from 'react';
import { couple } from '@/config/invitation.config';
import type { Guest } from '@/config/types';
import { fill } from '@/i18n/strings';
import { useLang } from '@/i18n/useLang';
import { ScrollCue } from '../components/ScrollCue';
import type { Phase } from '../phase';
import s from './SehraHero.module.css';

interface SehraHeroProps {
  guest: Guest;
  phase: Phase;
  onOpen: () => void;
}

const STRANDS = [
  // Left side: sweeps left and rotates outward
  { x: 5, dx: -45, r: -24, delay: 0, items: 9 },
  { x: 12, dx: -40, r: -20, delay: 40, items: 10 },
  { x: 20, dx: -35, r: -16, delay: 80, items: 9 },
  { x: 28, dx: -30, r: -12, delay: 120, items: 10 },
  { x: 36, dx: -24, r: -8, delay: 160, items: 9 },
  { x: 44, dx: -18, r: -4, delay: 200, items: 10 },
  // Right side: sweeps right and rotates outward
  { x: 56, dx: 18, r: 4, delay: 200, items: 10 },
  { x: 64, dx: 24, r: 8, delay: 160, items: 9 },
  { x: 72, dx: 30, r: 12, delay: 120, items: 10 },
  { x: 80, dx: 35, r: 16, delay: 80, items: 9 },
  { x: 88, dx: 40, r: 20, delay: 40, items: 10 },
  { x: 95, dx: 45, r: 24, delay: 0, items: 9 },
];

const PETALS = [
  { left: 14, delay: 0.2, duration: 6.5, size: 16 },
  { left: 32, delay: 0.8, duration: 7.2, size: 14 },
  { left: 52, delay: 0.4, duration: 6.8, size: 18 },
  { left: 74, delay: 1.1, duration: 7.5, size: 15 },
  { left: 88, delay: 0.6, duration: 7.0, size: 16 },
];

/**
 * Royal Jasmine Parda / Sehra Opening Experience:
 * Full-screen curtain of fragrant white Motia blossoms, pearls, and gold cords
 * parted from a central royal Mughal jeweled brooch.
 */
export function SehraHero({ guest, phase, onOpen }: SehraHeroProps) {
  const { t, s: text } = useLang();
  const built = phase !== 'closed';
  const names = { groom: t(couple.groom), bride: t(couple.bride) };

  return (
    <section className={s.hero} data-light="night" data-built={built} onClick={built ? undefined : onOpen}>
      {/* 1. TOP VALANCE & BISMILLAH */}
      <div className={s.topBar}>
        <svg className={s.toran} viewBox="0 0 400 50" fill="none" preserveAspectRatio="none" aria-hidden="true">
          {/* Top Gold Rail */}
          <line x1="0" y1="2" x2="400" y2="2" stroke="#f7d978" strokeWidth="2" />
          <line x1="0" y1="5" x2="400" y2="5" stroke="rgba(247, 217, 120, 0.4)" strokeWidth="0.8" strokeDasharray="3 4" />

          {/* 7 Scalloped Drops */}
          {Array.from({ length: 7 }, (_, i) => {
            const cx = 28.5 + i * 57;
            return (
              <g key={i}>
                <path
                  d={`M ${cx - 28.5} 5 Q ${cx} 32 ${cx + 28.5} 5`}
                  stroke="rgba(247, 217, 120, 0.65)"
                  strokeWidth="1.2"
                  fill="none"
                />
                <circle cx={cx} cy="30" r="2.2" fill="#f7d978" />
                <circle cx={cx} cy="36" r="1.8" fill="#f5fff9" />
              </g>
            );
          })}
        </svg>

        <p className={s.bismillah} lang="ar" dir="rtl">
          بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
        </p>
      </div>

      {/* 2. CASCADING SEHRA VEIL */}
      <div className={s.veil} dir="ltr" aria-hidden="true">
        {STRANDS.map((strand, index) => (
          <span
            key={strand.x}
            className={s.strand}
            style={
              {
                '--x': `${strand.x}%`,
                '--dx': `${strand.dx}vw`,
                '--r': `${strand.r}deg`,
                '--delay': `${strand.delay}ms`,
                '--sway-delay': `${index * 250}ms`,
              } as CSSProperties
            }
          >
            {Array.from({ length: strand.items }, (_, itemIndex) => {
              const isFlower = itemIndex % 2 === 0;
              return (
                <span key={itemIndex} className={s.bead}>
                  {isFlower ? (
                    <>
                      <svg className={s.flower} viewBox="0 0 24 24">
                        <use href="#mogra-flower" />
                      </svg>
                      {itemIndex % 4 === 0 && (
                        <svg
                          className={s.leaf}
                          viewBox="0 0 24 12"
                          style={{ '--tilt': `${index % 2 === 0 ? -26 : 26}deg` } as CSSProperties}
                        >
                          <use href="#mogra-leaf" />
                        </svg>
                      )}
                    </>
                  ) : (
                    <svg className={s.pearl} viewBox="0 0 16 16">
                      <use href="#pearl-bead" />
                    </svg>
                  )}
                </span>
              );
            })}
          </span>
        ))}
      </div>

      {/* 3. FLOATING PETALS (DRIFT WHEN OPEN) */}
      {built && (
        <div className={s.petalsContainer} aria-hidden="true">
          {PETALS.map((petal, i) => (
            <svg
              key={i}
              className={s.petal}
              viewBox="0 0 24 24"
              style={
                {
                  left: `${petal.left}%`,
                  width: `${petal.size}px`,
                  height: `${petal.size}px`,
                  animationDelay: `${petal.delay}s`,
                  animationDuration: `${petal.duration}s`,
                } as CSSProperties
              }
            >
              <use href="#mogra-flower" />
            </svg>
          ))}
        </div>
      )}

      {/* 4. CENTRAL ROYAL BROOCH (UNVEILING KNOT) */}
      <button
        type="button"
        className={s.brooch}
        onClick={onOpen}
        disabled={built}
        aria-label={text('tapToOpen')}
      >
        <svg viewBox="0 0 80 92" className={s.broochSvg} aria-hidden="true" focusable="false">
          <use href="#sehra-brooch" />
        </svg>
      </button>

      {/* 5. TAP TO OPEN PROMPT */}
      <div className={s.tapWrap} aria-hidden="true">
        <p className={s.tap}>{text('tapToOpen')}</p>
        <svg className={s.tapIcon} viewBox="0 0 20 20" fill="none">
          <path d="M 10 4 L 10 14 M 6 10 L 10 14 L 14 10" stroke="#f7d978" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* 6. REVEALED ROYAL COURTYARD: COUPLE & DEDICATION */}
      <div className={s.revealedWrap}>
        <div className={s.namesBox}>
          <svg className={s.archFloral} viewBox="0 0 320 60" fill="none" aria-hidden="true">
            <path d="M 20 50 Q 160 5 300 50" stroke="rgba(247, 217, 120, 0.45)" strokeWidth="1.2" fill="none" />
            <circle cx="160" cy="18" r="3.2" fill="#f7d978" />
            <path d="M 160 8 Q 164 13 160 18 Q 156 13 160 8 Z" fill="#f5fff9" />
          </svg>

          <h1 className={s.names}>
            <span className={s.name}>{names.groom}</span>
            <span className={s.and}>{text('and')}</span>
            <span className={s.name}>{names.bride}</span>
          </h1>

          <div className={s.flourishRow} aria-hidden="true">
            <span className={s.flourishLine} />
            <svg viewBox="0 0 24 24" className={s.flourishFlower}>
              <use href="#mogra-flower" />
            </svg>
            <span className={s.flourishLine} />
          </div>
        </div>

        <div className={s.welcome}>
          <p className={s.guestLine}>
            <span>{text('invitationFor')}</span>{' '}
            <span className={s.guest}>
              <bdi>{t(guest.name)}</bdi>
            </span>
          </p>
          <p className={s.line}>{fill(text('inviteLine'), names)}</p>
          {guest.note && <p className={s.line}>{t(guest.note)}</p>}
        </div>
      </div>

      {/* 7. SCROLL CUE */}
      <ScrollCue active={phase === 'open'} />
    </section>
  );
}
