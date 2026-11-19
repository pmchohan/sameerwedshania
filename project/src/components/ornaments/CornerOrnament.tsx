interface CornerOrnamentProps {
  className?: string;
  position?: 'tl' | 'tr' | 'bl' | 'br';
}

export function CornerOrnament({ className = '', position = 'tl' }: CornerOrnamentProps) {
  const base = import.meta.env.BASE_URL ?? '/';
  const src = `${base}assets/img/corner-ornament.webp`;

  const positionStyles: Record<string, React.CSSProperties> = {
    tl: { top: 'var(--corner-top, 0px)', left: 0 },
    tr: { top: 'var(--corner-top, 0px)', right: 0, transform: 'scaleX(-1)' },
    bl: { bottom: 'var(--corner-bottom, 0px)', left: 0, transform: 'scaleY(-1)' },
    br: { bottom: 'var(--corner-bottom, 0px)', right: 0, transform: 'scale(-1)' },
  };

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

