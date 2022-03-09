import { Box } from '@chakra-ui/react'
import React from 'react'
import { Helmet } from 'react-helmet'
import Navbar from './Navbar'

function Layout({ children, title, description }) {
    return (
        <Box>
            <Helmet>
                <title>{title}</title>
                <meta name='description' content={description} />
            </Helmet>
            <Navbar />
            <Box p='20px 0' width='80%' mx='auto' height='auto' my='1rem'>
                {children}
            </Box>
        </Box>
    )
}

Layout.defaultProps = {
    title: '_auctiond | your top bidding platform',
    description: 'Bidding platform that brings you a wide range of products',
}

export default Layout
