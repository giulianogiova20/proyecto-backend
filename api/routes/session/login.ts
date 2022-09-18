import { Router } from 'express'
import passport from 'passport'

import {renderLogin, login, renderFailedLogin} from "../../controllers/session"

export const sessionLogin = Router()

sessionLogin.get('/', renderLogin)
sessionLogin.post('/', passport.authenticate('login', { failureRedirect: '/login/failed', failureFlash: true }), login)
sessionLogin.get('/failed', renderFailedLogin)


/* FAILURE REDIRECT EXCPECTS: (err, user, info)
1) done(null, user) which means no error and successful authentication

2) done(null, false, {custom Message}) which means no error but either email or password didn't matched.

3)  done(err) which just returns if error occurs while processing. */
