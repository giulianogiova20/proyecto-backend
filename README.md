## CODERHOUSE BACKEND FINAL PROJECT by Giuliano Giovanelli

---

Postman Collection included


**Start APP local**

Make .env as env.example.

npm start || npm start 8080 cluster

#### API ROUTES:

##### PRODUCTS

- **Get all products**

  - `GET` | api/products

- **Filter products by category**

  - `GET` | api/products/categories/:category

- **Get product by id**

  - `GET` | api/productos/:id

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