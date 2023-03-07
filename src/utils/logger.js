const { format, createLogger, transports, loggers } = require('winston')
const { timestamp, combine, colorize, printf } = format

const logFormat = printf(({ level, message, timestamp }) => {
    return `( ${timestamp} ) ${level} : ${message}`
})


const loggerConsole = createLogger({
    level: 'info',
    format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), 
        logFormat 
    ),
    transports: [
        new transports.Console({ level: 'info' }),
        // new transports.File({ filename: 'log_warn.log', level: 'warn' }),
        // new transports.File({ filename: 'log_error.log', level: 'error' }),
    ]
})

loggers.add('loggerWarn',{
    level: 'warn',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), 
        logFormat 
    ),
    transports: [
        new transports.Console({ level: 'warn' }),
        new transports.File({ filename: 'log_warn.log', level: 'warn' }),
    ]
})

loggers.add('loggerError',{
    level: 'error',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), 
        logFormat 
    ),
    transports: [
        new transports.Console({ level: 'error'}),
        new transports.File({ filename: 'log_error.log', level: 'error' }),
    ]
})

const loggerWarn = loggers.get('loggerWarn')
const loggerError = loggers.get('loggerError')


module.exports = {
    loggerConsole,
    loggerWarn,
    loggerError
}