const axios = require('axios')

const productId = "632a67a3991e9c23557d2bb5"

const instance = axios.create({ baseURL: "http://localhost:8080" })

const getAllProducts = async() => {
    try {
        const response = await instance.get(`/api/products`)
        console.log(`getAllProducts Test Response - ${response.data}`)
    } catch (err) {
        console.log(err)
    }
}

const getProductByID = async(productId) => {
    try {
        const response = await instance.get(`/api/products/${productId}`)
        console.log(`getProductByID Test Response - ${response.data}`)
    } catch (err) {
        console.log(err)
    }
}

const addProduct = async() => {
    try {
        const response = await instance.post(`/api/products`, {
            name: 'prueba',
            price: 54,
            description: 'prueba',
            photoUrl: 'photoURL',
            stock: 10
        })
        console.log(`AddProduct Test Response - ${response.data}`)
    } catch (err) {
        console.log(err)
    }
}

const updateProduct = async(productId) => {
    try {
        const response = await instance.put(`/api/products/${productId}`, {
            price: 100
        })
        console.log(`UpdateProduct Test Response - ${response.data}`)
    } catch (err) {
        console.log(err)
    }
}

const deleteProduct = async(productId) => {
    try {
        const response = await instance.delete(`/api/products/${productId}`)
        console.log(`getAllProducts Test Response - ${response.data}`)
    } catch (err) {
        console.log(err)
    }
}

getAllProducts()
getProductByID(productId)
addProduct()
updateProduct(productId)
deleteProduct(productId)