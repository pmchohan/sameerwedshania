import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Invitation } from '../invitations/entities/invitation.entity';
import { ShareService } from './share.service';
import { ShareController } from './share.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Invitation]), ConfigModule],
  controllers: [ShareController],
  providers: [ShareService],
  exports: [ShareService],
})
export class ShareModule {}
