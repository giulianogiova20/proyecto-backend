import dotenv from 'dotenv'


dotenv.config()

const MONGO_USR = process.env.MONGO_USR
const MONGO_PWD = process.env.MONGO_PWD
const MONGO_CLUSTER = process.env.MONGO_CLUSTER

const persistence = process.argv[4] || process.env.PERSISTENCE || 3

const persistenceConfig = {
  MONGO_ATLAS_URL: `mongodb+srv://${MONGO_USR }:${MONGO_PWD}@${MONGO_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`,
  //MONGO_OPTIONS: { useNewUrlParser: true, useUnifiedTopology: true }
  PERSISTENCE: persistence
}

export default persistenceConfig