import { Reveal } from '@/components/motion/Reveal';
import { TileStrip } from '@/components/ornaments/TileStrip';
import { couple } from '@/config/invitation.config';
import { useLang } from '@/i18n/useLang';
import s from './ClosingSection.module.css';

/** The close: night returns, with the couple's names. */
export default function ClosingSection() {
  const { t, s: text } = useLang();
  return (
    <section className={s.closing} data-light="night">
      <TileStrip />
      <div className={s.body}>
        <Reveal>
          <p className={s.line}>{text('closing')}</p>
        </Reveal>
        <Reveal delay={150}>
          <p className={s.names}>
            {t(couple.groom)} <span className={s.and}>{text('and')}</span> {t(couple.bride)}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
