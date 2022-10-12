import { Request, Response } from 'express'
import MessageService from '../utils/messaging'
import CartService from "../services/cartService"
import Logger from '../utils/logger'
import MailSender from '../utils/nodemailer'


//Esta funcion se ejecutará con el hook post declarado en el esquema del user
export const createNewCart = async (user: any) => {
  try {
    await CartService.createNewCart(user)
    Logger.info(`Cart created for user ${user.email}`)
  } catch (error) {
    Logger.error(error)
  }  
}

export const deleteProductsByCartId = async (req: Request, res: Response) => {
  try {
    const user = req.user
    await CartService.deleteProductsByCartId(user)
    res.redirect('/api/cart')
  } catch (error) {
    Logger.error(error)
  }  
}

export const getProductsByCartId = async (req: Request, res: Response) => {
  try {
    const user = req.user
    const cartProducts = await CartService.getProductsByCartId(user)
    res.render('cart', {products: cartProducts, user: user})
  } catch (error) {
    Logger.error(error)
  }      
}

export const addProductToCartById = async (req: Request, res: Response) => {
  try {
    const product = req.body
    const user = req.user
    await CartService.addProductToCartById(user, product)
    res.redirect('/api/cart')
  } catch (error) {
    Logger.error(error)
  }  
}

export const deleteProductByCartId = async (req: Request, res: Response) => {
  try {
    const product = req.body
    const user = req.user
    await CartService.deleteProductByCartId(user, product)
    res.redirect('/api/cart')
  } catch (error) {
    Logger.error(error)
  }
}

export const cartOrder = async (req: Request, res: Response) => {
  try {
    const user = req.user
    const cartProducts = await CartService.getProductsByCartId(user)
    await CartService.deleteProductsByCartId(user)
    MailSender.newOrder(user,cartProducts)
    MessageService.newSMS(user)
    MessageService.newWhatsapp(user)
    res.redirect('/')
  } catch (error) {
    Logger.error(error)
  }
}

export const cartController = { 
  createNewCart,
  deleteProductsByCartId,
  getProductsByCartId,
  addProductToCartById,
  deleteProductByCartId,
  cartOrder 
}