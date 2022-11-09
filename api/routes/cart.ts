import { Router } from 'express'
import { CartController } from '../controllers'

const CartRouter = Router()

CartRouter.delete("/", CartController.deleteProductsByCartId)
CartRouter.get("/", CartController.getProductsByCartId)
CartRouter.post("/:prod_id", CartController.addProductToCartById)
CartRouter.delete("/:prod_id", CartController.deleteProductByCartId)

export default CartRouter