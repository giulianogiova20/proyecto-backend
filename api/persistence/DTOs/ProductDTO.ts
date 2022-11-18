class ProductDTO {

    id: string
    name: string
    price: number
    description: string
    photoURL: string
    stock: number
    timestamp: number

    constructor(  product: any  ) {
        this.id = product._id
        this.name = product.name
        this.price = product.price
        this.description = product.description
        this.photoURL = product.photoURL
        this.stock = product.stock
        this.timestamp = product.timestamp
    }

    toJson(){
        const prodDisplayed = {
            id: this.id,
            name: this.name,
            price: this.price,
            description: this.description,
            photoURL: this.photoURL,
            stock: this.stock,
            timestamp: this.timestamp
        }
        return prodDisplayed
    }
}

export default ProductDTO
