import { Router } from 'express'
import passport from 'passport'
import { SessionController } from "../../controllers"
import user from '../../models/schemas/userSchema'
import { upload } from '../../utils/multer'

export const sessionSignup = Router() 

sessionSignup.post('/', SessionController.signUp)
sessionSignup.post('/upload', upload.single('picture'), async (req: any, res: any, next: any) => {
    const file = req.file
    if(!file) {
      const error = {message: "Error when uploading file.", statusCode:400}
        return next(error)
    }

    try {
        const newData = {
          email: req.user.email,
          passport: req.user.password,
          address: req.user.address,
          age: req.user.age,
          phoneNumber: req.user.phoneNumber,
          picture: `${file.filename}`,
          isAdmin: req.user.isAdmin
        }

        const updatedData = await user.updateOne({ _id: req.user.id }, newData)
  
        if (updatedData.matchedCount === 0) {
            const error = {message: "User not found", statusCode:400}
            return next(error)
        } 
               
    } catch (err) {
        console.log('Method update: ', err)
    }

    next()
  }, SessionController.uploadSuccess)
sessionSignup.get('/failed', SessionController.failedSignup)



/* FAILURE REDIRECT EXCPECTS: (err, user, info)
1) done(null, user) which means no error and successful authentication

2) done(null, false, {custom Message}) which means no error but either email or password didn't matched.

3)  done(err) which just returns if error occurs while processing. */