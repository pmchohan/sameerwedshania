import { useId } from 'react';
import { noise } from '@/lib/ornament';
import s from './DarwazaCourtyard.module.css';

const STARS = Array.from({ length: 52 }, (_, i) => ({
  x: noise(i * 2.17) * 360,
  y: noise(i * 4.73 + 8) * 330,
  r: 0.45 + noise(i * 7.31 + 3) * 0.85,
  o: 0.3 + noise(i * 3.11 + 5) * 0.65,
}));

const PETALS = Array.from({ length: 12 }, (_, i) => ({
  x: 34 + noise(i * 5.9 + 2) * 292,
  y: 532 + noise(i * 8.2 + 7) * 54,
  r: 1.1 + noise(i * 2.8 + 4) * 1.7,
}));

/** The lit courtyard behind the door: a Mughal arch, hanging lanterns and a reflecting floor. */
export function DarwazaCourtyard() {
  const id = `court-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;

  return (
    <svg className={s.scene} viewBox="0 0 360 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--dz-sky-top)" />
          <stop offset="0.56" stopColor="var(--dz-sky-mid)" />
          <stop offset="1" stopColor="var(--dz-sky-low)" />
        </linearGradient>
        <linearGradient id={`${id}-floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--dz-mid)" />
          <stop offset="1" stopColor="var(--dz-floor)" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.5" cy="0.63" r="0.55">
          <stop offset="0" stopColor="var(--dz-gold-hi)" stopOpacity="0.9" />
          <stop offset="0.35" stopColor="var(--dz-gold)" stopOpacity="0.34" />
          <stop offset="1" stopColor="var(--dz-gold)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-inner`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--dz-gold-hi)" stopOpacity="0.96" />
          <stop offset="0.5" stopColor="var(--dz-gold)" stopOpacity="0.72" />
          <stop offset="1" stopColor="var(--dz-window-b)" stopOpacity="0.26" />
        </linearGradient>
        <linearGradient id={`${id}-reflection`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--dz-window-b)" stopOpacity="0.46" />
          <stop offset="0.5" stopColor="var(--dz-gold)" stopOpacity="0.2" />
          <stop offset="1" stopColor="var(--dz-floor)" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="360" height="600" fill={`url(#${id}-sky)`} />
      <ellipse cx="180" cy="392" rx="208" ry="260" fill={`url(#${id}-glow)`} />

      <g className={s.stars}>
        {STARS.map((star, i) => (
          <circle key={i} cx={star.x} cy={star.y} r={star.r} opacity={star.o} />
        ))}
      </g>

      <g className={s.moon}>
        <circle cx="294" cy="72" r="34" opacity="0.12" />
        <path d="M304 48 A24 24 0 1 0 304 96 A18.5 18.5 0 1 1 304 48Z" />
      </g>

      <g className={s.farPalace}>
        <path d="M0 286 V238 H42 V206 H76 V238 H112 V196 H134 V238 H226 V196 H248 V238 H284 V206 H318 V238 H360 V286 Z" />
        <path d="M20 238 V218 H34 V238 M52 218 V202 H66 V238 M88 238 V210 H102 V238 M152 238 V196 H166 V238 M194 238 V196 H208 V238 M258 238 V210 H272 V238 M296 238 V202 H310 V238" />
        <path d="M180 238 V214 C180 198 194 188 204 184 C212 181 216 174 218 166 C220 174 224 181 232 184 C242 188 256 198 256 214 V238 Z" />
      </g>

      <g className={s.arch}>
        <path
          className={s.archFill}
          d="M42 548 V268 C42 224 74 198 112 188 C136 182 144 160 150 128 C154 108 164 94 180 86 C196 94 206 108 210 128 C216 160 224 182 248 188 C286 198 318 224 318 268 V548 Z"
        />
        <path
          className={s.archLine}
          d="M42 548 V268 C42 224 74 198 112 188 C136 182 144 160 150 128 C154 108 164 94 180 86 C196 94 206 108 210 128 C216 160 224 182 248 188 C286 198 318 224 318 268 V548 Z"
        />
        <path className={s.archInnerLine} d="M54 548 V270 C54 231 82 209 116 199 C144 191 152 168 158 139 C162 121 169 108 180 101 C191 108 198 121 202 139 C208 168 216 191 244 199 C278 209 306 231 306 270 V548 Z" />
        <path className={s.archInnerLine} d="M68 548 V274 C68 240 92 222 122 212 C152 202 160 180 166 151 C169 135 174 124 180 118 C186 124 191 135 194 151 C200 180 208 202 238 212 C268 222 292 240 292 274 V548 Z" />
      </g>

      <g className={s.innerDoor}>
        <path
          d="M126 548 V328 C126 294 148 274 168 266 C174 263 177 256 180 246 C183 256 186 263 192 266 C212 274 234 294 234 328 V548 Z"
          fill={`url(#${id}-inner)`}
        />
        <path className={s.innerLine} d="M126 548 V328 C126 294 148 274 168 266 C174 263 177 256 180 246 C183 256 186 263 192 266 C212 274 234 294 234 328 V548 Z" />
        <path className={s.innerLine} d="M139 548 V332 C139 304 155 287 171 280 C176 278 179 271 180 264 C181 271 184 278 189 280 C205 287 221 304 221 332 V548 Z" />
        <path className={s.innerLight} d="M152 548 V338 C152 316 163 302 174 296 C178 294 179 290 180 286 C181 290 182 294 186 296 C197 302 208 316 208 338 V548 Z" />
      </g>

      <g className={s.lanterns}>
        <path className={s.chain} d="M92 190 V252 M268 190 V252" />
        <g transform="translate(92 258)">
          <path className={s.lanternBody} d="M-9 -10 H9 L13 0 L9 10 H-9 L-13 0 Z" />
          <path className={s.lanternLine} d="M-5 -10 V10 M0 -12 V12 M5 -10 V10" />
          <circle className={s.lanternGlow} r="18" />
          <circle className={s.lanternFlame} r="2.4" />
        </g>
        <g transform="translate(268 258)">
          <path className={s.lanternBody} d="M-9 -10 H9 L13 0 L9 10 H-9 L-13 0 Z" />
          <path className={s.lanternLine} d="M-5 -10 V10 M0 -12 V12 M5 -10 V10" />
          <circle className={s.lanternGlow} r="18" />
          <circle className={s.lanternFlame} r="2.4" />
        </g>
      </g>

      <g className={s.pilasters}>
        <path d="M28 548 V248 H38 V548 Z M322 548 V248 H332 V548 Z" />
        <path d="M24 248 H42 V256 H24 Z M318 248 H336 V256 H318 Z" />
      </g>

      <g className={s.garland}>
        <path d="M20 222 C48 254 72 254 96 228 C120 202 144 202 168 228 C192 254 216 254 240 228 C264 202 288 202 312 228 C324 241 334 246 344 244" />
        <path d="M20 238 C50 268 72 268 96 242 C120 216 144 216 168 242 C192 268 216 268 240 242 C264 216 288 216 312 242 C324 255 334 260 344 258" />
        {[
          [44, 246],
          [68, 256],
          [104, 238],
          [128, 219],
          [152, 219],
          [176, 238],
          [200, 256],
          [224, 256],
          [248, 238],
          [272, 219],
          [296, 219],
          [320, 238],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} className={s.garlandFlower} cx={cx} cy={cy} r="2.6" />
        ))}
      </g>

      <rect className={s.floor} y="486" width="360" height="114" fill={`url(#${id}-floor)`} />
      <g className={s.reflection}>
        <path d="M180 486 V600 M126 492 L118 600 M234 492 L242 600 M84 496 L64 600 M276 496 L296 600" />
        <ellipse cx="180" cy="566" rx="88" ry="26" fill={`url(#${id}-reflection)`} />
      </g>

      <g className={s.petals}>
        {PETALS.map((petal, i) => (
          <ellipse key={i} cx={petal.x} cy={petal.y} rx={petal.r * 1.8} ry={petal.r} transform={`rotate(${noise(i * 9.2) * 180} ${petal.x} ${petal.y})`} />
        ))}
      </g>

      <g className={s.floorLights}>
        <path d="M54 520 H80 M280 520 H306 M98 544 H112 M248 544 H262" />
        <circle cx="54" cy="520" r="2.2" />
        <circle cx="306" cy="520" r="2.2" />
        <circle cx="98" cy="544" r="1.8" />
        <circle cx="262" cy="544" r="1.8" />
      </g>
    </svg>
  );
}
