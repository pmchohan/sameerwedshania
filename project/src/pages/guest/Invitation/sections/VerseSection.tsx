import { Reveal } from '@/components/motion/Reveal';
import { families } from '@/config/invitation.config';
import type { Guest } from '@/config/types';
import { useLang } from '@/i18n/useLang';
import s from './VerseSection.module.css';

interface VerseSectionProps {
  guest: Guest;
}

export function VerseSection({ guest: _guest }: VerseSectionProps) {
  const { t, s: text } = useLang();

  return (
    <section className={s.verseSection} aria-label={text('withBlessings')}>
      <Reveal>
        <div className={s.panel}>
          <span className={`${s.corner} ${s.cornerTopLeft}`} aria-hidden="true" />
          <span className={`${s.corner} ${s.cornerTopRight}`} aria-hidden="true" />
          <span className={`${s.corner} ${s.cornerBottomLeft}`} aria-hidden="true" />
          <span className={`${s.corner} ${s.cornerBottomRight}`} aria-hidden="true" />

          <p className={s.bismillah} lang="ar" dir="rtl">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
          </p>

          <p className={s.arabicVerse} lang="ar" dir="rtl">
            {text('quranVerseArabic')}
          </p>

          <p className={s.verseTranslation}>
            &ldquo;{text('quranVerseTranslation')}&rdquo;
          </p>

          <span className={s.citation}>
            {text('surahArRum')}
          </span>

          <div className={s.divider} aria-hidden="true">
            <span className={s.rule} />
            <span className={s.diamond} />
            <span className={s.rule} />
          </div>

          <div className={s.familiesBox}>
            <p className={s.familyLine}>
              {families?.line ? t(families.line) : text('withBlessings')}
            </p>

            {(families?.groomParents || families?.brideParents) && (
              <div className={s.parentsGrid}>
                {families.groomParents && (
                  <div className={s.parentGroup}>
                    <span className={s.parentLabel}>{t({ en: "Groom's Parents", ur: 'والدین دولہا' })}</span>
                    <span className={s.parentName}>{t(families.groomParents)}</span>
                  </div>
                )}
                {families.brideParents && (
                  <div className={s.parentGroup}>
                    <span className={s.parentLabel}>{t({ en: "Bride's Parents", ur: 'والدین دلہن' })}</span>
                    <span className={s.parentName}>{t(families.brideParents)}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
