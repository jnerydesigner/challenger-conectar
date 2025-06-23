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
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

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
    console.log(
      'Essa é a url de callback: ' +
        `${env.FRONT_URL}/callback?token=${req.user}`,
    );

    console.log('Requ User', req.user);

    const url = `${env.FRONT_URL}/callback?token=${req.user}`;

    res.redirect(url);
  }

  @Get('me')
  async getProfile(@Req() req: Request) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token não fornecido.');
    }

    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: env.JWT_SECRET,
      });

      return decoded;
    } catch (err: any) {
      throw new UnauthorizedException(
        'Token inválido ou expirado. ' + JSON.stringify(err),
      );
    }
  }
}
