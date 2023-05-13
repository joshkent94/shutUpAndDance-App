import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import Logo from '@assets/logo.png'
import Head from 'next/head'

export default function ScreenSizePrompt() {
    return (
        <>
            <Head>
                <title>Shut Up And Dance</title>
                <meta
                    name="description"
                    content="Song suggestion and forum designed for music lovers, by music lovers"
                    key="desc"
                />
            </Head>
            <div className="flex flex-col items-center justify-between p-8">
                <Image src={Logo} alt="logo" priority className="h-20 w-20" />
                <h3 className="mt-8 w-11/12 text-center text-2xl">
                    Please access Shut Up And Dance on a larger screen.
                </h3>
                <p className="mt-5 flex items-center">
                    <span className="px-1">With </span>
                    <FontAwesomeIcon icon={faHeart} height={18} fixedWidth />
                    <span className="px-1"> from Shut Up And Dance Ltd.</span>
                </p>
            </div>
        </>
    )
}
