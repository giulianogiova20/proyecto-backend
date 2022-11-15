import dotenv from 'dotenv'

dotenv.config()

const persistence = process.argv[4] || process.env.PERSISTENCE || 1

const config = {
  ENVIRONMENT_MODE: process.env.ENVIRONMENT_MODE,
  MONGO_ATLAS_URL: process.env.MONGO_ATLAS_URL,
  MONGO_OPTIONS: { useNewUrlParser: true, useUnifiedTopology: true },
  SECRET_KEY: process.env.SECRET_KEY,
  PERSISTENCE: persistence,
  PORT: process.env.PORT,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_NUMBER: process.env.TWILIO_NUMBER,
  TWILIO_WHATSAPP: process.env.TWILIO_WHATSAPP, 
  TWILIO_ADMIN_NUMBER: process.env.TWILIO_ADMIN_NUMBER,
  GMAIL_MAIL: process.env.GMAIL_MAIL,
  GMAIL_PROVISIONAL_PASS: process.env.GMAIL_PROVISIONAL_PASS,
  SESSION_TIME: process.env.SESSION_TIME,
}

export default config