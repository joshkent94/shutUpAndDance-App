import Script from 'next/script'
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import { persistor, store } from '@utils/state/store'
import { PersistGate } from 'redux-persist/integration/react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@styles/App.scss'
import { useEffect, useState } from 'react'
import ScreenSizePrompt from '@components/Layout/ScreenSizePrompt'
import { Analytics } from '@vercel/analytics/react'
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
                    <Script src="https://cdn.pendo.io/agent/static/13d3fddb-5147-458a-690d-f29955f85c01/pendo.js" />
                    {viewportWidth < 992 ? (
                        <ScreenSizePrompt />
                    ) : (
                        <>
                            <Component {...pageProps} />
                            <Analytics />
                        </>
                    )}
                </PersistGate>
            </Provider>
        </>
    )
}
