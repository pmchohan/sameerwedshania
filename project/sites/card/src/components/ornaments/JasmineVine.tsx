import { useId } from 'react';
import s from './JasmineVine.module.css';

/**
 * Continuous Royal Jasmine & Gold Garland Strip for Sehra theme.
 * Runs 100% full-width with zero top/bottom margin, matching TileStrip's architectural alignment.
 */
export function JasmineVine() {
  const id = `vine-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <div className={s.garlandWrap} aria-hidden="true">
      <svg className={s.vine} viewBox="0 0 720 32" preserveAspectRatio="none" focusable="false">
        <defs>
          <pattern id={id} width="72" height="32" patternUnits="userSpaceOnUse">
            {/* Emerald ground band */}
            <rect width="72" height="32" fill="#031713" />

            {/* Top & bottom gold zari rails */}
            <line x1="0" y1="1" x2="72" y2="1" stroke="#f7d978" strokeWidth="1.6" />
            <line x1="0" y1="4" x2="72" y2="4" stroke="rgba(247, 217, 120, 0.35)" strokeWidth="0.8" strokeDasharray="2 3" />
            <line x1="0" y1="31" x2="72" y2="31" stroke="#f7d978" strokeWidth="1.6" />
            <line x1="0" y1="28" x2="72" y2="28" stroke="rgba(247, 217, 120, 0.35)" strokeWidth="0.8" strokeDasharray="2 3" />

            {/* Twisted gold zari filaments */}
            <path d="M 0 16 Q 18 10 36 16 Q 54 22 72 16" stroke="rgba(247, 217, 120, 0.75)" strokeWidth="1" fill="none" />
            <path d="M 0 16 Q 18 22 36 16 Q 54 10 72 16" stroke="rgba(247, 217, 120, 0.75)" strokeWidth="1" fill="none" />

            {/* Jasmine flower 1 */}
            <g transform="translate(18, 16)">
              <use href="#mogra-leaf" x="-14" y="-3" width="10" height="5" fill="#2e8a63" transform="rotate(-25)" />
              <use href="#mogra-leaf" x="4" y="-3" width="10" height="5" fill="#2e8a63" transform="rotate(25)" />
              <use href="#mogra-flower" x="-8" y="-8" width="16" height="16" fill="#f5fff9" />
            </g>

            {/* Center Pearl Bead */}
            <g transform="translate(36, 16)">
              <use href="#pearl-bead" x="-4.5" y="-4.5" width="9" height="9" />
              <circle cx="0" cy="0" r="5" fill="none" stroke="#f7d978" strokeWidth="0.6" />
            </g>

            {/* Jasmine flower 2 */}
            <g transform="translate(54, 16)">
              <use href="#mogra-leaf" x="-14" y="-3" width="10" height="5" fill="#2e8a63" transform="rotate(25)" />
              <use href="#mogra-leaf" x="4" y="-3" width="10" height="5" fill="#2e8a63" transform="rotate(-25)" />
              <use href="#mogra-flower" x="-8" y="-8" width="16" height="16" fill="#f5fff9" />
            </g>

            {/* Outer Pearl Bead */}
            <g transform="translate(0, 16)">
              <use href="#pearl-bead" x="-4" y="-4" width="8" height="8" />
            </g>
            <g transform="translate(72, 16)">
              <use href="#pearl-bead" x="-4" y="-4" width="8" height="8" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  );
}
