import React from 'react'
import Layout from '../components/common/Layout'
import Alert from '../components/home/Alert'
import Categories from '../components/home/Categories'
import Deals from '../components/home/Deals'
import Hero from '../components/home/Hero'

function Home() {
    return (
        <Layout>
            <Hero />
            <Deals />
            <Categories />
            <Alert />
        </Layout>
    )
}

export default Home
