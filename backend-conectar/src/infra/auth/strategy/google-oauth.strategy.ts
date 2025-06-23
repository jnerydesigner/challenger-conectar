import { Inject, Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

import { ConfigType } from '@nestjs/config';
import { VerifiedCallback } from 'passport-jwt';

import { CreateUserGoogleDTO } from '@application/dtos/create-user-google.dto';
import googleOauthConfig from '../config/google.oauth.config';
import { AuthService } from '@application/services/auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  private logger: Logger;
  constructor(
    @Inject(googleOauthConfig.KEY)
    private readonly googleConfiguration: ConfigType<typeof googleOauthConfig>,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: googleConfiguration.clientID,
      clientSecret: googleConfiguration.clientSecret,
      callbackURL: googleConfiguration.callbackURL,
      scope: ['email', 'profile'],
    });
    this.logger = new Logger(GoogleStrategy.name);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: CreateUserGoogleDTO,
    done: VerifiedCallback,
  ) {
    this.logger.log(JSON.stringify(profile));
    const userPayload = await this.authService.validateGoogleUser(profile);
    done(null, userPayload.access_token);
  }
}
