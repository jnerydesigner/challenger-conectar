/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { LoginDTO } from '@application/dtos/login.dto';
import { AuthService } from '@application/services/auth.service';
import { GoogleAuthGuard } from '@infra/auth/guards/google-auth.guard';
import { env } from '@infra/constants/zod-env.constant';

import { Public } from '@infra/decorators/public.decorator';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() loginBody: LoginDTO) {
    const token = await this.authService.signIn(
      loginBody.username,
      loginBody.password,
    );

    return token;
  }

  @Get('google/login')
  @Public()
  @UseGuards(GoogleAuthGuard)
  googleLogin() {
    console.log('login');
  }

  @UseGuards(GoogleAuthGuard)
  @Public()
  @Get('google/callback')
  googleCallback(@Req() req: Request, @Res() res: Response) {
    console.log(`${env.FRONT_URL}/dashboard?token=${req.user}`);

    res.redirect(`${env.FRONT_URL}/login?token=${req.user}`);
  }
}
