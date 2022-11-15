import persistenceConfig from "../config"
import Logger from "../utils/logger"
import ProductMongoCloudDAO from "./DAOs/products/mongoDbCloud"
import CartMongoCloudDAO from "./DAOs/cart/mongoDbCloud"
import OrderMongoCloudDAO from "./DAOs/order/mongoDbCloud"
import UserMongoCloudDAO from "./DAOs/user/mongoDbCloud"
import ChatMongoCloudDAO from "./DAOs/chat/mongoDbCloud"

class PersistenceFactory {
    static getPersistence(persistence: string | number, modelName: any){
        try {
            switch (persistence) {
                
                case 1:
                    if (modelName === 'products') { return ProductMongoCloudDAO }
                    if (modelName === 'cart') { return CartMongoCloudDAO }
                    if (modelName === 'order') { return OrderMongoCloudDAO }
                    if (modelName === 'user') { return UserMongoCloudDAO }
                    if (modelName === 'chat') { return ChatMongoCloudDAO }
                    break

                default:
                    if (modelName === 'products') { return ProductMongoCloudDAO }
                    if (modelName === 'cart') { return CartMongoCloudDAO }
                    if (modelName === 'order') { return OrderMongoCloudDAO }
                    if (modelName === 'user') { return UserMongoCloudDAO }
                    if (modelName === 'chat') { return ChatMongoCloudDAO }
                    break

            }

            throw new Error('Persistence not found')
        }catch(error){
            Logger.error(`Persistence type not found ${error}`)
        }
    }
}

const persistence = persistenceConfig.PERSISTENCE

export default (modelName: any) => PersistenceFactory.getPersistence( persistence, modelName )