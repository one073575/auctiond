import { Router } from 'express'
import { Bid } from '../models'
import logger from '../../utils/logger'

const router = Router()

router.post('/', async (req, res) => {
    try {
        const data = req.body

        const exists = await Bid.exists({
            userId: data.userId,
            productId: data.productId,
        })

        let highestBid = await Bid.findOne({ productId: data.productId }).sort({
            bid: -1,
        })

        if (exists) {
            if (data.bid < highestBid.startPrice) {
                return res
                    .status(400)
                    .send('Your bid should be higher than the starting price')
            }

            if (data.bid < highestBid.bid) {
                return res
                    .status(400)
                    .send('Your bid should be higher than the highest bid')
            }

            const update = {
                ...data,
                updated: Date.now(),
            }

            await Bid.findOneAndUpdate(
                { productId: data.productId, userId: data.userId },
                { $set: update }
            )
        } else {
            const newBid = new Bid({
                ...data,
            })
            await newBid.save()
        }

        highestBid = await Bid.findOne({ productId: data.productId }).sort({
            bid: -1,
        })
        res.status(201).send({
            bid: highestBid,
            message: 'Bid successfully added',
        })
    } catch (error) {
        logger.error(error)
        res.status(error.statusCode || 500).send(error)
    }
})

router.get('/:prodId', async (req, res) => {
    try {
        const { prodId } = req.params

        const bids = await Bid.find({ productId: prodId })
            .sort({ bid: -1 })
            .limit(10)

        res.status(200).send({ bids })
    } catch (error) {
        logger.error(error)
        res.status(error.statusCode || 500).send(error)
    }
})

router.get('/product/:prodId', async (req, res) => {
    try {
        const { prodId } = req.params
        const highestBid = await Bid.findOne({ productId: prodId }).sort({
            bid: -1,
        })

        res.status(200).send({ bid: highestBid })
    } catch (error) {
        logger.error(error)
        res.status(error.statusCode || 500).send(error)
    }
})

// eslint-disable-next-line
export const bidRoutes = router
