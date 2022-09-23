import { PassportStatic } from 'passport'
import { Strategy } from 'passport-local'
import User from '../models/schemas/user'
import Logger from '../utils/logger'


export function passportLoad(passport: PassportStatic) {

    passport.use("login", new Strategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email: string, password: string, done) => {
            try {
                const user = await User.findOne({email}).exec()
                if (!user) return done(null, false, { message: "User doesn't exist" }) //2)
                const valid = await user.comparePassword(password, user.password)
                if (!valid) return done(null, false, { message: "Wrong password" }) //2)
                return done(null, user) //1)
            }
            catch (err) {
                done(err) //3)
            }
        }
    ))

    passport.use("signup", new Strategy(
    { 
      passReqToCallback: true,
      usernameField: 'email'
    },
      async (req: any, email: string, password: string, done: any) => {

        const newUser = new User({
            email,
            password,
            name: req.body.name,
            address: req.body.address,
            age: req.body.age,
            phoneNumber: req.body.phoneNumber,
            picture: "avatar.png",
            isAdmin: 'false',
          })
          try {
              await newUser.save()
              return done(null, newUser) //1)
          } catch (err:any) {
               if(err.code === 11000) {
                  return done(null, false, { message: "User already exists" }) //2)
              }
              Logger.error(err)
              return done(err) //3) 
              }
          }

    ))

    passport.serializeUser((user: any, done: any) => {
        done(null, user._id)
        })
        
    passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user)
    })

}
      