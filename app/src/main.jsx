import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import { ChakraProvider, ColorModeScript, CSSReset } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import theme from './utils/chakra.config'
import '@fontsource/pt-sans/400.css'
import '@fontsource/pt-sans/700.css'
import '@fontsource/overpass-mono/400.css'
import '@fontsource/overpass-mono/600.css'
import '@fontsource/overpass-mono/700.css'
import '@fontsource/kaushan-script/400.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import AppRouter from './routes/Router'
import ContextProvider from './context'
import { store } from './store'

const App = (
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <CSSReset />
            <Router>
                <ContextProvider>
                    <Provider store={store}>
                        <AppRouter />
                    </Provider>
                </ContextProvider>
            </Router>
        </ChakraProvider>
    </React.StrictMode>
)

ReactDOM.render(App, document.getElementById('root'))
