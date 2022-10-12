//const model = require("../persistence/factory")("cart")

import m from "../persistence/factory"
const model = m("cart")

class CartService {

    model: any

    constructor(model: any){
        this.model = model
     }

    async createNewCart(user: any){
        return await this.model.createNewCart(user)
    }

    async deleteProductsByCartId(user: any){
        return await this.model.deleteProductsByCartId(user)

    }

    async getProductsByCartId(user: any){
        return await this.model.getProductsByCartId(user)

    }

    async addProductToCartById(user: any, product: any){
        return await this.model.addProductToCartById(user, product)
    }

    async deleteProductByCartId(user: any, product: any){
        return await this.model.deleteProductByCartId(user, product)
    }

}

export default new CartService(model)