import { Box, Icon } from '@chakra-ui/react'
import React from 'react'
import Slider from 'react-slick'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

function ArrowLeft(props) {
    return (
        <Box {...props} className='prev'>
            <Icon as={FaChevronLeft} className='icon' margin='0.75rem 0.7rem' />
        </Box>
    )
}
function ArrowRight(props) {
    return (
        <Box {...props} className='next'>
            <Icon
                as={FaChevronRight}
                className='icon'
                margin='0.75rem 0.85rem'
            />
        </Box>
    )
}

function Slides({
    children,
    dots,
    infinite,
    speed,
    arrows,
    slidesToShow,
    slidesToScroll,
    autoplay,
}) {
    const settings = {
        dots,
        infinite,
        speed,
        arrows,
        autoplay,
        slidesToShow,
        slidesToScroll,
        prevArrow: <ArrowLeft />,
        nextArrow: <ArrowRight />,
    }
    return (
        <Slider {...settings} className='slider'>
            {children}
        </Slider>
    )
}

export default Slides
