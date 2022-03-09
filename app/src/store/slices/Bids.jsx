import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    bid: null,
    productBids: [],
}

export const bidSlice = createSlice({
    name: 'Bids',
    initialState,
    reducers: {
        createBid: (state, action) => {
            const { payload } = action
            return {
                ...state,
                bid: payload,
            }
        },
        fetchProductBids: (state, action) => {
            const { payload } = action
            return {
                ...state,
                productBids: payload,
            }
        },

        fetchBid: (state, action) => {
            const { payload } = action
            return {
                ...state,
                bid: payload,
            }
        },

        clearBidStore: (state) => ({
            ...state,
            bid: null,
            productBids: [],
        }),
    },
})

export const { createBid, fetchProductBids, fetchBid, clearBidStore } =
    bidSlice.actions

export default bidSlice.reducer
