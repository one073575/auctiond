import { Router } from 'express'
import logger from '../../utils/logger'
import { Notification } from '../models'

const router = Router()

router.post('/', async (req, res) => {
    try {
        const { sms = false, email = false } = req.query
        const data = req.body

        if (sms) {
            // TODO: send sms notification
        }

        if (email) {
            // TODO: send email notification
        }

        // TODO: try socket.io connection and emit a notification to client

        const newNotification = new Notification({
            ...data,
        })

        const savedNotification = await newNotification.save()
        res.status(201).send({ message: 'ok', notification: savedNotification })
    } catch (error) {
        logger.error(error)
        res.status(error.statusCode || 500).send(error)
    }
})

// eslint-disable-next-line
export const notificationRoutes = router
