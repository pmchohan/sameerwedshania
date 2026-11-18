import { Reveal } from '@/components/motion/Reveal';
import { ThemeOrnament } from '@/components/ornaments/ThemeOrnament';
import { couple } from '@/config/invitation.config';
import { useLang } from '@/i18n/useLang';
import s from './ClosingSection.module.css';

/** The close: wedding dua, thank-you, rose ornament, and couple signature. */
export default function ClosingSection() {
  const { t, s: text } = useLang();
  const base = import.meta.env.BASE_URL ?? '/';

  return (
    <section className={s.closing} data-light="night">
      <ThemeOrnament />
      <div className={s.body}>
        <Reveal>
          <p className={s.thankYou}>{text('thankYou')}</p>
        </Reveal>

        <Reveal delay={100}>
          <div className={s.duaBox}>
            <p className={s.duaArabic} lang="ar" dir="rtl">
              {text('duaArabic')}
            </p>
            <p className={s.duaTranslation}>
              &ldquo;{text('duaTranslation')}&rdquo;
            </p>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <img
            className={s.roseDivider}
            src={`${base}assets/img/rose-divider.webp`}
            alt=""
            aria-hidden="true"
          />
        </Reveal>

        <Reveal delay={200}>
          <p className={s.line}>{text('closingNote')}</p>
        </Reveal>

        <Reveal delay={240}>
          <p className={s.names}>
            {t(couple.groom)} <span className={s.and}>{text('and')}</span> {t(couple.bride)}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
