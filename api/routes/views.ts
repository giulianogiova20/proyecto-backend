import { Router } from "express"
import { ProductController, SessionController } from "../controllers"
import checkUserAuth from "../middlewares/checkUserAuth"
import checkUserRole from "../middlewares/checkUserRole"

const viewsRouter = Router()

viewsRouter.get('/', checkUserAuth, async (req, res) => {
    const products = await ProductController.getAll(req, res)
	res.render("home", { logged: true, user: req.user, products: products })
})

//solo admins
viewsRouter.get('/addProdForm',checkUserRole ,SessionController.renderAddProdForm)

export default viewsRouter