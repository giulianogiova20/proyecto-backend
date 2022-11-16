import { Router } from 'express'
import { CartController } from '../controllers'
import checkUserAuth from '../middlewares/checkUserAuth'

const CartRouter = Router()

CartRouter.delete("/", checkUserAuth, CartController.deleteProductsByCartId)
CartRouter.get("/", checkUserAuth, CartController.getProductsByCartId)
CartRouter.post("/:prod_id", checkUserAuth, CartController.addProductToCartById)
CartRouter.delete("/:prod_id", checkUserAuth, CartController.deleteProductByCartId)

export default CartRouter