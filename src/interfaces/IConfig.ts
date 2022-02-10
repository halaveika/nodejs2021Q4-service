export default interface IConfig {
  PORT: number,
  NODE_ENV: string ,
  MONGO_CONNECTION_STRING: string,
  JWT_SECRET_KEY: string ,
  AUTH_MODE: boolean,
  LOG_LEVEL: string,
  BACKEND_HOST: string
}