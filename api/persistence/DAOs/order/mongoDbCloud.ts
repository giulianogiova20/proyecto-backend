import orderSchema from '../../../models/schemas/orderSchema'
import mongoose from 'mongoose'
import mongoConnection from '../../mongoDB/connection'
import Logger from '../../../utils/logger'
import OrderDTO from '../../DTOs/OrderDTO'
import IOrderDAO from './IOrderDAO'
import { CartService, ProductService } from '../../../services'
import MailSender from '../../../utils/nodemailer'
import MessageService from '../../../utils/messaging'

class OrderMongoDAO extends IOrderDAO {

    orderModel: mongoose.Model<any, {}, {}, {}>
    DTO: any
    static instance: OrderMongoDAO

    constructor(order: mongoose.Model<any, {}, {}, {}>, DTO: any) {
        super()
        this.orderModel = order
        this.DTO = DTO
        mongoConnection()
    }

    static getInstance(orderModel: mongoose.Model<any, {}, {}, {}>, DTO: any){
        if(!this.instance) {
            this.instance = new OrderMongoDAO(orderModel, DTO)
        }
        return this.instance
      }

    public async createOrder(user: any): Promise<any> {
        try {

            const cartProducts = await CartService.getProductsByCartId(user)

            if( cartProducts.length == 0 ) return { error: 'There is not products in Cart' }
           
            const orderProducts = await Promise.all(cartProducts.map(async (cartProduct: any) =>{
                const { name, price, description, photoURL } = await ProductService.getProductById(cartProduct.prod_id) 
                const orderProduct = { 
                    name, 
                    price, 
                    description, 
                    photoURL, 
                    quantity: cartProduct.quantity 
                }
                return {...orderProduct}
            }))
            
            const newOrder  = await this.orderModel.create(
                { 
                    user: user.email, 
                    products: orderProducts,
                    status: "generated" 
                }
            )

            //eMail to Admin
            await MailSender.newOrder(user, orderProducts)
            //SMS to user
            await MessageService.newSMS(user)

            //Empty cart products
            await CartService.deleteProductsByCartId(user)

            const data = new this.DTO(newOrder).toJson()
            return data
        } catch (err) {
            Logger.error(`MongoAtlas createOrder method error: ${err}`)
        }
    }

}

export default OrderMongoDAO.getInstance(orderSchema, OrderDTO)
