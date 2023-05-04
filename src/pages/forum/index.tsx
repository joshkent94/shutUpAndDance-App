import TopNav from '@components/Layout/TopNav'
import MusicPlayer from '@components/MusicPlayerFeature/MusicPlayer'
import Footer from '@components/Layout/Footer'
import sessionOptions from '@utils/helperFunctions/sessionOptions'
import authCheck from '@utils/helperFunctions/authCheck'
import { withIronSessionSsr } from 'iron-session/next'
import { useLayoutEffect, useState } from 'react'
import { logout } from '@utils/state/userSlice'
import { useAppDispatch } from '@utils/state/store'
import { resetForumDetails } from '@utils/state/forumSlice'
import { resetSpotifyDetails } from '@utils/state/spotifySlice'
import Pendo from '@components/Layout/Pendo'
import { Tab, Tabs } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import BrowseThreads from '@components/ForumFeature/BrowseThreads'
import MyThreads from '@components/ForumFeature/MyThreads'
import NewThread from '@components/ForumFeature/NewThread'

export default function ForumPage({ user }) {
    const dispatch = useAppDispatch()
    const [searchTerm, setSearchTerm] = useState('')
    const faSearchProp = faSearch as IconProp

    // update local search term state
    const handleSearchTermChange = (e) => {
        e.preventDefault()
        setSearchTerm(e.target.value)
    }

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
            <Pendo />
            <TopNav />
            <div className="main">
                <div className="page">
                    <div className="page-header">
                        <h5 className="page-header-h5">Forum</h5>
                        <div id="search" className="input-group">
                            <input
                                className="form-control"
                                type="search"
                                aria-label="search threads"
                                placeholder="Search"
                                onChange={handleSearchTermChange}
                                autoComplete="off"
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-outline-secondary"
                                    id="search-button"
                                    type="button"
                                >
                                    <FontAwesomeIcon icon={faSearchProp} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="page-content">
                        <div id="forum-page">
                            <Tabs
                                defaultActiveKey="browse-threads"
                                id="forum-tabs"
                            >
                                <Tab
                                    eventKey="browse-threads"
                                    title="Browse Threads"
                                >
                                    <BrowseThreads searchTerm={searchTerm} />
                                </Tab>
                                <Tab eventKey="my-threads" title="My Threads">
                                    <MyThreads searchTerm={searchTerm} />
                                </Tab>
                                <Tab
                                    eventKey="create-new-thread"
                                    title="Create New Thread"
                                >
                                    <NewThread />
                                </Tab>
                            </Tabs>
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
