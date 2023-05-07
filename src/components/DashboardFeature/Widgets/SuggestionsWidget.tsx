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
            <h5 className="sub-heading">
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
        <div className="content-container widget">
            <div className="input-group">
                <h5 className="sub-heading content-container">Suggestions</h5>
                <div className="input-group-append">
                    <button
                        className="btn btn-outline-secondary"
                        id="search-button"
                        type="button"
                        onClick={handleSuggestionSearch}
                    >
                        <FontAwesomeIcon icon={faSearchProp} />
                    </button>
                </div>
            </div>
            <div className="widget-content">
                {loading && <Loading />}
                {!loading && content}
            </div>
        </div>
    )
}
