interface RoseDividerProps {
  className?: string;
  width?: string;
}

/** Bespoke botanical floral divider featuring blushing roses, white jasmine blossoms, and gold filigree. */
export function RoseDivider({ className = '', width = 'clamp(14rem, 60vw, 20rem)' }: RoseDividerProps) {
  const base = import.meta.env.BASE_URL ?? '/';
  const src = `${base}assets/img/rose-divider.webp`;

  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        margin: '1.25rem auto',
        userSelect: 'none',
        pointerEvents: 'none',
      }}
    >
      <img
        src={src}
        alt=""
        style={{
          width,
          height: 'auto',
          filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4))',
          opacity: 0.95,
        }}
        loading="lazy"
      />
    </div>
  );
}
