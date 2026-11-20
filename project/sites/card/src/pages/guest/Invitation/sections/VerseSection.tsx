import { Reveal } from '@/components/motion/Reveal';
import { FourCorners } from '@/components/ornaments/CornerOrnament';
import { RoseDivider } from '@/components/ornaments/RoseDivider';
import { useWeddingContent } from '@/config/WeddingContentContext';
import type { Guest } from '@/config/types';
import { useLang } from '@/i18n/useLang';
import s from './VerseSection.module.css';

interface VerseSectionProps {
  guest: Guest;
}

export function VerseSection({ guest: _guest }: VerseSectionProps) {
  const { families } = useWeddingContent();
  const { t, s: text } = useLang();

  return (
    <section className={s.verseSection} aria-label={text('withBlessings')}>
      <div className={s.container}>
        <FourCorners className={s.corner} />

        <Reveal>
          <div className={s.bismillahWrap}>
            <p className={s.bismillah} lang="ar" dir="rtl">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <p className={s.bismillahMeaning}>
              &ldquo;{t({ en: 'In the name of Allah, the Most Gracious, the Most Merciful', ur: 'اللہ کے نام سے جو بڑا مہربان، نہایت رحم والا ہے' })}&rdquo;
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className={s.verseBlock}>
            <p className={s.arabicVerse} lang="ar" dir="rtl">
              {text('quranVerseArabic')}
            </p>
            <p className={s.verseTranslation}>
              &ldquo;{text('quranVerseTranslation')}&rdquo;
            </p>
            <span className={s.citation}>
              {text('surahArRum')}
            </span>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <RoseDivider width="clamp(13rem, 60vw, 19rem)" />
        </Reveal>

        <Reveal delay={260}>
          <div className={s.familiesBlock}>
            <p className={s.eyebrow}>
              {t({ en: 'BY THE GRACE OF ALLAH', ur: 'فضلِ ربی سے' })}
            </p>
            <h2 className={s.familyLine}>
              {families?.line ? t(families.line) : text('withBlessings')}
            </h2>

            {(families?.groomParents || families?.brideParents) && (
              <div className={s.parentsGrid}>
                {families.groomParents && (
                  <div className={s.parentGroup}>
                    <span className={s.parentLabel}>{t({ en: "GROOM'S PARENTS", ur: 'والدین دولہا' })}</span>
                    <span className={s.parentName}>{t(families.groomParents)}</span>
                  </div>
                )}
                {families.brideParents && (
                  <div className={s.parentGroup}>
                    <span className={s.parentLabel}>{t({ en: "BRIDE'S PARENTS", ur: 'والدین دلہن' })}</span>
                    <span className={s.parentName}>{t(families.brideParents)}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
