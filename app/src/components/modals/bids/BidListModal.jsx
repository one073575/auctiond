import { Box } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import invoke from '../../../utils/axios.config'
import BidList from '../../Bids/BidList'
import Modall from '../../common/Modall'
import { fetchProductBids } from '../../../store/slices/Bids'
import { useAlert } from '../../../context/AlertProvider'

function BidListModal({ onClose, isOpen, product }) {
    const { setError } = useAlert()
    const dispatch = useDispatch()
    const { productBids } = useSelector((state) => state.bids)

    const getProductBids = async (id) => {
        try {
            const { data = {} } = await invoke('GET', `bid/${id}`)
            dispatch(fetchProductBids(data.bids))
        } catch (error) {
            setError(error.response.data || 'Something went wrong')
        }
    }

    useEffect(() => {
        if (isOpen && product?.id) {
            getProductBids(product?.id)
        }
    }, [product?.id, isOpen])
    return (
        <Modall
            onClose={onClose}
            isOpen={isOpen}
            title={`Bids for ${product?.name}`}
            size='2xl'>
            <Box>
                <BidList bids={productBids} />
            </Box>
        </Modall>
    )
}

export default BidListModal
