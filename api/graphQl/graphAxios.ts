import axios from "axios"

const graphqlMutation = {
    operationName: "createProduct",
    query: `mutation createProduct {
      createProduct(data: { 
                      name: "graphQLProduct",
                      price: 14,
                      description: "graphQLProduct",
                      photoURL: "https://m.media-amazon.com/images/I/81GwfVSY+LL._AC_SX466_.jpg",
                      stock: 23 }) {
                          id
                          name
                          price
                          description
                          photoURL
                          stock
                      }
      }`,
}

const graphqlQuery = {
    operationName: "queryGraphProduct",
    query: `query queryGraphProduct{
      getProduct(id: "632e833d00ddfbd0970cb16a") {
            name
            price
            description
            photoURL
            stock
        }
    }`,
}

const options = {
    url: "http://localhost:8080/graphql",
    method: "POST",
    data: graphqlMutation,
  };
  
  const response = axios(options);
  
  console.log(response);