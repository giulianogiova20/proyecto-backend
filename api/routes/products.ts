import { Router } from 'express'
import { productsController } from '../controllers/products'

const productsRouter = Router()

productsRouter.get("/products", productsController.getAllProducts) 
productsRouter.get("/products/:id", productsController.getProductById)
productsRouter.post("/products", productsController.addProduct)
productsRouter.put("/products/:id", productsController.updateProduct)
productsRouter.delete("/products/:id", productsController.deleteProduct)


export default productsRouter