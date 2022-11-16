import { Request, Response} from 'express'
import Logger from '../utils/logger'

class SessionController {
	constructor(){}

//LOGIN  
async login(req: Request, res: Response){
    try {
		if(req.isAuthenticated())
		res.status(200).json({ message: 'user logged'})
	} catch (error) {
		Logger.error(`Error when login method in SessionControllers, ${error}`)
	}
}

//FAILED LOGIN
async failedLogin(req: Request, res: Response){
	res.status(403).json({ error: req.flash("error")[0]})	
}

//LOGOUT
async logout(req: Request, res: Response){
	try {
		if(req.isAuthenticated()){
			req.session.destroy(() => {
				res.status(201).json({ message: 'user logged out'})
			})
		}
	} catch (error) {
		Logger.error(`Error in logout method in SessionControllers, ${error}`)
	}
}


//SIGNUP
async signUp(req: Request, res: Response){
	try {
		res.status(200).json({ message: 'user registered'})
	} catch (error) {
		Logger.error(`Error in signUp method in SessionControllers, ${error}`)
	}
}


//FAILED SIGNUP
async failedSignup(req: Request, res: Response){
	res.status(409).json({ error: req.flash("error")[0]})	
}

//UPLOAD
async renderUpload(req: Request, res: Response){
	try {
		res.render('upload')
	} catch (error) {
		Logger.error(`Error in renderUpload method in SessionControllers, ${error}`)
	}	
}


//UPLOAD SUCCESS  
async uploadSuccess(req: Request, res: Response){
	res.status(201).json({ success: 'Photo uploaded'})	
}

}

export default new SessionController