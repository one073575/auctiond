import { Image } from '@chakra-ui/react'
import React from 'react'
import Slides from '../common/Slider'

function ProductGallery({ images }) {
    return (
        <Slides
            infinite
            arrows
            slidesToShow={1}
            autoplay
            slidesToScroll={1}
            speed={500}>
            {images &&
                images.map((img) => (
                    <Image
                        src={img.url}
                        alt={img.pubId}
                        key={img.pubId}
                        objectFit='cover'
                        width='100%'
                        height='70vh'
                    />
                ))}
        </Slides>
    )
}

ProductGallery.defaultProps = {
    images: [],
}

export default ProductGallery
