import { useId } from 'react';
import s from './TileStrip.module.css';

/** A one-tile-high band of glazed tiles. It marks the seam where one panel's light gives way to the next. */
export function TileStrip() {
  // Each strip needs its own pattern id, or later strips would borrow the first strip's colours.
  const id = `strip-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <svg className={s.strip} aria-hidden="true" focusable="false">
      <defs>
        <pattern id={id} width="96" height="32" patternUnits="userSpaceOnUse">
          <use href="#tile-star" width="32" height="32" />
          <use href="#tile-lozenge" x="32" width="32" height="32" />
          <use href="#tile-leaf" x="64" width="32" height="32" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
