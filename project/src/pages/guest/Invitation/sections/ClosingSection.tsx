import { Reveal } from '@/components/motion/Reveal';
import { RoseDivider } from '@/components/ornaments/RoseDivider';
import { ThemeOrnament } from '@/components/ornaments/ThemeOrnament';
import { couple } from '@/config/invitation.config';
import { useLang } from '@/i18n/useLang';
import s from './ClosingSection.module.css';

/** The close: wedding dua, thank-you, botanical rose divider, and grand couple signature. */
export default function ClosingSection() {
  const { t, s: text } = useLang();

  return (
    <section className={s.closing} data-light="night">
      <ThemeOrnament />
      <div className={s.body}>
        <Reveal>
          <p className={s.eyebrow}>{text('thankYou')}</p>
        </Reveal>

        <Reveal delay={100}>
          <div className={s.duaBlock}>
            <p className={s.duaArabic} lang="ar" dir="rtl">
              {text('duaArabic')}
            </p>
            <p className={s.duaTranslation}>
              &ldquo;{text('duaTranslation')}&rdquo;
            </p>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <RoseDivider width="clamp(12rem, 55vw, 18rem)" />
        </Reveal>

        <Reveal delay={240}>
          <p className={s.closingNote}>{text('closingNote')}</p>
        </Reveal>

        <Reveal delay={300}>
          <div className={s.signatureBlock}>
            <p className={s.names}>
              {t(couple.groom)} <span className={s.and}>{text('and')}</span> {t(couple.bride)}
            </p>
          </div>
        </Reveal>

        <p className={s.attribution} dir="ltr">
          inspired heavily by{' '}
          <a href="https://bulaava.pk" target="_blank" rel="noopener noreferrer">
            bulaava.pk
          </a>{' '}
          (deswork)
        </p>
      </div>
    </section>
  );
}
