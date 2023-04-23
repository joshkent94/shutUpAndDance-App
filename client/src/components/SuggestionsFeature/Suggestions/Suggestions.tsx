import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import GenreDropdown from '../GenreDropdown/GenreDropdown'
import {
    getAvailableGenres,
    getSuggestions,
    selectAccessToken,
    selectAvailableGenres,
    selectRefreshToken,
    selectSuggestions,
    getPlayingSong,
    selectCurrentlyPlaying,
} from '../../../utils/state/spotifySlice'
import { selectGenres } from '../../../utils/state/userSlice'
import Suggestion from '../Suggestion/Suggestion'
import useSWR from 'swr'
import { useAppDispatch } from '../../../utils/state/store'
import './Suggestions.scss'
import Loading from '../../Loading/Loading'

export default function Suggestions() {
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
            if (
                suggestions.length === 0 &&
                document.cookie &&
                accessToken !== ''
            ) {
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
    })

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
        <div className="page">
            <div className="page-header">
                <h5 className="page-header-h5">Suggestions</h5>
                <GenreDropdown setLoading={setLoading} />
            </div>
            <div className="page-content">
                {loading && <Loading />}
                {!loading && <div id="suggestions-page">{content}</div>}
            </div>
        </div>
    )
}
