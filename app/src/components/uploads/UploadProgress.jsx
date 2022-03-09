import React, { useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import { ScaleLoader as Loader } from 'react-spinners'
import { useUploads } from '../../hooks/useUpload'
import { useAlert } from '../../context/AlertProvider'

function UploadsProgress({ files, setFiles }) {
    const { setError } = useAlert()
    const { progress, error } = useUploads(files, setFiles)

    useEffect(() => {
        if (error) {
            setError(error)
        }
    }, [error])

    return (
        <Box>
            {progress && (
                <Loader
                    height={35}
                    width={4}
                    radius={2}
                    margin={2}
                    color='#6c2383'
                />
            )}
        </Box>
    )
}

export default UploadsProgress
