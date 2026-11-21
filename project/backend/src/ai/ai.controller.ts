import { Controller, Post, Body, Headers, UseGuards } from '@nestjs/common';
import { AiService, UrduAssistRequest } from './ai.service';
import { AdminAuthGuard } from '../auth/auth.guard';

@Controller('admin/ai')
@UseGuards(AdminAuthGuard)
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('urdu-assist')
  async assistUrdu(
    @Body() body: UrduAssistRequest,
    @Headers('x-groq-api-key') groqKeyHeader?: string,
  ) {
    const groqApiKey = body.groqApiKey || groqKeyHeader;
    return this.aiService.generateUrdu({
      ...body,
      groqApiKey,
    });
  }
}
