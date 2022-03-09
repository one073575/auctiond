import { Box, Center, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import UploadProgress from '../uploads/UploadProgress'

function DropZone() {
    const [images, setImages] = useState(null)

    const handleDrop = (files) => {
        setImages(null)
        const formData = new FormData()

        for (let i = 0; i < files.length; i += 1) {
            formData.append('files', files[i])
        }

        setImages(formData)
    }

    const progress = images ? (
        <UploadProgress files={images} setFiles={setImages} />
    ) : (
        <Box
            bg='gray.50'
            border='2px solid'
            borderColor='gray.300'
            borderStyle='dotted'
            height='25vh'
            borderRadius='10px'>
            <Center height='100%' width='100%'>
                <Text>drag&apos;n drop or click to upload your image(s)</Text>
            </Center>
        </Box>
    )

    return (
        <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
                <Box as='section'>
                    <Box {...getRootProps()}>
                        <Input {...getInputProps()} />
                        {progress}
                    </Box>
                </Box>
            )}
        </Dropzone>
    )
}

export default DropZone
