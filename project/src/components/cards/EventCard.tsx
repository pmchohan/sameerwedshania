import { useId } from 'react';
import { CalendarButton } from '@/components/controls/CalendarButton';
import { MapButton } from '@/components/maps/MapButton';
import { Reveal } from '@/components/motion/Reveal';
import { RoseDivider } from '@/components/ornaments/RoseDivider';
import { ThemeOrnament } from '@/components/ornaments/ThemeOrnament';
import type { WeddingEvent } from '@/config/types';
import { formatDate } from '@/i18n/formatDate';
import { formatTime } from '@/i18n/formatTime';
import { useLang } from '@/i18n/useLang';
import { formatHijriDate } from '@/lib/hijri';
import type { Light } from '@/lib/light';
import s from './EventCard.module.css';

interface EventCardProps {
  event: WeddingEvent;
  light: Light;
}

export function EventCard({ event, light }: EventCardProps) {
  const { lang, t, s: text } = useLang();
  const titleId = useId();
  const date = formatDate(event.date, lang);
  const hijri = event.hijriDate ? t(event.hijriDate) : formatHijriDate(event.date, lang);

  return (
    <section className={s.panel} data-light={light} aria-labelledby={titleId}>
      <ThemeOrnament />
      <div className={s.body}>
        <Reveal>
          <p className={s.eyebrow}>{text('saveTheDate')}</p>
          <div className={s.titleWrap}>
            <span className={s.titleLine} aria-hidden="true" />
            <h2 id={titleId} className={s.title}>
              {t(event.title)}
            </h2>
            <span className={s.titleLine} aria-hidden="true" />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className={s.dateBlock}>
            <p className={s.month}>{date.month}</p>
            <div className={s.dateGrid}>
              <p className={s.weekday}>{date.weekday}</p>
              <p className={s.day}>{date.day}</p>
              <p className={s.time}>{formatTime(event.time, lang)}</p>
            </div>
            <p className={s.year}>{date.year}</p>
            {hijri && <p className={s.hijri}>{hijri}</p>}
          </div>
        </Reveal>

        <Reveal delay={180}>
          <RoseDivider width="clamp(12rem, 55vw, 18rem)" />
        </Reveal>

        <Reveal delay={220}>
          <div className={s.venueBlock}>
            <p className={s.venueEyebrow}>{text('venue')}</p>
            <h3 className={s.venueName}><bdi>{t(event.venue.name)}</bdi></h3>
            <p className={s.address}><bdi>{t(event.venue.address)}</bdi></p>

            {event.dressCode && (
              <div className={s.dressCodeRow}>
                <span className={s.dressCodeLabel}>{text('dressCode')}:</span>
                <span className={s.dressCodeVal}>{t(event.dressCode)}</span>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={260}>
          <div className={s.actions}>
            <MapButton href={event.venue.mapUrl} />
            <CalendarButton event={event} />
          </div>
        </Reveal>

        {event.schedule && event.schedule.length > 0 && (
          <Reveal delay={300}>
            <div className={s.scheduleSection}>
              <div className={s.scheduleHeader}>
                <p className={s.scheduleEyebrow}>{text('schedule')}</p>
              </div>
              <ol className={s.scheduleTimeline}>
                {event.schedule.map((item, idx) => (
                  <li key={idx} className={s.scheduleStep}>
                    <span className={s.stepTime}>{formatTime(item.time, lang)}</span>
                    <span className={s.stepDot} aria-hidden="true" />
                    <span className={s.stepTitle}>{t(item.title)}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        )}

        {event.note && (
          <Reveal delay={320}>
            <p className={s.note}>{t(event.note)}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
