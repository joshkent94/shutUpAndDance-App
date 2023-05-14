import TopNav from '@components/Layout/TopNav'
import MusicPlayer from '@components/MusicPlayerFeature/MusicPlayer'
import Footer from '@components/Layout/Footer'
import sessionOptions from '@utils/helperFunctions/sessionOptions'
import authCheck from '@utils/helperFunctions/authCheck'
import { withIronSessionSsr } from 'iron-session/next'
import Pendo from '@components/Layout/Pendo'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import useSWR from 'swr'
import {
    getAvailableGenres,
    getSuggestions,
    selectAccessToken,
    selectAvailableGenres,
    selectRefreshToken,
    selectSuggestions,
    getPlayingSong,
    selectCurrentlyPlaying,
} from '@utils/state/spotifySlice'
import { selectGenres } from '@utils/state/userSlice'
import { useAppDispatch } from '@utils/state/store'
import Loading from '@components/Layout/Loading'
import Suggestion from '@components/SuggestionsFeature/Suggestion'
import GenreDropdown from '@components/SuggestionsFeature/GenreDropdown'
import Head from 'next/head'

export default function SuggestionsPage() {
    const dispatch = useAppDispatch()
    const availableGenres = useSelector(selectAvailableGenres)
    const accessToken = useSelector(selectAccessToken)
    const refreshToken = useSelector(selectRefreshToken)
    const suggestions = useSelector(selectSuggestions)
    const currentlyPlaying = useSelector(selectCurrentlyPlaying)
    const genres = useSelector(selectGenres)
    const [loading, setLoading] = useState(false)
    const firstRender = useRef(true)

    // poll for currently playing song every 5 seconds
    useSWR(
        refreshToken,
        () =>
            dispatch(
                getPlayingSong({
                    accessToken,
                    refreshToken,
                })
            ),
        {
            refreshInterval: 5000,
            revalidateOnFocus: false,
        }
    )

    // get genre list and song suggestions from Spotify on initial page load
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false
            if (accessToken !== '' && availableGenres.length === 0) {
                dispatch(
                    getAvailableGenres({
                        accessToken,
                        refreshToken,
                    })
                )
            }
            if (suggestions.length === 0 && accessToken !== '') {
                setLoading(true)
                dispatch(
                    getSuggestions({
                        accessToken,
                        refreshToken,
                        genres,
                    })
                ).then(() => setLoading(false))
            }
        }
    }, [
        accessToken,
        availableGenres,
        dispatch,
        genres,
        refreshToken,
        suggestions,
    ])

    let content
    if (suggestions.length === 0) {
        content = (
            <h5 className="m-auto text-[1.1rem] font-semibold">
                Please select at least one genre to see suggestions.
            </h5>
        )
    } else {
        content = suggestions.map((track) => {
            return (
                <Suggestion
                    key={
                        track.id +
                        (currentlyPlaying.uri === track.uri &&
                            currentlyPlaying.isPlaying)
                    }
                    track={track}
                />
            )
        })
    }

    return (
        <>
            <Head>
                <title>
                    Suggestions | Get song suggestions based on your favorite
                    genres
                </title>
                <meta
                    name="description"
                    content="Select your favorite genres and get song suggestions from Spotify based on your selections."
                    key="desc"
                />
            </Head>
            <Pendo />
            <TopNav />
            <div className="flex min-h-screen w-full flex-col bg-fifth pt-[3.925rem]">
                <div className="flex grow flex-col px-8 py-4">
                    <div className="flex h-[50px] items-center justify-between border-b border-b-third px-4 pb-4">
                        <h5 className="m-0 text-[1.3rem] font-semibold leading-normal">
                            Suggestions
                        </h5>
                        <GenreDropdown setLoading={setLoading} />
                    </div>
                    <div className="flex grow flex-col">
                        {loading && <Loading />}
                        {!loading && (
                            <div className="mt-4 flex grow flex-col items-center justify-center">
                                {content}
                            </div>
                        )}
                    </div>
                </div>
                <MusicPlayer />
                <Footer />
            </div>
        </>
    )
}

export const getServerSideProps = withIronSessionSsr(authCheck, sessionOptions)
