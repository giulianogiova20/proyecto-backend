import { Router } from 'express'
const productsRouter = Router()

import {getAll, getById, addProduct, updateProduct, deleteProduct} from '../controllers/products'

productsRouter.get("/products", getAll) 
productsRouter.get("/products/:id", getById)
productsRouter.post("/products", addProduct)
productsRouter.put("/products/:id", updateProduct)
productsRouter.delete("/products/:id", deleteProduct)

export default productsRouter