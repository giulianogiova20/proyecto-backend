import { Request, Response, NextFunction } from 'express'
import path from 'path'


const checkUserSession = (req: Request, res: Response, next: NextFunction) => {

    if (!req.session?.user) {
        return res.redirect('/api/login')
    } 
    res.sendFile(path.join(__dirname, '../public/home.html'))
    next()
}

export default checkUserSession