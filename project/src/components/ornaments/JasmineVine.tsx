import { useId } from 'react';
import s from './JasmineVine.module.css';

export function JasmineVine() {
  const id = `vine-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <svg className={s.vine} aria-hidden="true" focusable="false">
      <defs>
        <pattern id={id} width="64" height="32" patternUnits="userSpaceOnUse">
          <path className={s.thread} d="M0 17 C 8 7, 16 27, 24 17 S 40 7, 48 17 S 60 27, 64 17" />
          <g transform="translate(16 8)">
            <use href="#mogra-flower" x="-8" y="-8" width="16" height="16" className={s.flower} />
            <use href="#mogra-leaf" x="7" y="-4" width="12" height="6" className={s.leaf} transform="rotate(-18)" />
          </g>
          <g transform="translate(48 24)">
            <use href="#mogra-flower" x="-8" y="-8" width="16" height="16" className={s.flower} />
            <use href="#mogra-leaf" x="-17" y="-4" width="12" height="6" className={s.leaf} transform="rotate(198)" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
