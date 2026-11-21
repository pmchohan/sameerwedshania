const sharp = require('sharp');

export interface OgImageOptions {
  guestName?: string;
  guestNameUr?: string;
  events?: string[];
  lang?: 'en' | 'ur';
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function generateKashiOgImage(options: OgImageOptions = {}): Promise<Buffer> {
  const isUrdu = options.lang === 'ur';
  const rawName = isUrdu ? (options.guestNameUr || options.guestName || '') : (options.guestName || '');
  const guestDisplay = rawName ? escapeXml(rawName) : (isUrdu ? 'آپ اور آپ کی فیملی' : 'You & Your Family');

  const titleText = isUrdu ? 'سمیر اور ہانیہ' : 'SAMEER &amp; HANIA';
  const subText = isUrdu ? 'شادی کا پُرمسرت دعوت نامہ' : 'WEDDING INVITATION';
  const inviteHeader = isUrdu ? 'معزز و محترم مہمان' : 'CORDIALLY INVITING';

  const eventsList = options.events && options.events.length > 0 ? options.events : ['mehndi', 'barat', 'walima'];

  const eventNamesEn: Record<string, string> = {
    mehndi: 'Mehndi',
    barat: 'Barat',
    walima: 'Walima',
  };

  const eventNamesUr: Record<string, string> = {
    mehndi: 'رسمِ حنا',
    barat: 'بارات',
    walima: 'ولیمہ',
  };

  // Render event badge pills
  const badgeWidth = 140;
  const badgeGap = 20;
  const totalBadgesWidth = eventsList.length * badgeWidth + (eventsList.length - 1) * badgeGap;
  const startX = (1200 - totalBadgesWidth) / 2;

  const badgesSvg = eventsList
    .map((ev, i) => {
      const x = startX + i * (badgeWidth + badgeGap);
      const label = isUrdu ? (eventNamesUr[ev.toLowerCase()] || ev) : (eventNamesEn[ev.toLowerCase()] || ev);
      return `
      <g transform="translate(${x}, 520)">
        <rect width="${badgeWidth}" height="42" rx="21" fill="rgba(6, 22, 56, 0.7)" stroke="#d4af37" stroke-width="1.5" />
        <text x="${badgeWidth / 2}" y="26" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="16" font-weight="700" fill="#f7d978" letter-spacing="1">
          ${escapeXml(label)}
        </text>
      </g>
    `;
    })
    .join('\n');

  const svg = `
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Background Gradient -->
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#030b1e" />
        <stop offset="45%" stop-color="#061638" />
        <stop offset="100%" stop-color="#0a2463" />
      </linearGradient>

      <!-- Gold Gradient -->
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#d4af37" />
        <stop offset="50%" stop-color="#fceda2" />
        <stop offset="100%" stop-color="#b89728" />
      </linearGradient>

      <!-- Turquoise Glow -->
      <radialGradient id="turqGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#1ba6a6" stop-opacity="0.35" />
        <stop offset="100%" stop-color="#061638" stop-opacity="0" />
      </radialGradient>

      <!-- Corner Kashi Star Tile Symbol -->
      <g id="kashiStar">
        <polygon points="0,-28 8,-8 28,0 8,8 0,28 -8,8 -28,0 -8,-8" fill="#1ba6a6" opacity="0.8" />
        <polygon points="-20,-20 0,-10 20,-20 10,0 20,20 0,10 -20,20 -10,0" fill="#d4af37" opacity="0.9" />
        <circle cx="0" cy="0" r="5" fill="#f7d978" />
      </g>
    </defs>

    <!-- Base Canvas -->
    <rect width="1200" height="630" fill="url(#bgGrad)" />

    <!-- Ambient Glow in Centers -->
    <circle cx="600" cy="220" r="340" fill="url(#turqGlow)" />

    <!-- Outer Decorative Border Frame -->
    <rect x="25" y="25" width="1150" height="580" rx="8" fill="none" stroke="#d4af37" stroke-width="1.5" stroke-opacity="0.5" />
    <rect x="35" y="35" width="1130" height="560" rx="6" fill="none" stroke="#1ba6a6" stroke-width="1" stroke-opacity="0.4" />

    <!-- 4 Corner Kashi Star Medallions -->
    <use href="#kashiStar" x="65" y="65" />
    <use href="#kashiStar" x="1135" y="65" />
    <use href="#kashiStar" x="65" y="565" />
    <use href="#kashiStar" x="1135" y="565" />

    <!-- Top Emblem Arch -->
    <g transform="translate(600, 75)">
      <circle cx="0" cy="0" r="22" fill="#061638" stroke="#d4af37" stroke-width="1.5" />
      <polygon points="0,-12 4,-4 12,0 4,4 0,12 -4,4 -12,0 -4,-4" fill="#f7d978" />
    </g>

    <!-- Couple Monogram / Subtitle -->
    <text x="600" y="140" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" font-weight="700" fill="#1ba6a6" letter-spacing="4">
      ${subText}
    </text>

    <!-- Main Couple Names -->
    <text x="600" y="235" text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-size="58" font-weight="700" fill="url(#goldGrad)" letter-spacing="2">
      ${titleText}
    </text>

    <!-- Decorative Central Divider -->
    <g transform="translate(600, 275)">
      <line x1="-180" y1="0" x2="-20" y2="0" stroke="#d4af37" stroke-width="1.5" stroke-opacity="0.6" />
      <polygon points="0,-7 7,0 0,7 -7,0" fill="#1ba6a6" stroke="#d4af37" stroke-width="1" />
      <line x1="20" y1="0" x2="180" y2="0" stroke="#d4af37" stroke-width="1.5" stroke-opacity="0.6" />
    </g>

    <!-- Guest Invitation Banner Box -->
    <g transform="translate(200, 315)">
      <rect width="800" height="155" rx="16" fill="rgba(3, 11, 30, 0.75)" stroke="#d4af37" stroke-width="1.5" stroke-opacity="0.6" />

      <!-- Inviting Tag -->
      <text x="400" y="42" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="700" fill="#94a3b8" letter-spacing="3">
        ${inviteHeader}
      </text>

      <!-- Guest Name Highlight -->
      <text x="400" y="102" text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-size="${guestDisplay.length > 25 ? '32' : '40'}" font-weight="700" fill="#ffffff">
        ${guestDisplay}
      </text>
    </g>

    <!-- Events Badges Row -->
    ${badgesSvg}

    <!-- Bottom Tiny Brand -->
    <text x="600" y="598" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" font-weight="500" fill="#64748b" letter-spacing="2">
      KASHI KARI EDITION • LAHORE
    </text>
  </svg>
  `;

  return sharp(Buffer.from(svg))
    .png({
      compressionLevel: 9,
      adaptiveFiltering: true,
      quality: 90,
    })
    .toBuffer();
}
