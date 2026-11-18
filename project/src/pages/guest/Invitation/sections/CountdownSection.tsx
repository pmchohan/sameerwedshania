import { useEffect, useState } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { events } from '@/config/invitation.config';
import type { Guest } from '@/config/types';
import { useLang } from '@/i18n/useLang';
import s from './CountdownSection.module.css';

interface CountdownSectionProps {
  guest: Guest;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDateMs: number): TimeLeft {
  const diff = Math.max(0, targetDateMs - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export function CountdownSection({ guest }: CountdownSectionProps) {
  const { s: text } = useLang();

  // Find the earliest event date/time that this guest is invited to
  const earliestTimestamp = Math.min(
    ...guest.events.map((key) => {
      const ev = events[key];
      const [year, month, day] = ev.date.split('-').map(Number) as [number, number, number];
      const [hours, mins] = ev.time.split(':').map(Number) as [number, number];
      return Date.UTC(year, month - 1, day, hours - 5, mins, 0); // approx PKT offset
    })
  );

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(earliestTimestamp));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(earliestTimestamp));
    }, 1000);
    return () => clearInterval(timer);
  }, [earliestTimestamp]);

  return (
    <section className={s.countdownSection} aria-label={text('countdownUntil')}>
      <Reveal>
        <p className={s.heading}>{text('countdownUntil')}</p>
        <div className={s.grid} role="timer" aria-live="off">
          <div className={s.unit}>
            <span className={s.value}>{String(timeLeft.days).padStart(2, '0')}</span>
            <span className={s.label}>{text('countdownDays')}</span>
          </div>
          <div className={s.unit}>
            <span className={s.value}>{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className={s.label}>{text('countdownHours')}</span>
          </div>
          <div className={s.unit}>
            <span className={s.value}>{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className={s.label}>{text('countdownMinutes')}</span>
          </div>
          <div className={s.unit}>
            <span className={s.value}>{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className={s.label}>{text('countdownSeconds')}</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
