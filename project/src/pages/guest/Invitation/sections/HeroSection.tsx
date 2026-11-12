import { couple } from '@/config/invitation.config';
import type { Guest } from '@/config/types';
import { fill } from '@/i18n/strings';
import { useLang } from '@/i18n/useLang';
import { Arch } from '../components/Arch';
import type { Phase } from '../phase';
import s from './HeroSection.module.css';

interface HeroSectionProps {
  guest: Guest;
  phase: Phase;
  onOpen: () => void;
}

/** The first screen: the arch, the couple's names inside it, and the guest's own name beneath. */
export default function HeroSection({ guest, phase, onOpen }: HeroSectionProps) {
  const { t, s: text } = useLang();
  const built = phase !== 'closed';
  const names = { groom: t(couple.groom), bride: t(couple.bride) };

  return (
    // Tapping anywhere starts the build; the keystone button is the keyboard and screen-reader route.
    <section className={s.hero} data-light="night" onClick={built ? undefined : onOpen}>
      <Arch built={built} onOpen={onOpen} openLabel={text('tapToOpen')}>
        <svg className={s.star} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
          <use href="#tile-star" />
        </svg>
        <p className={s.bismillah} lang="ar" dir="rtl">
          بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
        </p>
        <h1 className={s.names}>
          <span className={s.name}>{names.groom}</span>
          <span className={s.and}>{text('and')}</span>
          <span className={s.name}>{names.bride}</span>
        </h1>
      </Arch>

      <div className={s.below}>
        <p className={s.tap} aria-hidden="true">
          {text('tapToOpen')}
        </p>
        <div className={s.welcome}>
          <p className={s.guestLine}>
            <span>{text('invitationFor')}</span> <span className={s.guest}>{t(guest.name)}</span>
          </p>
          <p className={s.line}>{fill(text('inviteLine'), names)}</p>
          {guest.note && <p className={s.line}>{t(guest.note)}</p>}
        </div>
      </div>
    </section>
  );
}
