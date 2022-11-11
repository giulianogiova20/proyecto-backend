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

    async addProductToCartById(user: any, prod_id: any, quantity: any){
        return await this.model.addProductToCartById(user, prod_id, quantity)
    }

    async deleteProductByCartId(user: any, prod_id: any){
        return await this.model.deleteProductByCartId(user, prod_id)
    }

}

export default new CartService(model)