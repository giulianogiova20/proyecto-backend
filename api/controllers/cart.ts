import { Request, Response } from 'express'
import { cartDao, productDao } from '../models/daos'
import Logger from '../utils/logger'
import user from '../models/schemas/user'
import MailSender from '../utils/nodemailer2'

export const createCart = async (res: Response, user: any) => {
    await cartDao.createNewCart(user)
    Logger.info(`Cart created for user ${user.email}`)
/*     if (typeof cartId !== 'number') {
      return res.status(500).json({
        error: -1,
        msg: 'Error creating cart',
        cartId
      })
    }
    else {
        res.json(cartId)
    } */
  }

export const deleteCart = async (req: Request, res: Response) => {
    const { id } = req.params

    const cart = await cartDao.deleteCartById(Number(id))

    if (cart instanceof Error) {
        return res.status(500).json({
            error: -1,
            msg: cart.message
        })
    } else {
        if (cart === -1) {
            return res.status(500).json({
                error: -1,
                msg: 'Cart file is empty!'
            })
        } else {
            if (cart === -2){
                return res.status(500).json({
                    error: -2,
                    msg: `There is no cart with id= ${id}`
                })
            } else {
                res.json(`Cart id: ${id} deleted.`)
            }
        }
    }
}

export const getProductsByCartId = async (req: Request, res: Response) => {
    const user = req.user
  
    const cartProducts = await cartDao.getProductsByCartId(user)
    if (cartProducts instanceof Error) {
      return res.status(500).json({
        error: -1,
        msg: cartProducts.message
      })
    }
    else {
        res.render('cart', {products: cartProducts, user: user})
    }
  }

  export const addToCartById = async (req: Request, res: Response) => {
    const product = req.body
    Logger.info(`ProductID: ${product}`)
    const user = req.user
    const cart = await cartDao.addProductsById(product, user)
  
    if (cart instanceof Error) {
      return res.status(500).json({
        error: -1,
        msg: cart.message,
      })
    }
    else{

      res.redirect('/api/cart')
    }
    
  }

  export const deleteProductByCartId = async (req: Request, res: Response) => {
    const { id, id_prod } = req.params
  
    const cart = await cartDao.deleteProductByCartId(Number(id), Number(id_prod))
  
    if (cart instanceof Error) {
      return res.status(500).json({
        error: -1,
        msg: cart.message,
      })
    }
    else{
        res.json(cart)
    }
    
  }

  export const cartOrder = async (req: Request, res: Response) => {
    try {
      const user = req.user
      const cartProducts = await cartDao.getProductsByCartId(user)
      MailSender.newOrder(user,cartProducts)
      res.redirect('/api/cart')
    } catch (error) {
      Logger.error(error)
    }
  }