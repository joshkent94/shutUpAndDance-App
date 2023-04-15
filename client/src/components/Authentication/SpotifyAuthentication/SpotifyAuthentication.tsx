import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { showMessage } from '../../../utils/helperFunctions/showMessage'
import { resetForumDetails } from '../../../utils/state/forumSlice'
import {
    getAccessToken,
    resetSpotifyDetails,
} from '../../../utils/state/spotifySlice'
import { logout } from '../../../utils/state/userSlice'
import { useAppDispatch } from '../../../utils/state/store'

export default function SpotifyAuthentication() {
    const dispatch = useAppDispatch()
    const [searchParams] = useSearchParams()
    const code = searchParams.get('code')
    const state = searchParams.get('state') || ''
    const [security, location] = state.split(',')
    const navigate = useNavigate()

    // if user authenticates with Spotify, get an access token and log in
    // else completely log out and return to log in page with message
    useEffect(() => {
        if (security === process.env.REACT_APP_SPOTIFY_STATE && code) {
            dispatch(getAccessToken(code))
                .unwrap()
                .then(() => {
                    navigate(location)
                })
        } else if (!code || security !== process.env.REACT_APP_SPOTIFY_STATE) {
            navigate('/login')
            dispatch(logout())
                .unwrap()
                .then(() => {
                    dispatch(resetSpotifyDetails())
                    dispatch(resetForumDetails())
                })
            showMessage(`Must allow access to Spotify to continue`)
        }
    })

    return null
}
