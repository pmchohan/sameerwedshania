interface EventMedallionProps {
  eventKey?: string;
  className?: string;
}

/**
 * Cultural emblem crowning each event card:
 * - Mehndi: Blooming Marigold & Henna Rosette
 * - Barat: Imperial 8-Pointed Star Seal
 * - Walima: Wazir Khan Kashi Sunburst Emblem
 */
export function EventMedallion({ eventKey = 'walima', className = '' }: EventMedallionProps) {
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto 0.75rem',
      }}
    >
      {eventKey === 'mehndi' && (
        <svg width="44" height="44" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Outer petal ring */}
          <circle cx="24" cy="24" r="21" stroke="rgba(247, 217, 120, 0.4)" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="24" cy="24" r="18" fill="rgba(6, 22, 56, 0.8)" stroke="rgba(247, 217, 120, 0.75)" strokeWidth="1.2" />
          {/* 8 Floral petals */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <path
              key={deg}
              d="M 24 10 C 26 15, 26 19, 24 24 C 22 19, 22 15, 24 10 Z"
              fill="rgba(247, 217, 120, 0.85)"
              transform={`rotate(${deg} 24 24)`}
            />
          ))}
          <circle cx="24" cy="24" r="6" fill="#0a2463" stroke="#f7d978" strokeWidth="1.2" />
          <circle cx="24" cy="24" r="2.5" fill="#f7d978" />
        </svg>
      )}

      {eventKey === 'barat' && (
        <svg width="44" height="44" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Regal 8-pointed star */}
          <circle cx="24" cy="24" r="21" stroke="rgba(247, 217, 120, 0.35)" strokeWidth="1" />
          <circle cx="24" cy="24" r="19" stroke="rgba(247, 217, 120, 0.6)" strokeWidth="0.8" />
          {/* Square 1 */}
          <rect
            x="13"
            y="13"
            width="22"
            height="22"
            fill="rgba(23, 144, 148, 0.85)"
            stroke="#f7d978"
            strokeWidth="1.2"
          />
          {/* Square 2 (rotated 45deg) */}
          <rect
            x="13"
            y="13"
            width="22"
            height="22"
            fill="rgba(23, 144, 148, 0.85)"
            stroke="#f7d978"
            strokeWidth="1.2"
            transform="rotate(45 24 24)"
          />
          <circle cx="24" cy="24" r="5" fill="#179094" stroke="#f7d978" strokeWidth="1" />
          <circle cx="24" cy="24" r="2" fill="#f7d978" />
        </svg>
      )}

      {eventKey === 'walima' && (
        <svg width="46" height="46" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Wazir Khan Sunburst Rosette */}
          <circle cx="24" cy="24" r="22" stroke="rgba(27, 166, 166, 0.5)" strokeWidth="1" strokeDasharray="2 3" />
          <circle cx="24" cy="24" r="19" fill="rgba(4, 15, 40, 0.8)" stroke="#f7d978" strokeWidth="1.2" />
          {/* 12 Radiant ray petals */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <path
              key={deg}
              d="M 24 8 L 26 16 L 24 24 L 22 16 Z"
              fill={deg % 60 === 0 ? '#1ba6a6' : '#f7d978'}
              transform={`rotate(${deg} 24 24)`}
            />
          ))}
          <circle cx="24" cy="24" r="7" fill="#0a2463" stroke="#f7d978" strokeWidth="1.2" />
          <circle cx="24" cy="24" r="3" fill="#f7d978" />
        </svg>
      )}
    </div>
  );
}
