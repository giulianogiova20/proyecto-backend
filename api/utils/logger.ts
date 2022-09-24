import winston from 'winston'

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
             filename: 'logs/error.log', 
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
            filename: 'logs/warn.log', 
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