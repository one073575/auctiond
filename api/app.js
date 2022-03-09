import express from 'express'
import cors from 'cors'
import config from 'config'
import path from 'path'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import api from './v1'
import logger from './utils/logger'

export default function bootstrap(app) {
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 200,
    })
    if (config.get('cors.enabled')) {
        const corsOptions = {
            origin: config.get('cors.origins'),
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            preflightContinue: false,
        }

        app.use(cors(corsOptions))
    }

    app.use(express.json({ limit: '50mb' }))
    app.use(express.urlencoded({ limit: '50mb', extended: true }))
    app.use(compression())
    app.use(limiter)
    // Routes
    app.use('/api/v1', api)

    // use static

    app.use(express.static('public'))
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(path.join(__dirname, '../dist/index.html')))
    })

    // 404
    app.use((req, res) => {
        res.status(404).send({
            status: 404,
            message: 'The requested resource was not found',
        })
    })

    // 5xx
    app.use((err, req, res, next) => {
        // eslint-disable-line
        logger.error(err)
        const message =
            process.env.NODE_ENV === 'production'
                ? "Something went wrong, we're looking into it..."
                : err.stack
        res.status(500).send({ status: 500, message })

        next()
    })
}
