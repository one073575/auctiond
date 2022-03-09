import { Router } from 'express'
import { compare } from 'bcryptjs'
import { User } from '../models'
import logger from '../../utils/logger'
import { createHashPass, generateToken } from '../utils/authMethods'

const router = Router()

router.post('/register', async (req, res) => {
    try {
        const data = req.body
        // check if the is an existing user
        const existingUser = await User.exists({ email: data.email })

        if (existingUser) {
            return res.status(400).send('User already exists.')
        }
        // create a hash
        const hashPass = await createHashPass(data.password)
        // save Admin
        const newUser = new User({
            ...data,
            password: hashPass,
        })

        const savedUser = await newUser.save()
        // generate a jwt token

        const identity = {
            id: savedUser.id,
            email: savedUser.email,
            name: savedUser.name,
            number: existingUser.number ,
            active: existingUser.active,
            role: savedUser.email,
            created: savedUser.created,
        }

        const authIdentity = {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
            created: existingUser.created,
        }

        const authToken = await generateToken(authIdentity, { expiresIn: '2h' })
        const accessToken = await generateToken(identity)

        res.status(201).send({ authToken, accessToken, admin: identity })
    } catch (error) {
        logger.error(error)
        res.status(error.statusCode || 500).send(error.message)
    }
})
router.post('/login', async (req, res) => {
    try {
        const data = req.body

        // check if exists
        const existingUser = await User.findOne({ email: data.email })

        if (!existingUser) {
            return res.status(404).send('No user with this email exists')
        }
        // compare passwords
        const isMatch = await compare(data.password, existingUser.password)

        if (!isMatch) {
            return res.status(400).send('Email or password is invalid')
        }

        // generate token
        const identity = {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
            number: existingUser.number,
            active: existingUser.active,
            role: existingUser.role,
            created: existingUser.created,
        }

        const authIdentity = {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
            created: existingUser.created,
        }

        const authToken = await generateToken(authIdentity)
        const accessToken = await generateToken(identity)

        res.status(200).send({ authToken, accessToken, user: identity })
    } catch (error) {
        logger.error(error)
        res.status(error.statusCode || 500).send(error.message)
    }
})
router.get('/users', async (_, res) => {
    try {
        const users = await User.find({}).select('-password')
        res.status(200).send({ users })
    } catch (error) {
        logger.error(error)
        res.status(error.statusCode || 500).send(error.message)
    }
})
router.get('/user/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id).select('-password')
        res.status(200).send({ user })
    } catch (error) {
        logger.error(error)
        res.status(error.statusCode || 500).send(error.message)
    }
})
router.put('/user/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body

        const existing = await User.exists({ _id: id })

        if (!existing) {
            return res.status(404).send('user does not exist')
        }

        const update = {
            ...data,
            updated: Date.now(),
        }

        if (data.password) {
            const hashPass = await createHashPass(data.password)
            update.password = hashPass
        }

        const updatedUser = await User.findByIdAndUpdate(id, update, {
            new: true,
        }).select('-password')

        const identity = {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            number: updatedUser.number,
            active: updatedUser.active,
            role: updatedUser.role,
            created: updatedUser.created,
        }

        const accessToken = await generateToken(identity)

        res.status(200).send({
            message: 'user updated',
            accessToken,
            user: updatedUser,
        })
    } catch (error) {
        logger.error(error)
        res.status(error.statusCode || 500).send(error.message)
    }
})
router.delete('/user/:id', async (req, res) => {
    try {
        // TODO: if user is deleted remove everything related to that user
        const { id } = req.params

        const exists = await User.exists({ _id: id })

        if (!exists) {
            return res.status(404).send('user does not exist')
        }

        const deletedUser = await User.findByIdAndDelete(id)

        res.status(200).send({
            message: 'user and all related services have been deleted',
            user: deletedUser,
        })
    } catch (error) {
        logger.error(error)
        res.status(error.statusCode || 500).send(error.message)
    }
})

// eslint-disable-next-line
export const authRoutes = router
