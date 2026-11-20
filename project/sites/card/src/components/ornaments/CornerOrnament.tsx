import { useTheme } from '@/theme/theme';

interface CornerOrnamentProps {
  className?: string;
  position?: 'tl' | 'tr' | 'bl' | 'br';
}

export function CornerOrnament({ className = '', position = 'tl' }: CornerOrnamentProps) {
  const theme = useTheme();
  const base = import.meta.env.BASE_URL ?? '/';
  const src = `${base}assets/img/corner-ornament.webp`;

  const positionStyles: Record<string, React.CSSProperties> = {
    tl: { top: 'var(--corner-top, 0px)', left: 0 },
    tr: { top: 'var(--corner-top, 0px)', right: 0, transform: 'scaleX(-1)' },
    bl: { bottom: 'var(--corner-bottom, 0px)', left: 0, transform: 'scaleY(-1)' },
    br: { bottom: 'var(--corner-bottom, 0px)', right: 0, transform: 'scale(-1)' },
  };

  if (theme === 'sehra') {
    return (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className={className}
        style={{
          position: 'absolute',
          width: 'clamp(3.8rem, 14vw, 5.8rem)',
          height: 'auto',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 2,
          filter: 'drop-shadow(0 3px 8px rgba(0, 0, 0, 0.45))',
          ...positionStyles[position],
        }}
      >
        {/* Outer gold border corner */}
        <path d="M 0 2 L 75 2 M 2 0 L 2 75" stroke="#f7d978" strokeWidth="2" />
        <path d="M 0 6 L 65 6 M 6 0 L 6 65" stroke="rgba(247, 217, 120, 0.4)" strokeWidth="0.8" strokeDasharray="2 3" />

        {/* Inner scalloped vine arc */}
        <path d="M 2 54 A 52 52 0 0 0 54 2" stroke="rgba(247, 217, 120, 0.55)" strokeWidth="1" fill="none" />
        <path d="M 2 36 A 34 34 0 0 0 36 2" stroke="#f7d978" strokeWidth="1.2" fill="none" />

        {/* Corner Motia flower */}
        <g transform="translate(18, 18)">
          <use href="#mogra-leaf" x="-10" y="-3" width="9" height="5" fill="#2e8a63" transform="rotate(-35)" />
          <use href="#mogra-leaf" x="3" y="-3" width="9" height="5" fill="#2e8a63" transform="rotate(35)" />
          <use href="#mogra-flower" x="-7" y="-7" width="14" height="14" fill="#f5fff9" />
        </g>

        {/* Flanking Jasmine Bud & Pearl */}
        <circle cx="48" cy="10" r="2.5" fill="#f5fff9" stroke="#f7d978" strokeWidth="0.6" />
        <circle cx="10" cy="48" r="2.5" fill="#f5fff9" stroke="#f7d978" strokeWidth="0.6" />
        <circle cx="6" cy="6" r="3" fill="#f7d978" />
      </svg>
    );
  }

  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className={className}
      style={{
        position: 'absolute',
        width: 'clamp(3.8rem, 14vw, 5.8rem)',
        height: 'auto',
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: 2,
        filter: 'drop-shadow(0 3px 10px rgba(0, 0, 0, 0.4))',
        ...positionStyles[position],
      }}
      loading="lazy"
    />
  );
}

/** Renders all four corners pinned to the container. */
export function FourCorners({ className = '' }: { className?: string }) {
  return (
    <>
      <CornerOrnament position="tl" className={className} />
      <CornerOrnament position="tr" className={className} />
      <CornerOrnament position="bl" className={className} />
      <CornerOrnament position="br" className={className} />
    </>
  );
}

