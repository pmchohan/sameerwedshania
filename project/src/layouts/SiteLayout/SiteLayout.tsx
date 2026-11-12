import type { ReactNode } from 'react';
import { LanguageToggle } from '@/components/controls/LanguageToggle';
import { TileSprite } from '@/components/ornaments/TileSprite';
import s from './SiteLayout.module.css';

/** Wraps every screen: the tile sprite, the language toggle and the main landmark. */
export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className={s.root}>
      <TileSprite />
      <LanguageToggle />
      <main>{children}</main>
    </div>
  );
}
