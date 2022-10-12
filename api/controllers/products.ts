import { Request, Response } from 'express'
import ProductService from '../services/productService'
import Logger from '../utils/logger'

const getAllProducts = async(req: Request, res: Response) => {
    try {
        const products = await ProductService.getAllProducts()
        Logger.info("controller")
        Logger.info(products)
        return products
    } catch (err) {
        Logger.error(`Error in getAll method: ${err}`)
    }
}

const getProductById = async(req: Request, res: Response)  => {
    const { id } = req.params
    const body = await ProductService.getProductById(Number(id))
  
    res.json(body)
}


const addProduct = async(req: Request, res: Response) => {
    try {
        const product = req.body
        await ProductService.addProduct(product)
        Logger.info('Product added')
        res.redirect('/api/addProdForm')
    } catch (error) {
        Logger.error(error)
    }
}

const updateProduct = async(req: Request, res: Response) => {
    const { id } = req.params
    const product = req.body
  
    await ProductService.updateProduct(Number(id), product)
  
    res.json({
      msg: `producto ${id} actualizado`,
    })
}

const deleteProduct = async(req: Request, res: Response) => {
    const { id } = req.params
    const deletedProduct = await ProductService.deleteProduct(Number(id))
  
    res.json({
        deletedProduct
    })
}


export const productsController = { 
    addProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateProduct
}