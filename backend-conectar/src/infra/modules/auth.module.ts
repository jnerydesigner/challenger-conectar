import { AuthService } from '@application/services/auth.service';
import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from '@presenters/auth/auth.controller';
import { UserModule } from './user.module';
import { JwtStrategy } from '@infra/auth/strategy/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { env } from '@infra/constants/zod-env.constant';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, JwtStrategy, ConfigService],
})
export class AuthModule {}
