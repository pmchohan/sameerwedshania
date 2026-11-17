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
  { x: 7, dx: -13, r: -7, delay: 0, flowers: 5 },
  { x: 16, dx: -10, r: -5, delay: 60, flowers: 6 },
  { x: 25, dx: -7, r: -3, delay: 120, flowers: 5 },
  { x: 34, dx: -4, r: -2, delay: 180, flowers: 6 },
  { x: 43, dx: -2, r: -1, delay: 240, flowers: 5 },
  { x: 57, dx: 2, r: 1, delay: 240, flowers: 5 },
  { x: 66, dx: 4, r: 2, delay: 180, flowers: 6 },
  { x: 75, dx: 7, r: 3, delay: 120, flowers: 5 },
  { x: 84, dx: 10, r: 5, delay: 60, flowers: 6 },
  { x: 93, dx: 13, r: 7, delay: 0, flowers: 5 },
];

/** The opening: a veil of mogra strands parts from a central jasmine knot. */
export function SehraHero({ guest, phase, onOpen }: SehraHeroProps) {
  const { t, s: text } = useLang();
  const built = phase !== 'closed';
  const names = { groom: t(couple.groom), bride: t(couple.bride) };

  return (
    <section className={s.hero} data-light="night" data-built={built} onClick={built ? undefined : onOpen}>
      <p className={s.bismillah} lang="ar" dir="rtl">
        بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
      </p>

      <div className={s.sehra}>
        <svg className={s.moon} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
          <path d="M68 10 A40 40 0 1 0 68 90 A32 32 0 1 1 68 10Z" />
        </svg>

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
                } as CSSProperties
              }
            >
              {Array.from({ length: strand.flowers }, (_, flower) => (
                <span key={flower} className={s.bead}>
                  <svg className={s.flower} viewBox="0 0 24 24">
                    <use href="#mogra-flower" />
                  </svg>
                  {flower % 2 === 0 && (
                    <svg className={s.leaf} viewBox="0 0 24 12" style={{ '--tilt': `${index % 2 === 0 ? -22 : 22}deg` } as CSSProperties}>
                      <use href="#mogra-leaf" />
                    </svg>
                  )}
                </span>
              ))}
            </span>
          ))}
        </div>

        <div className={s.namesWrap}>
          <h1 className={s.names}>
            <span className={s.name}>{names.groom}</span>
            <span className={s.and}>{text('and')}</span>
            <span className={s.name}>{names.bride}</span>
          </h1>
        </div>

        <button type="button" className={s.knot} onClick={onOpen} disabled={built} aria-label={text('tapToOpen')}>
          <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
            <use href="#mogra-flower" x="2" y="4" width="26" height="26" />
            <use href="#mogra-flower" x="34" y="4" width="26" height="26" />
            <use href="#mogra-flower" x="18" y="20" width="28" height="28" />
            <use href="#mogra-flower" x="2" y="34" width="24" height="24" />
            <use href="#mogra-flower" x="36" y="34" width="24" height="24" />
          </svg>
        </button>
      </div>

      <div className={s.below}>
        <p className={s.tap} aria-hidden="true">
          {text('tapToOpen')}
        </p>
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

      <ScrollCue active={phase === 'open'} />
    </section>
  );
}
