import mongoose from 'mongoose'
import cartModel from '../../../models/schemas/cartSchema'
import mongoConnection from '../../mongoDB/connection'
import CartDTO from '../../DTOs/CartDTO'
import Logger from '../../../utils/logger'


class CartMongoDAO {

  model: mongoose.Model<any, {}, {}, {}>
  DTO: any
  static instance: CartMongoDAO

  constructor( cartModel: mongoose.Model<any, {}, {}, {}>, DTO: CartDTO ){
    this.model = cartModel
    this.DTO = DTO
  }

  static getInstance(cartModel: mongoose.Model<any, {}, {}, {}>, DTO: any){
    if(!this.instance) {
        this.instance = new CartMongoDAO(cartModel, DTO)
    }
    return this.instance
  }

  async createNewCart(user: any) {
      //const cart = new this.model({user: {id: user.id, username: user.email}, products: []})
      const cart = new this.model({user_id: user.id, user_email: user.email, products: []})
      const data = await cart.save()
      return new this.DTO(data).toJson()
  }

  async deleteProductsByCartId(user: any) {
    const cart: any = await this.model.findOne({user_id: user.id})

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
        return { error: 'Products not deleted from Cart' }
      } else {
        const updatedCart: any = await this.model.findOne({user_id: user.id})
          return new this.DTO(updatedCart).toJson()
      }
    }
  }


  async getProductsByCartId(user: any) {
      const cart: any = await this.model.findOne({user_id: user.id})

      if (cart === null) {
        return { error: 'Cart not found' }
      } else {
        return new this.DTO(cart).getProducts()
      }
  }

  async addProductToCartById(user: any, prod_id: any, quantity: any) {      
      const cart: any = await this.model.findOne({user_id: user.id})
      if (cart === null) {
        return { error: 'Cart not found' }
      } else {
        const newCartProduct = await this.model.updateOne(
          { _id: cart._id },
          {
            $push: {
              products: {prod_id,quantity}
            }
          }
        )
        if (newCartProduct.modifiedCount === 0) {
          Logger.error('Product not added to cart')
        } else {
          const updatedCart: any = await this.model.findOne({user_id: user.id})
          return new this.DTO(updatedCart).toJson()
        }
      }
  }

  async deleteProductByCartId(user: any, prod_id: any) {
      const cart: any = await this.model.findOne({user_id: user.id})

      if (cart === null) {
        return { error: 'Cart not found' }
      } else {
        const deleteCartProduct = await this.model.updateOne(
          { _id: cart._id },
          {
            $pull: {
              products: 
                {id: prod_id}
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

export default CartMongoDAO.getInstance(cartModel, CartDTO)
