import { useEffect, useRef, useState } from 'react';
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
  const { t, s: text } = useLang();
  const [knocks, setKnocks] = useState(0);
  const [isGone, setIsGone] = useState(phase === 'open');

  const doorStageRef = useRef<HTMLDivElement>(null);
  const doorLeftRef = useRef<HTMLDivElement>(null);
  const doorRightRef = useRef<HTMLDivElement>(null);
  const plateLeftRef = useRef<HTMLDivElement>(null);
  const plateRightRef = useRef<HTMLDivElement>(null);
  const knockZoneRef = useRef<HTMLButtonElement>(null);

  const isOpen = phase === 'locking' || phase === 'open';
  const names = { groom: t(couple.groom), bride: t(couple.bride) };

  // Door Plate Sizing logic to maintain seamless 9:16 fit (361 x 1376 per leaf)
  useEffect(() => {
    function sizePlate(half: HTMLElement | null, plate: HTMLElement | null, side: 'left' | 'right') {
      if (!half || !plate) return;
      const rect = half.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const n = Math.max(rect.width / 361, rect.height / 1376);
      const w = 361 * n;
      const h = 1376 * n;
      plate.style.width = `${w}px`;
      plate.style.height = `${h}px`;
      plate.style.left = `${side === 'left' ? rect.width - w : 0}px`;
      plate.style.top = `${(rect.height - h) / 2}px`;
    }

    function update() {
      sizePlate(doorLeftRef.current, plateLeftRef.current, 'left');
      sizePlate(doorRightRef.current, plateRightRef.current, 'right');
    }

    update();
    const ro = new ResizeObserver(update);
    if (doorLeftRef.current) ro.observe(doorLeftRef.current);
    if (doorRightRef.current) ro.observe(doorRightRef.current);
    window.addEventListener('resize', update);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  // Remove the gate overlay once opening finishes
  useEffect(() => {
    if (phase === 'open') {
      setIsGone(true);
    } else if (phase === 'locking') {
      const timer = window.setTimeout(() => setIsGone(true), 2400);
      return () => window.clearTimeout(timer);
    }
  }, [phase]);

  const spawnDust = (x: number, y: number) => {
    if (!knockZoneRef.current) return;
    const dust = document.createElement('span');
    dust.className = s.knockDust ?? '';
    dust.style.left = `${x}px`;
    dust.style.top = `${y}px`;
    knockZoneRef.current.appendChild(dust);
    window.setTimeout(() => dust.remove(), 1700);
  };

  const spawnFlash = () => {
    if (!doorStageRef.current) return;
    const flash = document.createElement('span');
    flash.className = s.doorFlash ?? '';
    doorStageRef.current.appendChild(flash);
    window.setTimeout(() => flash.remove(), 550);
  };

  const rattleDoor = (el: HTMLElement | null, dir: number) => {
    if (!el) return;
    el.animate(
      [
        { transform: 'rotateY(0deg)' },
        { transform: `rotateY(${-6.2 * dir}deg)` },
        { transform: `rotateY(${2.6 * dir}deg)` },
        { transform: `rotateY(${-1 * dir}deg)` },
        { transform: 'rotateY(0deg)' },
      ],
      { duration: 520, easing: 'cubic-bezier(.2, .8, .3, 1)' },
    );
  };

  const handleKnock = (ev: React.MouseEvent<HTMLButtonElement>) => {
    if (isOpen || knocks >= 3) return;

    // Play crisp acoustic knock
    sound.playKnock();

    const rect = knockZoneRef.current?.getBoundingClientRect();
    const x = ev.clientX ? ev.clientX - (rect?.left ?? 0) : (rect?.width ?? 200) / 2;
    const y = ev.clientY ? ev.clientY - (rect?.top ?? 0) : (rect?.height ?? 400) / 2;

    spawnDust(x, y);
    spawnFlash();
    rattleDoor(doorLeftRef.current, 1);
    rattleDoor(doorRightRef.current, -1);

    const next = knocks + 1;
    setKnocks(next);

    if (next >= 3) {
      sound.playOpening();
      window.setTimeout(onOpen, 250);
    }
  };

  const handleSkip = () => {
    sound.playOpening();
    if (onSkip) onSkip();
    else onOpen();
  };

  const base = import.meta.env.BASE_URL ?? '/';

  return (
    <>
      {/* 1. 3D GRAND KASHI-KARI PORTAL (DOOR GATE) */}
      <div className={s.gate} data-open={isOpen} data-gone={isGone} aria-hidden={isOpen}>
        <div className={s.gateBg} />

        <button
          type="button"
          className={s.skipBtn}
          onClick={handleSkip}
          aria-label={text('skip')}
        >
          {text('skip')}
        </button>

        <div className={s.doorStage} ref={doorStageRef}>
          <div className={s.doorSeam} aria-hidden="true" />

          <div className={s.doorTrack}>
            {/* Left Leaf */}
            <div className={s.doorHalf} data-side="left" ref={doorLeftRef}>
              <div className={s.doorArt}>
                <div className={s.doorPlate} ref={plateLeftRef}>
                  <img
                    src={`${base}assets/img/door-left.webp`}
                    alt=""
                    draggable="false"
                  />
                </div>
                <div className={s.doorShade} />
              </div>
            </div>

            {/* Right Leaf */}
            <div className={s.doorHalf} data-side="right" ref={doorRightRef}>
              <div className={s.doorArt}>
                <div className={s.doorPlate} ref={plateRightRef}>
                  <img
                    src={`${base}assets/img/door-right.webp`}
                    alt=""
                    draggable="false"
                  />
                </div>
                <div className={s.doorShade} />
              </div>
            </div>
          </div>

          <div className={s.doorWarm} />

          {/* Interactive Knocker Touch Target */}
          <button
            className={s.doorKnock}
            ref={knockZoneRef}
            type="button"
            onClick={handleKnock}
            aria-label={`Knock on the portal, ${knocks} of 3`}
          />

          {/* Prompt & Progress Dots */}
          <div className={s.doorPrompt} aria-hidden="true">
            <p>{text('knockPrompt')}</p>
            <div className={s.doorDots}>
              <span className={knocks >= 1 ? s.dotActive : undefined} />
              <span className={knocks >= 2 ? s.dotActive : undefined} />
              <span className={knocks >= 3 ? s.dotActive : undefined} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. REVEALED PALACE COURTYARD & COUPLE INVITATION */}
      <header className={s.hero} id="hero" aria-label={`${names.groom} & ${names.bride}`}>
        <div className={s.heroBackdrop} />
        <div className={s.heroPhoto}>
          <div className={s.heroPhotoScale} data-open={isOpen}>
            <div className={s.heroPhotoInner} data-open={isOpen}>
              <img
                src={`${base}assets/img/courtyard-night.jpg`}
                alt="Illuminated palace courtyard at night"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
        <div className={s.heroShade} data-open={isOpen} />

        <div className={s.heroContent}>
          <p className={s.invitationEyebrow} data-open={isOpen}>
            {text('youAreInvited')}
          </p>

          <p className={s.bismillah} lang="ar" dir="rtl" data-open={isOpen}>
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>

          <div className={s.heroMiddle}>
            <h1 className={s.heroNames} data-open={isOpen}>
              <span>{names.groom}</span>
              <span className={s.amp}>{text('and')}</span>
              <span>{names.bride}</span>
            </h1>
          </div>

          <div className={s.guestDedication} data-open={isOpen}>
            <p className={s.guestLabel}>{text('invitationFor')}</p>
            <h2 className={s.guestName}>
              <bdi>{t(guest.name)}</bdi>
            </h2>
            <p className={s.inviteMessage}>
              {fill(text('inviteLine'), names)}
            </p>
            {guest.note && (
              <p className={s.guestNote}>{t(guest.note)}</p>
            )}
          </div>

          <div className={s.scrollIndicator} data-open={isOpen}>
            <ScrollCue active={isOpen} />
          </div>
        </div>
      </header>
    </>
  );
}
