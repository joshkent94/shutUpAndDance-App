import Script from 'next/script'
import Head from 'next/head'
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import { persistor, store } from '@utils/state/store'
import { PersistGate } from 'redux-persist/integration/react'
import ScreenSizePrompt from '@components/Layout/ScreenSizePrompt'
import { Analytics } from '@vercel/analytics/react'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@utils/globals.css'
config.autoAddCss = false

declare global {
    interface Window {
        pendo: any
    }
}

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Script
                        id="pendo"
                        // @ts-expect-error - force Pendo initialization
                        onLoad={(function () {
                            if (typeof window !== 'undefined' && window) {
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
                    <>
                        <Head>
                            <meta
                                name="viewport"
                                content="width=device-width, initial-scale=1"
                            />
                        </Head>
                        <Component {...pageProps} />
                        <Analytics debug={false} />
                    </>
                </PersistGate>
            </Provider>
        </>
    )
}
