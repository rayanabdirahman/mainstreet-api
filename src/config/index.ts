require('dotenv').config()

const config = {
  APP_PORT: process.env.APP_PORT,
  APP_DB_NAME: process.env.APP_DB_NAME,
  APP_DB_PASSWORD: process.env.APP_DB_PASSWORD
}

export default config
