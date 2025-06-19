import { AuthService } from '@application/services/auth.service';
import { Module } from '@nestjs/common';
import { AuthController } from '@presenters/auth/auth.controller';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
