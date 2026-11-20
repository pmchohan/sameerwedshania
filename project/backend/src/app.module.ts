import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invitation } from './invitations/entities/invitation.entity';
import { WeddingSetting } from './settings/entities/setting.entity';
import { InvitationsModule } from './invitations/invitations.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: Number(config.get<number>('DB_PORT', 3306)),
        username: config.get<string>('DB_USERNAME', 'wedding_user'),
        password: config.get<string>('DB_PASSWORD', 'WeddingSecurePass2026!'),
        database: config.get<string>('DB_NAME', 'wedding_db'),
        entities: [Invitation, WeddingSetting],
        synchronize: config.get<string>('DB_SYNCHRONIZE', 'true') === 'true',
        charset: 'utf8mb4_unicode_ci',
      }),
    }),
    InvitationsModule,
    SettingsModule,
  ],
})
export class AppModule {}
