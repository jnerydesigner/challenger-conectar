import { env } from '@infra/constants/zod-env.constant';
import { registerAs } from '@nestjs/config';

export default registerAs('googleOAUTH', () => ({
  clientID: env.GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: env.GOOGLE_OAUTH_SECRET,
  callbackURL: env.GOOGLE_OAUTH_CALLBACK_URL,
}));
