import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'] || '';
    const tokenHeader = request.headers['x-admin-token'] || '';

    const expectedPassword = process.env.ADMIN_PASSWORD || 'sameerwedshania2026';
    const bearer = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
    const provided = bearer || tokenHeader;

    if (!provided) {
      throw new UnauthorizedException('Authentication required');
    }

    const expectedToken = Buffer.from(expectedPassword).toString('base64');
    if (provided === expectedPassword || provided === expectedToken) {
      return true;
    }

    throw new UnauthorizedException('Invalid or expired credentials');
  }
}
