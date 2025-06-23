import { PayloadDTO } from '@application/dtos/payload.dto';
import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { env } from '@infra/constants/zod-env.constant';
import { CreateUserGoogleDTO } from '@application/dtos/create-user-google.dto';

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

    const payload: PayloadDTO = {
      sub: user.id,
      username: user.email,
      role: user.role,
      name: user.name,
      providerId: user.providerId,
      avatar: user.pictureProvider,
    };

    try {
      return {
        id: user.id,
        username: user.email,
        avatar: user.pictureProvider,
        role: user.role,
        name: user.name,
        access_token: await this.createToken(payload),
      };
    } catch (e) {
      this.logger.error(e);
    }
  }

  async validateGoogleUser(googleUser: CreateUserGoogleDTO) {
    const user = await this.usersService.createOrUpdateUserProvider(googleUser);
    this.logger.log(JSON.stringify(user));

    if (!user || !googleUser.emails[0].verified) {
      throw new NotFoundException('User Not Found');
    }

    const payload: PayloadDTO = {
      sub: user.id,
      username: user.email,
      name: user.name,
      providerId: user.providerId,
      avatar: user.pictureProvider,
      role: user.role,
    };
    this.logger.log(JSON.stringify(payload));

    const userResponse = {
      id: user.id,
      username: user.email,
      avatar: user.pictureProvider,
      role: user.role,
      name: user.name,
      access_token: await this.createToken(payload),
    };

    this.logger.log(JSON.stringify(userResponse));

    return userResponse;
  }

  async createToken(payload: PayloadDTO) {
    return await this.jwtService.signAsync(payload, {
      secret: env.JWT_SECRET,
      expiresIn: 60 * 60 * 2,
    });
  }
}
