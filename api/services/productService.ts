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
        const data = await this.model.getProductById(id)
        return data
    }

    async addProduct(product: String){
        const data = await this.model.addProduct(product)
        return data
    }

    async updateProductById(id: String, product: any){
        const data = await this.model.updateProductById(id, product)
        return data
    }

    async deleteProductById(id: String){
        const data = await this.model.deleteProductById(id)
        return data
    }


}

export default new ProductService(model)