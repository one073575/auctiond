import {
    Alert,
    AlertIcon,
    Badge,
    Box,
    Grid,
    Heading,
    Text,
    VStack,
} from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'

function BidTimer({ bidEndDate, size }) {
    const [alert, setAlert] = useState('')
    const [timerDays, setTimerDays] = useState(10)
    const [timerHours, setTimerHours] = useState(10)
    const [timerMinutes, setTimerMinutes] = useState(10)
    const [timerSeconds, setTimerSeconds] = useState(10)

    let interval

    const startTimer = useCallback(() => {
        const endDateTime = new Date(bidEndDate).getTime()

        interval = setInterval(() => {
            const now = new Date().getTime()
            const diff = endDateTime - now

            const days = Math.floor(diff / (24 * 60 * 60 * 1000))
            const hours = Math.floor(
                (diff % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
            )
            const minutes = Math.floor((diff % (60 * 60 * 1000)) / (1000 * 60))
            const seconds = Math.floor((diff % (60 * 1000)) / 1000)

            if (diff < 0) {
                // TODO: run a  callback that changes product status to pending or something

                setAlert('Bidding has ended')
                clearInterval(interval.current)
            } else {
                setTimerDays(days)
                setTimerHours(hours)
                setTimerMinutes(minutes)
                setTimerSeconds(seconds)
            }
        })
    }, [bidEndDate])

    useEffect(() => {
        startTimer()
    }, [])
    return (
        <Box width='100%'>
            {size === 'sm' && !alert && (
                <Badge
                    p='5px'
                    fontWeight='500'
                    fontSize='0.9rem'
                    borderRadius='5px'>
                    {timerDays} : {timerHours} : {timerMinutes} : {timerSeconds}
                </Badge>
            )}
            {size === 'sm' && alert && (
                <Badge
                    p='5px'
                    fontWeight='500'
                    fontSize='0.9rem'
                    colorScheme='orange'
                    textTransform='capitalize'
                    borderRadius='5px'>
                    {alert}
                </Badge>
            )}

            {size === 'md' && !alert && (
                <Grid gap='1rem' templateColumns='repeat(4, 1fr)' width='100%'>
                    <VStack bg='#fff' p='10px' borderRadius='10px'>
                        <Heading fontSize='md'>{timerDays}</Heading>
                        <Text as='small'>Days</Text>
                    </VStack>
                    <VStack bg='#fff' p='10px' borderRadius='10px'>
                        <Heading fontSize='md'>{timerHours}</Heading>
                        <Text as='small'>Hours</Text>
                    </VStack>
                    <VStack bg='#fff' p='10px' borderRadius='10px'>
                        <Heading fontSize='md'>{timerMinutes}</Heading>
                        <Text as='small'>Minutes</Text>
                    </VStack>
                    <VStack bg='#fff' p='10px' borderRadius='10px'>
                        <Heading fontSize='md'>{timerSeconds}</Heading>
                        <Text as='small'>Seconds</Text>
                    </VStack>
                </Grid>
            )}
            {size === 'md' && alert && (
                <Alert status='warning' borderRadius='10px'>
                    <AlertIcon />
                    <Text>{alert}</Text>
                </Alert>
            )}
        </Box>
    )
}

BidTimer.defaultProps = {
    bidEndDate: new Date(),
    size: '',
}

export default BidTimer
