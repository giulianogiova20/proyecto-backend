import { productDao } from "../models/daos"

const getAllProducts = async () => {
    const data = await productDao.getAllProducts()
    return data
}

const getProductById = async (id: any) => {
    const data = await productDao.getProductById(Number(id))
    return data
}

const addProduct = async (product: any) => {
    const data = await productDao.addProduct(product)
    return data
}

const updateProduct = async (id: any, product: any) => {
    const data = await productDao.updateProduct(Number(id), product)
    return data
}

const deleteProduct = async (id: any) => {
    const data = await productDao.deleteProduct(Number(id))
    return data
}

export const productService = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
}