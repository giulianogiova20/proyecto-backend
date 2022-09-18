import { Router } from 'express'
import passport from 'passport'
import {renderSignUp, signUp, renderFailedSignup, renderUpload, uploadSuccess} from "../../controllers/session"
import user from '../../models/schemas/user'
import { upload } from '../../utils/multer'

export const sessionSignup = Router() 


sessionSignup.get('/', renderSignUp)
sessionSignup.post('/', passport.authenticate('signup', { failureRedirect: '/signup/failed', failureFlash: true}), signUp)
sessionSignup.get('/upload', renderUpload)
sessionSignup.post('/upload', upload.single('picture'), async (req: any, res: any, next: any) => {
    const file = req.file
    if(!file) {
      const error = {message: "no subiste nada", statusCode:400}
        return next(error)
    }

    try {
        const updatedData = await user.updateOne({ _id: req.user.id, picture: `./${file.filename}` })
  
        if (updatedData.matchedCount === 0) {
            const error = {message: "User not found", statusCode:400}
            return next(error)
        } 
               
    } catch (err) {
        console.log('Method update: ', err)
    }

    next()
  }, uploadSuccess)
sessionSignup.get('/failed', renderFailedSignup)

/* FAILURE REDIRECT EXCPECTS: (err, user, info)
1) done(null, user) which means no error and successful authentication

2) done(null, false, {custom Message}) which means no error but either email or password didn't matched.

3)  done(err) which just returns if error occurs while processing. */