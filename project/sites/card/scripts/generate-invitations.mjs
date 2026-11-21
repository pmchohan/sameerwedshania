import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const sharp = require(resolve(process.cwd(), '../../node_modules/sharp'));

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const distDir = resolve(rootDir, 'dist');
const publicImgDir = resolve(rootDir, 'public/assets/img');
const distImgDir = resolve(distDir, 'assets/img');

mkdirSync(publicImgDir, { recursive: true });
mkdirSync(distImgDir, { recursive: true });

function escapeXml(unsafe) {
  return String(unsafe || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function renderOgBanner(guestName, guestNameUr, events, lang = 'en') {
  const isUrdu = lang === 'ur';
  const rawName = isUrdu ? (guestNameUr || guestName || '') : (guestName || '');
  const guestDisplay = rawName ? escapeXml(rawName) : (isUrdu ? 'آپ اور آپ کی فیملی' : 'Valued Guest & Family');

  const titleText = isUrdu ? 'سمیر اور ہانیہ' : 'SAMEER &amp; HANIA';
  const subText = isUrdu ? 'شادی کا پُرمسرت دعوت نامہ' : 'WEDDING INVITATION';
  const inviteHeader = isUrdu ? 'معزز و محترم مہمان' : 'CORDIALLY INVITING';

  const eventsList = events && events.length > 0 ? events : ['mehndi', 'barat', 'walima'];

  const eventNamesEn = { mehndi: 'Mehndi', barat: 'Barat', walima: 'Walima' };
  const eventNamesUr = { mehndi: 'رسمِ حنا', barat: 'بارات', walima: 'ولیمہ' };

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
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#030b1e" />
        <stop offset="45%" stop-color="#061638" />
        <stop offset="100%" stop-color="#0a2463" />
      </linearGradient>

      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#d4af37" />
        <stop offset="50%" stop-color="#fceda2" />
        <stop offset="100%" stop-color="#b89728" />
      </linearGradient>

      <radialGradient id="turqGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#1ba6a6" stop-opacity="0.35" />
        <stop offset="100%" stop-color="#061638" stop-opacity="0" />
      </radialGradient>

      <g id="kashiStar">
        <polygon points="0,-28 8,-8 28,0 8,8 0,28 -8,8 -28,0 -8,-8" fill="#1ba6a6" opacity="0.8" />
        <polygon points="-20,-20 0,-10 20,-20 10,0 20,20 0,10 -20,20 -10,0" fill="#d4af37" opacity="0.9" />
        <circle cx="0" cy="0" r="5" fill="#f7d978" />
      </g>
    </defs>

    <rect width="1200" height="630" fill="url(#bgGrad)" />
    <circle cx="600" cy="220" r="340" fill="url(#turqGlow)" />

    <rect x="25" y="25" width="1150" height="580" rx="8" fill="none" stroke="#d4af37" stroke-width="1.5" stroke-opacity="0.5" />
    <rect x="35" y="35" width="1130" height="560" rx="6" fill="none" stroke="#1ba6a6" stroke-width="1" stroke-opacity="0.4" />

    <use href="#kashiStar" x="65" y="65" />
    <use href="#kashiStar" x="1135" y="65" />
    <use href="#kashiStar" x="65" y="565" />
    <use href="#kashiStar" x="1135" y="565" />

    <g transform="translate(600, 75)">
      <circle cx="0" cy="0" r="22" fill="#061638" stroke="#d4af37" stroke-width="1.5" />
      <polygon points="0,-12 4,-4 12,0 4,4 0,12 -4,4 -12,0 -4,-4" fill="#f7d978" />
    </g>

    <text x="600" y="140" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" font-weight="700" fill="#1ba6a6" letter-spacing="4">
      ${subText}
    </text>

    <text x="600" y="235" text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-size="58" font-weight="700" fill="url(#goldGrad)" letter-spacing="2">
      ${titleText}
    </text>

    <g transform="translate(600, 275)">
      <line x1="-180" y1="0" x2="-20" y2="0" stroke="#d4af37" stroke-width="1.5" stroke-opacity="0.6" />
      <polygon points="0,-7 7,0 0,7 -7,0" fill="#1ba6a6" stroke="#d4af37" stroke-width="1" />
      <line x1="20" y1="0" x2="180" y2="0" stroke="#d4af37" stroke-width="1.5" stroke-opacity="0.6" />
    </g>

    <g transform="translate(200, 315)">
      <rect width="800" height="155" rx="16" fill="rgba(3, 11, 30, 0.75)" stroke="#d4af37" stroke-width="1.5" stroke-opacity="0.6" />

      <text x="400" y="42" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="700" fill="#94a3b8" letter-spacing="3">
        ${inviteHeader}
      </text>

      <text x="400" y="102" text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-size="${guestDisplay.length > 25 ? '32' : '40'}" font-weight="700" fill="#ffffff">
        ${guestDisplay}
      </text>
    </g>

    ${badgesSvg}

    <text x="600" y="598" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" font-weight="500" fill="#64748b" letter-spacing="2">
      KASHI KARI EDITION • LAHORE
    </text>
  </svg>
  `;

  return sharp(Buffer.from(svg))
    .png({ compressionLevel: 9, adaptiveFiltering: true, quality: 90 })
    .toBuffer();
}

async function main() {
  console.log('Generating personalized invitation pages and OG banners for GitHub Pages...');

  const indexPath = resolve(distDir, 'index.html');
  if (!existsSync(indexPath)) {
    console.error('dist/index.html not found! Run vite build first.');
    process.exit(1);
  }

  const baseHtml = readFileSync(indexPath, 'utf-8');

  // Also ensure 404.html is written
  writeFileSync(resolve(distDir, '404.html'), baseHtml);

  // Default guests from config (guaranteed fallback)
  const guestsMap = new Map();
  guestsMap.set('achunp', { code: 'achunp', name: 'Ali', nameUr: 'علی', events: ['walima'] });
  guestsMap.set('xzzium', { code: 'xzzium', name: 'Ahmed', nameUr: 'احمد', events: ['mehndi', 'barat', 'walima'] });

  // Try fetching all live guests from backend API to pre-render newly added invitations
  try {
    const apiBase = process.env.VITE_API_URL || 'https://soft-decide-coordinated-manhattan.trycloudflare.com/api';
    const res = await fetch(`${apiBase}/invitations-manifest`, { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        for (const guest of json.data) {
          if (guest.code && guest.name) {
            guestsMap.set(guest.code.toLowerCase(), {
              code: guest.code.toLowerCase(),
              name: guest.name,
              nameUr: guest.nameUr || '',
              events: guest.events || ['mehndi', 'barat', 'walima'],
            });
          }
        }
        console.log(`Fetched ${json.data.length} invitations from backend API database.`);
      }
    }
  } catch (e) {
    console.log('Backend connection timed out or inactive; using local configured guest list.');
  }

  // Pre-generate static files for each guest
  for (const [code, guest] of guestsMap.entries()) {
    console.log(`Generating pages for guest: ${code} (${guest.name})...`);

    // 1. Generate OG Banners (English & Urdu)
    const enBanner = await renderOgBanner(guest.name, guest.nameUr, guest.events, 'en');
    const urBanner = await renderOgBanner(guest.name, guest.nameUr, guest.events, 'ur');

    const enImgDist = resolve(distImgDir, `og-${code}.png`);
    const urImgDist = resolve(distImgDir, `og-${code}-ur.png`);
    writeFileSync(enImgDist, enBanner);
    writeFileSync(urImgDist, urBanner);

    // Also persist into public/ so future builds keep them
    writeFileSync(resolve(publicImgDir, `og-${code}.png`), enBanner);
    writeFileSync(resolve(publicImgDir, `og-${code}-ur.png`), urBanner);

    // 2. Generate English guest page: dist/<code>/index.html
    const guestDir = resolve(distDir, code);
    mkdirSync(guestDir, { recursive: true });

    const enTitle = `Sameer &amp; Hania — Wedding Invitation for ${guest.name}`;
    const enDesc = `You are cordially invited to celebrate the wedding celebrations of Sameer &amp; Hania.`;
    const enImgUrl = `https://pmchohan.github.io/sameerwedshania/assets/img/og-${code}.png`;
    const enPageUrl = `https://pmchohan.github.io/sameerwedshania/${code}`;

    let guestHtml = baseHtml
      .replace(/<title>.*?<\/title>/, `<title>${enTitle}</title>`)
      .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${enTitle}" />`)
      .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${enDesc}" />`)
      .replace(/<meta property="og:image" content=".*?" \/>/, `<meta property="og:image" content="${enImgUrl}" />`)
      .replace(/<meta property="og:image:secure_url" content=".*?" \/>/, `<meta property="og:image:secure_url" content="${enImgUrl}" />`)
      .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${enTitle}" />`)
      .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${enDesc}" />`)
      .replace(/<meta name="twitter:image" content=".*?" \/>/, `<meta name="twitter:image" content="${enImgUrl}" />`);

    writeFileSync(resolve(guestDir, 'index.html'), guestHtml);

    // 3. Generate Urdu guest page: dist/<code>/ur/index.html
    const urduDir = resolve(guestDir, 'ur');
    mkdirSync(urduDir, { recursive: true });

    const urTitle = `سمیر اور ہانیہ — ${guest.nameUr || guest.name} کے لیے شادی کا دعوت نامہ`;
    const urDesc = `آپ کو سمیر اور ہانیہ کی شادی کی پرمسرت تقریبات میں شرکت کی دلی دعوت دی جاتی ہے۔`;
    const urImgUrl = `https://pmchohan.github.io/sameerwedshania/assets/img/og-${code}-ur.png`;
    const urPageUrl = `https://pmchohan.github.io/sameerwedshania/${code}/ur`;

    let urduHtml = baseHtml
      .replace(/<html lang="en">/, '<html lang="ur" dir="rtl">')
      .replace(/<title>.*?<\/title>/, `<title>${urTitle}</title>`)
      .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${urTitle}" />`)
      .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${urDesc}" />`)
      .replace(/<meta property="og:image" content=".*?" \/>/, `<meta property="og:image" content="${urImgUrl}" />`)
      .replace(/<meta property="og:image:secure_url" content=".*?" \/>/, `<meta property="og:image:secure_url" content="${urImgUrl}" />`)
      .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${urTitle}" />`)
      .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${urDesc}" />`)
      .replace(/<meta name="twitter:image" content=".*?" \/>/, `<meta name="twitter:image" content="${urImgUrl}" />`);

    writeFileSync(resolve(urduDir, 'index.html'), urduHtml);
  }

  console.log('✓ Successfully generated all static invitation routes and OG assets!');
}

main().catch((err) => {
  console.error('Error generating invitation pages:', err);
  process.exit(1);
});
