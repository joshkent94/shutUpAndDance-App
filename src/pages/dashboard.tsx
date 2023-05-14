import TopNav from '@components/Layout/TopNav'
import MusicPlayer from '@components/MusicPlayerFeature/MusicPlayer'
import Footer from '@components/Layout/Footer'
import sessionOptions from '@utils/helperFunctions/sessionOptions'
import authCheck from '@utils/helperFunctions/authCheck'
import { withIronSessionSsr } from 'iron-session/next'
import React from 'react'
import Pendo from '@components/Layout/Pendo'
import WidgetDropdown from '@components/DashboardFeature/WidgetDropdown'
import Head from 'next/head'

const WidgetGrid = React.lazy(
    () => import('@components/DashboardFeature/WidgetGrid')
)

export default function DashboardPage() {
    const isSSR = typeof window === 'undefined'

    return (
        <>
            <Head>
                <title>Dashboard | Select your favourite widgets</title>
                <meta
                    name="description"
                    content="Select your favourite widgets to display on your dashboard for easy access next time you login."
                    key="desc"
                />
            </Head>
            <Pendo />
            <TopNav />
            <div className="flex min-h-screen w-full flex-col bg-fifth pt-[3.925rem]">
                <div className="flex grow flex-col px-8 py-4">
                    <div className="flex h-[50px] items-center justify-between border-b border-b-third px-4 pb-4">
                        <h5 className="m-0 text-[1.3rem] font-semibold leading-normal">
                            Dashboard
                        </h5>
                        <WidgetDropdown />
                    </div>
                    <div className="flex grow flex-col">
                        <div className="flex min-h-full">
                            {!isSSR && (
                                <React.Suspense fallback={<div />}>
                                    <WidgetGrid />
                                </React.Suspense>
                            )}
                        </div>
                    </div>
                </div>
                <MusicPlayer />
                <Footer />
            </div>
        </>
    )
}

export const getServerSideProps = withIronSessionSsr(authCheck, sessionOptions)
