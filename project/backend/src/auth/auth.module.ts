import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AdminAuthGuard } from './auth.guard';

@Module({
  controllers: [AuthController],
  providers: [AdminAuthGuard],
  exports: [AdminAuthGuard],
})
export class AuthModule {}
