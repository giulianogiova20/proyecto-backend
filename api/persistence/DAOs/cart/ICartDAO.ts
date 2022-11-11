class ICartDAO {
    constructor(){}

    async createNewCart(user: any){
        throw new Error('Cart - createNewCart not Implemented')
    }

    async addProductToCartById(user: any, prod_id: any, quantity: any){
        throw new Error('Cart - addToCartById not Implemented')
    }

    async getProductsByCartId(user: any){
        throw new Error('Cart - getProductsByCartId not Implemented')        
    }

    async deleteProductByCartId(user: any, prod_id: any){
        throw new Error('Cart - deleteProductByCartId not Implemented')
    }
}

export default ICartDAO