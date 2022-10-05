import { cartDao } from "../models/daos";
import Logger from "../utils/logger";

const createNewCart = async (user: any) => {
    const data = await cartDao.createNewCart(user)
    return data
}

const deleteProductsByCartId = async (user: any) => {
    const data = await cartDao.deleteProductsByCartId(user)
    return data
}

const getProductsByCartId = async (user: any) => {
    const data = await cartDao.getProductsByCartId(user)
    return data
}

const addProductToCartById = async (user: any, product: any) => {
    const data = await cartDao.addProductToCartById(user, product)
    return data
}

const deleteProductByCartId = async (user: any, product: any) => {
    Logger.info(`Service: ${product}`)
    const data = await cartDao.deleteProductByCartId(user, product)
    return data
}

export const cartService = {
    createNewCart,
    deleteProductsByCartId,
    getProductsByCartId,
    addProductToCartById,
    deleteProductByCartId
}