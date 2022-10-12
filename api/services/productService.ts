//const model = require("../persistence/factory")("products")
import Logger from "../utils/logger"

import m from "../persistence/factory"
const model = m("products")


class ProductService {

    model: any

    constructor(model: any){
        this.model = model
     }

    async getAllProducts(){
        const data = await this.model.getAllProducts()
        return data
    }

    async getProductById(id: any){
        return await this.model.getProductById(Number(id))
    }

    async addProduct(product: any){
        return await this.model.addProduct(product)
    }

    async updateProduct(id: any, product: any){
        return await this.model.updateProduct(Number(id), product)
    }

    async deleteProduct(id: any){
        return await this.model.deleteProduct(Number(id))
    }


}

export default new ProductService(model)