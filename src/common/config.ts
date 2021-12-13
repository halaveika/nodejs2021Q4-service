import dotenv from 'dotenv';
import IConfig from '../interfaces/IConfig'

dotenv.config();

export const config:IConfig = {
  PORT: Number(process.env['PORT']),
  NODE_ENV: process.env['NODE_ENV'],
  MONGO_CONNECTION_STRING: process.env['MONGO_CONNECTION_STRING'],
  JWT_SECRET_KEY: process.env['JWT_SECRET_KEY'],
  AUTH_MODE: process.env['AUTH_MODE'] === 'true'
}
