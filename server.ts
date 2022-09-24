//Express
import express from 'express'
import session from 'express-session'
//Server Config
import config from './api/config/mongoDBatlas'
import MongoStore from "connect-mongo"
//Routes
import { sessionLogin, sessionSignup, sessionLogout, cartRouter, productsRouter, info } from "./api/routes"
import { getAll } from './api/controllers/products'

//Others
import flash from "connect-flash"
import auth from './api/middlewares/auth'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import { passportLoad } from './api/utils/passport'
import compression from 'compression'
import Logger from './api/utils/logger'
import path from 'path'

import cluster from 'cluster';
import os from 'os';

declare module 'express-session' {
	export interface SessionData {
		logged: boolean
		contador: number
		user: string
		admin: boolean
	}
}

//DOTENV
const port = process.env.PORT || 8080

//SERVER
const app = express()

if ( process.argv[3] === "cluster" && cluster.isPrimary ) {

  const cpuQty = os.cpus().length //Numero de procesadores detectados.
  Logger.info(`Number of CPUs: ${cpuQty}`)
  Logger.info(`Master PID ${process.pid} is running`)

  for (let i = 0; i < cpuQty; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker: any) => {
    Logger.info(`Worker ${worker.process.pid} died`)
    cluster.fork()
  })

} else {

//Si entramos en modo distinto de CLUSTER o NO es un proceso primario.

  const serverExpress = app.listen(port, () => {
      Logger.info(`Server listening on port ${port}.`)
  })
  serverExpress.on('error', (err) => Logger.error(`An error has ocurred when starting: ${err}`))
}

//MIDDLEWARES
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.static(path.join(__dirname, '../uploads')))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))


// CONFIGURACION MOTOR DE PLANTILLAS EJS    
app.set('views', path.join(__dirname, '../api/views'))
app.set('view engine', 'ejs')

const mongoOptions: any = { useNewUrlParser: true, useUnifiedTopology: true }
app.use(
    session({
      store: MongoStore.create({
        mongoUrl:
          config.mongoDB.URI,
        mongoOptions,
      }),
      secret: process.env.SECRET_KEY as string,
      resave: false,
      saveUninitialized: false,
      rolling: true, // Reinicia el tiempo de expiracion con cada request
      cookie: {
        maxAge: 600000,
      },
    })
  )
  

//PASSPORT
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
passportLoad(passport)

//RUTAS

app.use("/login", sessionLogin)
app.use("/logout", sessionLogout)
app.use("/signup", sessionSignup)
app.use('/api', productsRouter, cartRouter)


app.get("/", auth, async (req, res: express.Response) => {
  const products = await getAll(req, res)
	res.render("home", { logged: true, user: req.user, products: products })
})

app.use("/info", info)
app.use("/infoCompressed", compression(), info)


