//Express
import express from 'express'
import session from 'express-session'
//Models
import { productDao, chatDao } from './api/models/daos'
import User from './api/models/schemas/user'
//Server Config
import config from './api/config/mongoDBatlas'
import MongoStore from "connect-mongo"
import { Server as IOServer } from 'socket.io'
//Routes
import { sessionLogin, sessionSignup, sessionLogout, cartRouter, productsRouter, info } from "./api/routes"
//Others
import flash from "connect-flash"
import auth from './api/middlewares/auth'
import normalizeAndDenormalize from './api/utils/normalizr'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import { passportLoad } from './api/utils/passport'
import compression from 'compression'
import Logger from './api/utils/logger'
//import dotenv from 'dotenv'
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
//dotenv.config()
//const port = args.p || process.env.PORT || serverConfig.PORT || 8080
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
    Logger.info(`Server listening on port ${port}.`, `Process ID: ${process.pid}.`)
})
serverExpress.on('error', (err) => Logger.error(`An error has ocurred when starting: ${err}`))

//SOCKET
const io = new IOServer(serverExpress)
let messages: any[] = []

io.on('connection', async (socket) => {
    Logger.info(`New User connected: ${socket.id}`)
    socket.emit('server:products', await productDao.getAll())
    socket.emit('server:message', messages)

    socket.on('client:product', async (productInfo) => {
    await productDao.addProduct(productInfo)
    io.emit('server:products', await productDao.getAll())
    }) 

    socket.on('client:message', async (messageInfo) => {
        messageInfo.id = messages.length+1
        messages.push(messageInfo)
        chatDao.writeChatToFile(messages)
        //compression rate
        const denormalizedMessages = messages
        const normalizedMessages = normalizeAndDenormalize('normalize', messages)
        const lengthNormalized = JSON.stringify(normalizedMessages).length;
        const lengthDenormalized = JSON.stringify(denormalizedMessages).length;
        let compressionRate = Math.round((lengthNormalized*100) / lengthDenormalized)
        Logger.info(`Compression Rate: ${(100 - compressionRate).toFixed(2)}%`)
        io.emit('server:message', messages)
    })
})


}

//MIDDLEWARES
app.use(express.static(path.join(__dirname, '../public')))
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
	res.render("home", { logged: true, user: req.user })
})

app.use("/info", info)
app.use("/infoCompressed", compression(), info)


