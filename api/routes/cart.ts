import { Router } from 'express'
import { CartController } from '../controllers'

const CartRouter = Router()

CartRouter.post("/", CartController.createNewCart)
CartRouter.post("delete", CartController.deleteProductsByCartId)
CartRouter.get("/", CartController.getProductsByCartId)
CartRouter.post("addProduct", CartController.addProductToCartById)
CartRouter.post("deleteProduct", CartController.deleteProductByCartId)

export default CartRouter