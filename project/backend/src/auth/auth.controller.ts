import { Controller, Post, Get, Body, Headers, UnauthorizedException } from '@nestjs/common';

@Controller('admin/auth')
export class AuthController {
  @Post('login')
  login(@Body('password') password?: string) {
    const expected = process.env.ADMIN_PASSWORD || 'sameerwedshania2026';
    if (!password || password.trim() !== expected.trim()) {
      throw new UnauthorizedException('Incorrect password');
    }

    const token = Buffer.from(expected).toString('base64');
    return {
      success: true,
      message: 'Authentication successful',
      token,
    };
  }

  @Get('verify')
  verify(
    @Headers('authorization') authHeader?: string,
    @Headers('x-admin-token') tokenHeader?: string,
  ) {
    const expected = process.env.ADMIN_PASSWORD || 'sameerwedshania2026';
    const bearer = authHeader?.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
    const provided = bearer || tokenHeader;
    const expectedToken = Buffer.from(expected).toString('base64');

    if (provided !== expected && provided !== expectedToken) {
      throw new UnauthorizedException('Invalid or expired session');
    }

    return {
      success: true,
      valid: true,
    };
  }
}
