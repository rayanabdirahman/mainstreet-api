import config from './config'
import bootstrapApp from './app'
import logger from './utilities/logger'

const runApp = async () => {
  try {
    logger.debug(`[START]: Bootstrapping app`)
    const PORT = process.env.PORT || config.APP_PORT

    const app = await bootstrapApp()
  
    app.listen(PORT, () => logger.info(`App running on PORT: ${PORT}`))
  
    return app
  
  } catch(error) {
    logger.error(`Unable to run app: ${error}`)
  }
}

( async () => await runApp() )()
