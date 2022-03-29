import { Router } from 'express'
import logger from '../../utils/logger'
import { Wish, Product } from '../models'

const router = Router()

router.post('/', async (req, res) => {
    try {
        const data = req.body

        const exists = await Wish.exists({
            productId: data.productId,
            userId: data.userId,
        })

        if (exists) {
            return res.status(400).send('Product is already in your wishlist')
        }

        const wishItem = new Wish({
            ...data,
        })

        await wishItem.save()

        res.status(201).send({
            message: 'product added to wish list',
        })
    } catch (error) {
        logger.error(error)
        res.status(error.statusCode || 500).send(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const wishList = await Wish.find({ userId: id }).sort({
            created: '-1',
        })

        const wishes = wishList.map(async (item) => {
            const product = await Product.findOne({
                _id: item.productId,
            }).select([
                'name',
                'slug',
                'price',
                'status',
                'images',
                'category',
                'condition',
                'userId',
            ])
            return product
        })

        const products = await Promise.all(wishes)
        res.status(200).send({ products })
    } catch (error) {
        logger.error(error)
        res.status(error.statusCode || 500).send(error)
    }
})

router.delete('/:userId/:productId', async (req, res) => {
    try {
        const { userId, productId } = req.params
        const exists = await Wish.exists({ userId, productId })

        if (!exists) {
            return res.status(404).send('Wish does not exist')
        }
        const deleted = await Wish.findOneAndDelete({ userId, productId })

        res.status(200).send({
            product: deleted,
            message: 'Product removed from wishlist',
        })
    } catch (error) {
        logger.error(error)
        res.status(error.statusCode || 500).send(error)
    }
})

// eslint-disable-next-line
export const wishlistRoutes = router
