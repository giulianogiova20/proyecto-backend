import { Request, Response } from 'express'
import { productDao } from '../models/daos'
import Logger from '../utils/logger'

const getAll = async(req: Request, res: Response) => {
    const products = await productDao.getAll()
    Logger.info(products)
    return products
}

const getById = async(req: Request, res: Response)  => {
    const { id } = req.params
    const body = await productDao.getById(Number(id))
  
    res.json(body)
}


const addProduct = async(req: Request, res: Response) => {
    const product = req.body
    await productDao.addProduct(product)
    res.redirect('/api/addProdForm')
}

const updateProduct = async(req: Request, res: Response) => {
    const { id } = req.params
    const product = req.body
  
    await productDao.updateProduct(Number(id), product)
  
    res.json({
      msg: `producto ${id} actualizado`,
    })
}

const deleteProduct = async(req: Request, res: Response) => {
    const { id } = req.params
    const deletedProduct = await productDao.deleteProduct(Number(id))
  
    res.json({
        deletedProduct
    })
}


export { addProduct, deleteProduct, getAll, getById, updateProduct}