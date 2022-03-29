import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    wishlist: [],
    loading: false,
}

export const wishlistSlice = createSlice({
    name: 'Wishlist',
    initialState,
    reducers: {
        fetchWishlist: (state, action) => {
            const { payload } = action
            return {
                ...state,
                wishlist: payload,
            }
        },

        deleteWish: (state, action) => {
            const { payload } = action
            return {
                ...state,
                wishlist: state.wishlist.filter(
                    (product) => product.id !== payload.productId
                ),
            }
        },

        setWishLoadingState: (state, action) => {
            const { payload } = action
            return {
                ...state,
                loading: payload,
            }
        },

        clearWishlist: (state) => ({
            ...state,
            wishlist: [],
            loading: false,
        }),
    },
})

export const { fetchWishlist, deleteWish, setWishLoadingState, clearWishlist } =
    wishlistSlice.actions

export default wishlistSlice.reducer
