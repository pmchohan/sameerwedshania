import s from './CornerOrnament.module.css';

export function CornerOrnament({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 54 54" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M2 52 V16 C2 8.27 8.27 2 16 2 H52"
        stroke="var(--gold-400, #d4af37)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M7 52 V18 C7 11.93 11.93 7 18 7 H52"
        stroke="var(--gold-line, #f7d978)"
        strokeWidth="0.8"
        strokeOpacity="0.6"
        strokeLinecap="round"
      />
      <path
        d="M18 12 L22 18 L18 24 L14 18 Z"
        fill="var(--gold-400, #d4af37)"
      />
      <circle cx="18" cy="18" r="1.5" fill="#061638" />
    </svg>
  );
}
