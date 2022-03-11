import os from 'os'
import express from 'express'
import http from 'http'
import config from 'config'
import socket from 'socket.io'
import logger from './api/utils/logger'
import connectDb from './api/resources/db'
import bootstrap from './api/app'
// create express app
let server
const app = express()

app.start = async () => {
    logger.info('Starting app ...')

    // await mongoose.connect
    await connectDb(() => {
        logger.info('Starting server ...')

        const signals = ['SIGINT', 'SIGTERM']

        signals.forEach((signal) => process.on(signal, process.exit))

        const port = process.env.PORT || config.get('port') || 4000
        app.set('port', port)

        bootstrap(app)

        server = http.createServer(app)

        server.on('error', (error) => {
            if (error.syscall !== 'listen') {
                throw error
            }

            error.description = 'Failed to start server'
            logger.error(error)
            process.exit(15)
        })

        server.on('listening', () => {
            const address = server.address()
            logger.info(`Server listening ${address.port} : ${os.hostname}`)
            logger.info('api is up 🚀')
        })

        if (process.env.NODE_ENV !== 'test') {
            server.listen(port)
        }
    })
}

Promise.resolve(true)
    .then(app.start)
    .catch((err) => {
        logger.error(err)
        setTimeout(() => process.exit(15), 1000)
    })

export default app
