import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseDomain } from "../envConfig";

export const getUserDetails = createAsyncThunk(
    'user/getUserDetails',
    async () => {
        const response = await fetch(`${baseDomain}/user`, {
            mode: "cors",
            credentials: "include",
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            return {
                firstName: jsonResponse.firstName,
                lastName: jsonResponse.lastName,
                email: jsonResponse.email
            };
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        firstName: '',
        lastName: '',
        email: '',
        genres: []
    },
    reducers: {
        resetUserDetails: (state, action) => {
            state.firstName = '';
            state.lastName = '';
            state.email = '';
            state.genres = [];
        },
        setGenres: (state, action) => {
            if (state.genres.indexOf(action.payload) === -1 & state.genres.length < 5) {
                return {
                    ...state,
                    genres: [...state.genres, action.payload]
                };
            } else {
                const newGenres = state.genres.filter(genre => genre !== action.payload);
                return {
                    ...state,
                    genres: newGenres
                };
            };
        }
    },
    extraReducers: {
        [getUserDetails.fulfilled]: (state, action) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.email = action.payload.email;
        }
    }
});

export const selectFirstName = state => state.user.firstName;
export const selectLastName = state => state.user.lastName;
export const selectEmail = state => state.user.email;
export const selectGenres = state => state.user.genres;
export const { resetUserDetails, setGenres } = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;