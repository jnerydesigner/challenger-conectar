import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PayloadDTO } from '@application/dtos/payload.dto';
import { UserService } from '@application/services/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('JWT_SECRET') as string,
    });
  }

  async validate(payload: PayloadDTO) {
    const user = await this.userService.findOne(payload.sub);
    console.log(user);
    const validateUser = {
      id: user.id,
      email: user.email,
      roles: [user.role],
    };

    return validateUser;
  }
}
