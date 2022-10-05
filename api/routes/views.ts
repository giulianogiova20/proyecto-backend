import { Router } from "express"
import { productsController, sessionController } from "../controllers"
import checkUserSession from "../middlewares/checkUserSession"
import auth from "../middlewares/auth"

const viewsRouter = Router()

viewsRouter.get('/', checkUserSession, async (req, res) => {
    const products = await productsController.getAllProducts(req, res)
	res.render("home", { logged: true, user: req.user, products: products })
})

//solo admins
viewsRouter.get('/addProdForm',auth ,sessionController.renderAddProdForm)

export default viewsRouter