import { configureStore } from '@reduxjs/toolkit'
import ProductReducer from './slices/Products'
import OrderReducer from './slices/Orders'
import GalleryReducer from './slices/Gallery'
import BidReducer from './slices/Bids'

export const store = configureStore({
    reducer: {
        product: ProductReducer,
        order: OrderReducer,
        gallery: GalleryReducer,
        bids: BidReducer,
    },
})
