import {config} from './common/config'
import app from './app';
import logger from './common/logger';

/**
 * Staring listen server on current port
 */
const start = async () => {
  try {
    await app.listen(config.PORT, () =>
    logger.info(`App is running on http://localhost: ${config.PORT} and logger level: ${config.LOG_LEVEL}`)
  )
  } catch (error) {
    logger.error(error)
    process.exit(1)
  }
}
start();