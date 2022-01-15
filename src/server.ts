import {config} from './common/config'
import { createConnection } from "typeorm";
import { dbConfig } from "./common/dbconfig";
import app from './app';
import logger from './common/logger';



const connection = createConnection(dbConfig);
/**
 * Staring listen server on current port
 */

const start = async () => {
  try {
    await app.listen(config.PORT, config.BACKEND_HOST, () =>
    logger.info(`App is running on ${config.BACKEND_HOST}: ${config.PORT} and logger level: ${config.LOG_LEVEL}`)
  )
  } catch (error) {
    logger.error(error)
    process.exit(1)
  }
}

connection.then(()=>{
  logger.info("DB was Connected");
  start()},
  error => logger.error(error.message));

process.on("unhandledRejection", (reason:unknown, promise:Promise<unknown>): void => {
  logger.fatal("Unexpected exception occured", { reason, ex: promise });
  process.exit(1);
})

process.on("uncaughtException", error => {
  logger.fatal(error.message);
  process.exit(1);
});