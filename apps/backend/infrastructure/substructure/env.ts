import dotenv from 'dotenv';
import { z } from 'zod';
import { zodValidateSync } from '#substructure/utils/zodValidator.ts';
import path from "path";

dotenv.config();

const dir: string = process.cwd();

const env: string = process.env.NODE_ENV || 'development';

const envFilePath: string = path.resolve(dir, `.env.${env}`);

dotenv.config({ path: envFilePath });

const envSchema = z.object({
	PRIVATE_ENCRYPTING_KEY: z.string().min(1),
	PORT: z.coerce.number().default(7005),
	TOKEN_EXPIRATION_TIME: z.coerce.number().default(86400), // 1 day
	COOKIE_DOMAIN: z.string().min(1),
	NODE_ENV: z.enum(['production', 'development', 'stage']).default('development'),
	REDIS_PATH: z.string().min(1).default('redis://127.0.0.1:6379'),
	TOOL_ACCESS_TOKEN: z.string().min(1),
	DEFAULT_PASSWORD: z.string().min(1),
	TOKEN_DECRYPTING_KEY: z.string().min(1),
	TOKEN_ENCRYPTING_KEY: z.string().min(1),
	CORS_LOCAL_FRONTEND: z.string().min(1),
	CORS_DEV_FRONTEND: z.string().min(1),
	PRODUCT_DELIVERY_DAYS: z.coerce.number(),
});

const value: any = zodValidateSync(process.env, envSchema, {}, 'Env Validation: ');

export default {
	privateEncryptingKey: value.PRIVATE_ENCRYPTING_KEY,
	port: value.PORT,
	tokenExpirationTime: value.TOKEN_EXPIRATION_TIME,
	environment : value.NODE_ENV,
	cookieDomain: value.COOKIE_DOMAIN,
	redisPath: value.REDIS_PATH,
	toolAccessToken: value.TOOL_ACCESS_TOKEN,
	defaultPassword: value.DEFAULT_PASSWORD,
	tokenDecryptingKey: value.TOKEN_DECRYPTING_KEY,
	tokenEncryptingKey: value.TOKEN_ENCRYPTING_KEY,
	corsLocalFrontend: value.CORS_LOCAL_FRONTEND,
	corsDevFrontend: value.CORS_DEV_FRONTEND,
	productDeliveryDays: value.PRODUCT_DELIVERY_DAYS,
};
