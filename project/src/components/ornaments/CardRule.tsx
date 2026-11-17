import s from './CardRule.module.css';

export function CardRule() {
  return (
    <svg className={s.rule} viewBox="0 0 320 32" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path className={s.line} d="M0 8 H145 M175 8 H320" />
      <path className={s.lineSoft} d="M0 24 H145 M175 24 H320" />
      <path className={s.diamond} d="M160 3 L168 16 L160 29 L152 16 Z" />
      <circle className={s.dot} cx="160" cy="16" r="1.6" />
    </svg>
  );
}
