import winston from 'winston'
/* import dotenv from 'dotenv'

dotenv.config()
const envMode = process.env.ENVIRONMENT_MODE || 'development'

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
}

//Si está en modo producción, solo se muestra el error y warnings en consola
const level = () => {
    const isDevelopment = envMode === 'development'
    return isDevelopment ? 'debug' : 'warn'
}

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
}


winston.addColors(colors)

const format = winston.format.combine(
    winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss:ms' }),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
)

const transports = [
    new winston.transports.Console({
        format: winston.format.combine(winston.format.colorize({all: true}), format),
    }),
    new winston.transports.File({
        filename: 'logs/warn.log',
        level: 'warn',
        format: format,
    }),
    new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
        format: format
    }),
]

const Logger = winston.createLogger({

    level: level(),
    levels,
    //format,
    transports,
})
 */
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({ 
            level: 'info', 
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
              )
            })
        ]
})

const loggerError = winston.createLogger({
    transports: [
        new winston.transports.Console({ 
            level: 'info', 
            format: winston.format.combine(
                winston.format.errors({ stack: true}),
                winston.format.timestamp(), 
                winston.format.prettyPrint()
              )
            }),
        new winston.transports.File({
             filename: __dirname + '/logs/error.log', 
             level: 'error', 
             format:  winston.format.combine(
                winston.format.errors({ stack: true}),
                winston.format.timestamp(), 
                winston.format.prettyPrint()
             )})
    ]
})

const loggerWarn = winston.createLogger({
    transports: [
        new winston.transports.Console({ 
            level: 'info', 
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
              )
            }),
         new winston.transports.File({
            filename: __dirname + '/logs/warn.log', 
            level: 'warn', 
            format:  winston.format.combine(
                winston.format.errors({ stack: true}),
                winston.format.timestamp(), 
                winston.format.prettyPrint()
             )})
    ]
})

const Logger = {
    info:(msg:any)=> logger.info(msg),
    warn:(msg:any)=> loggerWarn.warn(msg),
    error:(msg:any)=> loggerError.error(msg)
}

export default Logger