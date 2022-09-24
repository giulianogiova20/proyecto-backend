import { Router } from 'express'

export const cartRouter = Router()

import {createCart, deleteCartProducts, getProductsByCartId, addToCartById, deleteProductByCartId, cartOrder} from '../controllers/cart'

cartRouter.post("/cart/", createCart)
cartRouter.post("/cart/delete", deleteCartProducts)
cartRouter.get("/cart/", getProductsByCartId)
cartRouter.post("/cart/addProduct/", addToCartById)
cartRouter.post("/cart/deleteProduct/", deleteProductByCartId)

cartRouter.post("/cart/order", cartOrder)