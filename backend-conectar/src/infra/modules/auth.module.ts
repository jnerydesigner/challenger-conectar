import { AuthService } from '@application/services/auth.service';
import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from '@presenters/auth/auth.controller';
import { UserModule } from './user.module';
import { jwtConstants } from '@infra/constants/jwt-constants';
import { JwtStrategy } from '@infra/auth/strategy/jwt.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, JwtStrategy, ConfigService],
})
export class AuthModule {}
