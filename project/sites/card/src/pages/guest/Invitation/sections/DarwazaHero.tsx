import { useRef } from 'react';
import { SoundToggle } from '@/components/controls/SoundToggle';
import { useWeddingContent } from '@/config/WeddingContentContext';
import type { Guest } from '@/config/types';
import { fill } from '@/i18n/strings';
import { useLang } from '@/i18n/useLang';
import { sound } from '@/lib/sound';
import { DarwazaCourtyard } from '../components/DarwazaCourtyard';
import { DarwazaLeaf } from '../components/DarwazaLeaf';
import { ScrollCue } from '../components/ScrollCue';
import type { Phase } from '../phase';
import s from './DarwazaHero.module.css';

interface DarwazaHeroProps {
  guest: Guest;
  phase: Phase;
  onOpen: () => void;
}

/** The opening: a whole peacock-green door swings open onto a lit courtyard. */
export function DarwazaHero({ guest, phase, onOpen }: DarwazaHeroProps) {
  const { couple } = useWeddingContent();
  const { t, s: text } = useLang();
  const opened = useRef(false);
  const built = phase !== 'closed';
  const names = { groom: t(couple.groom), bride: t(couple.bride) };

  const open = () => {
    if (opened.current) return;
    opened.current = true;
    sound.playOpening();
    onOpen();
  };

  return (
    <section className={s.hero} data-light="night" data-built={built} onClick={built ? undefined : open}>
      <div className={s.wall} aria-hidden="true">
        <span className={s.wallArch} />
        <span className={s.wallGlow} />
        <span className={s.stars} />
      </div>

      <p className={s.bismillah} lang="ar" dir="rtl">
        بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
      </p>

      <div className={s.portal} dir="ltr">
        <div className={s.frame} dir="ltr">
          <div className={s.doorway} dir="ltr">
            <DarwazaCourtyard />

            <div className={s.curtain} dir="ltr" aria-hidden="true">
              <span className={s.curtainLeft} />
              <span className={s.curtainRight} />
            </div>

            <div className={s.namesWrap}>
              <span className={s.rule} />
              <h1 className={s.names}>
                <span>{names.groom}</span>
                <span className={s.and}>{text('and')}</span>
                <span>{names.bride}</span>
              </h1>
              <span className={s.rule} />
            </div>

            <div className={s.leafLeft} dir="ltr">
              <DarwazaLeaf side="left" />
            </div>
            <div className={s.leafRight} dir="ltr">
              <DarwazaLeaf side="right" />
            </div>
            <span className={s.seam} aria-hidden="true" />

            <button
              type="button"
              className={s.knocker}
              onClick={(event) => {
                event.stopPropagation();
                open();
              }}
              disabled={built}
              aria-label={text('tapToOpen')}
            >
              <span className={s.knockerLabel}>
                S <span className={s.knockerAmp}>&</span> H
              </span>
              <span className={s.knockerRing} aria-hidden="true" />
            </button>

            <span className={s.threshold} aria-hidden="true" />
          </div>
        </div>
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

      <SoundToggle />
      <ScrollCue active={phase === 'open'} />
    </section>
  );
}
