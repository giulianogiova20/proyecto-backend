import mongoose from 'mongoose'
import productModel from '../../../models/schemas/productSchema'
import mongoConnection from '../../mongoDB/connection'
import ProductDTO from '../../DTOs/productDTO'
import Logger from '../../../utils/logger'

class ProductMongoDAO  {
  
  model: mongoose.Model<any, {}, {}, {}>
  DTO: any
  static instance: ProductMongoDAO

  constructor(model: mongoose.Model<any, {}, {}, {}>, DTO: ProductDTO) {
    this.model = model
    this.DTO = DTO
    mongoConnection()
  }

  static getInstance(productModel: mongoose.Model<any, {}, {}, {}>, DTO: any){
    if(!this.instance) {
        this.instance = new ProductMongoDAO(productModel, DTO)
    }
    return this.instance
  }

  public async getAllProducts(): Promise<any[] | any> {
    try{
      const foundItems = await this.model.find()
      const data: any = foundItems.map( entity => 
        new this.DTO(entity).toJson())
        return data
    } catch (err) {
      Logger.error(`MongoAtlas getAll method error: ${err}`)
    }
  }

  public async getProductById(id: any): Promise<any | Error> {
    try {
      const foundItem = await this.model.findOne({ _id: id }, { __v: 0 })

      if (foundItem === null) {
          return { error: 'Product not found' }
      } else {
        const data: any = new this.DTO(foundItem).toJson()
        return data
      }
  } catch (err) {
    Logger.error(`MongoAtlas getProductById method error: ${err}`)
  }
}

  async addProduct(product: any): Promise<any | void> {
      const productToSave = new this.model(product)
      await productToSave.save()
  }

  public async updateProduct(id: any, newData: any): Promise<any> {
    try {
      const updatedData = await this.model.updateOne({ _id: id }, newData)

      if (updatedData.matchedCount === 0) {
          return { error: 'Product not found.' }
      } else {
          return { msg: `Product ${id} updated!` }
      }
     
  } catch (err) {
    Logger.error(`MongoAtlas updateProduct method error: ${err}`) 
  }
  }

  public async deleteProduct(id: any): Promise<any> {
    try {
      const deletedData = await this.model.deleteOne({ _id: id})
      if (deletedData.deletedCount === 0) {
        return { error: 'Product not found.' }
    } else {
        return { msg: 'Product deleted.' }
    }
  } catch (err) {
    Logger.error(`MongoAtlas deleteProduct method error: ${err}`) 
  }
  }

}

export default ProductMongoDAO.getInstance(productModel, ProductDTO)