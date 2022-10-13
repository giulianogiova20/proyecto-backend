import { Router } from 'express'
import { ProductController } from '../controllers'

const ProductRouter = Router()

ProductRouter.get("/", ProductController.getAll) 
ProductRouter.get("/:id", ProductController.getProductById)
ProductRouter.post("/", ProductController.addProduct)
ProductRouter.put("/:id", ProductController.updateProductById)
ProductRouter.delete("/:id", ProductController.deleteProductById)


export default ProductRouter