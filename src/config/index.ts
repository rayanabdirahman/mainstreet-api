require('dotenv').config()

const config = {
  APP_PORT: process.env.APP_PORT,
  DB_NAME: process.env.APP_DB_NAME,
  DB_PASSWORD: process.env.APP_DB_PASSWORD
}

export default config
