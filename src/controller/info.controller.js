const { now } = require("mongoose")
const { options } = require("../../options/options")

const serverInfo = async (req, res) => {
    
    const data = {
        args: process.argv.slice(2),
        os: process.platform,
        nodeVersion: process.version,
        memoryUsage: process.memoryUsage(),
        executePath: process.argv[1],
        processId: process.pid,
        proyectPath: process.cwd(),
        processorThreads: require('os').cpus().length

    }

    res.render('./partials/info', { data })

}

const serverData = async (req, res) => {

    res.send(`Server on Port: ${options.PORT} - PID ${process.pid} - FyH ${now().toLocaleString()}`)

}

module.exports = {
    serverInfo,
    serverData
}