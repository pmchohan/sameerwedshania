import s from './DarwazaOrnament.module.css';

/** A band of courtyard ornament: a jali arch, hanging lanterns and a rose vine. */
export function DarwazaOrnament() {
  return (
    <svg className={s.ornament} viewBox="0 0 390 112" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path className={s.rule} d="M0 26 H142 M248 26 H390" />
      <path className={s.ruleSoft} d="M0 31 H134 M256 31 H390" />

      <path className={s.arch} d="M156 108 V44 C156 30 168 20 180 17 C186 15 190 9 195 3 C200 9 204 15 210 17 C222 20 234 30 234 44 V108" />
      <path className={s.archInner} d="M164 108 V46 C164 34 174 26 184 23 C189 22 192 17 195 12 C198 17 201 22 206 23 C216 26 226 34 226 46 V108" />
      <path className={s.archDot} d="M195 42 L199 52 L195 62 L191 52 Z" />

      <g className={s.lantern}>
        <path className={s.chain} d="M78 31 V58 M312 31 V58" />
        <path className={s.body} d="M70 64 H86 L90 74 L86 84 H70 L66 74 Z" />
        <path className={s.slats} d="M74 64 V84 M78 62 V86 M82 64 V84" />
        <path className={s.flame} d="M78 71 L81 77 L78 80 L75 77 Z" />
      </g>

      <g className={s.lantern}>
        <path className={s.body} d="M304 64 H320 L324 74 L320 84 H304 L300 74 Z" />
        <path className={s.slats} d="M308 64 V84 M312 62 V86 M316 64 V84" />
        <path className={s.flame} d="M312 71 L315 77 L312 80 L309 77 Z" />
      </g>

      <path className={s.vine} d="M0 94 C20 82 36 104 56 94 C76 84 92 104 112 94 C132 84 148 104 168 94" />
      <path className={s.vine} d="M222 94 C242 84 258 104 278 94 C298 84 314 104 334 94 C354 84 370 104 390 94" />
      <g className={s.flowers}>
        {[20, 56, 92, 128, 164, 226, 262, 298, 334, 370].map((cx) => (
          <g key={cx} transform={`translate(${cx} 94)`}>
            <circle cx="-5" cy="4" r="2.6" />
            <circle cx="5" cy="4" r="2.6" />
            <circle cx="0" cy="0" r="3" />
          </g>
        ))}
      </g>

      <g className={s.stars}>
        <path d="M34 12 L36 16 L40 18 L36 20 L34 24 L32 20 L28 18 L32 16 Z" />
        <path d="M356 12 L358 16 L362 18 L358 20 L356 24 L354 20 L350 18 L354 16 Z" />
        <path d="M195 82 L197 86 L201 88 L197 90 L195 94 L193 90 L189 88 L193 86 Z" />
      </g>
    </svg>
  );
}
