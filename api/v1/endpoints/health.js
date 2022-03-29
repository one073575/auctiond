import { Router } from 'express'

const router = Router()

router.get('/', (_, res) => {
    res.status(200).send({ message: 'ok', date: new Date().toLocaleString() })
})

// eslint-disable-next-line
export const healthRoutes = router
