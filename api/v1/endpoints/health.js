import { Router } from 'express'

const router = Router()

/* 
    Health check to check if the api is working  - returns a message and the current date
   
*/
router.get('/', (_, res) => {
    res.status(200).send({ message: 'ok', date: new Date().toLocaleString() })
})

// eslint-disable-next-line
export const healthRoutes = router
