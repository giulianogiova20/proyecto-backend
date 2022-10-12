import { Router } from 'express'
import { cartController } from '../controllers/cart'

const cartRouter = Router()

cartRouter.post("/", cartController.createNewCart)
cartRouter.post("delete", cartController.deleteProductsByCartId)
cartRouter.get("/", cartController.getProductsByCartId)
cartRouter.post("addProduct", cartController.addProductToCartById)
cartRouter.post("deleteProduct", cartController.deleteProductByCartId)

cartRouter.post("order", cartController.cartOrder)

export default cartRouter