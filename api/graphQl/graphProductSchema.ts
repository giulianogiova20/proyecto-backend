import { buildSchema } from "graphql"

const graphProducSchema = buildSchema(`

    input ProductInput {
        name: String,
        price: Int,
        description: String,
        photoURL: String,
        stock: Int
    }
    type Product {
        id: ID!,
        name: String!,
        price: Int!,
        description: String,
        photoURL: String,
        stock: Int
    }
    type Query {
        getProduct(id: ID!): Product,
        getAll(key: String, value: String): [Product],
    }
    type Mutation {
        addProduct(data: ProductInput): Product,
        updateProduct(id: ID!, data: ProductInput): Product,
        deleteProduct(id: ID!): Product,
    }
`)

export default graphProducSchema