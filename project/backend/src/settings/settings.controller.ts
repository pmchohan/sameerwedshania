import { Controller, Get, Put, Body } from '@nestjs/common';
import { SettingsService } from './settings.service';

@Controller()
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  /**
   * Public: Fetch global wedding details (couple, dates, venues, contacts).
   * GET /api/wedding-details
   */
  @Get('wedding-details')
  async getPublicSettings() {
    const data = await this.settingsService.getAllSettings();
    return {
      success: true,
      data,
    };
  }

  /**
   * Admin: Update wedding settings.
   * PUT /api/admin/settings
   */
  @Put('admin/settings')
  async updateSettings(@Body() body: Record<string, any>) {
    for (const [key, val] of Object.entries(body)) {
      await this.settingsService.setSetting(key, val);
    }
    const updated = await this.settingsService.getAllSettings();
    return {
      success: true,
      data: updated,
    };
  }
}
