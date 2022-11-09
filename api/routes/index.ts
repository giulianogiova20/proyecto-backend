import { Router } from 'express'
import productsRouter from './products'
import cartRouter from './cart'
import InfoRouter from './info'
import viewsRouter from './views'
import { sessionLogin, sessionLogout, sessionSignup } from './session'
import checkUserAuth from '../middlewares/checkUserAuth'


const indexRouter = Router()

indexRouter.use("/login", sessionLogin)
indexRouter.use("/logout", sessionLogout)
indexRouter.use("/signup", sessionSignup)
indexRouter.use('/views', viewsRouter)
indexRouter.use('/api/products', productsRouter)
indexRouter.use('/api/cart', cartRouter)
indexRouter.use('/info', InfoRouter)

indexRouter.use('/', checkUserAuth, async (req, res) => {
    return res.redirect('/views')
})

export default indexRouter