import { useId } from 'react';
import { CalendarButton } from '@/components/controls/CalendarButton';
import { MapButton } from '@/components/maps/MapButton';
import { Reveal } from '@/components/motion/Reveal';
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
  /** The ground this panel sits on, from the night-to-day ramp. */
  light: Light;
}

/** One event as one tile panel. The same component serves Mehndi, Barat and Walima; only the data differs. */
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
          <h2 id={titleId} className={s.title}>
            {t(event.title)}
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <time className={s.date} dateTime={event.date}>
            <span className={s.weekday}>{date.weekday}</span>
            <span className={s.day}>{date.day}</span>
            <span className={s.month}>
              {date.month} {date.year}
            </span>
          </time>
          {hijri && <p className={s.hijri}>{hijri}</p>}
        </Reveal>

        <Reveal delay={200}>
          <dl className={s.facts}>
            <div className={s.row}>
              <dt>{text('time')}</dt>
              <dd>{formatTime(event.time, lang)}</dd>
            </div>
            <div className={s.row}>
              <dt>{text('venue')}</dt>
              <dd>
                <bdi>{t(event.venue.name)}</bdi>
                <span className={s.address}>
                  <bdi>{t(event.venue.address)}</bdi>
                </span>
              </dd>
            </div>
            {event.dressCode && (
              <div className={s.row}>
                <dt>{text('dressCode')}</dt>
                <dd>{t(event.dressCode)}</dd>
              </div>
            )}
          </dl>
        </Reveal>

        {event.schedule && event.schedule.length > 0 && (
          <Reveal delay={230}>
            <div className={s.scheduleWrapper}>
              <p className={s.scheduleHeading}>{text('schedule')}</p>
              <ul className={s.scheduleList}>
                {event.schedule.map((item, idx) => (
                  <li key={idx} className={s.scheduleItem}>
                    <span className={s.scheduleTime}>{formatTime(item.time, lang)}</span>
                    <span className={s.scheduleTitle}>{t(item.title)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}

        {event.note && (
          <Reveal delay={250}>
            <p className={s.note}>{t(event.note)}</p>
          </Reveal>
        )}

        <Reveal delay={280}>
          <div className={s.actions}>
            <MapButton href={event.venue.mapUrl} />
            <CalendarButton event={event} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
