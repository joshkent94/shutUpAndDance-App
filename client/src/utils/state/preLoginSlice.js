import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const requestLogin = createAsyncThunk(
    'preLogin/requestLogin',
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
        if (response.ok) {
            return {
                signedIn: true,
                message: ''
            };
        } else {
            const jsonResponse = await response.json();
            return {
                signedIn: false,
                message: jsonResponse.message
            };
        };
    }
);

export const logout = createAsyncThunk(
    'preLogin/logout',
    async () => {
        const response = await fetch(`/logout`, {
            method: "GET",
            credentials: 'include',
            mode: "cors"
        });
        if (response.ok) {
            window.location.reload();
            return false;
        };
        return true;
    }
);

const preLoginSlice = createSlice({
    name: 'preLogin',
    initialState: {
        registering: false,
        signedIn: false,
        message: ''
    },
    reducers: {
        setRegistering: (state, action) => {
            state.registering = action.payload;
        },
        setMessage: (state, action) => {
            state.message = action.payload.message;
        }
    },
    extraReducers: {
        [requestLogin.fulfilled]: (state, action) => {
            state.signedIn = action.payload.signedIn;
            state.message = action.payload.message;
        },
        [logout.fulfilled]: (state, action) => {
            state.signedIn = action.payload;
        }
    }
});

export const selectRegistering = state => state.preLogin.registering;
export const selectSignedIn = state => state.preLogin.signedIn;
export const selectMessage = state => state.preLogin.message;
export const { setRegistering, setMessage } = preLoginSlice.actions;
const preLoginReducer = preLoginSlice.reducer;
export default preLoginReducer;