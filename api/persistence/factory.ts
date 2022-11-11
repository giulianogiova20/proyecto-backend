import persistenceConfig from "../config"
import Logger from "../utils/logger"
import ProductMongoCloudDAO from "./DAOs/products/mongoDbCloud"
import CartMongoCloudDAO from "./DAOs/cart/mongoDbCloud"
import OrderMongoCloudDAO from "./DAOs/order/mongoDbCloud"
import UserMongoCloudDAO from "./DAOs/user/mongoDbCloud"

class PersistenceFactory {
    static getPersistence(persistence: string | number, modelName: any){
        try {
            switch (persistence) {
                
                /* case 1:
                    if (modelName === 'products') { return ProductFilesystemDAO }
                    if (modelName === 'cart') { return CartFilesystemDAO }
                    break;

                case 2:
                    if (modelName === 'products') { return ProductMongoDAO }
                    if (modelName === 'cart') { return CartMongoDAO }
                    break; */
                
                case 3:
                    if (modelName === 'products') { return ProductMongoCloudDAO }
                    if (modelName === 'cart') { return CartMongoCloudDAO }
                    if (modelName === 'order') { return OrderMongoCloudDAO }
                    if (modelName === 'user') { return UserMongoCloudDAO }
                    break;
            
                /* case 4:
                    if (modelName === 'products') { return ProductMySQLDAO }
                    if (modelName === 'cart') { return CartMySQLDAO }
                    break; */

                default:
                    if (modelName === 'products') { return ProductMongoCloudDAO }
                    if (modelName === 'cart') { return CartMongoCloudDAO }
                    if (modelName === 'order') { return OrderMongoCloudDAO }
                    if (modelName === 'user') { return UserMongoCloudDAO }
                    break;

            }

            throw new Error('Persistence not found')
        }catch(error){
            Logger.error(`Persistence type not found ${error}`)
        }
    }
}

const persistence = persistenceConfig.PERSISTENCE

export default (modelName: any) => PersistenceFactory.getPersistence( persistence, modelName )