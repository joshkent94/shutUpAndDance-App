import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showInvertedMessage, showMessage } from "../helperFunctions/showMessage";

export const submitSignUp = createAsyncThunk(
    'user/submitSignUp',
    async ({ firstName, lastName, email, password, validatedPassword }) => {
        if (password !== validatedPassword) {
            showInvertedMessage(`Passwords don't match.`);
            return;
        } else {
            const data = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            };
            const response = await fetch(`/signup`, {
                method: "POST",
                mode: "cors",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const jsonResponse = await response.json();
            showInvertedMessage(jsonResponse.message);
            if (response.ok) {
                return data;
            };
        };
    }
);

export const requestLogin = createAsyncThunk(
    'user/requestLogin',
    async ({ email, password }) => {
        const data = {
            email: email,
            password: password
        };
        const response = await fetch(`/authenticate`, {
            method: "POST",
            mode: "cors",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const jsonResponse = await response.json();
        if (response.ok) {
            return {
                firstName: jsonResponse.firstName,
                lastName: jsonResponse.lastName,
                email: jsonResponse.email,
                genres: jsonResponse.genres
            };
        } else {
            showInvertedMessage(jsonResponse.message);
        };
    }
);

export const logout = createAsyncThunk(
    'user/logout',
    async () => {
        const response = await fetch(`/logout`, {
            method: "GET",
            credentials: 'include',
            mode: "cors"
        });
        if (response.ok) {
            window.location.reload();
        };
    }
);

export const updateUserDetails = createAsyncThunk(
    'user/updateUserDetails',
    async (details) => {
        const response = await fetch(`/user`, {
            method: "PUT",
            mode: "cors",
            credentials: "include",
            body: JSON.stringify(details),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.ok) {
            showMessage(`User details updated.`);
            return details;
        } else {
            showMessage(`User details not updated.`);
        };
    }
);

export const updateGenres = createAsyncThunk(
    'user/updateGenres',
    async (genres) => {
        await fetch(`/userGenres`, {
            method: "PUT",
            mode: "cors",
            credentials: "include",
            body: JSON.stringify(genres),
            headers: {
                "Content-Type": "application/json"
            }
        });
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
        [submitSignUp.fulfilled]: (state, action) => {
            if (action.payload) {
                state.firstName = action.payload.firstName;
                state.lastName = action.payload.lastName;
                state.email = action.payload.email;
            };
        },
        [requestLogin.fulfilled]: (state, action) => {
            if (action.payload) {
                state.firstName = action.payload.firstName;
                state.lastName = action.payload.lastName;
                state.email = action.payload.email;
                state.genres = action.payload.genres;
            };
        },
        [logout.fulfilled]: (state, action) => {
            state.firstName = '';
            state.lastName = '';
            state.email = '';
            state.genres = [];
        },
        [updateUserDetails.fulfilled]: (state, action) => {
            if (action.payload) {
                state.firstName = action.payload.firstName;
                state.lastName = action.payload.lastName;
                state.email = action.payload.email;
            };
        },
        [updateGenres.fulfilled]: (state, action) => {
            return;
        }
    }
});

export const selectFirstName = state => state.user.firstName;
export const selectLastName = state => state.user.lastName;
export const selectEmail = state => state.user.email;
export const selectGenres = state => state.user.genres;
export const { setGenres } = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;