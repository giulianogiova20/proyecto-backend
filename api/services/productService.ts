//const model = require("../persistence/factory")("products")
import Logger from "../utils/logger"

import m from "../persistence/factory"
const model = m("products")


class ProductService {

    model: any

    constructor(model: any){
        this.model = model
     }

    async getAll(){
        const data = await this.model.getAll()
        return data
    }

    async getProductById(id: String){
        return await this.model.getProductById(id)
    }

    async addProduct(product: String){
        return await this.model.addProduct(product)
    }

    async updateProductById(id: String, product: any){
        return await this.model.updateProductById(id, product)
    }

    async deleteProductById(id: String){
        return await this.model.deleteProductById(id)
    }


}

export default new ProductService(model)