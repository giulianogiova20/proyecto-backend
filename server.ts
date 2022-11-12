//Express
import express from 'express'
import session from 'express-session'
//Server Config
import persistenceConfig from './api/config'
import MongoStore from "connect-mongo"
import cluster from 'cluster'
import os from 'os'
//Routes
import indexRouter from './api/routes'
//Others
import flash from "connect-flash"
import cookieParser from 'cookie-parser'
import passport from 'passport'
import { passportLoad } from './api/utils/passport'
import path from 'path'
import Logger from './api/utils/logger'
//Middlewares
import errorHandler from './api/middlewares/errorHandler'
import wrongRoute from './api/middlewares/wrongRoute'

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
/* app.use(express.static(path.join(__dirname, '../public'))) */
app.use(express.static(path.join(__dirname, '../uploads')))
app.use(express.json())//Acceso al rec.body
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

//CONFIGURACION MOTOR DE PLANTILLAS EJS
app.set('views', path.join(__dirname, '../api/views'))
app.set('view engine', 'ejs')

const mongoOptions: any = { useNewUrlParser: true, useUnifiedTopology: true }
app.use(
    session({
      store: MongoStore.create({
        mongoUrl:
        persistenceConfig.MONGO_ATLAS_URL,
        mongoOptions
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
app.use('/', indexRouter)

//EXTRA ERRORs HANDLER
app.use(errorHandler)

//WRONG ROUTE
app.use(wrongRoute)


