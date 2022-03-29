import { Box, Image } from '@chakra-ui/react'
import React from 'react'
import Slides from '../common/Slider'

function Hero() {
    const heroImages = [
        {
            src: '/images/hero/img1.jpg',
            alt: 'image 1',
        },
        {
            src: '/images/hero/img2.jpg',
            alt: 'image 2',
        },
        {
            src: '/images/hero/img3.jpg',
            alt: 'image 3',
        },
        {
            src: '/images/hero/img4.jpg',
            alt: 'image 4',
        },
    ]
    return (
        <Box height='auto' width='100%'>
            <Slides
                dots={false}
                infinite
                speed={500}
                arrows={false}
                slidesToShow={1}
                autoplay
                slidesToScroll={1}>
                {heroImages.map((img) => (
                    <Image
                        height='60vh'
                        key={img.alt}
                        width='100%'
                        objectFit='cover'
                        borderRadius='20px'
                        alt={img.alt}
                        src={img.src}
                    />
                ))}
            </Slides>
        </Box>
    )
}

export default Hero
