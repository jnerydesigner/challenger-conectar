import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  SERVER_PORT: z.coerce.number().default(3333),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  JWT_SECRET: z.string().min(8, 'JWT_SECRET is required and must be secure'),
  URL_FRONT_END: z.string().url(),
  DATABASE_HOST_NAME: z.string(),
  DATABASE_PORT: z.coerce.number().default(5448),
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_DB_NAME: z.string(),
  GOOGLE_OAUTH_CLIENT_ID: z.string(),
  GOOGLE_OAUTH_SECRET: z.string(),
  GOOGLE_OAUTH_CALLBACK_URL: z.string().url(),
  FRONT_URL: z.string().url(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;
