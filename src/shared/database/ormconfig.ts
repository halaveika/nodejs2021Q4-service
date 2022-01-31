import { ConnectionOptions } from "typeorm";
import * as path from 'path';
import {BoardEntity} from '../../board/board.entity';
import {TaskEntity} from '../../task/task.entity';
import {UserEntity} from '../../user/user.entity';

export default {
  name: "default",
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: Boolean(process.env.POSTGRES_SYNCHRONIZE),
  migrationsRun: true,
  logging: false,
  entities: [BoardEntity,TaskEntity,UserEntity],
  extra: (process.env.NODE_ENV === 'production') ? {
    ssl: {
      require: process.env.POSTGRES_SSL === "true",
      rejectUnauthorized: false,
    },
  } : {},
  migrations: [
    path.join(__dirname, "./migration/*.ts")
 ],
 cli: {
  "migrationsDir":path.join(__dirname, "./migration")
 }
} as ConnectionOptions;