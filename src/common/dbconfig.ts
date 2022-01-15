import { ConnectionOptions } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const dbConfig: ConnectionOptions = {
  type: "postgres",
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE),
  migrationsRun: true,
  logging: false,
  entities: [],
  extra: {
    ssl: {
      require: process.env.TYPEORM_SSL === "true" ? true : false,
      rejectUnauthorized: false,
    },
  },
};
