import { Controller, Get, Param, Query, Res, Headers } from '@nestjs/common';
import type { Response } from 'express';
import { ShareService } from './share.service';

@Controller()
export class ShareController {
  constructor(private readonly shareService: ShareService) {}

  @Get('og/:code')
  async getOgImage(
    @Param('code') code: string,
    @Query('lang') lang: string,
    @Res() res: Response,
  ) {
    const selectedLang = lang === 'ur' ? 'ur' : 'en';
    const buffer = await this.shareService.getOgImage(code, selectedLang);

    res.set({
      'Content-Type': 'image/png',
      'Content-Length': buffer.length,
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    });

    res.end(buffer);
  }

  @Get('og')
  async getDefaultOgImage(
    @Query('lang') lang: string,
    @Res() res: Response,
  ) {
    const selectedLang = lang === 'ur' ? 'ur' : 'en';
    const buffer = await this.shareService.getOgImage('', selectedLang);

    res.set({
      'Content-Type': 'image/png',
      'Content-Length': buffer.length,
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    });

    res.end(buffer);
  }

  @Get('share/:code')
  async getSharePage(
    @Param('code') code: string,
    @Query('lang') lang: string,
    @Query('v') v: string,
    @Headers('host') hostHeader: string,
    @Res() res: Response,
  ) {
    const selectedLang = lang === 'ur' ? 'ur' : 'en';
    const html = await this.shareService.getShareHtml(code, selectedLang, v, hostHeader);

    res.set({
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=60',
    });

    res.send(html);
  }
}
