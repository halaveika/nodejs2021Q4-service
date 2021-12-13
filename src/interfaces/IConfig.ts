export default interface IConfig {
  PORT: number,
  NODE_ENV: string | undefined,
  MONGO_CONNECTION_STRING: string | undefined,
  JWT_SECRET_KEY: string | undefined,
  AUTH_MODE: boolean,
  
}