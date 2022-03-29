import { Router } from 'express'
import logger from '../../utils/logger'
import { Cart, Product } from '../models'

const router = Router()

router.post('/', async (req, res) => {
    try {
        const data = req.body

        const exists = await Cart.exists({
            productId: data.productId,
            userId: data.userId,
        })

        if (exists) {
            return res.status(400).send('Product is already your cart')
        }

        const cartItem = new Cart({
            ...data,
        })

        const savedItem = await cartItem.save()

        const prod = await Product.findOne({ _id: savedItem.productId })

        const response = {
            ...savedItem,
            product: prod,
        }

        res.status(201).send({
            product: response,
            message: 'Product Added to cart',
        })
    } catch (error) {
        logger.error(error)
        res.status(error.statusCode || 500).send(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const cartList = await Cart.find({ userId: id })

        const cartProducts = cartList.map(async (item) => {
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
            return { ...item._doc, product }
        })

        const products = await Promise.all(cartProducts)
        res.status(200).send({ products })
    } catch (error) {
        logger.error(error)
        res.status(error.statusCode || 500).send(error)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body

        const exists = await Cart.exists({ _id: id })

        if (!exists) {
            return res.status(404).send('Product does not exist')
        }

        const update = {
            ...data,
        }
        const updated = await Cart.findByIdAndUpdate(id, { $set: update })

        const prod = await Product.findOne({ _id: updated.productId })

        const response = {
            ...updated._doc,
            product: prod,
        }

        res.status(200).send({
            product: response,
            message: 'Product updated',
        })
    } catch (error) {
        logger.error(error)
        res.status(error.statusCode || 500).send(error)
    }
})
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const exists = await Cart.exists({ _id: id })

        if (!exists) {
            return res.status(404).send('Product does not exist')
        }
        const deleted = await Cart.findByIdAndDelete(id)

        res.status(200).send({
            product: deleted,
            message: 'Product removed from Cart',
        })
    } catch (error) {
        logger.error(error)
        res.status(error.statusCode || 500).send(error)
    }
})

router.delete('/checkout', async (req, res) => {
    try {
        // delete cart items after checkout
        // get cart item ids from the frontend
    } catch (error) {
        logger.error(error)
        res.status(error.statusCode || 500).send(error)
    }
})

// eslint-disable-next-line
export const cartRoutes = router
