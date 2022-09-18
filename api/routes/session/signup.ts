import { Router } from 'express'
import passport from 'passport'
import {renderSignUp, signUp, renderFailedSignup} from "../../controllers/session"

export const sessionSignup = Router()  

sessionSignup.get('/', renderSignUp)
sessionSignup.post('/', passport.authenticate('signup', { failureRedirect: '/signup/failed', failureFlash: true}), signUp)
sessionSignup.get('/failed', renderFailedSignup)

/* FAILURE REDIRECT EXCPECTS: (err, user, info)
1) done(null, user) which means no error and successful authentication

2) done(null, false, {custom Message}) which means no error but either email or password didn't matched.

3)  done(err) which just returns if error occurs while processing. */