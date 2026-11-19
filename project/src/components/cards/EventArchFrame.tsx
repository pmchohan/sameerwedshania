import type { ReactNode } from 'react';
import { useTheme } from '@/theme/theme';
import s from './EventArchFrame.module.css';

interface EventArchFrameProps {
  eventKey?: string;
  children: ReactNode;
}

/**
 * Architectural Niche (Mihrab / Iwan / Jharoka) framing each event:
 * - Kashi: Wazir Khan tilework arches (Mehndi, Barat, Walima)
 * - Sehra: Royal Mughal floral jharoka arch with jasmine vine spandrels & pearl finial
 */
export function EventArchFrame({ eventKey = 'walima', children }: EventArchFrameProps) {
  const theme = useTheme();

  if (theme === 'sehra') {
    return (
      <div className={s.archFrame} data-event={eventKey}>
        <div className={s.archTop} aria-hidden="true">
          <svg viewBox="0 0 400 110" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`sehra-spandrel-${eventKey}`} width="24" height="24" patternUnits="userSpaceOnUse">
                <rect width="24" height="24" fill={eventKey === 'barat' ? '#0a3a2c' : '#031713'} />
                <path d="M 0 12 Q 6 4 12 12 Q 18 20 24 12" stroke="rgba(247, 217, 120, 0.28)" strokeWidth="0.8" fill="none" />
                <circle cx="12" cy="12" r="2.2" fill="#f7d978" opacity="0.6" />
                <circle cx="6" cy="8" r="1.5" fill="#f5fff9" opacity="0.7" />
                <circle cx="18" cy="16" r="1.5" fill="#f5fff9" opacity="0.7" />
                <path d="M 12 4 Q 14 8 12 12 Q 10 8 12 4 Z" fill="#2e8a63" opacity="0.5" />
              </pattern>
            </defs>

            {/* Top gold moulding line touching bottom of garland */}
            <line x1="0" y1="1" x2="400" y2="1" stroke="#f7d978" strokeWidth="2" />
            <line x1="0" y1="4" x2="400" y2="4" stroke="rgba(247, 217, 120, 0.4)" strokeWidth="0.8" strokeDasharray="2 3" />

            {/* Spandrel fill above arch touching 0 and 400 edge-to-edge */}
            <path
              d="M 0 110 L 0 0 L 400 0 L 400 110 L 400 74 A 32 32 0 0 0 354 46 A 48 48 0 0 0 286 24 A 64 64 0 0 0 200 14 A 64 64 0 0 0 114 24 A 48 48 0 0 0 46 46 A 32 32 0 0 0 0 74 Z"
              fill={`url(#sehra-spandrel-${eventKey})`}
            />

            {/* Outer arch moulding touching left and right edges */}
            <path
              d="M 0 110 L 0 74 A 32 32 0 0 1 46 46 A 48 48 0 0 1 114 24 A 64 64 0 0 1 200 14 A 64 64 0 0 1 286 24 A 48 48 0 0 1 354 46 A 32 32 0 0 1 400 74 L 400 110"
              stroke="#f7d978"
              strokeWidth="2"
            />

            {/* Inner scalloped pearl & gold rib */}
            <path
              d="M 5 110 L 5 77 A 29 29 0 0 1 48 50 A 45 45 0 0 1 115 29 A 60 60 0 0 1 200 19 A 60 60 0 0 1 285 29 A 45 45 0 0 1 352 50 A 29 29 0 0 1 395 77 L 395 110"
              stroke="rgba(247, 217, 120, 0.6)"
              strokeWidth="1.2"
              strokeDasharray="2 4"
            />

            {/* Apex Motia Blossom & Pearl Drop Finial */}
            <circle cx="200" cy="14" r="4" fill="#f7d978" />
            <path d="M 200 2 Q 205 8 200 14 Q 195 8 200 2 Z" fill="#f5fff9" stroke="#f7d978" strokeWidth="0.8" />
            <circle cx="200" cy="8" r="1.5" fill="#f7d978" />
            <circle cx="192" cy="11" r="2" fill="#f5fff9" />
            <circle cx="208" cy="11" r="2" fill="#f5fff9" />

            {/* Left and Right corbel brackets */}
            <circle cx="4" cy="74" r="3.5" fill="#f7d978" />
            <circle cx="396" cy="74" r="3.5" fill="#f7d978" />
          </svg>
        </div>

        <div className={s.archContent}>{children}</div>
      </div>
    );
  }

  return (
    <div className={s.archFrame} data-event={eventKey}>
      {/* 1. ARCH TOP HEADER */}
      <div className={s.archTop} aria-hidden="true">
        {eventKey === 'mehndi' && (
          <svg viewBox="0 0 400 110" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="mehndi-spandrel" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="4" fill="rgba(247, 217, 120, 0.12)" />
                <path d="M 10 2 Q 14 6 10 10 Q 6 6 10 2 Z M 10 18 Q 14 14 10 10 Q 6 14 10 18 Z" fill="rgba(27, 166, 166, 0.18)" />
                <path d="M 2 10 Q 6 14 10 10 Q 6 6 2 10 Z M 18 10 Q 14 14 10 10 Q 14 6 18 10 Z" fill="rgba(27, 166, 166, 0.18)" />
              </pattern>
            </defs>

            {/* Top gold moulding line touching bottom of tiles */}
            <line x1="0" y1="1" x2="400" y2="1" stroke="#f7d978" strokeWidth="2" />

            {/* Spandrel fill above arch touching 0 and 400 edge-to-edge */}
            <path
              d="M 0 110 L 0 0 L 400 0 L 400 110 L 400 72 A 36 36 0 0 0 350 44 A 54 54 0 0 0 278 22 A 72 72 0 0 0 200 12 A 72 72 0 0 0 122 22 A 54 54 0 0 0 50 44 A 36 36 0 0 0 0 72 Z"
              fill="url(#mehndi-spandrel)"
            />

            {/* Outer arch moulding touching left and right edges */}
            <path
              d="M 0 110 L 0 72 A 36 36 0 0 1 50 44 A 54 54 0 0 1 122 22 A 72 72 0 0 1 200 12 A 72 72 0 0 1 278 22 A 54 54 0 0 1 350 44 A 36 36 0 0 1 400 72 L 400 110"
              stroke="#f7d978"
              strokeWidth="2"
            />

            {/* Inner scalloped accent rib */}
            <path
              d="M 4 110 L 4 75 A 34 34 0 0 1 52 48 A 51 51 0 0 1 123 27 A 68 68 0 0 1 200 17 A 68 68 0 0 1 277 27 A 51 51 0 0 1 348 48 A 34 34 0 0 1 396 75 L 396 110"
              stroke="rgba(247, 217, 120, 0.45)"
              strokeWidth="1"
              strokeDasharray="3 4"
            />

            {/* Apex Floral Finial */}
            <circle cx="200" cy="12" r="3.5" fill="#f7d978" />
            <path d="M 200 2 Q 204 7 200 12 Q 196 7 200 2 Z" fill="#f7d978" />
            <path d="M 194 9 Q 198 10 200 12 Q 196 12 194 9 Z" fill="#f7d978" />
            <path d="M 206 9 Q 202 10 200 12 Q 204 12 206 9 Z" fill="#f7d978" />

            {/* Left and Right corbel brackets */}
            <circle cx="4" cy="72" r="3" fill="#f7d978" />
            <circle cx="396" cy="72" r="3" fill="#f7d978" />
          </svg>
        )}

        {eventKey === 'barat' && (
          <svg viewBox="0 0 400 110" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="barat-spandrel" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 12 0 L 24 12 L 12 24 L 0 12 Z" stroke="rgba(247, 217, 120, 0.32)" strokeWidth="0.8" fill="rgba(23, 144, 148, 0.38)" />
                <circle cx="12" cy="12" r="2" fill="rgba(247, 217, 120, 0.45)" />
              </pattern>
            </defs>

            {/* Top gold moulding line touching bottom of tiles */}
            <line x1="0" y1="1" x2="400" y2="1" stroke="#f7d978" strokeWidth="2" />

            {/* Spandrel fill above arch touching 0 and 400 edge-to-edge */}
            <path
              d="M 0 110 L 0 0 L 400 0 L 400 110 L 400 74 C 400 38, 290 16, 200 10 C 110 16, 0 38, 0 74 Z"
              fill="url(#barat-spandrel)"
            />

            {/* Pointed Persian Arch Moulding touching left and right edges */}
            <path
              d="M 0 110 L 0 74 C 0 38, 110 16, 200 10 C 290 16, 400 38, 400 74 L 400 110"
              stroke="#f7d978"
              strokeWidth="2"
            />

            {/* Inner concentric moulding */}
            <path
              d="M 5 110 L 5 76 C 5 42, 112 21, 200 15 C 288 21, 395 42, 395 76 L 395 110"
              stroke="rgba(247, 217, 120, 0.45)"
              strokeWidth="1"
            />

            {/* Stepped Muqarnas Corbel Facets (Left) */}
            <path d="M 0 74 L 14 74 L 14 66 L 24 66 L 24 58 L 0 58" fill="rgba(247, 217, 120, 0.18)" stroke="#f7d978" strokeWidth="0.8" />
            {/* Stepped Muqarnas Corbel Facets (Right) */}
            <path d="M 400 74 L 386 74 L 386 66 L 376 66 L 376 58 L 400 58" fill="rgba(247, 217, 120, 0.18)" stroke="#f7d978" strokeWidth="0.8" />

            {/* Apex 8-Pointed Star Finial */}
            <rect x="195" y="5" width="10" height="10" fill="#f7d978" />
            <rect x="195" y="5" width="10" height="10" fill="#f7d978" transform="rotate(45 200 10)" />
            <circle cx="200" cy="10" r="2" fill="#061638" />
          </svg>
        )}

        {eventKey === 'walima' && (
          <svg viewBox="0 0 400 115" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Wazir Khan Chevron / Diamond Tilework Spandrels */}
              <pattern id="walima-spandrel" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 0 10 L 10 0 L 20 10 L 10 20 Z" fill="rgba(27, 166, 166, 0.18)" stroke="rgba(247, 217, 120, 0.3)" strokeWidth="0.75" />
                <circle cx="10" cy="10" r="1.8" fill="#f7d978" />
              </pattern>
            </defs>

            {/* Top gold moulding line touching bottom of tiles */}
            <line x1="0" y1="1" x2="400" y2="1" stroke="#f7d978" strokeWidth="2" />

            {/* Spandrel fill above arch touching 0 and 400 edge-to-edge */}
            <path
              d="M 0 115 L 0 0 L 400 0 L 400 115 L 400 76 A 20 20 0 0 0 378 54 A 26 26 0 0 0 344 38 A 32 32 0 0 0 298 25 A 38 38 0 0 0 244 17 A 42 42 0 0 0 200 14 A 42 42 0 0 0 156 17 A 38 38 0 0 0 102 25 A 32 32 0 0 0 56 38 A 26 26 0 0 0 22 54 A 20 20 0 0 0 0 76 Z"
              fill="url(#walima-spandrel)"
            />

            {/* 9-Cusp Wazir Khan Mihrab Arch Outline touching left and right edges */}
            <path
              d="M 0 115 L 0 76 A 20 20 0 0 1 22 54 A 26 26 0 0 1 56 38 A 32 32 0 0 1 102 25 A 38 38 0 0 1 156 17 A 42 42 0 0 1 200 14 A 42 42 0 0 1 244 17 A 38 38 0 0 1 298 25 A 32 32 0 0 1 344 38 A 26 26 0 0 1 378 54 A 20 20 0 0 1 400 76 L 400 115"
              stroke="#f7d978"
              strokeWidth="2"
            />

            {/* Inner Concentric Gold-Beaded Rib */}
            <path
              d="M 4 115 L 4 78 A 18 18 0 0 1 24 58 A 24 24 0 0 1 57 43 A 30 30 0 0 1 102 30 A 36 36 0 0 1 156 22 A 40 40 0 0 1 200 19 A 40 40 0 0 1 244 22 A 36 36 0 0 1 298 30 A 30 30 0 0 1 343 43 A 24 24 0 0 1 376 58 A 18 18 0 0 1 396 78 L 396 115"
              stroke="rgba(247, 217, 120, 0.55)"
              strokeWidth="1.2"
              strokeDasharray="2 4"
            />

            {/* Apex Kalasa Finial */}
            <circle cx="200" cy="14" r="3.5" fill="#f7d978" />
            <path d="M 200 4 L 203 10 L 200 14 L 197 10 Z" fill="#f7d978" />
            <circle cx="200" cy="3" r="1.5" fill="#f7d978" />
          </svg>
        )}
      </div>

      {/* 2. NICHE CONTENT */}
      <div className={s.archContent}>
        {children}
      </div>
    </div>
  );
}
