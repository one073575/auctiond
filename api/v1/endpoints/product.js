import { Router } from 'express'
import config from 'config'
import slugify from 'slugify'
import { Product, Notification } from '../models'
import logger from '../../utils/logger'
import upload from '../../resources/multer'
import cloudinary from '../../resources/cloudinary'
import { newNotification } from '../utils/notificationMethods'

const router = Router()

router.post('/', async (req, res) => {
    try {
        const data = req.body
        const slug = slugify(data.name, { lower: true })

        const newProduct = new Product({
            ...data,
            slug,
        })

        const savedProduct = await newProduct.save()

        res.status(201).send({
            message: 'Product successfully added',
            savedProduct,
        })
    } catch (error) {
        logger.error(error)
        res.status(error.statusCode || 500).send(error.message)
    }
})

router.post('/upload', upload.array('files', 5), async (req, res) => {
    try {
        const { files } = req

        if (!files) {
            return res.status(400).send('images required')
        }

        const images = await Promise.all(
            files.map(async (file) => {
                const resp = await cloudinary.uploader.upload(file.path, {
                    upload_preset: config.get('cloudinary.upload_preset'),
                })

                return { url: resp.secure_url, pubId: resp.public_id }
            })
        )

        return res.status(200).send(images)
    } catch (error) {
        logger.error(error)
        res.status(error.statusCode || 500).send(error)
    }
})

router.get('/', async (req, res) => {
    try {
        // fetch products -> add filtering
        const { search } = req.query

        let query

        if (search) {
            query = { active: true, $text: { $search: search } }
        } else {
            query = { active: true }
        }
        const products = await Product.find(query).sort({
            created: 'desc',
        })

        res.status(200).send({ products })
    } catch (error) {
        logger.error(error)
        res.status(error.statusCode || 500).send(error.message)
    }
})
router.get('/:slug', async (req, res) => {
    try {
        // fetch product
        const { slug } = req.params

        const exists = await Product.exists({ slug })

        if (!exists) {
            return res.status(404).send('Product does not exist')
        }

        const item = await Product.findOne({ slug })

        res.status(200).send({ product: item })
    } catch (error) {
        logger.error(error)
        res.status(error.statusCode || 500).send(error.message)
    }
})

router.get('/user/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { search } = req.query

        let userProducts
        if (search) {
            userProducts = await Product.find({
                userId: id,
                $text: { $search: search },
            }).sort({ created: 'desc' })
        } else {
            userProducts = await Product.find({ userId: id }).sort({
                created: 'desc',
            })
        }

        res.status(200).send({ products: userProducts })
    } catch (error) {
        logger.error(error)
        res.status(error.statusCode || 500).send(error.message)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { notify } = req.query

        const data = req.body

        const existing = await Product.exists({ _id: id })

        if (!existing) {
            return res.status(404).send('Product not found')
        }

        const update = {
            ...data,
            updated: Date.now(),
        }

        delete update.message

        const toUpdate = await Product.findByIdAndUpdate(id, update, {
            new: true,
        })

        if (notify && toUpdate.id) {
            const message = {
                from: 'sys',
                to: toUpdate.userId,
                message: data.message,
            }
            await newNotification(Notification, message)
        }

        res.status(200).send({ message: 'Product updated', product: toUpdate })
    } catch (error) {
        logger.error(error)
        res.status(error.statusCode || 500).send(error.message)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const exists = await Product.exists({ _id: id })

        if (!exists) {
            return res.status(404).send('Product not found')
        }

        const deletedProduct = await Product.findByIdAndDelete(id)

        const { images } = deletedProduct

        if (images.length > 0) {
            images.forEach(async (img) => {
                await cloudinary.uploader.destroy(img.pubId)
            })
        }

        res.status(200).send({ message: 'Product deleted' })
    } catch (error) {
        logger.error(error)
        res.status(error.statusCode || 500).send(error.message)
    }
})

router.delete('/upload/:pubId', async (req, res) => {
    try {
        const { pubId } = req.params
        await cloudinary.uploader.destroy(pubId)

        return res.status(200).send({ message: 'image deleted' })
    } catch (error) {
        logger.error(error)
        res.status(error.statusCode || 500).send(error.message)
    }
})
// eslint-disable-next-line
export const productRoutes = router
