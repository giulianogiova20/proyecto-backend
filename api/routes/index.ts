import { Router } from 'express'
import productsRouter from './products'
import cartRouter from './cart'
import InfoRouter from './info'
import { sessionLogin, sessionLogout, sessionSignup } from './session'
import checkUserAuth from '../middlewares/checkUserAuth'
import OrderRouter from './order'


const indexRouter = Router()

indexRouter.use("/login", sessionLogin)
indexRouter.use("/logout", sessionLogout)
indexRouter.use("/signup", sessionSignup)
indexRouter.use('/api/products', productsRouter)
indexRouter.use('/api/cart', cartRouter)
indexRouter.use('/info', InfoRouter)
indexRouter.use('/api/order', OrderRouter)

export default indexRouter