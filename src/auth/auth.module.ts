import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configService } from '../config/config.service';

@Module({
  imports: [
    // MonitorShared,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async () => {
        const jwt = configService.getJwt();
        return {
          secret: jwt.secret, //TODO 记住管理员后台要和前台进行分开
          signOptions: { expiresIn: 3600 * 24 * 7 }, //default 7 days
        };
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [
    AuthService,
    JwtModule, //export module
  ],
})
export class AuthModule {}
