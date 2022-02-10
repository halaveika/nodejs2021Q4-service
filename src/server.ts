import {config} from './common/config'
import app from './app';

/**
 * Staring listen server on current port
 */
const start = async () => {
  try {
    await app.listen(config.PORT, () =>
    console.log(`App is running on http://localhost:${config.PORT}`)
  )
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }
}
start();