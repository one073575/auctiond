import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orders: [],
    order: {},
}

export const orderSlice = createSlice({
    name: 'Orders',
    initialState,
    reducers: {
        createOrder: (state, action) => {
            const { payload } = action
            return {
                ...state,
                orders: [payload, ...state.orders],
            }
        },
        fetchOrders: (state, action) => {
            const { payload } = action
            return {
                ...state,
                orders: payload,
            }
        },

        fetchOrder: (state, action) => {
            const { payload } = action
            return {
                ...state,
                order: payload,
            }
        },
        updateOrder: (state, action) => {
            const { payload } = action
            return {
                ...state,
                orders: state.orders.map((order) => {
                    if (order.id === payload.id) {
                        order = payload.order
                    }
                    return order
                }),
                order:
                    state.order &&
                    state.order.id === payload.id &&
                    payload.order,
            }
        },
        deleteOrder: (state, action) => {
            const { payload } = action
            return {
                ...state,
                orders: state.orders.filter((order) => order.id !== payload),
            }
        },

        clearOrderStore: (state) => ({
            ...state,
            order: null,
            orders: [],
        }),
    },
})

export const {
    fetchOrders,
    fetchOrder,
    updateOrder,
    deleteOrder,
    clearOrderStore,
} = orderSlice.actions

export default orderSlice.reducer
