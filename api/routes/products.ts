import { Router } from 'express'
export const productsRouter = Router()
import {getAll, getById, addProduct, updateProduct, deleteProduct } from '../controllers/products'
import {renderAddProdForm} from '../controllers/session'

productsRouter.get("/products", getAll) 
productsRouter.get("/products/:id", getById)
productsRouter.post("/products", addProduct)
productsRouter.put("/products/:id", updateProduct)
productsRouter.delete("/products/:id", deleteProduct)

productsRouter.get("/addProdForm", renderAddProdForm)//Renderiza la vista de Add Produts (sólo Admin).