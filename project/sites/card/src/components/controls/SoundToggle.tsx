import { useSyncExternalStore } from 'react';
import { useLang } from '@/i18n/useLang';
import { sound } from '@/lib/sound';
import s from './SoundToggle.module.css';

interface SoundToggleProps {
  className?: string;
}

/** The quiet sound switch for the door opening. It sits opposite the language toggle. */
export function SoundToggle({ className }: SoundToggleProps = {}) {
  const { s: text } = useLang();
  const muted = useSyncExternalStore(sound.subscribe, sound.isMuted, () => false);

  return (
    <button
      type="button"
      className={`${s.toggle} ${className ?? ''}`}
      aria-label={text(muted ? 'unmuteSound' : 'muteSound')}
      aria-pressed={muted}
      onClick={(event) => {
        event.stopPropagation();
        sound.setMuted(!muted);
      }}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path className={s.speaker} d="M4 9.5 H8 L13 5 V19 L8 14.5 H4 Z" />
        {muted ? (
          <path className={s.wave} d="M16.5 9 L21 15 M21 9 L16.5 15" />
        ) : (
          <>
            <path className={s.wave} d="M16 9.2 C17.4 10.3 17.4 13.7 16 14.8" />
            <path className={s.wave} d="M18.6 7 C21.1 9 21.1 15 18.6 17" />
          </>
        )}
      </svg>
    </button>
  );
}
