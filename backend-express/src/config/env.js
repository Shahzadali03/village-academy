import { z } from 'zod';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().default(8000),
  MONGODB_URI: z.string().min(1, 'MONGODB_URI is required'),
  SECRET_KEY: z.string().min(1, 'SECRET_KEY is required'),
  JWT_ALGORITHM: z.enum(['HS256', 'HS384', 'HS512']).default('HS256'),
  ACCESS_TOKEN_EXPIRE_MINUTES: z.coerce.number().int().positive().default(60),
  ADMIN_EMAIL: z.string().email().default('admin@example.com'),
  ADMIN_PASSWORD: z.string().min(8).default('admin12345'),
  DEFAULT_FEE_AMOUNT: z.coerce.number().int().nonnegative().default(4000),
  CORS_ORIGINS: z.string().default('http://localhost:3000,http://localhost,http://127.0.0.1:8000'),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(900000),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(100),
  AUTH_RATE_LIMIT_MAX: z.coerce.number().int().positive().default(10),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment configuration:');
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

const data = parsed.data;

if (data.NODE_ENV === 'production' && data.SECRET_KEY.length < 32) {
  console.error('SECRET_KEY must be at least 32 characters in production');
  process.exit(1);
}

if (data.NODE_ENV === 'production' && data.SECRET_KEY.toLowerCase().includes('change')) {
  console.error('SECRET_KEY must be changed in production');
  process.exit(1);
}

export const env = {
  nodeEnv: data.NODE_ENV,
  isProduction: data.NODE_ENV === 'production',
  port: data.PORT,
  mongodbUri: data.MONGODB_URI,
  secretKey: data.SECRET_KEY,
  jwtAlgorithm: data.JWT_ALGORITHM,
  accessTokenExpireMinutes: data.ACCESS_TOKEN_EXPIRE_MINUTES,
  adminEmail: data.ADMIN_EMAIL,
  adminPassword: data.ADMIN_PASSWORD,
  defaultFeeAmount: data.DEFAULT_FEE_AMOUNT,
  corsOrigins: data.CORS_ORIGINS.split(',').map((origin) => origin.trim()),
  rateLimitWindowMs: data.RATE_LIMIT_WINDOW_MS,
  rateLimitMax: data.RATE_LIMIT_MAX,
  authRateLimitMax: data.AUTH_RATE_LIMIT_MAX,
};
