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
          <circle cx="12" cy="12" r="2.2" fill="var(--mogra-center, #f7d978)" />
        </symbol>

        <symbol id="mogra-leaf" viewBox="0 0 24 12">
          <path d="M2 6 Q12 -2 22 6 Q12 14 2 6Z" fill="currentColor" />
          <path d="M2 6 L22 6" stroke="rgba(247, 217, 120, 0.4)" strokeWidth="0.5" />
        </symbol>

        <symbol id="pearl-bead" viewBox="0 0 16 16">
          <radialGradient id="pearl-shimmer" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#f5fff9" />
            <stop offset="85%" stopColor="#cce5d8" />
            <stop offset="100%" stopColor="#8baea0" />
          </radialGradient>
          <circle cx="8" cy="8" r="6.5" fill="url(#pearl-shimmer)" />
          <circle cx="6" cy="5.5" r="1.8" fill="#ffffff" opacity="0.8" />
        </symbol>

        <symbol id="sehra-brooch" viewBox="0 0 80 92">
          {/* Outer gold radiant scalloped petals */}
          <g fill="#f7d978" stroke="#dfb64d" strokeWidth="0.6">
            {Array.from({ length: 12 }, (_, i) => (
              <circle
                key={i}
                cx={40 + 26 * Math.cos((i * 30 * Math.PI) / 180)}
                cy={40 + 26 * Math.sin((i * 30 * Math.PI) / 180)}
                r="4.5"
              />
            ))}
          </g>
          {/* Outer ring */}
          <circle cx="40" cy="40" r="28" fill="#05231c" stroke="#f7d978" strokeWidth="1.8" />
          <circle cx="40" cy="40" r="23" fill="none" stroke="#f7d978" strokeWidth="0.8" strokeDasharray="2 3" />
          {/* Inner emerald cabochon */}
          <radialGradient id="brooch-emerald" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#1b8a6b" />
            <stop offset="65%" stopColor="#0a3a2c" />
            <stop offset="100%" stopColor="#031713" />
          </radialGradient>
          <circle cx="40" cy="40" r="20" fill="url(#brooch-emerald)" stroke="#f7d978" strokeWidth="1.2" />
          {/* Center 8-pointed gold star rosette */}
          <g fill="#f7d978">
            <rect x="36" y="32" width="8" height="16" rx="2" />
            <rect x="36" y="32" width="8" height="16" rx="2" transform="rotate(45 40 40)" />
            <rect x="36" y="32" width="8" height="16" rx="2" transform="rotate(90 40 40)" />
            <rect x="36" y="32" width="8" height="16" rx="2" transform="rotate(135 40 40)" />
            <circle cx="40" cy="40" r="3.2" fill="#ffffff" />
          </g>
          {/* 3 Pearl droplets suspended at bottom */}
          <g transform="translate(40, 68)">
            {/* Center droplet */}
            <line x1="0" y1="0" x2="0" y2="8" stroke="#f7d978" strokeWidth="1.2" />
            <circle cx="0" cy="2" r="1.5" fill="#f7d978" />
            <path d="M 0 6 C 3 9, 3 14, 0 16 C -3 14, -3 9, 0 6 Z" fill="#f5fff9" stroke="#f7d978" strokeWidth="0.8" />
            {/* Left droplet */}
            <line x1="-12" y1="-2" x2="-12" y2="4" stroke="#f7d978" strokeWidth="1" />
            <path d="M -12 3 C -10 5, -10 9, -12 11 C -14 9, -14 5, -12 3 Z" fill="#f5fff9" stroke="#f7d978" strokeWidth="0.7" />
            {/* Right droplet */}
            <line x1="12" y1="-2" x2="12" y2="4" stroke="#f7d978" strokeWidth="1" />
            <path d="M 12 3 C 14 5, 14 9, 12 11 C 10 9, 10 5, 12 3 Z" fill="#f5fff9" stroke="#f7d978" strokeWidth="0.7" />
          </g>
        </symbol>
      </defs>
    </svg>
  );
}
