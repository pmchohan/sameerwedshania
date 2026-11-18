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

const CIRCUMFERENCE = 276.46; // 2 * PI * 44

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

  const units = [
    {
      value: timeLeft.days,
      label: text('countdownDays'),
      offset: CIRCUMFERENCE * (1 - Math.min(timeLeft.days / 60, 1)),
    },
    {
      value: timeLeft.hours,
      label: text('countdownHours'),
      offset: CIRCUMFERENCE * (1 - timeLeft.hours / 24),
    },
    {
      value: timeLeft.minutes,
      label: text('countdownMinutes'),
      offset: CIRCUMFERENCE * (1 - timeLeft.minutes / 60),
    },
    {
      value: timeLeft.seconds,
      label: text('countdownSeconds'),
      offset: CIRCUMFERENCE * (1 - timeLeft.seconds / 60),
    },
  ];

  return (
    <section className={s.countdownSection} aria-label={text('countdownUntil')}>
      <Reveal>
        <p className={s.heading}>{text('countdownUntil')}</p>
        <div className={s.grid} role="timer" aria-live="off">
          {units.map((u, i) => (
            <div key={i} className={s.unit}>
              <div className={s.ring}>
                <svg viewBox="0 0 100 100" aria-hidden="true">
                  <circle
                    className={s.track}
                    cx="50"
                    cy="50"
                    r="44"
                  />
                  <circle
                    className={s.fill}
                    cx="50"
                    cy="50"
                    r="44"
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={u.offset}
                  />
                </svg>
                <span className={s.value}>{String(u.value).padStart(2, '0')}</span>
              </div>
              <span className={s.label}>{u.label}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
