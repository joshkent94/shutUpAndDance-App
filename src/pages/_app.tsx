import Script from 'next/script'
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import { persistor, store } from '@utils/state/store'
import { PersistGate } from 'redux-persist/integration/react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@styles/App.scss'
import { useEffect, useState } from 'react'
import ScreenSizePrompt from '@components/Layout/ScreenSizePrompt'

declare global {
    interface Window {
        pendo: any
    }
}

export default function App({ Component, pageProps }: AppProps) {
    const [viewportWidth, setViewportWidth] = useState(992)

    // add event listener to set state of app whenever screen size changes
    useEffect(() => {
        setViewportWidth(window.innerWidth)
        const handleResize = () => {
            setViewportWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
    }, [])

    return (
        <>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Script src="https://cdn.pendo-voc.pendo-dev.com/agent/static/bed34ce7-a813-425a-5cd9-87d4f07017dd/pendo.js" />
                    {viewportWidth < 992 ? (
                        <ScreenSizePrompt />
                    ) : (
                        <>
                            <Component {...pageProps} />
                        </>
                    )}
                </PersistGate>
            </Provider>
        </>
    )
}
