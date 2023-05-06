import TopNav from '@components/Layout/TopNav'
import MusicPlayer from '@components/MusicPlayerFeature/MusicPlayer'
import Footer from '@components/Layout/Footer'
import sessionOptions from '@utils/helperFunctions/sessionOptions'
import authCheck from '@utils/helperFunctions/authCheck'
import { withIronSessionSsr } from 'iron-session/next'
import { useLayoutEffect } from 'react'
import { logout } from '@utils/state/userSlice'
import { useAppDispatch } from '@utils/state/store'
import { resetForumDetails } from '@utils/state/forumSlice'
import { resetSpotifyDetails } from '@utils/state/spotifySlice'
import Pendo from '@components/Layout/Pendo'
import WidgetDropdown from '@components/DashboardFeature/WidgetDropdown'

export default function DashboardPage({ user }) {
    const dispatch = useAppDispatch()

    useLayoutEffect(() => {
        if (
            !user.isLoggedIn ||
            !document.cookie.includes('shut-up-and-dance')
        ) {
            dispatch(logout()).then(() => {
                dispatch(resetForumDetails())
                dispatch(resetSpotifyDetails())
            })
        }
    })

    return (
        <>
            <Pendo />
            <TopNav />
            <div className="main">
                <div className="page">
                    <div className="page-header">
                        <h5 className="page-header-h5">Dashboard</h5>
                        <WidgetDropdown />
                    </div>
                    <div className="page-content">
                        <div id="dashboard-page"></div>
                    </div>
                </div>
                <MusicPlayer />
                <Footer />
            </div>
        </>
    )
}

export const getServerSideProps = withIronSessionSsr(authCheck, sessionOptions)
