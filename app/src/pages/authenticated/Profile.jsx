import React from 'react'
import { Box, Grid, GridItem } from '@chakra-ui/react'
import Layout from '../../components/common/Layout'
import { useAuth } from '../../context/AuthProvider'
import ProfileDetails from '../../components/profile/ProfileDetails'
import PasswordDetails from '../../components/profile/PasswordDetails'
import DeleteAccount from '../../components/profile/DeleteAccount'

function Profile() {
    const { user } = useAuth()

    return (
        <Layout title={user?.name}>
            <Box>
                <Grid gap='3rem' templateColumns='repeat(2,1fr)'>
                    <GridItem>
                        <ProfileDetails user={user} />
                        <PasswordDetails user={user} />
                        <DeleteAccount user={user} />
                    </GridItem>
                    <GridItem>
                        <Box bg='#fff' shadow='lg' borderRadius='10px' p='20px'>
                            Analytics
                            <pre>{JSON.stringify(user, null, 3)}</pre>
                        </Box>
                    </GridItem>
                </Grid>
            </Box>
        </Layout>
    )
}

export default Profile
