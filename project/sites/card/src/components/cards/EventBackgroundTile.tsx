import { useId } from 'react';
import s from './EventBackgroundTile.module.css';

interface EventBackgroundTileProps {
  eventKey?: string;
}

/**
 * Renders an authentic architectural tile watermark tailored to each event:
 * - Mehndi: Mughal Floral Jaali (lattice screen in emerald/gold)
 * - Barat: Girih Khatam (8-pointed geometric star & cross in garnet/copper)
 * - Walima: Wazir Khan Kashi Arabesque (palmette vine in lapis/turquoise/gold)
 */
export function EventBackgroundTile({ eventKey = 'walima' }: EventBackgroundTileProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const patternId = `bg-tile-${eventKey}-${uid}`;

  return (
    <div className={s.tileBackground} data-event={eventKey} aria-hidden="true">
      <svg className={s.tileSvg} xmlns="http://www.w3.org/2000/svg">
        <defs>
          {eventKey === 'mehndi' && (
            <pattern id={patternId} width="48" height="48" patternUnits="userSpaceOnUse">
              {/* Interlocking Mughal floral arches & 4-petal rosettes */}
              <circle cx="24" cy="24" r="16" fill="none" stroke="rgba(247, 217, 120, 0.07)" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="16" fill="none" stroke="rgba(247, 217, 120, 0.07)" strokeWidth="0.8" />
              <circle cx="48" cy="0" r="16" fill="none" stroke="rgba(247, 217, 120, 0.07)" strokeWidth="0.8" />
              <circle cx="0" cy="48" r="16" fill="none" stroke="rgba(247, 217, 120, 0.07)" strokeWidth="0.8" />
              <circle cx="48" cy="48" r="16" fill="none" stroke="rgba(247, 217, 120, 0.07)" strokeWidth="0.8" />
              {/* Central floral petal */}
              <path
                d="M 24 16 C 27 20, 27 28, 24 32 C 21 28, 21 20, 24 16 Z M 16 24 C 20 27, 28 27, 32 24 C 28 21, 20 21, 16 24 Z"
                fill="rgba(27, 166, 166, 0.09)"
                stroke="rgba(247, 217, 120, 0.12)"
                strokeWidth="0.6"
              />
              <circle cx="24" cy="24" r="2" fill="rgba(247, 217, 120, 0.25)" />
            </pattern>
          )}

          {eventKey === 'barat' && (
            <pattern id={patternId} width="64" height="64" patternUnits="userSpaceOnUse">
              {/* 8-pointed star & cross Girih geometry */}
              <path
                d="M 32 8 L 38 20 L 50 14 L 44 26 L 56 32 L 44 38 L 50 50 L 38 44 L 32 56 L 26 44 L 14 50 L 20 38 L 8 32 L 20 26 L 14 14 L 26 20 Z"
                fill="rgba(23, 144, 148, 0.22)"
                stroke="rgba(247, 217, 120, 0.15)"
                strokeWidth="0.8"
              />
              <circle cx="32" cy="32" r="4" fill="none" stroke="rgba(247, 217, 120, 0.22)" strokeWidth="0.6" />
              {/* Corner cross diagonals */}
              <line x1="0" y1="0" x2="16" y2="16" stroke="rgba(247, 217, 120, 0.08)" strokeWidth="0.6" />
              <line x1="64" y1="0" x2="48" y2="16" stroke="rgba(247, 217, 120, 0.08)" strokeWidth="0.6" />
              <line x1="0" y1="64" x2="16" y2="48" stroke="rgba(247, 217, 120, 0.08)" strokeWidth="0.6" />
              <line x1="64" y1="64" x2="48" y2="48" stroke="rgba(247, 217, 120, 0.08)" strokeWidth="0.6" />
            </pattern>
          )}

          {eventKey === 'walima' && (
            <pattern id={patternId} width="56" height="56" patternUnits="userSpaceOnUse">
              {/* Wazir Khan Kashi diamond grid & scrolling arabesque palmette */}
              <path
                d="M 28 0 L 56 28 L 28 56 L 0 28 Z"
                fill="none"
                stroke="rgba(27, 166, 166, 0.11)"
                strokeWidth="0.75"
              />
              <path
                d="M 28 8 L 48 28 L 28 48 L 8 28 Z"
                fill="rgba(10, 36, 99, 0.12)"
                stroke="rgba(247, 217, 120, 0.09)"
                strokeWidth="0.6"
              />
              {/* Palmette core */}
              <circle cx="28" cy="28" r="3.5" fill="rgba(247, 217, 120, 0.22)" />
              <circle cx="0" cy="0" r="2" fill="rgba(27, 166, 166, 0.2)" />
              <circle cx="56" cy="0" r="2" fill="rgba(27, 166, 166, 0.2)" />
              <circle cx="0" cy="56" r="2" fill="rgba(27, 166, 166, 0.2)" />
              <circle cx="56" cy="56" r="2" fill="rgba(27, 166, 166, 0.2)" />
            </pattern>
          )}
        </defs>

        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}
