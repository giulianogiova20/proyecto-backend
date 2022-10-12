import { Router } from "express"
import { productsController, sessionController } from "../controllers"
import checkUserAuth from "../middlewares/checkUserAuth"
import checkUserRole from "../middlewares/checkUserRole"

const viewsRouter = Router()

viewsRouter.get('/', checkUserAuth, async (req, res) => {
    const products = await productsController.getAllProducts(req, res)
	res.render("home", { logged: true, user: req.user, products: products })
})

//solo admins
viewsRouter.get('/addProdForm',checkUserRole ,sessionController.renderAddProdForm)

export default viewsRouter