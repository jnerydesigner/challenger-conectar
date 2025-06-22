import { AuthService } from '@application/services/auth.service';
import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from '@presenters/auth/auth.controller';
import { UserModule } from './user.module';
import { JwtStrategy } from '@infra/auth/strategy/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { env } from '@infra/constants/zod-env.constant';
import googleOauthConfig from '@infra/auth/config/google.oauth.config';
import { GoogleStrategy } from '@infra/auth/strategy/google-oauth.strategy';

@Module({
  imports: [
    ConfigModule.forFeature(googleOauthConfig),
    JwtModule.register({
      global: true,
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    JwtStrategy,
    ConfigService,
    GoogleStrategy,
  ],
})
export class AuthModule {}
