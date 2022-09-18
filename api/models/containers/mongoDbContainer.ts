import mongoose from 'mongoose'
import config from '../../config/mongoDBatlas'
import Logger from '../../utils/logger'

class MongoDBContainer {
  model: mongoose.Model<any, {}, {}, {}>

  constructor(model: mongoose.Model<any, {}, {}, {}>) {
    this.model = model
    this.connect()
  }

  private async connect() {
    try {
      await mongoose.connect(config.mongoDB.URI)
      Logger.info('connected to mongoDB Atlas')
    } catch (err) {
      Logger.error(err)
    }
  }

}

export default MongoDBContainer