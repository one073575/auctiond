import { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import invoke from '../utils/axios.config'
import { setGallery } from '../store/slices/Gallery'

export function useUploads(files, setFiles) {
    const dispatch = useDispatch()
    const [progress, setProgress] = useState(false)
    const [error, setError] = useState(null)
    const [res, setRes] = useState([])

    const uploadImages = useCallback(
        async (items) => {
            try {
                setProgress(true)

                const { data = {} } = await invoke(
                    'POST',
                    'product/upload',
                    items
                )

                setFiles(null)
                dispatch(setGallery(data))
                setProgress(false)
            } catch (err) {
                setProgress(false)
                setError(err.message)

                setTimeout(() => {
                    setError(null)
                }, 4000)
            }
        },
        [dispatch, setFiles, setRes]
    )

    useEffect(() => {
        uploadImages(files)
    }, [files, uploadImages])

    return { progress, data: res, error }
}
