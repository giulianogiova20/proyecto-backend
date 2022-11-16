import { Router } from 'express'
import productsRouter from './products'
import cartRouter from './cart'
import InfoRouter from './info'
import { sessionLogin, sessionLogout, sessionSignup } from './session'
import OrderRouter from './order'
import ChatRouter from './chat'


const indexRouter = Router()

indexRouter.use("/login", sessionLogin)
indexRouter.use("/logout", sessionLogout)
indexRouter.use("/signup", sessionSignup)
indexRouter.use('/api/products', productsRouter)
indexRouter.use('/api/cart', cartRouter)
indexRouter.use('/api/info', InfoRouter)
indexRouter.use('/api/order', OrderRouter)
indexRouter.use('/api/chat', ChatRouter)

export default indexRouter