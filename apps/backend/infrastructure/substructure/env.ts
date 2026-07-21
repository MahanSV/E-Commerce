import dotenv from 'dotenv';
import { number, object, string } from 'yup';
import { yupValidateSync } from '#substructure/utils/yupValidator.ts';
import path from "path";

dotenv.config();

const dir: string = process.cwd();

const env: string = process.env.NODE_ENV || 'development';

const envFilePath: string = path.resolve(dir, `.env.${env}`);

dotenv.config({ path: envFilePath });

const envSchema = object({
	PRIVATE_ENCRYPTING_KEY: string().required(),
	PORT: number().required().default(7005),
	TOKEN_EXPIRATION_TIME: number().required().default(86400), // 1 day
	COOKIE_DOMAIN: string().required(),
	NODE_ENV: string().oneOf(['production', 'development', 'stage']).default('development').required(),
	OTP_EXPIRATION_TIME: number().required().default(90),
	REDIS_PATH: string().required().default('redis://127.0.0.1:6379'),
	TOOL_ACCESS_TOKEN: string().required(),
	REPORT_PATH: string().required(),
	FOREIGN_API: string().required(),
	CORS_LOCAL_FRONTEND: string().required(),
	CORS_DEV_FRONTEND: string().required(),
	CORS_DEV_INTERNAL: string().required(),
	MOCK_PATH: string(),
	TOKEN_DECRYPTING_KEY: string().required(),
	TOKEN_ENCRYPTING_KEY: string().required(),
});

const value: any = yupValidateSync(process.env, envSchema, {
	stripUnknown: true,
}, 'Env Validation: ');

export default {
	privateEncryptingKey: value.PRIVATE_ENCRYPTING_KEY,
	port: value.PORT,
	tokenExpirationTime: value.TOKEN_EXPIRATION_TIME,
	environment : value.NODE_ENV,
	cookieDomain: value.COOKIE_DOMAIN,
	otpExpirationTime: value.OTP_EXPIRATION_TIME,
	redisPath: value.REDIS_PATH,
	foreignApi: value.FOREIGN_API,
	toolAccessToken: value.TOOL_ACCESS_TOKEN,
	reportPath: value.REPORT_PATH,
	corsLocalFrontend: value.CORS_LOCAL_FRONTEND,
	corsDevFrontend: value.CORS_DEV_FRONTEND,
	corsDevInternal: value.CORS_DEV_INTERNAL,
	mockPath: value.MOCK_PATH,
	tokenDecryptingKey: value.TOKEN_DECRYPTING_KEY,
	tokenEncryptingKey: value.TOKEN_ENCRYPTING_KEY,
};
