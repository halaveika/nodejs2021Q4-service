import dotenv from 'dotenv';

dotenv.config();

export const PORT = Number(process.env.PORT);
export const {NODE_ENV} = process.env;
export const {MONGO_CONNECTION_STRING} = process.env;
export const {JWT_SECRET_KEY} = process.env;
export const AUTH_MODE = process.env.AUTH_MODE === 'true';
