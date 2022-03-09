import express from 'express'
import endpoints from './endpoints'

const router = new express.Router()

// map each route to the express router
endpoints.forEach((endpoint) => router.use(endpoint.path, endpoint.router))

// export the router
export default router
