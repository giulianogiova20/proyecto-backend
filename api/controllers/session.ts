import { Request, Response, NextFunction } from 'express'
import sendEmail from '../utils/nodemailer'

//LOGIN  
export const login = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).render('home', { user: req.user })
	next()
}

export const renderLogin = (req: Request, res: Response) => {
	if (req.isAuthenticated()) {
		res.redirect('/')
	} else {
		res.render('login')
	}
}

//LOGOUT
export const logout = (req: Request, res: Response) => {
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
export const renderSignUp = async (req: Request, res: Response) => {
	if (req.isAuthenticated()) {
		res.redirect('/')
	} else {
		res.render('signup')
	}
}

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
	res.status(201).render('createdUser', { user: req.user })
	sendEmail()
	next()
}


//FAILED SIGNUP
export const renderFailedSignup = async (req: Request, res: Response) => {
	res.status(409).render('failedSignup', { message: req.flash("error")[0] })	
}


//FAILED LOGIN
export const renderFailedLogin = (req: Request, res: Response) => {
	res.status(401).render('failedLogin', { message: req.flash("error")[0] })
}

//HOME
export const renderHome = (req: Request, res: Response) => {
	res.render('home', {user: req.user})
  }

//UPLOAD
export const renderUpload = (req: Request, res: Response) => {
	if (req.isAuthenticated()){
		res.render('upload')
	} else {
		res.render('login')
	}
  }

//UPLOAD SUCCESS  
export const uploadSuccess = async (req: Request, res: Response, next: NextFunction) => {
	res.status(201).render('uploadSuccess')
	next()
}
