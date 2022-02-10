import dotenv from 'dotenv';
import { env } from '../utils/env';
import IConfig from '../interfaces/IConfig';
import { getLogLvlVariable } from '../utils/getLogLvlVariable';

dotenv.config();

export const config:IConfig = {
  PORT: Number(env('PORT')),
  NODE_ENV: env('NODE_ENV'),
  MONGO_CONNECTION_STRING: env('MONGO_CONNECTION_STRING'),
  JWT_SECRET_KEY: env('JWT_SECRET_KEY'),
  AUTH_MODE: Boolean(env('AUTH_MODE') === 'true'),
  LOG_LEVEL: getLogLvlVariable(env('LOG_LEVEL'))
}