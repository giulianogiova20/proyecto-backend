import { Request, Response, NextFunction } from 'express'
import Logger from '../utils/logger'


const checkUserAuth = (req: Request, res: Response, next: NextFunction) => {
	try {
		if (req.isAuthenticated()) return next()
		return res.status(401).json({ error: 'Not logged in'})

	} catch (error) {
		Logger.error(`Error has occured when checkUserAuth method, ${error}`)
	}
}

export default checkUserAuth