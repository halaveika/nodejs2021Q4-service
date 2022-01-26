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
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: Boolean(process.env.POSTGRES_SYNCHRONIZE),
  migrationsRun: true,
  logging: false,
  entities: [BoardEntity,TaskEntity,UserEntity],
  migrations: [
    path.join(__dirname, "../db/migration/*.ts")
 ],
 cli: {
  "entitiesDir":path.join(__dirname, "../db/entity"),
  "migrationsDir":path.join(__dirname, "../db/migration")
 }
} as ConnectionOptions;
