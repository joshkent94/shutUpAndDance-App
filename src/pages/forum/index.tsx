import TopNav from '@components/Layout/TopNav'
import MusicPlayer from '@components/MusicPlayerFeature/MusicPlayer'
import Footer from '@components/Layout/Footer'
import sessionOptions from '@utils/helperFunctions/sessionOptions'
import authCheck from '@utils/helperFunctions/authCheck'
import { withIronSessionSsr } from 'iron-session/next'
import { useState } from 'react'
import Pendo from '@components/Layout/Pendo'
import { Tab, Tabs } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import BrowseThreads from '@components/ForumFeature/BrowseThreads'
import MyThreads from '@components/ForumFeature/MyThreads'
import NewThread from '@components/ForumFeature/NewThread'
import Head from 'next/head'

export default function ForumPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const faSearchProp = faSearch as IconProp

    // update local search term state
    const handleSearchTermChange = (e) => {
        e.preventDefault()
        setSearchTerm(e.target.value)
    }

    return (
        <>
            <Head>
                <title>Forum | Browse and create chat threads</title>
                <meta
                    name="description"
                    content="Browse and create chat threads to speak with other like-minded music lovers."
                    key="desc"
                />
            </Head>
            <Pendo />
            <TopNav />
            <div className="flex min-h-screen w-full flex-col bg-fifth pt-[3.925rem]">
                <div className="flex grow flex-col px-8 py-4">
                    <div className="flex h-[50px] items-center justify-between border-b border-b-third px-4 pb-4">
                        <h5 className="m-0 text-[1.3rem] font-semibold leading-normal">
                            Forum
                        </h5>
                        <div className="input-group w-[320px]">
                            <input
                                className="form-control border border-third px-[0.7rem] py-[0.3rem] text-primary placeholder:text-third focus:border-primary focus:shadow-none"
                                type="search"
                                aria-label="search threads"
                                placeholder="Search"
                                onChange={handleSearchTermChange}
                                autoComplete="off"
                            />
                            <div>
                                <button
                                    className="btn btn-outline-secondary rounded-bl-none rounded-tl-none border-third bg-secondary text-primary focus:shadow-none"
                                    type="button"
                                >
                                    <FontAwesomeIcon icon={faSearchProp} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex grow flex-col">
                        <div className="flex grow flex-col">
                            <Tabs
                                defaultActiveKey="browse-threads"
                                className="border-third"
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
