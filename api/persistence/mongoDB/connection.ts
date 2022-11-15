import config from "../../config";
import Logger from "../../utils/logger";
import mongoose from "mongoose";

const mongoConnection = async () =>{
    {
      try {
        await mongoose.connect(`${config.MONGO_ATLAS_URL}`)
        Logger.info('connected to mongoDB Atlas')
      } catch (err) {
        Logger.error(err)
      }
    }
}

export default mongoConnection