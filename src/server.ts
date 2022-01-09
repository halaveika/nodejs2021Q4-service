import {config} from './common/config'
import app from './app';
import logger from './common/logger';

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
start();

process.on("unhandledRejection", (reason:unknown, promise:Promise<unknown>): void => {
  logger.fatal("Unexpected exception occured", { reason, ex: promise });
  process.exit(1);
})

process.on("uncaughtException", error => {
  logger.fatal(error.message);
  process.exit(1);
});