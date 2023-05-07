import TopNav from '@components/Layout/TopNav'
import MusicPlayer from '@components/MusicPlayerFeature/MusicPlayer'
import Footer from '@components/Layout/Footer'
import sessionOptions from '@utils/helperFunctions/sessionOptions'
import authCheck from '@utils/helperFunctions/authCheck'
import { withIronSessionSsr } from 'iron-session/next'
import React, { useLayoutEffect } from 'react'
import { logout } from '@utils/state/userSlice'
import { useAppDispatch } from '@utils/state/store'
import { resetForumDetails } from '@utils/state/forumSlice'
import { resetSpotifyDetails } from '@utils/state/spotifySlice'
import Pendo from '@components/Layout/Pendo'
import WidgetDropdown from '@components/DashboardFeature/WidgetDropdown'
import Head from 'next/head'

const WidgetGrid = React.lazy(
    () => import('@components/DashboardFeature/WidgetGrid')
)

export default function DashboardPage({ user }) {
    const dispatch = useAppDispatch()
    const isSSR = typeof window === 'undefined'

    useLayoutEffect(() => {
        if (!user.isLoggedIn) {
            dispatch(logout()).then(() => {
                dispatch(resetForumDetails())
                dispatch(resetSpotifyDetails())
            })
        }
    })

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
            <div className="main">
                <div className="page">
                    <div className="page-header">
                        <h5 className="page-header-h5">Dashboard</h5>
                        <WidgetDropdown />
                    </div>
                    <div className="page-content">
                        <div id="dashboard-page">
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
