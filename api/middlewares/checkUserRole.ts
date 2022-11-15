import { NextFunction } from 'express'
import Logger from '../utils/logger'


const checkUserRole = (req: any, res: any, next: NextFunction) => {
	const user = req.user
  	try {
		if (user.isAdmin) return next()
		return res.status(403).json({ error: `You do not have permission to access to ${req.originalUrl}`})

	} catch (error) {
		Logger.error(`Error has occured when checkUserAuth method, ${error}`)
	}
}
export default checkUserRole