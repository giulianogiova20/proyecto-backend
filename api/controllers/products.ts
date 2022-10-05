import { Request, Response } from 'express'
import { productService } from '../services/productService'
import Logger from '../utils/logger'

const getAllProducts = async(req: Request, res: Response) => {
    try {
        const products = await productService.getAllProducts()
        return products
    } catch (err) {
        Logger.error(`Error in getAll method: ${err}`)
    }
    
    
}

const getProductById = async(req: Request, res: Response)  => {
    const { id } = req.params
    const body = await productService.getProductById(Number(id))
  
    res.json(body)
}


const addProduct = async(req: Request, res: Response) => {
    try {
        const product = req.body
        await productService.addProduct(product)
        Logger.info('Product added')
        res.redirect('/api/addProdForm')
    } catch (error) {
        Logger.error(error)
    }
}

const updateProduct = async(req: Request, res: Response) => {
    const { id } = req.params
    const product = req.body
  
    await productService.updateProduct(Number(id), product)
  
    res.json({
      msg: `producto ${id} actualizado`,
    })
}

const deleteProduct = async(req: Request, res: Response) => {
    const { id } = req.params
    const deletedProduct = await productService.deleteProduct(Number(id))
  
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