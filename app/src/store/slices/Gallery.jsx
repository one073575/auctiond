import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    gallery: [],
}

export const gallerySlice = createSlice({
    name: 'Gallery',
    initialState,
    reducers: {
        setGallery: (state, action) => {
            const { payload } = action
            return {
                ...state,
                gallery: [...payload, ...state.gallery],
            }
        },

        deleteFromGallery: (state, action) => {
            const { payload } = action

            return {
                ...state,
                gallery: state.gallery.filter(
                    (image) => image?.pubId !== payload
                ),
            }
        },
        clearGallery: (state, action) => {
            const { payload = [] } = action
            return {
                ...state,
                gallery: payload,
                editGallery: payload,
            }
        },
    },
})

export const { setGallery, clearGallery, deleteFromGallery } =
    gallerySlice.actions

export default gallerySlice.reducer
