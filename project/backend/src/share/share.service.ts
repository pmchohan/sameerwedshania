import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invitation } from '../invitations/entities/invitation.entity';
import { generateKashiOgImage } from './og-generator';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ShareService {
  private readonly logger = new Logger(ShareService.name);

  constructor(
    @InjectRepository(Invitation)
    private readonly invitationRepo: Repository<Invitation>,
    private readonly config: ConfigService,
  ) {}

  async getOgImage(code: string, lang: 'en' | 'ur' = 'en'): Promise<Buffer> {
    const inv = await this.invitationRepo.findOne({
      where: { code: code.toLowerCase().trim() },
    });

    return generateKashiOgImage({
      guestName: inv?.name,
      guestNameUr: inv?.nameUr,
      events: inv?.events,
      lang,
    });
  }

  async getShareHtml(code: string, lang: 'en' | 'ur' = 'en', version?: string, hostHeader?: string): Promise<string> {
    const inv = await this.invitationRepo.findOne({
      where: { code: code.toLowerCase().trim() },
    });

    const isUrdu = lang === 'ur';
    const guestName = inv ? (isUrdu ? (inv.nameUr || inv.name) : inv.name) : (isUrdu ? 'آپ اور آپ کی فیملی' : 'Valued Guest');

    const ogTitle = isUrdu
      ? `سمیر اور ہانیہ — ${guestName} کے لیے شادی کا دعوت نامہ`
      : `Sameer & Hania — Wedding Invitation for ${guestName}`;

    const ogDesc = isUrdu
      ? `آپ کو سمیر اور ہانیہ کی شادی کی پرمسرت تقریبات (مہندی، بارات، ولیمہ) میں شرکت کی دلی دعوت دی جاتی ہے۔`
      : `You are cordially invited to celebrate the wedding celebrations of Sameer & Hania.`;

    // Destination Card URL
    const defaultCardBase = 'https://pmchohan.github.io/sameerwedshania';
    const cardBase = this.config.get<string>('CARD_BASE_URL', defaultCardBase).replace(/\/+$/, '');
    const targetUrl = `${cardBase}/${code}${isUrdu ? '?lang=ur' : ''}`;

    // Backend Base URL for og:image
    const protocol = hostHeader?.includes('localhost') ? 'http' : 'https';
    const backendBase = hostHeader ? `${protocol}://${hostHeader}` : this.config.get<string>('BACKEND_BASE_URL', 'https://pm-oracle.trycloudflare.com');
    const vParam = version ? `&v=${encodeURIComponent(version)}` : `&v=${inv?.updatedAt ? new Date(inv.updatedAt).getTime() : '1'}`;
    const ogImageUrl = `${backendBase}/api/og/${code}?lang=${lang}${vParam}`;

    return `<!DOCTYPE html>
<html lang="${isUrdu ? 'ur' : 'en'}" dir="${isUrdu ? 'rtl' : 'ltr'}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${this.escapeHtml(ogTitle)}</title>
  <meta name="description" content="${this.escapeHtml(ogDesc)}" />

  <!-- Open Graph / WhatsApp / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${this.escapeHtml(targetUrl)}" />
  <meta property="og:title" content="${this.escapeHtml(ogTitle)}" />
  <meta property="og:description" content="${this.escapeHtml(ogDesc)}" />
  <meta property="og:image" content="${this.escapeHtml(ogImageUrl)}" />
  <meta property="og:image:secure_url" content="${this.escapeHtml(ogImageUrl)}" />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Sameer & Hania Wedding Invitation" />
  <meta property="og:site_name" content="Sameer & Hania Wedding" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${this.escapeHtml(ogTitle)}" />
  <meta name="twitter:description" content="${this.escapeHtml(ogDesc)}" />
  <meta name="twitter:image" content="${this.escapeHtml(ogImageUrl)}" />

  <!-- Instant Browser Redirection for Guests -->
  <meta http-equiv="refresh" content="0; url=${this.escapeHtml(targetUrl)}" />
  <script>
    window.location.replace(${JSON.stringify(targetUrl)});
  </script>
  <style>
    body {
      margin: 0;
      padding: 2rem 1rem;
      background: #061638;
      color: #f7d978;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 80vh;
    }
    .card {
      background: rgba(10, 36, 99, 0.6);
      border: 1px solid rgba(212, 175, 55, 0.4);
      border-radius: 16px;
      padding: 2rem;
      max-width: 480px;
      width: 90%;
    }
    h2 {
      font-family: Georgia, serif;
      color: #ffffff;
      margin-bottom: 0.5rem;
    }
    p {
      color: #cbd5e1;
      font-size: 0.95rem;
      line-height: 1.5;
    }
    a {
      display: inline-block;
      margin-top: 1rem;
      padding: 0.65rem 1.25rem;
      background: #d4af37;
      color: #061638;
      text-decoration: none;
      font-weight: bold;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <div class="card">
    <h2>Sameer &amp; Hania</h2>
    <p>Opening your personalized wedding invitation...</p>
    <a href="${this.escapeHtml(targetUrl)}">Open Invitation</a>
  </div>
</body>
</html>`;
  }

  private escapeHtml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
