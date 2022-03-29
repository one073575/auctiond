import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import ScrollTop from '../components/common/ScrollTop'
import Home from '../pages/Home'
import NotFound from '../pages/404'
import Products from '../pages/Products'
import About from '../pages/About'
import WishList from '../pages/WishList'
import Cart from '../pages/Cart'
import Profile from '../pages/authenticated/Profile'
import PrivateRoute from './PrivateRoute'
import MyProducts from '../pages/authenticated/MyProducts'
import Product from '../pages/Product'

function AppRouter() {
    return (
        <Box>
            <ScrollTop />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/products' component={Products} />
                <Route exact path='/products/:slug' component={Product} />
                <Route exact path='/about' component={About} />
                <Route exact path='/cart' component={Cart} />
                <Route exact path='/wishlist' component={WishList} />
                <PrivateRoute exact path='/profile/:id' component={Profile} />
                <PrivateRoute
                    exact
                    path='/myproducts/:id'
                    component={MyProducts}
                />
                <Route exact path='*' component={NotFound} />
            </Switch>
        </Box>
    )
}

export default AppRouter
