import { request, Request, Response } from 'express'
import MessageService from '../utils/messaging'
import { cartDao, productDao } from '../models/daos'
import Logger from '../utils/logger'
import MailSender from '../utils/nodemailer'


//Esta funcion se ejecutará con el hook post declarado en el esquema del user
export const createCart = async (user: any) => {
  try {
    await cartDao.createNewCart(user)
    Logger.info(`Cart created for user ${user.email}`)
  } catch (error) {
    Logger.error(error)
  }  
}

export const deleteCartProducts = async (req: Request, res: Response) => {
  try {
    const user = req.user
    await cartDao.deleteCartById(user)
    res.redirect('/api/cart')
  } catch (error) {
    Logger.error(error)
  }  
}

export const getProductsByCartId = async (req: Request, res: Response) => {
  try {
    const user = req.user
    const cartProducts = await cartDao.getProductsByCartId(user)
    res.render('cart', {products: cartProducts, user: user})
  } catch (error) {
    Logger.error(error)
  }      
}

export const addToCartById = async (req: Request, res: Response) => {
  try {
    const product = req.body
    const user = req.user
    await cartDao.addProductsById(product, user)
    res.redirect('/api/cart')
  } catch (error) {
    Logger.error(error)
  }  
}

export const deleteProductByCartId = async (req: Request, res: Response) => {
  try {
    const product = req.body
    const user = req.user
    await cartDao.deleteProductByCartId(user, product)
    res.redirect('/api/cart')
  } catch (error) {
    Logger.error(error)
  }
}

export const cartOrder = async (req: Request, res: Response) => {
  try {
    const user = req.user
    const cartProducts = await cartDao.getProductsByCartId(user)
    await cartDao.deleteCartById(user)
    MailSender.newOrder(user,cartProducts)
    MessageService.newSMS(user)
    MessageService.newWhatsapp(user)
    res.redirect('/')
  } catch (error) {
    Logger.error(error)
  }
}