import { Box, Image } from '@chakra-ui/react'
import React from 'react'
import Modall from '../../common/Modall'
import Slides from '../../common/Slider'

function LargeGallerySlide({ product, onClose, isOpen }) {
    return (
        <Modall
            title={product?.name}
            onClose={onClose}
            isOpen={isOpen}
            size='3xl'>
            <Box>
                <Slides
                    arrows
                    autoplay
                    dots
                    infinite
                    speed={500}
                    slidesToScroll={1}
                    slidesToShow={1}>
                    {product &&
                        product?.images.map((img) => (
                            <Image
                                key={img?.pubId}
                                src={img?.url}
                                alt={img?.pubId}
                                objectFit='cover'
                                width='100%'
                                height='60vh'
                                borderRadius='10px'
                            />
                        ))}
                </Slides>
            </Box>
        </Modall>
    )
}

export default LargeGallerySlide
