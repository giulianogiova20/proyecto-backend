import { Router } from 'express'

export const cartRouter = Router()

import {createCart, deleteCart, getProductsByCartId, addToCartById, deleteProductByCartId, cartOrder} from '../controllers/cart'

cartRouter.post("/cart/", createCart)
cartRouter.delete("/cart/:id", deleteCart)
cartRouter.get("/cart/", getProductsByCartId)
cartRouter.post("/cart/addProduct/", addToCartById)
cartRouter.delete("/cart/:id/products/:id_prod", deleteProductByCartId)

cartRouter.post("/cart/order", cartOrder)