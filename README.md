# BACKEND FINAL PROJECT by Giuliano Giovanelli 
![CODERHOUSE](https://plataforma.coderhouse.com/images/icons/svg/coder-logo-round-1.svg)

---

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)

---
## **ABOUT**
This is the final project for Backend course on Coderhouse academy.<br/>
It simulates the backend for an e-commerce. MVC is the design patern with DAO/DTO in the model layer.

## **INSTALLATION**

### 1- Clone repo: `git clone https://github.com/giulianogiova20/proyecto-backend.git`


### 2- Install dependencies: `npm i`

### 3- Transpile the code:  `npm run build`

### 4- Make .env as env.example.

### 5- Start the app: `npm start` || `npm start 8080 cluster`

---

## **NOTES**

##### *Postman Collection included*
##### *ADMIN is a boolean hardcoded on DB*

---

## **API ROUTES**

##### PRODUCTS

- **Get all products**

  - `GET` | api/products

- **Filter products by category**

  - `GET` | api/products/categories/:category

- **Get product by id**

  - `GET` | api/products/:id

- **Add a new product**

  - `POST` | api/products

- **Update product by id**

  - `PUT` | api/products/:id

- **Delete product by id**
  - `DELETE` | api/products/:id

##### CART

*Note: user id is taken from logged user session*

- **Get all products from cart by user id**
  - `GET` | api/cart

- **Add product to cart by user id**

  - `POST` | api/cart/:id_prod

- **Delete all products from cart by user id**

  - `DELETE` | api/cart/

- **Delete a product from cart by user id**
  - `DELETE` | api/cart/:id_prod

##### SESSION

- **Login**
  - `POST` | api/login

- **Logout**
  - `POST` | api/logout

- **SignUp**
  - `POST` | api/signup

##### ORDER

- **Create new order**
  - `POST` | api/order

##### INFO

- **Get server configuration info**
  - `GET` | api/info

##### CHAT

- **Render chat app**
  - `GET` | api/chat

---

![CODERHOUSE](https://plataforma.coderhouse.com/images/icons/svg/coder-logo-round-1.svg)