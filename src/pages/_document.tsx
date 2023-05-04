import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <meta charSet="utf-8" />
                <meta name="theme-color" content="#000000" />
                <meta
                    name="description"
                    content="Designed for music lovers, by music lovers"
                />
                <meta
                    name="keywords"
                    content="Music, suggestions, dance, forum"
                />
                <meta name="author" content="Joshua Kent" />

                <link rel="icon" href="/favicon.ico" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin=""
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
                />
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.1/font/bootstrap-icons.css"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
                <noscript>
                    You need to enable JavaScript to run this app.
                </noscript>
            </body>
        </Html>
    )
}
