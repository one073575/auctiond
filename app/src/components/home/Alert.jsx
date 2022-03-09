import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { usePopup } from '../../context/PopupProvider'

function Alert() {
    const { registerOpen } = usePopup()
    return (
        <Box
            my='2rem'
            position='relative'
            height='50vh'
            width='100%'
            bgImage='/images/hero/img4.jpg'
            bgPosition='center'
            bgRepeat='no-repeat'
            bgSize='cover'
            borderRadius='10px'>
            <Box
                as={VStack}
                height='100%'
                width='100%'
                position='absolute'
                alignItems='flex-start'
                justifyContent='center'
                spacing='5'
                p='40px'
                top='0'
                borderRadius='10px'
                color='gray.100'
                fontSize='1.2rem'
                left='0'
                bgGradient='linear(to-r, #030303,#03030341)'>
                <Heading>There is always something for you</Heading>
                <Text>Sign up to see what is in store</Text>
                <Button
                    colorScheme='blue'
                    height='2.5rem'
                    onClick={registerOpen}
                    width='auto'
                    borderRadius='5px'
                    minWidth='20%'>
                    Sign up &rarr;
                </Button>
            </Box>
        </Box>
    )
}

export default Alert
