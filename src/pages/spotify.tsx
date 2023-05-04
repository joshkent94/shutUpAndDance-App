import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { showMessage } from '@utils/helperFunctions/showMessage'
import { resetForumDetails } from '@utils/state/forumSlice'
import { getAccessToken, resetSpotifyDetails } from '@utils/state/spotifySlice'
import { logout } from '@utils/state/userSlice'
import { useAppDispatch } from '@utils/state/store'

export default function SpotifyPage() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { code, state = '', error } = router.query
    // @ts-expect-error state is a string
    const [security, location] = state.split(',')

    // if user authenticates with Spotify, get an access token and log in
    // else completely log out and return to log in page with message
    useEffect(() => {
        if (!code && !error) return
        if (security === process.env.NEXT_PUBLIC_SPOTIFY_STATE && code) {
            // @ts-expect-error code is a string
            dispatch(getAccessToken(code))
                .unwrap()
                .then(() => {
                    router.push(location)
                })
        } else if (
            !code ||
            security !== process.env.NEXT_PUBLIC_SPOTIFY_STATE ||
            error
        ) {
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
