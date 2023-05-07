import Head from 'next/head'
import Router from 'next/router'

export default function indexPage() {
    Router.replace('/login')

    return (
        <Head>
            <title>Shut Up And Dance</title>
            <meta
                name="description"
                content="Song suggestion and forum designed for music lovers, by music lovers"
                key="desc"
            />
        </Head>
    )
}
