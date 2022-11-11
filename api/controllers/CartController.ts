import { Request, Response } from 'express'
import MessageService from '../utils/messaging'
import { CartService } from '../services'
import Logger from '../utils/logger'
import MailSender from '../utils/nodemailer'

class CartController {

  constructor() { }

  //Executed at user's registration on 'post' hook
  async createNewCart(user: any, res: Response){
    try {
      await CartService.createNewCart(user)
      Logger.info('Cart Created')
      //return res.status(200).json({ message: 'Cart Created' })
    } catch (error) {
      Logger.error(`Error in createNewCart method: ${error}`)
    }  
  }

  async deleteProductsByCartId(req: Request, res: Response){
    try {
      const user = req.user
      const cart = await CartService.deleteProductsByCartId(user)
      return res.status(200).json({NewCart: cart})
    } catch (error) {
      Logger.error(`Error in deleteProductsByCartId method: ${error}`)
    }  
  }

  async getProductsByCartId(req: Request, res: Response){
    try {
      const user = req.user
      const cartProducts = await CartService.getProductsByCartId(user)
      return res.status(200).json({ products: cartProducts })
    } catch (error) {
      Logger.error(`Error in getProductsByCartId method: ${error}`)
    }      
  }

  async addProductToCartById(req: Request, res: Response){
    try {
      const { prod_id } = req.params
      const quantity = req.body.quantity
      const user = req.user
      const cart = await CartService.addProductToCartById(user, prod_id, quantity)
      return res.status(200).json({ ProductAdded: prod_id, NewCart: cart })
    } catch (error) {
      Logger.error(`Error in addProductToCartById method: ${error}`)
    }  
  }

  async deleteProductByCartId(req: Request, res: Response){
    try {
      const { prod_id } = req.params
      const user = req.user
      const productDeleted = await CartService.deleteProductByCartId(user, prod_id)
      return res.status(200).json({ Cart: productDeleted })
    } catch (error) {
      Logger.error(`Error in deleteProductByCartId method: ${error}`)
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
      Logger.error(`Error in cartOrder method: ${error}`)
    }
  }

}

export default new CartController