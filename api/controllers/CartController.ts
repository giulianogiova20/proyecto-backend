import { Request, Response } from 'express'
import MessageService from '../utils/messaging'
import { CartService } from '../services'
import Logger from '../utils/logger'
import MailSender from '../utils/nodemailer'

class CartController {

  constructor() { }

  //Executed at user's registration on 'post' hook
  async createNewCart(user: any){
    try {
      await CartService.createNewCart(user)
      Logger.info(`Cart created for user ${user.email}`)
    } catch (error) {
      Logger.error(error)
    }  
  }

  async deleteProductsByCartId(req: Request, res: Response){
    try {
      const user = req.user
      await CartService.deleteProductsByCartId(user)
      res.redirect('/api/cart')
    } catch (error) {
      Logger.error(error)
    }  
  }

  async getProductsByCartId(req: Request, res: Response){
    try {
      const user = req.user
      const cartProducts = await CartService.getProductsByCartId(user)
      res.render('cart', {products: cartProducts, user: user})
    } catch (error) {
      Logger.error(error)
    }      
  }

  async addProductToCartById(req: Request, res: Response){
    try {
      const product = req.body
      const user = req.user
      await CartService.addProductToCartById(user, product)
      res.redirect('/api/cart')
    } catch (error) {
      Logger.error(error)
    }  
  }

  async deleteProductByCartId(req: Request, res: Response){
    try {
      const product = req.body
      const user = req.user
      await CartService.deleteProductByCartId(user, product)
      res.redirect('/api/cart')
    } catch (error) {
      Logger.error(error)
    }
  }

  async cartOrder(req: Request, res: Response){
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

}

export default new CartController