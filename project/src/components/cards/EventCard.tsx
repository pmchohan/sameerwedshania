import { useId } from 'react';
import { Button } from '@/components/atoms/Button';
import { PinIcon } from '@/components/icons/PinIcon';
import { Reveal } from '@/components/motion/Reveal';
import { TileStrip } from '@/components/ornaments/TileStrip';
import type { WeddingEvent } from '@/config/types';
import { formatDate } from '@/i18n/formatDate';
import { formatTime } from '@/i18n/formatTime';
import { useLang } from '@/i18n/useLang';
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

  return (
    <section className={s.panel} data-light={light} aria-labelledby={titleId}>
      <TileStrip />
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
                {t(event.venue.name)}
                <span className={s.address}>{t(event.venue.address)}</span>
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

        {event.note && (
          <Reveal delay={240}>
            <p className={s.note}>{t(event.note)}</p>
          </Reveal>
        )}

        <Reveal delay={280}>
          <Button href={event.venue.mapUrl} icon={<PinIcon />}>
            {text('viewOnMap')}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
