import { useId } from 'react';
import s from './DarwazaLeaf.module.css';

/** One half of the lacquered door: jali panels, a floral vine and a gold cartouche. */
export function DarwazaLeaf({ side }: { side: 'left' | 'right' }) {
  const id = `door-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;

  return (
    <svg
      className={s.leaf}
      data-side={side}
      viewBox="0 0 200 600"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-lacquer`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--dz-lacquer-hi)" />
          <stop offset="0.55" stopColor="var(--dz-lacquer)" />
          <stop offset="1" stopColor="var(--dz-lacquer-lo)" />
        </linearGradient>
        <pattern id={`${id}-jali`} width="24" height="24" patternUnits="userSpaceOnUse">
          <path className={s.jaliLine} d="M0 12 L12 0 L24 12 L12 24 Z" />
          <path className={s.jaliLine} d="M0 0 L24 24 M24 0 L0 24" />
          <circle className={s.jaliDot} cx="12" cy="12" r="1.2" />
        </pattern>
      </defs>

      <rect className={s.lacquer} width="200" height="600" fill={`url(#${id}-lacquer)`} />
      <rect className={s.edge} x="7" y="7" width="186" height="586" />
      <rect className={s.edgeInner} x="14" y="14" width="172" height="572" />

      <path
        className={s.jaliField}
        d="M26 238 V92 C26 56 50 33 82 28 C94 26 97 13 100 5 C103 13 106 26 118 28 C150 33 174 56 174 92 V238 Z"
        fill={`url(#${id}-jali)`}
      />
      <path
        className={s.jaliField}
        d="M26 566 V438 C26 417 44 400 72 396 C88 393 94 382 100 371 C106 382 112 393 128 396 C156 400 174 417 174 438 V566 Z"
        fill={`url(#${id}-jali)`}
      />

      <path
        className={s.cartouche}
        d="M38 310 C38 286 56 272 76 270 C84 254 92 246 100 246 C108 246 116 254 124 270 C144 272 162 286 162 310 C162 334 144 348 124 350 C116 366 108 374 100 374 C92 374 84 366 76 350 C56 348 38 334 38 310 Z"
      />
      <path
        className={s.cartoucheInner}
        d="M48 310 C48 291 62 280 80 278 C88 262 94 254 100 254 C106 254 112 262 120 278 C138 280 152 291 152 310 C152 329 138 340 120 342 C112 358 106 366 100 366 C94 366 88 358 80 342 C62 340 48 329 48 310 Z"
      />

      <g className={s.rosette}>
        <circle cx="100" cy="310" r="13" />
        <path d="M100 291 C108 298 108 305 100 310 C92 305 92 298 100 291Z" />
        <path d="M119 310 C112 318 105 318 100 310 C105 302 112 302 119 310Z" />
        <path d="M100 329 C92 322 92 315 100 310 C108 315 108 322 100 329Z" />
        <path d="M81 310 C88 302 95 302 100 310 C95 318 88 318 81 310Z" />
        <circle className={s.rosetteCore} cx="100" cy="310" r="3" />
      </g>

      <g className={s.vine}>
        <path d="M22 42 C12 92 31 126 20 172 C9 218 30 250 21 294 C12 338 31 376 20 420 C9 464 30 502 21 548" />
        <path d="M178 42 C188 92 169 126 180 172 C191 218 170 250 179 294 C188 338 169 376 180 420 C191 464 170 502 179 548" />
        <path d="M32 574 C64 558 84 578 100 566 C116 578 136 558 168 574" />
        <path d="M24 42 C42 30 58 44 68 32 M176 42 C158 30 142 44 132 32" />
      </g>

      <g className={s.flowers}>
        {[
          [20, 92],
          [21, 172],
          [20, 294],
          [21, 420],
          [22, 548],
          [180, 92],
          [179, 172],
          [180, 294],
          [179, 420],
          [178, 548],
          [48, 574],
          [76, 570],
          [124, 570],
          [152, 574],
        ].map(([cx, cy]) => (
          <g key={`${cx}-${cy}`} transform={`translate(${cx} ${cy})`}>
            <circle className={s.flowerLeaf} cx="-5" cy="4" r="3.2" />
            <circle className={s.flowerLeaf} cx="5" cy="4" r="3.2" />
            <circle className={s.flower} cx="0" cy="0" r="3.6" />
            <circle className={s.flowerCore} cx="0" cy="0" r="1.1" />
          </g>
        ))}
      </g>

      <g className={s.studs}>
        <circle cx="22" cy="238" r="1.6" />
        <circle cx="178" cy="238" r="1.6" />
        <circle cx="22" cy="396" r="1.6" />
        <circle cx="178" cy="396" r="1.6" />
        <circle cx="100" cy="26" r="1.4" />
        <circle cx="100" cy="574" r="1.4" />
      </g>
    </svg>
  );
}
