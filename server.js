const { options } = require('./options/options')
const { httpServer, socketIo } = require('./socketio')
const {loggerConsole, loggerError} = require('./src/utils/logger')

const PORT = options.PORT

const cluster = require('cluster')
const numCPUs = require('os').cpus().length

// const compression = require('compression')

if (options.MODE == 'CLUSTER' && cluster.isPrimary) {

    loggerConsole.info(`Master ${process.pid} started`);
    
    for (let i = 0; i < numCPUs / 4; i++) {
        cluster.fork()
    }
    cluster.on('exit', (worker) => {
        loggerConsole.info(`Worker ${worker.process.pid} died`);
        cluster.fork()
    })
} else {
    process.on('exit', code => {
        loggerError.error('Error con codigo: ' + code);
    })

    try {
        httpServer.listen(PORT, () => {
            loggerConsole.info(`Server Online on Port ${PORT}`)
            loggerConsole.debug(`Worker ${process.pid} started`);
            options.MODE == 'CLUSTER' ? loggerConsole.info("Mode: Cluster") : loggerConsole.info("Mode: Fork")
        })
    } catch (error) {
        loggerError.error(error);
    }
}

socketIo




