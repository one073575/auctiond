import { healthRoutes } from './health'
import { authRoutes } from './auth'
import { productRoutes } from './product'
import { bidRoutes } from './Bids'

// Import all endpoints and give them a path - the path will be added to the main url depending on which endpoint to hit

const endpoints = [
    { path: '/bid', router: bidRoutes },
    { path: '/auth', router: authRoutes },
    { path: '/health', router: healthRoutes },
    { path: '/product', router: productRoutes },
]

// http://localhost:4000/ap1/v1/bookings
export default endpoints
