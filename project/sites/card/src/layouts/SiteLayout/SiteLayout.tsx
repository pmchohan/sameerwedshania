import type { ReactNode } from 'react';
import { LanguageToggle } from '@/components/controls/LanguageToggle';
import { SoundToggle } from '@/components/controls/SoundToggle';
import { JasmineSprite } from '@/components/ornaments/JasmineSprite';
import { TileSprite } from '@/components/ornaments/TileSprite';
import s from './SiteLayout.module.css';

/** Wraps every screen: the ornament sprites, top controls (sound and language) and the main landmark. */
export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className={s.root}>
      <TileSprite />
      <JasmineSprite />
      <div className={s.topNav} aria-label="Controls">
        <SoundToggle />
        <LanguageToggle />
      </div>
      <main>{children}</main>
    </div>
  );
}
