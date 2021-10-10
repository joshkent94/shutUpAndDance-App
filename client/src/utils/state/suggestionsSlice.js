import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fadeSuggestions } from "../helperFunctions/fadeSuggestions";

export const getAccessToken = createAsyncThunk(
    'suggestions/getAccessToken',
    async () => {
        const authString = btoa(`${process.env.REACT_APP_SPOTIFY_CLIENT_ID}:${process.env.REACT_APP_SPOTIFY_CLIENT_SECRET}`);
        const response = await fetch(`https://accounts.spotify.com/api/token`, {
            method: "POST",
            headers: {
                "Authorization": `Basic ${authString}`,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "grant_type=client_credentials"
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse.access_token;
        };
    }
);

export const getAvailableGenres = createAsyncThunk(
    'suggestions/getAvailableGenres',
    async ({ accessToken }) => {
        const response = await fetch(`https://api.spotify.com/v1/recommendations/available-genre-seeds`, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse.genres;
        };
    }
);

export const getSuggestions = createAsyncThunk(
    'suggestions/getSuggestions',
    async ({ accessToken, genres }) => {
        fadeSuggestions();
        if (genres.length === 0) {
            return [];
        } else {
            const queryString = genres.join();
            const response = await fetch(`https://api.spotify.com/v1/recommendations?limit=5&seed_genres=${queryString}`, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                let tracks = jsonResponse.tracks.map(track => {
                    let trackInfo = {
                        'id': track.id,
                        'name': track.name,
                        'artist': track.artists[0].name,
                        'album': track.album.name,
                        'uri': track.uri,
                        'images': track.album.images
                    };
                    return trackInfo;
                });
                return tracks;
            };
        };
    }
);

const suggestionsSlice = createSlice({
    name: 'suggestions',
    initialState: {
        accessToken: '',
        availableGenres: [],
        suggestions: []
    },
    reducers: {
        resetSuggestionsDetails: (state, action) => {
            state.accessToken = '';
            state.availableGenres = [];
            state.suggestions = [];
        }
    },
    extraReducers: {
        [getAccessToken.fulfilled]: (state, action) => {
            state.accessToken = action.payload;
        },
        [getAvailableGenres.fulfilled]: (state, action) => {
            state.availableGenres = action.payload;
        },
        [getSuggestions.fulfilled]: (state, action) => {
            state.suggestions = action.payload;
        }
    }
});

export const selectAccessToken = state => state.suggestions.accessToken;
export const selectAvailableGenres = state => state.suggestions.availableGenres;
export const selectSuggestions = state => state.suggestions.suggestions;
export const { resetSuggestionsDetails } = suggestionsSlice.actions;
const suggestionsReducer = suggestionsSlice.reducer;
export default suggestionsReducer;