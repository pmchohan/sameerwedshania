import { couple } from '@/config/invitation.config';
import type { Guest } from '@/config/types';
import { fill } from '@/i18n/strings';
import { useLang } from '@/i18n/useLang';
import { ScrollCue } from '../components/ScrollCue';
import type { Phase } from '../phase';
import s from './StandardHero.module.css';

interface StandardHeroProps {
  guest: Guest;
  phase: Phase;
  onOpen: () => void;
}

/** The conventional invitation: a sealed envelope opens into a formal card. */
export function StandardHero({ guest, phase, onOpen }: StandardHeroProps) {
  const { t, s: text } = useLang();
  const built = phase !== 'closed';
  const names = { groom: t(couple.groom), bride: t(couple.bride) };

  return (
    <section className={s.hero} data-light="night" data-built={built} onClick={built ? undefined : onOpen}>
      <p className={s.bismillah} lang="ar" dir="rtl">
        بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
      </p>

      <div className={s.envelope} data-built={built}>
        <div className={s.back} />
        <div className={s.card}>
          <span className={s.monogram}>
            S <span className={s.amp}>&</span> H
          </span>
          <span className={s.rule} />
          <h1 className={s.names}>
            <span>{names.groom}</span>
            <span className={s.and}>{text('and')}</span>
            <span>{names.bride}</span>
          </h1>
          <span className={s.rule} />
        </div>
        <div className={s.pocket} />
        <div className={s.flap} />
        <button type="button" className={s.seal} onClick={onOpen} disabled={built} aria-label={text('tapToOpen')}>
          <span>S</span>
          <span className={s.sealAmp}>&</span>
          <span>H</span>
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
