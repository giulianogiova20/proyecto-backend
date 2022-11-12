import { Router } from 'express'
import { ProductController } from '../controllers'
import checkUserAuth from '../middlewares/checkUserAuth'
import checkUserRole from '../middlewares/checkUserRole'

const ProductRouter = Router()

ProductRouter.get("/", ProductController.getAll) 
ProductRouter.get("/:id", ProductController.getProductById)
ProductRouter.get("/categories/:category", ProductController.getProductByCategory)
ProductRouter.post("/", checkUserAuth, checkUserRole, ProductController.addProduct)
ProductRouter.put("/:id", checkUserAuth, checkUserRole, ProductController.updateProductById)
ProductRouter.delete("/:id", checkUserAuth, checkUserRole, ProductController.deleteProductById)


export default ProductRouter