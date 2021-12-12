import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: Number(process.env.PORT),
  NODE_ENV: process.env,
  MONGO_CONNECTION_STRING: process.env,
  JWT_SECRET_KEY: process.env,
  AUTH_MODE: process.env.AUTH_MODE === 'true',
}

