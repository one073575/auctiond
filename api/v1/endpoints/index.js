import { healthRoutes } from './health'
import { authRoutes } from './auth'
import { productRoutes } from './product'
import { bidRoutes } from './Bids'
import { wishlistRoutes } from './Wishlist'
import { cartRoutes } from './Cart'

const endpoints = [
    { path: '/bid', router: bidRoutes },
    { path: '/auth', router: authRoutes },
    { path: '/cart', router: cartRoutes },
    { path: '/health', router: healthRoutes },
    { path: '/product', router: productRoutes },
    { path: '/wishlist', router: wishlistRoutes },
]

export default endpoints
