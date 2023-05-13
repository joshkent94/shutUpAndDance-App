import { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import useSWR from 'swr'
import { useSelector } from 'react-redux'
import {
    getPlayingSong,
    getSuggestions,
    selectAccessToken,
    selectCurrentlyPlaying,
    selectRefreshToken,
    selectSuggestions,
} from '@utils/state/spotifySlice'
import { selectGenres } from '@utils/state/userSlice'
import { useAppDispatch } from '@utils/state/store'
import Suggestion from '@components/SuggestionsFeature/Suggestion'
import Loading from '@components/Layout/Loading'

export default function SuggestionsWidget() {
    const dispatch = useAppDispatch()
    const suggestions = useSelector(selectSuggestions)
    const selectedGenres = useSelector(selectGenres)
    const accessToken = useSelector(selectAccessToken)
    const refreshToken = useSelector(selectRefreshToken)
    const currentlyPlaying = useSelector(selectCurrentlyPlaying)
    const firstRender = useRef(true)
    const [loading, setLoading] = useState(false)
    const faSearchProp = faSearch as IconProp

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

    // get suggestions from Spotify
    const handleSuggestionSearch = (e) => {
        e.preventDefault()
        if (accessToken !== '') {
            setLoading(true)
            dispatch(
                getSuggestions({
                    accessToken,
                    refreshToken,
                    genres: selectedGenres,
                })
            ).then(() => setLoading(false))
        }
    }

    // get song suggestions from Spotify on initial page load
    useEffect(() => {
        if (
            suggestions.length === 0 &&
            accessToken !== '' &&
            firstRender.current
        ) {
            firstRender.current = false
            setLoading(true)
            dispatch(
                getSuggestions({
                    accessToken,
                    refreshToken,
                    genres: selectedGenres,
                })
            ).then(() => setLoading(false))
        }
    }, [accessToken, dispatch, refreshToken, selectedGenres, suggestions])

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
        <div className="widget flex h-full w-full flex-col rounded-[0.2rem] border border-third bg-fifth bg-none p-2">
            <div className="input-group mb-2 flex w-full">
                <h5 className="widget-title grow rounded-[0.2rem] rounded-br-none rounded-tr-none border border-third bg-secondary p-2 text-[1.1rem] font-semibold">
                    Suggestions
                </h5>
                <div>
                    <button
                        className="btn btn-outline-secondary h-full rounded-bl-none rounded-tl-none border-third bg-secondary text-primary focus:shadow-none"
                        type="button"
                        onClick={handleSuggestionSearch}
                    >
                        <FontAwesomeIcon icon={faSearchProp} />
                    </button>
                </div>
            </div>
            <div className="flex grow flex-col overflow-y-auto">
                {loading && <Loading />}
                {!loading && content}
            </div>
        </div>
    )
}
