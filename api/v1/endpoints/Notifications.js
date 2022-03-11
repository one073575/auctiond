import { Router } from 'express'
import logger from '../../utils/logger'
import { Notification } from '../models'
import { newNotification } from '../utils/notificationMethods'

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

        const notification = await newNotification(Notification, data)
        res.status(201).send({ message: 'ok', notification: notification })
    } catch (error) {
        logger.error(error)
        res.status(error.statusCode || 500).send(error)
    }
})

router.get('/to/:toId', async (req, res) => {
    try {
        const { toId } = req.params
        const notifications = await Notification.find({ to: toId }).sort({
            created: '-1',
        })

        res.status(200).send({ notifications })
    } catch (error) {
        logger.error(error)
        res.status(error.statusCode || 500).send(error)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const exists = await Notification.exists({ _id: id })

        if (!exists) {
            return res.status(404).send('Notification does not exist')
        }
        const deleted = await Notification.findByIdAndDelete(id)

        res.status(200).send({ deleted, message: 'Notification deleted' })
    } catch (error) {
        logger.error(error)
        res.status(error.statusCode || 500).send(error)
    }
})

// eslint-disable-next-line
export const notificationRoutes = router
