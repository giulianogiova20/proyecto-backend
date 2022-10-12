import mongoose from 'mongoose'
import cartModel from '../../../models/schemas/cartSchema'
import mongoConnection from '../../mongoDB/connection'
import CartDTO from '../../DTOs/cartDTO'
import Logger from '../../../utils/logger'
import ProductDTO from '../../DTOs/productDTO'

class CartMongoDAO {

  model: mongoose.Model<any, {}, {}, {}>
  DTO: CartDTO
  static instance: CartMongoDAO

  constructor( cartModel: mongoose.Model<any, {}, {}, {}>, DTO: any ){
    this.model = cartModel
    this.DTO = DTO
  }

  async createNewCart(user: any) {
      const cart = new this.model({user: {id: user.id, username: user.email}, products: []})
      //const cart = new this.model({user: user.id, products: []})
      await cart.save()
  }

  async deleteProductsByCartId(user: any) {
    const cart: any = await this.model.findOne({user: user.id}).populate({ path: 'user' })

    if (cart === null) {
      return { error: 'Cart not found' }
    } else {
        const cartProductsDelete = await this.model.updateOne(
        { _id: cart._id },
        {
          $set: {
            products: 
              []
          }
        }
      )
      if (cartProductsDelete.modifiedCount === 0) {
        Logger.error('Products not deleted from cart')
      } else {
        Logger.info('Products deleted from cart')
      }
    }
  }


  async getProductsByCartId(user: any) {
      const cart: any = await this.model.findOne().populate({ path: 'user' })

      if (cart === null) {
        return { error: 'Cart not found' }
      } else {
        const foundItemsInCart = cart.products
        Logger.info(`Cart: ${foundItemsInCart}`)
        return foundItemsInCart
      }
  }

  async addProductToCartById(user: any, product: any) {      
      const cart: any = await this.model.findOne().populate({ path: 'user.id'})

      if (cart === null) {
        return { error: 'Cart not found' }
      } else {
        const newCartProduct = await this.model.updateOne(
          { _id: cart._id },
          {
            $push: {
              products: product
            }
          }
        )
        if (newCartProduct.modifiedCount === 0) {
          Logger.error('Product not added to cart')
        } else {
          Logger.info('Product added to cart')
        }
      }
  }

  async deleteProductByCartId(user: any, product: any) {
      const cart: any = await this.model.findOne().populate({ path: 'user.id' })

      if (cart === null) {
        return { error: 'Cart not found' }
      } else {
        const deleteCartProduct = await this.model.updateOne(
          { _id: cart._id },
          {
            $pull: {
              products: 
                {id: product.id}
            }
          })
          if (deleteCartProduct.modifiedCount === 0) {
            Logger.error('Product not deleted from cart')
          } else {
            Logger.info('Product deleted from cart')
          }
    }
  }

}

export default new CartMongoDAO(cartModel, CartDTO)
