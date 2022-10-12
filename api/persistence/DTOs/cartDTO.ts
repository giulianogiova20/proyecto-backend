class CartDTO {

    id: string
    products: [Object]
    user: {id:string, username:string}
    timestamp: string

    constructor( cart: any ) {
        this.id = cart.id
        this.products = cart.products
        this.user = cart.user.id
        this.timestamp = cart.timestamp      
    }

    getId(){ return this.id }
    getProduct(){ return this.products }
    getUserId(){ return this.user.id }
    getUserName(){ return this.user.username }
    getTimestamp(){ return this.timestamp }   

    toJson(){
        return {
            id: this.id,
            product: this.products,
            user: this.user.id,
            timestamp: this.timestamp
        }
    }
}

export default CartDTO