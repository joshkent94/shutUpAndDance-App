import { createSlice } from "@reduxjs/toolkit";

const preLoginSlice = createSlice({
    name: 'preLogin',
    initialState: {
        registering: false,
        message: ''
    },
    reducers: {
        setRegistering: (state, action) => {
            state.registering = action.payload;
        },
        setMessage: (state, action) => {
            state.message = action.payload.message;
        }
    }
});

export const selectRegistering = state => state.preLogin.registering;
export const selectSignedIn = state => state.preLogin.signedIn;
export const selectMessage = state => state.preLogin.message;
export const { setRegistering, setMessage } = preLoginSlice.actions;
const preLoginReducer = preLoginSlice.reducer;
export default preLoginReducer;