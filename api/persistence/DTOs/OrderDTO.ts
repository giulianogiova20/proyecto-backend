class OrderDTO {

    id: string
    user: string
    products: [Object]
    status: string
    timestamp: string   
    

    constructor( newOrder: any ) {
        this.id = newOrder._id
        this.user = newOrder.user 
        this.products = newOrder.products
        this.status = newOrder.status
        this.timestamp = newOrder.timestamp 
    }

    toJson(){
        const orderDisplayed = {
            orderNo: this.id,
            user: this.user,
            products: this.products,
            status: this.status,
            timestamp: this.timestamp,
        }
        return orderDisplayed
    }
}

export default OrderDTO