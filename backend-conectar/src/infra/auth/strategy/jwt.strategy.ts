import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';

import { PayloadDTO } from '@application/dtos/payload.dto';
import { UserService } from '@application/services/user.service';
import { env } from '@infra/constants/zod-env.constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    const jwtSecret = env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in configuration');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: PayloadDTO) {
    const user = await this.userService.findOne(payload.sub);

    const validateUser = {
      id: user.id,
      email: user.email,
      roles: user.role,
      providerId: user.providerId,
      pictureProvider: user.pictureProvider,
    };

    return validateUser;
  }
}
