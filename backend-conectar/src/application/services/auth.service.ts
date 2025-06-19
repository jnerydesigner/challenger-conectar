import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '@infra/constants/jwt-constants';

@Injectable()
export class AuthService {
  private logger: Logger;
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {
    this.logger = new Logger(AuthService.name);
  }

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneLogin(username);

    const comparePassword = await bcrypt.compare(pass, user.password);

    if (!comparePassword) {
      throw new HttpException(
        {
          statusCode: HttpStatus.FORBIDDEN,
          message: 'Access Denied',
          error: 'Forbidden',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const payload = { sub: user.id, username: user.email, role: user.role };

    try {
      const token = await this.jwtService.signAsync(payload, {
        secret: jwtConstants.secret,
        expiresIn: '1d',
      });
      this.logger.log(token);
      return {
        accessToken: token,
      };
    } catch (e) {
      this.logger.error(e);
    }
  }
}
