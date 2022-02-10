import { ConnectionOptions } from "typeorm";
import dotenv from "dotenv";
import * as path from 'path';
import {BoardEntity} from '../db/entity/board';
import {TaskEntity} from '../db/entity/task';
import {UserEntity} from '../db/entity/user';

dotenv.config();

export default {
  name: "default",
  type: "postgres",
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE),
  migrationsRun: true,
  logging: false,
  entities: [BoardEntity,TaskEntity,UserEntity],
  extra: {
    ssl: {
      require: process.env.TYPEORM_SSL === "true",
      rejectUnauthorized: false,
    },
  },
  migrations: [
    path.join(__dirname, "../db/migration/*.ts")
 ],
 cli: {
  "entitiesDir":path.join(__dirname, "../db/entity"),
  "migrationsDir":path.join(__dirname, "../db/migration")
 },
 seeds: [path.join(__dirname, "src/db/seeds/*{.ts,.js}")],
 factories: [path.join(__dirname, "src/db/factories/*{.ts,.js}")]
} as ConnectionOptions;
