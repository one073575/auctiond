import React from 'react'
import { PayPalButton } from 'react-paypal-button-v2'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider'
import { constants } from '../../utils/constants.config'
import { Box } from '@chakra-ui/react'

function Paypal({ total, setPaymentSuccess, setPaymentDetails }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const { user } = useAuth()

    const totalUsd = total / 100

    // const createOrder = async (details) => {
    //     try {
    //         const config = { headers: { 'Content-Type': 'application/json' } }
    //         const url = '/api/cart/neworder'

    //         const newOrder = {
    //             name: `Order-${new Date().getTime()}`,
    //             orders: products,
    //             total,
    //             userId: user?.uid,
    //             payment_details: details,
    //         }

    //         const { data } = await axios.post(url, newOrder, config)

    //         dispatch(setMessage(data.message))
    //     } catch (error) {
    //         dispatch(setError(error.message))
    //     }
    // }

    const handleCreateOrder = (data, actions, err) => {
        return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    id: uuidv4(),
                    description: 'My products',
                    amount: {
                        currency_code: 'USD',
                        value: totalUsd,
                    },
                },
            ],
        })
    }

    const handleApprove = async (data, actions) => {
        const {
            id,
            create_time,
            payer: { email_address, name },
            status,
        } = await actions.order.capture()

        const paypalOrder = {
            payment_id: id,
            email: email_address,
            name,
            order_details: { currency_code: 'USD', value: totalUsd },
            status,
            created: create_time,
        }

        setPaymentDetails(paypalOrder)
        setPaymentSuccess(true)
    }

    // ** function to handle errors that may arise
    const handleError = (err) => {
        setError(err.message)
        setPaymentSuccess(false)
    }

    return (
        <Box>
            <PayPalButton
                amount={totalUsd}
                onApprove={handleApprove}
                onError={handleError}
                createOrder={handleCreateOrder}
                options={{
                    clientId: constants.paypalApikey,
                    currency: 'USD',
                }}
                style={{
                    layout: 'vertical',
                }}
            />
        </Box>
    )
}

export default Paypal
