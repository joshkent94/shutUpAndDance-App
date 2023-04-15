import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getAccessToken = createAsyncThunk(
    'spotify/getAccessToken',
    async (code: string) => {
        const dataToSend = [
            ['grant_type', 'authorization_code'],
            ['code', code],
            [
                'redirect_uri',
                process.env.NODE_ENV === 'production'
                    ? 'https://app.shutupanddance.io/spotify'
                    : 'https://localhost:3000/spotify',
            ],
        ]
        const queryString = new URLSearchParams(dataToSend)
        const authString = btoa(
            `${process.env.REACT_APP_SPOTIFY_CLIENT_ID}:${process.env.REACT_APP_SPOTIFY_CLIENT_SECRET}`
        )
        const response = await fetch(`https://accounts.spotify.com/api/token`, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${authString}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: queryString,
        })
        if (response.ok) {
            const jsonResponse = await response.json()
            return {
                accessToken: jsonResponse.access_token,
                expiresIn: jsonResponse.expires_in,
                refreshToken: jsonResponse.refresh_token,
            }
        }
    }
)

export const refreshAccessToken = createAsyncThunk(
    'spotify/refreshAccessToken',
    async (refreshToken: string) => {
        const dataToSend = [
            ['grant_type', 'refresh_token'],
            ['refresh_token', refreshToken],
        ]
        const queryString = new URLSearchParams(dataToSend)
        const authString = btoa(
            `${process.env.REACT_APP_SPOTIFY_CLIENT_ID}:${process.env.REACT_APP_SPOTIFY_CLIENT_SECRET}`
        )
        const response = await fetch(`https://accounts.spotify.com/api/token`, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${authString}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: queryString,
        })
        if (response.ok) {
            const jsonResponse = await response.json()
            return {
                accessToken: jsonResponse.access_token,
                expiresIn: jsonResponse.expires_in,
            }
        }
    }
)

export const getAvailableGenres = createAsyncThunk(
    'spotify/getAvailableGenres',
    async (
        {
            accessToken,
            refreshToken,
        }: { accessToken: string; refreshToken: string },
        thunkAPI
    ) => {
        let response = await fetch(
            `https://api.spotify.com/v1/recommendations/available-genre-seeds`,
            {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                },
            }
        )
        if (!response.ok) {
            const newToken = await thunkAPI
                .dispatch(refreshAccessToken(refreshToken))
                .unwrap()
            response = await fetch(
                `https://api.spotify.com/v1/recommendations/available-genre-seeds`,
                {
                    headers: {
                        Authorization: 'Bearer ' + newToken?.accessToken,
                    },
                }
            )
        }
        const jsonResponse = await response.json()
        return jsonResponse.genres as any[]
    }
)

export const getSuggestions = createAsyncThunk(
    'spotify/getSuggestions',
    async (
        {
            accessToken,
            refreshToken,
            genres,
        }: { accessToken: string; refreshToken: string; genres: any[] },
        thunkAPI
    ) => {
        if (genres.length === 0) {
            return []
        } else {
            const queryString = genres.join()
            let response = await fetch(
                `https://api.spotify.com/v1/recommendations?limit=10&seed_genres=${queryString}`,
                {
                    headers: {
                        Authorization: 'Bearer ' + accessToken,
                    },
                }
            )
            if (!response.ok) {
                const newToken = await thunkAPI
                    .dispatch(refreshAccessToken(refreshToken))
                    .unwrap()
                response = await fetch(
                    `https://api.spotify.com/v1/recommendations?limit=10&seed_genres=${queryString}`,
                    {
                        headers: {
                            Authorization: 'Bearer ' + newToken?.accessToken,
                        },
                    }
                )
            }
            const jsonResponse = await response.json()
            const tracks = jsonResponse.tracks.map((track) => {
                const trackInfo = {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri,
                    images: track.album.images,
                }
                return trackInfo
            })
            return tracks
        }
    }
)

export const getPlayingSong = createAsyncThunk(
    'spotify/getPlayingSong',
    async (
        {
            accessToken,
            refreshToken,
        }: { accessToken: string; refreshToken: string },
        thunkAPI
    ) => {
        let response = await fetch(`https://api.spotify.com/v1/me/player`, {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        })
        if (!response.ok) {
            const newToken = await thunkAPI
                .dispatch(refreshAccessToken(refreshToken))
                .unwrap()
            response = await fetch(`https://api.spotify.com/v1/me/player`, {
                headers: {
                    Authorization: 'Bearer ' + newToken?.accessToken,
                },
            })
        }
        if (response.status === 200) {
            const jsonResponse = await response.json()
            const trackInfo = {
                device: jsonResponse.device,
                id: jsonResponse.item.id,
                name: jsonResponse.item.name,
                artist: jsonResponse.item.artists[0].name,
                album: jsonResponse.item.album.name,
                uri: jsonResponse.item.uri,
                images: jsonResponse.item.album.images,
                isPlaying: jsonResponse.is_playing,
                duration: Math.round(jsonResponse.item.duration_ms / 1000),
                progress: Math.round(jsonResponse.progress_ms / 1000),
            }
            return trackInfo
        }
        return {}
    }
)

export const changeSongPosition = createAsyncThunk(
    'spotify/changeSongPosition',
    async (
        {
            position,
            deviceId,
            accessToken,
            refreshToken,
        }: {
            position: number
            deviceId: string
            accessToken: string
            refreshToken: string
        },
        thunkAPI
    ) => {
        let response = await fetch(
            `https://api.spotify.com/v1/me/player/seek?position_ms=${
                position * 1000
            }&device_id=${deviceId}`,
            {
                method: 'PUT',
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                    'Content-Type': 'application/json',
                },
            }
        )
        if (!response.ok) {
            const newToken = await thunkAPI
                .dispatch(refreshAccessToken(refreshToken))
                .unwrap()
            response = await fetch(
                `https://api.spotify.com/v1/me/player/seek?position_ms=${
                    position * 1000
                }&device_id=${deviceId}`,
                {
                    method: 'PUT',
                    headers: {
                        Authorization: 'Bearer ' + newToken?.accessToken,
                        'Content-Type': 'application/json',
                    },
                }
            )
        }
        if (response.status === 204) {
            return position
        }
        return {}
    }
)

export const togglePlay = createAsyncThunk(
    'spotify/togglePlay',
    async (
        {
            paused,
            deviceId,
            accessToken,
            refreshToken,
            uri,
        }: {
            paused: boolean
            deviceId: string
            accessToken: string
            refreshToken: string
            uri?: string
        },
        thunkAPI
    ) => {
        if (paused) {
            let response = await fetch(
                `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
                {
                    method: 'PUT',
                    headers: {
                        Authorization: 'Bearer ' + accessToken,
                        'Content-Type': 'application/json',
                    },
                    ...(uri && { body: JSON.stringify({ uris: [uri] }) }),
                }
            )
            if (!response.ok) {
                const newToken = await thunkAPI
                    .dispatch(refreshAccessToken(refreshToken))
                    .unwrap()
                response = await fetch(
                    `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
                    {
                        method: 'PUT',
                        headers: {
                            Authorization: 'Bearer ' + newToken?.accessToken,
                            'Content-Type': 'application/json',
                        },
                        ...(uri && { body: JSON.stringify({ uris: [uri] }) }),
                    }
                )
            }
            if (response.status === 204) {
                return !paused
            }
        } else {
            let response = await fetch(
                `https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`,
                {
                    method: 'PUT',
                    headers: {
                        Authorization: 'Bearer ' + accessToken,
                        'Content-Type': 'application/json',
                    },
                }
            )
            if (!response.ok) {
                const newToken = await thunkAPI
                    .dispatch(refreshAccessToken(refreshToken))
                    .unwrap()
                response = await fetch(
                    `https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`,
                    {
                        method: 'PUT',
                        headers: {
                            Authorization: 'Bearer ' + newToken?.accessToken,
                            'Content-Type': 'application/json',
                        },
                    }
                )
            }
            if (response.status === 204) {
                return !paused
            }
        }
        return {}
    }
)

export const playPreviousSong = createAsyncThunk(
    'spotify/playPreviousSong',
    async (
        {
            deviceId,
            accessToken,
            refreshToken,
        }: { deviceId: string; accessToken: string; refreshToken: string },
        thunkAPI
    ) => {
        let response = await fetch(
            `https://api.spotify.com/v1/me/player/previous?device_id=${deviceId}`,
            {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                    'Content-Type': 'application/json',
                },
            }
        )
        if (!response.ok) {
            const newToken = await thunkAPI
                .dispatch(refreshAccessToken(refreshToken))
                .unwrap()
            response = await fetch(
                `https://api.spotify.com/v1/me/player/previous?device_id=${deviceId}`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + newToken?.accessToken,
                        'Content-Type': 'application/json',
                    },
                }
            )
        }
    }
)

export const playNextSong = createAsyncThunk(
    'spotify/playNextSong',
    async (
        {
            deviceId,
            accessToken,
            refreshToken,
        }: { deviceId: string; accessToken: string; refreshToken: string },
        thunkAPI
    ) => {
        let response = await fetch(
            `https://api.spotify.com/v1/me/player/next?device_id=${deviceId}`,
            {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                    'Content-Type': 'application/json',
                },
            }
        )
        if (!response.ok) {
            const newToken = await thunkAPI
                .dispatch(refreshAccessToken(refreshToken))
                .unwrap()
            response = await fetch(
                `https://api.spotify.com/v1/me/player/next?device_id=${deviceId}`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + newToken?.accessToken,
                        'Content-Type': 'application/json',
                    },
                }
            )
        }
    }
)

type SpotifyState = {
    accessToken: string
    refreshToken: string
    availableGenres: any[]
    suggestions: any[]
    currentlyPlaying: any
}

const spotifySlice = createSlice({
    name: 'spotify',
    initialState: {
        accessToken: '',
        refreshToken: '',
        availableGenres: [],
        suggestions: [],
        currentlyPlaying: {},
    } as SpotifyState,
    reducers: {
        resetSpotifyDetails: (state) => {
            state.accessToken = ''
            state.refreshToken = ''
            state.availableGenres = []
            state.suggestions = []
            state.currentlyPlaying = {}
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAccessToken.fulfilled, (state, action) => {
            if (action.payload) {
                state.accessToken = action.payload.accessToken
                state.refreshToken = action.payload.refreshToken
            }
        })
        builder.addCase(refreshAccessToken.fulfilled, (state, action) => {
            if (action.payload && document.cookie) {
                state.accessToken = action.payload.accessToken
            }
        })
        builder.addCase(getAvailableGenres.fulfilled, (state, action) => {
            if (action.payload) {
                state.availableGenres = action.payload
            }
        })
        builder.addCase(getSuggestions.fulfilled, (state, action) => {
            if (action.payload) {
                state.suggestions = action.payload
            }
        })
        builder.addCase(getPlayingSong.fulfilled, (state, action) => {
            if (action.payload) {
                state.currentlyPlaying = action.payload
            }
        })
        builder.addCase(changeSongPosition.fulfilled, (state, action) => {
            if (action.payload) {
                state.currentlyPlaying.progress = action.payload
            }
        })
        builder.addCase(togglePlay.fulfilled, (state, action) => {
            if (action.payload) {
                state.currentlyPlaying.isPlaying = action.payload
            }
        })
        builder.addCase(playPreviousSong.fulfilled, () => {
            return
        })
        builder.addCase(playNextSong.fulfilled, () => {
            return
        })
    },
})

export const selectAccessToken = (state) => state.spotify.accessToken
export const selectRefreshToken = (state) => state.spotify.refreshToken
export const selectAvailableGenres = (state) => state.spotify.availableGenres
export const selectSuggestions = (state) => state.spotify.suggestions
export const selectCurrentlyPlaying = (state) => state.spotify.currentlyPlaying
export const { resetSpotifyDetails } = spotifySlice.actions
const spotifyReducer = spotifySlice.reducer
export default spotifyReducer
