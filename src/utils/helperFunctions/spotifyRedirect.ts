import Router from 'next/router'

export const spotifyRedirect = (location?) => {
    const dataToSend = [
        ['client_id', process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || ''],
        ['response_type', 'code'],
        [
            'redirect_uri',
            process.env.NODE_ENV === 'production'
                ? `https://app.shutupanddance.io/spotify`
                : `http://localhost:3000/spotify`,
        ],
        ['scope', 'user-read-playback-state user-modify-playback-state'],
        [
            'state',
            [process.env.NEXT_PUBLIC_SPOTIFY_STATE, location || '/'].toString(),
        ],
        ['show_dialog', 'true'],
    ]
    const queryString = new URLSearchParams(dataToSend)
    Router.push(`https://accounts.spotify.com/authorize?${queryString}`)
}
