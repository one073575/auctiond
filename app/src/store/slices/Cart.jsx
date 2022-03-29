import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    loading: false,
}

export const cartSlice = createSlice({
    name: 'Cart',
    initialState,
    reducers: {
        addCartItem: (state, action) => {
            const { payload } = action
            return {
                ...state,
                items: [...state.items, payload],
            }
        },

        fetchCartProducts: (state, action) => {
            const { payload } = action
            return {
                ...state,
                items: payload,
            }
        },

        updateCartItem: (state, action) => {
            const { payload } = action

            const cartItems = state.items.map((item) => {
                if (item.id === payload.id) {
                    item = payload
                }
                return item
            })

            return {
                ...state,
                items: cartItems,
            }
        },

        removeCartItem: (state, action) => {
            const { payload } = action
            return {
                ...state,
                items: state.items.filter((item) => item.id !== payload),
            }
        },

        setCartLoadingState: (state, action) => {
            const { payload } = action
            return {
                ...state,
                loading: payload,
            }
        },

        clearCartlist: (state) => ({
            ...state,
            items: [],
            loading: false,
        }),
    },
})

export const {
    addCartItem,
    updateCartItem,
    fetchCartProducts,
    removeCartItem,
    setCartLoadingState,
    clearCartlist,
} = cartSlice.actions

export default cartSlice.reducer
