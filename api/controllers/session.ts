import { Request, Response, NextFunction } from 'express'
import MailSender from '../utils/nodemailer'
import Logger from '../utils/logger'

//LOGIN  
const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
		if(req.isAuthenticated())
		next()
	} catch (err) {
		Logger.error(`Error when login method in SessionControllers, ${err}`)
	}
}

const renderLogin = (req: Request, res: Response) => {
	if (req.isAuthenticated()) {
		res.redirect('/')
	} else {
		res.render('login')
	}
}

//LOGOUT
const logout = (req: Request, res: Response) => {
	if(req.isAuthenticated()){
		const user = req.user
		req.session.destroy(() => {
			res.render('logout', {user: user})
		})
	}
    else {
		res.redirect('/')
	}
}


//SIGNUP
const renderSignUp = async (req: Request, res: Response) => {
	if (req.isAuthenticated()) {
		res.redirect('/')
	} else {
		res.render('signup')
	}
}

const signUp = async (req: Request, res: Response, next: NextFunction) => {
	const user = req.user
	res.status(201).render('createdUser', { user: user })
	MailSender.newRegister(user)
	next()
}


//FAILED SIGNUP
const renderFailedSignup = async (req: Request, res: Response) => {
	res.status(409).render('failedSignup', { message: req.flash("error")[0] })	
}


//FAILED LOGIN
const renderFailedLogin = (req: Request, res: Response) => {
	res.status(401).render('failedLogin', { message: req.flash("error")[0] })
}

//HOME
const renderHome = (req: Request, res: Response) => {
	res.render('home', {user: req.user})
  }

//UPLOAD
const renderUpload = (req: Request, res: Response) => {
	if (req.isAuthenticated()){
		res.render('upload')
	} else {
		res.render('login')
	}
  }

//UPLOAD SUCCESS  
const uploadSuccess = async (req: Request, res: Response, next: NextFunction) => {
	res.status(201).render('uploadSuccess')
	next()
}

//ADD_PRODUCTS_FORM
const renderAddProdForm = async (req: Request, res: Response) => {
	try {
		const user = req.user
	res.status(200).render('add_products', { user: user })
	} catch (error) {
		Logger.error(error)
	}		
}


export const sessionController = {
    login,
    renderLogin,
    logout,
    renderSignUp,
    signUp,
	renderFailedSignup,
	renderFailedLogin,
	renderHome,
	renderUpload,
	uploadSuccess,
	renderAddProdForm
}