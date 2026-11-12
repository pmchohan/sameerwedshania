/**
 * The three glazed tile motifs, drawn once. Every tile on the page is a <use> of one of these.
 * Colours come from --tile-* variables, so each region's light recolours its own tiles.
 */
export function TileSprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <symbol id="tile-star" viewBox="0 0 40 40">
          <rect width="40" height="40" fill="var(--tile-base)" />
          <rect x="9" y="9" width="22" height="22" fill="var(--tile-main)" />
          <rect x="9" y="9" width="22" height="22" fill="var(--tile-main)" transform="rotate(45 20 20)" />
          <rect x="14.5" y="14.5" width="11" height="11" fill="var(--tile-accent)" transform="rotate(45 20 20)" />
          <circle cx="20" cy="20" r="2.2" fill="var(--tile-base)" />
          <rect x="0.5" y="0.5" width="39" height="39" fill="none" stroke="var(--tile-grout)" />
        </symbol>
        <symbol id="tile-lozenge" viewBox="0 0 40 40">
          <rect width="40" height="40" fill="var(--tile-base)" />
          <path d="M20 4 L36 20 L20 36 L4 20Z" fill="var(--tile-accent)" />
          <path d="M20 10 L30 20 L20 30 L10 20Z" fill="var(--tile-base)" />
          <circle cx="20" cy="20" r="3" fill="var(--tile-main)" />
          <rect x="0.5" y="0.5" width="39" height="39" fill="none" stroke="var(--tile-grout)" />
        </symbol>
        <symbol id="tile-leaf" viewBox="0 0 40 40">
          <rect width="40" height="40" fill="var(--tile-base)" />
          <g fill="var(--tile-main)">
            <path d="M20 4 C27 11 27 17 20 20 C13 17 13 11 20 4Z" />
            <path d="M20 4 C27 11 27 17 20 20 C13 17 13 11 20 4Z" transform="rotate(90 20 20)" />
            <path d="M20 4 C27 11 27 17 20 20 C13 17 13 11 20 4Z" transform="rotate(180 20 20)" />
            <path d="M20 4 C27 11 27 17 20 20 C13 17 13 11 20 4Z" transform="rotate(270 20 20)" />
          </g>
          <circle cx="20" cy="20" r="3" fill="var(--tile-accent)" />
          <rect x="0.5" y="0.5" width="39" height="39" fill="none" stroke="var(--tile-grout)" />
        </symbol>
      </defs>
    </svg>
  );
}
