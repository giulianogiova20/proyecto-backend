import { Request, Response, NextFunction } from 'express'
import Logger from '../utils/logger'

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    try {
        Logger.error(`An error has occured: ${error.message}`)
        return res.status(500).json({ error: 'An error has occured, captured by errorHandler' })
    } catch (error) {
        return res.status(500).json({ error: 'An error has occured, captured by errorHandler' })
    }
}
export default errorHandler