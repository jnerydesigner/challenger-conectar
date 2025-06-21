import { LoginDTO } from '@application/dtos/login.dto';
import { AuthService } from '@application/services/auth.service';

import { Public } from '@infra/decorators/public.decorator';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(
    @Body() loginBody: LoginDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.signIn(
      loginBody.username,
      loginBody.password,
    );
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      path: '/',
    });

    return { message: 'Login successful' };
  }
}
