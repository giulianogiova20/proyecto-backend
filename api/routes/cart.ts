import { Router } from 'express'
import { cartController } from '../controllers/cart'

const cartRouter = Router()

cartRouter.post("/cart/", cartController.createNewCart)
cartRouter.post("/cart/delete", cartController.deleteProductsByCartId)
cartRouter.get("/cart/", cartController.getProductsByCartId)
cartRouter.post("/cart/addProduct/", cartController.addProductToCartById)
cartRouter.post("/cart/deleteProduct/", cartController.deleteProductByCartId)

cartRouter.post("/cart/order", cartController.cartOrder)

export default cartRouter