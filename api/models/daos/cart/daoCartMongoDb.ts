import { NextFunction } from 'express'
import Logger from '../../../utils/logger'
import MongoDBContainer from '../../containers/mongoDbContainer'
import cartModel from '../../schemas/cartSchema'
import mongoose from 'mongoose'

class CartsDAOMongoDB extends MongoDBContainer {
  constructor() {
    super(cartModel)
  }

  async createNewCart(user: any) {
      //const cart = new this.model({user: {id: user.id, username: user.email}, products: []})
      const cart = new this.model({user: user.id, products: []})
      await cart.save()
  }

  async deleteCartById(id: any) {
    try {
      const cart: any = await this.model.findOne({ _id: id })

      if (cart === null) {
        return { error: 'Cart not found' }
      } else {
        await cart.remove()
      }
    } catch (err) {
      console.log(err)
    }
  }

  async getProductsByCartId(user: any) {
      const cart: any = await this.model.findOne({ user: user.id })
      Logger.info(`Cart: ${cart}`)
      if (cart === null) {
        return { error: 'Cart not found' }
      } else {
        const foundItemsInCart = cart.products
        Logger.info(`Cart: ${foundItemsInCart}`)
        return foundItemsInCart
      }
  }

  async addProductsById(product: any, user: any) {
    try {
      
      const cart: any = await this.model.findOne({ user: user.id })
      Logger.info(`Cart: ${cart}`)
      if (cart === null) {
        return { error: 'Cart not found' }
      } else {
        
        const newCartProduct = await this.model.updateOne(
          { _id: cart._id },
          {
            $push: {
              products: 
                product
            }
          }
        )
        if (newCartProduct.modifiedCount === 0) {
          Logger.error('Product not added')
        } else {
          Logger.info('Product added to cart')
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  async deleteProductByCartId(id: any, id_prod: any) {
    try {
      const cart: any = await this.model.findOne({ _id: id })

      if (cart === null) {
        return { error: 'Cart not found' }
      } else {
        const deleteCartProduct = await this.model.updateOne(
          {
            _id: id
          },
          {
            $pull: {
              products: {
                product: {id: id_prod}
              }
            }
          })
      console.log(deleteCartProduct)
      if (deleteCartProduct.modifiedCount === 0) {
        return { error: 'Product not found.' }
      } else {
          return { msg: 'Product deleted.' }
      }
    }
    } catch (err) { 
      console.log(err)
    }
  }
}

export default new CartsDAOMongoDB()
