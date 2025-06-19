import { LoginDTO } from '@application/dtos/login.dto';
import { AuthService } from '@application/services/auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  login(@Body() loginBody: LoginDTO) {
    return this.authService.signIn(loginBody.username, loginBody.password);
  }
}
