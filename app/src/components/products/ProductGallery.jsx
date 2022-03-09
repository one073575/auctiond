import { Box, Grid, Icon, Image } from '@chakra-ui/react'
import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { useSelector } from 'react-redux'

function ProductGallery() {
    const { gallery } = useSelector((state) => state.gallery)

    return (
        <Grid gap='0.5rem' templateColumns='repeat(4, 1fr)'>
            {gallery &&
                gallery.map((img) => (
                    <Box width='100%' height='10vh' position='relative'>
                        <Box
                            top='0'
                            left='0'
                            height='100%'
                            width='100%'
                            position='absolute'
                            p='10px'
                            zIndex='10'>
                            <Icon
                                as={FaTrashAlt}
                                color='#fff'
                                fontSize='1rem'
                                cursor='pointer'
                                onClick={() => {}}
                            />
                        </Box>
                        <Image
                            height='100%'
                            width='100%'
                            objectFit='cover'
                            borderRadius='10px'
                            alt={img.pubId}
                            src={img.url}
                        />
                    </Box>
                ))}
        </Grid>
    )
}

export default ProductGallery
