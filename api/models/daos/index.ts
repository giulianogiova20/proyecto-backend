import dotenv from 'dotenv'

dotenv.config()

let productDao: any
let cartDao: any
let chatDao: any

switch (process.env.DB_PROVIDER) {
  case 'mongodb':
    import('./products/daoProductsMongoDb').then((dao) => (productDao = dao.default))
    import('./cart/daoCartMongoDb').then((dao) => (cartDao = dao.default))
    import('./chat/daoChatFilesystem').then((dao) => (chatDao = dao.default))
    break

  case 'fs':
    import('./products/daoProductsFilesystem').then((dao) => (productDao = dao.default))
    import('./cart/daoCartFilesystem').then((dao) => (cartDao = dao.default))
    import('./chat/daoChatFilesystem').then((dao) => (chatDao = dao.default))
    break

  default:
    productDao = require('./products/daoProductsMongoDb') 
    cartDao = require('./cart/daoCartMongoDb')
    chatDao = require('./chat/daoChatFilesystem')
    break
   
    
}

export { productDao, cartDao, chatDao }
