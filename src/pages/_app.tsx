import Script from 'next/script'
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import { persistor, store } from '@utils/state/store'
import { PersistGate } from 'redux-persist/integration/react'
import { useEffect, useState } from 'react'
import ScreenSizePrompt from '@components/Layout/ScreenSizePrompt'
import { Analytics } from '@vercel/analytics/react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@utils/globals.scss'

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
                    <Script
                        id="pendo"
                        // @ts-expect-error - force Pendo initialization
                        onLoad={(function () {
                            if (process.browser) {
                                ;(function (apiKey) {
                                    ;(function (p, e, n, d, o) {
                                        let v, w, x, y, z
                                        o = p[d] = p[d] || {}
                                        // @ts-expect-error - force Pendo initialization
                                        o._q = o._q || []
                                        v = [
                                            'initialize',
                                            'identify',
                                            'updateOptions',
                                            'pageLoad',
                                            'track',
                                        ]
                                        for (w = 0, x = v.length; w < x; ++w)
                                            (function (m) {
                                                // @ts-expect-error - force Pendo initialization
                                                o[m] =
                                                    // @ts-expect-error - force Pendo initialization
                                                    o[m] ||
                                                    function () {
                                                        // @ts-expect-error - force Pendo initialization
                                                        o._q[
                                                            m === v[0]
                                                                ? 'unshift'
                                                                : 'push'
                                                        ](
                                                            [m].concat(
                                                                [].slice.call(
                                                                    arguments,
                                                                    0
                                                                )
                                                            )
                                                        )
                                                    }
                                            })(v[w])
                                        y = e.createElement(n)
                                        y.async = !0
                                        y.src =
                                            'https://cdn.pendo.io/agent/static/' +
                                            apiKey +
                                            '/pendo.js'
                                        z = e.getElementsByTagName(n)[0]
                                        z.parentNode.insertBefore(y, z)
                                    })(window, document, 'script', 'pendo')
                                })('13d3fddb-5147-458a-690d-f29955f85c01')
                            }
                        })()}
                    />
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
