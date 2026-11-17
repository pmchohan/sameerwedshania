export function JasmineSprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <symbol id="mogra-flower" viewBox="0 0 24 24">
          <g fill="currentColor">
            <ellipse cx="12" cy="5.5" rx="3.1" ry="5.2" />
            <ellipse cx="12" cy="5.5" rx="3.1" ry="5.2" transform="rotate(72 12 12)" />
            <ellipse cx="12" cy="5.5" rx="3.1" ry="5.2" transform="rotate(144 12 12)" />
            <ellipse cx="12" cy="5.5" rx="3.1" ry="5.2" transform="rotate(216 12 12)" />
            <ellipse cx="12" cy="5.5" rx="3.1" ry="5.2" transform="rotate(288 12 12)" />
          </g>
          <circle cx="12" cy="12" r="2.1" fill="var(--mogra-center, currentColor)" />
        </symbol>
        <symbol id="mogra-leaf" viewBox="0 0 24 12">
          <path d="M2 6 Q12 -2 22 6 Q12 14 2 6Z" fill="currentColor" />
        </symbol>
      </defs>
    </svg>
  );
}
