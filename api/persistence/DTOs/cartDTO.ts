class CartDTO {

    id: string
    products: [Object]
    user: string
    email: string
    timestamp: string

    constructor( cart: any ) {
        this.id = cart.id
        this.products = cart.products
        this.user = cart.user_id
        this.email = cart.user_email
        this.timestamp = cart.timestamp      
    }

    getId(){ return this.id }
    getProducts(){ return this.products }
    getUserId(){ return this.user }
    getTimestamp(){ return this.timestamp }   

    toJson(){
        return {
            id: this.id,
            products: this.products,
            user: this.user,
            email: this.email,
            timestamp: this.timestamp
        }
    }
}

export default CartDTO