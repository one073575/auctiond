import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    product: {},
    userProducts: [],
}

export const productSlice = createSlice({
    name: 'Products',
    initialState,
    reducers: {
        createProduct: (state, action) => {
            const { payload } = action
            console.log('createProduct', payload)
            return {
                ...state,
                products: [payload, ...state.products],
            }
        },
        fetchProducts: (state, action) => {
            const { payload } = action
            return {
                ...state,
                products: payload,
            }
        },

        fetchProduct: (state, action) => {
            const { payload } = action
            return {
                ...state,
                product: payload,
            }
        },

        fetchUserProducts: (state, action) => {
            const { payload } = action

            return {
                ...state,
                userProducts: payload,
            }
        },
        updateProduct: (state, action) => {
            const { payload } = action
            return {
                ...state,
                userProducts: state.userProducts.map((prod) => {
                    if (prod.id === payload.id) {
                        prod = payload.product
                    }
                    return prod
                }),
                product:
                    state.product &&
                    state.product.id === payload.id &&
                    payload.product,
            }
        },
        deleteProduct: (state, action) => {
            const { payload } = action
            return {
                ...state,
                userProducts: state.userProducts.filter(
                    (product) => product.id !== payload
                ),
            }
        },

        clearProductStore: (state) => ({
            ...state,
            userProducts: [],
        }),
    },
})

export const {
    createProduct,
    fetchProducts,
    fetchProduct,
    fetchUserProducts,
    updateProduct,
    deleteProduct,
    clearProductStore,
} = productSlice.actions

export default productSlice.reducer
