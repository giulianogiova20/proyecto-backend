import dotenv from 'dotenv'

dotenv.config()
const USR = process.env.MONGOUSR
const PWD = process.env.MONGOPWD
const CLUSTER = process.env.MONGOCLUSTER

export default {
    mongoDB: {
      URI: `mongodb://${USR}:${PWD}@cluster0-shard-00-00.d9grp.mongodb.net:27017,cluster0-shard-00-01.d9grp.mongodb.net:27017,cluster0-shard-00-02.d9grp.mongodb.net:27017/?ssl=true&replicaSet=atlas-ondxdw-shard-0&authSource=admin&retryWrites=true&w=majority`,
    }
  }