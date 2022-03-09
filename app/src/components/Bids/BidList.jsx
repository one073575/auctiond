import {
    Box,
    Center,
    Table,
    TableCaption,
    Thead,
    Th,
    Tbody,
    Tr,
} from '@chakra-ui/react'
import React, { lazy, Suspense } from 'react'

const BidListItem = lazy(() => import('./BidListItem'))

function BidList({ bids }) {
    return (
        <Box>
            <Table>
                <TableCaption>Product top 10 bids</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Bidder</Th>
                        <Th>Amount (Asc)</Th>
                        <Th>Contact</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {bids &&
                        bids.map((bid) => (
                            <Suspense
                                key={bid?.id}
                                fallback={<h3>loading ...</h3>}>
                                <BidListItem bid={bid} />
                            </Suspense>
                        ))}
                </Tbody>
            </Table>

            {!bids.length && (
                <Center height='20vh' width='100%'>
                    😧 No bids available yet
                </Center>
            )}
        </Box>
    )
}

BidList.defaultProps = {
    bids: [],
}

export default BidList
