import { useState } from 'react';
import { LanguageToggle } from '@/components/controls/LanguageToggle';
import { couple } from '@/config/invitation.config';
import type { Guest } from '@/config/types';
import { fill } from '@/i18n/strings';
import { useLang } from '@/i18n/useLang';
import { sound } from '@/lib/sound';
import { ScrollCue } from '../components/ScrollCue';
import type { Phase } from '../phase';
import s from './HeroSection.module.css';

interface HeroSectionProps {
  guest: Guest;
  phase: Phase;
  onOpen: () => void;
  onSkip?: () => void;
}

export default function HeroSection({ guest, phase, onOpen, onSkip }: HeroSectionProps) {
  const { lang, t, s: text } = useLang();
  const [knocks, setKnocks] = useState(0);

  const names = { groom: t(couple.groom), bride: t(couple.bride) };

  const handleKnock = () => {
    if (phase !== 'closed') return;
    const next = knocks + 1;
    setKnocks(next);

    if (next < 3) {
      sound.playKnock();
    } else {
      sound.playOpening();
      onOpen();
    }
  };

  const handleSkip = () => {
    sound.playOpening();
    if (onSkip) onSkip();
    else onOpen();
  };

  return (
    <>
      {/* 1. FULL-SCREEN KASHI-KARI GATE OVERLAY */}
      <div className={s.gateOverlay} data-phase={phase} aria-hidden={phase === 'open'}>
        <div className={s.gateBackdrop} />

        <div className={s.topBar}>
          <button
            type="button"
            className={s.skipBtn}
            onClick={handleSkip}
            aria-label={text('skip')}
          >
            {text('skip')}
          </button>
          <LanguageToggle />
        </div>

        <div className={s.stage3d}>
          <div className={s.seamLight} aria-hidden="true" />

          <div className={s.doorTrack}>
            {/* LEFT LEAF */}
            <div className={s.doorLeaf} data-side="left">
              <svg className={s.doorSvg} viewBox="0 0 240 700" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="kashiGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f7d978" />
                    <stop offset="50%" stopColor="#d4af37" />
                    <stop offset="100%" stopColor="#f7d978" />
                  </linearGradient>
                  <pattern id="kashiJaaliL" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 0 10 L 10 0 L 20 10 L 10 20 Z" fill="none" stroke="#1ba6a6" strokeWidth="1" strokeOpacity="0.4" />
                    <circle cx="10" cy="10" r="1.5" fill="#f2c94c" fillOpacity="0.6" />
                  </pattern>
                </defs>

                {/* Base ground */}
                <rect width="240" height="700" fill="#061638" />

                {/* Outer decorative border band */}
                <rect x="6" y="6" width="228" height="688" fill="none" stroke="url(#kashiGoldGrad)" strokeWidth="2" />
                <rect x="14" y="14" width="212" height="672" fill="#081d52" stroke="#1ba6a6" strokeWidth="1.5" />

                {/* Arch frame */}
                <path d="M 24 160 C 24 60 120 28 240 28 L 240 400 L 24 400 Z" fill="url(#kashiJaaliL)" opacity="0.6" />
                <path d="M 24 160 C 24 60 120 28 240 28" fill="none" stroke="url(#kashiGoldGrad)" strokeWidth="2.5" />

                {/* Star mosaic row at top */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <rect
                    key={i}
                    x={28 + i * 34}
                    y={32}
                    width="14"
                    height="14"
                    fill="#1ba6a6"
                    stroke="#f2c94c"
                    strokeWidth="1"
                    transform={`rotate(45 ${35 + i * 34} 39)`}
                  />
                ))}

                {/* Half of center plaque cartouche */}
                <path
                  d="M 240 300 C 180 300 160 320 160 350 C 160 380 180 400 240 400 Z"
                  fill="#061638"
                  stroke="url(#kashiGoldGrad)"
                  strokeWidth="2"
                />

                {/* Left calligraphy text */}
                <text
                  x="215"
                  y="358"
                  textAnchor="end"
                  fill="url(#kashiGoldGrad)"
                  fontSize="24"
                  fontFamily={lang === 'ur' ? 'Noto Nastaliq Urdu' : 'Pinyon Script'}
                >
                  {lang === 'ur' ? 'دعوت' : "You're"}
                </text>

                {/* Left Brass Door Knocker */}
                <circle cx="215" cy="450" r="14" fill="#140a02" stroke="url(#kashiGoldGrad)" strokeWidth="2" />
                <circle cx="215" cy="450" r="6" fill="url(#kashiGoldGrad)" />
                <path
                  d="M 215 456 A 15 15 0 0 1 200 471 A 15 15 0 0 1 215 486 A 15 15 0 0 1 215 456"
                  fill="none"
                  stroke="url(#kashiGoldGrad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* RIGHT LEAF */}
            <div className={s.doorLeaf} data-side="right">
              <svg className={s.doorSvg} viewBox="0 0 240 700" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="kashiGoldGradR" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f7d978" />
                    <stop offset="50%" stopColor="#d4af37" />
                    <stop offset="100%" stopColor="#f7d978" />
                  </linearGradient>
                  <pattern id="kashiJaaliR" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 0 10 L 10 0 L 20 10 L 10 20 Z" fill="none" stroke="#1ba6a6" strokeWidth="1" strokeOpacity="0.4" />
                    <circle cx="10" cy="10" r="1.5" fill="#f2c94c" fillOpacity="0.6" />
                  </pattern>
                </defs>

                {/* Base ground */}
                <rect width="240" height="700" fill="#061638" />

                {/* Outer decorative border band */}
                <rect x="6" y="6" width="228" height="688" fill="none" stroke="url(#kashiGoldGradR)" strokeWidth="2" />
                <rect x="14" y="14" width="212" height="672" fill="#081d52" stroke="#1ba6a6" strokeWidth="1.5" />

                {/* Arch frame */}
                <path d="M 0 28 C 120 28 216 60 216 160 L 216 400 L 0 400 Z" fill="url(#kashiJaaliR)" opacity="0.6" />
                <path d="M 0 28 C 120 28 216 60 216 160" fill="none" stroke="url(#kashiGoldGradR)" strokeWidth="2.5" />

                {/* Star mosaic row at top */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <rect
                    key={i}
                    x={28 + i * 34}
                    y={32}
                    width="14"
                    height="14"
                    fill="#1ba6a6"
                    stroke="#f2c94c"
                    strokeWidth="1"
                    transform={`rotate(45 ${35 + i * 34} 39)`}
                  />
                ))}

                {/* Half of center plaque cartouche */}
                <path
                  d="M 0 300 C 60 300 80 320 80 350 C 80 380 60 400 0 400 Z"
                  fill="#061638"
                  stroke="url(#kashiGoldGradR)"
                  strokeWidth="2"
                />

                {/* Right calligraphy text */}
                <text
                  x="25"
                  y="358"
                  textAnchor="start"
                  fill="url(#kashiGoldGradR)"
                  fontSize="24"
                  fontFamily={lang === 'ur' ? 'Noto Nastaliq Urdu' : 'Pinyon Script'}
                >
                  {lang === 'ur' ? 'نامہ' : 'Invited'}
                </text>

                {/* Right Brass Door Knocker */}
                <circle cx="25" cy="450" r="14" fill="#140a02" stroke="url(#kashiGoldGradR)" strokeWidth="2" />
                <circle cx="25" cy="450" r="6" fill="url(#kashiGoldGradR)" />
                <path
                  d="M 25 456 A 15 15 0 0 0 40 471 A 15 15 0 0 0 25 486 A 15 15 0 0 0 25 456"
                  fill="none"
                  stroke="url(#kashiGoldGradR)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Knocker click button */}
          <button
            type="button"
            className={s.knockerTrigger}
            onClick={handleKnock}
            aria-label={`Knock on the portal, ${knocks} of 3`}
          />

          {/* Prompt and progress dots */}
          <div className={s.promptWrap} aria-hidden="true">
            <p className={s.promptText}>{text('knockPrompt')}</p>
            <div className={s.dotsRow}>
              <span className={s.dot} data-active={knocks >= 1} />
              <span className={s.dot} data-active={knocks >= 2} />
              <span className={s.dot} data-active={knocks >= 3} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. REVEALED HERO CONTENT (AFTER GATE OPENS) */}
      <section className={s.hero} data-light="night" aria-label={`${names.groom} & ${names.bride}`}>
        <div className={s.starsOverlay} aria-hidden="true" />

        <svg className={s.crescentMoon} viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
          <path d="M70 12 A42 42 0 1 0 70 88 A34 34 0 1 1 70 12 Z" />
        </svg>

        <p className={s.bismillah} lang="ar" dir="rtl">
          بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
        </p>

        <div className={s.heroContent}>
          <div className={s.namesBox}>
            <h1 className={s.names}>
              <span>{names.groom}</span>
              <span className={s.and}>{text('and')}</span>
              <span>{names.bride}</span>
            </h1>
          </div>

          <div className={s.welcomeCard}>
            <p className={s.guestBadge}>
              <span>{text('invitationFor')}</span>{' '}
              <span className={s.guestName}>
                <bdi>{t(guest.name)}</bdi>
              </span>
            </p>

            <p className={s.inviteMessage}>
              {fill(text('inviteLine'), names)}
            </p>

            {guest.note && (
              <p className={s.guestNote}>{t(guest.note)}</p>
            )}
          </div>
        </div>

        <ScrollCue active={phase === 'open'} />
      </section>
    </>
  );
}
