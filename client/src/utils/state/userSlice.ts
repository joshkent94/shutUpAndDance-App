import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { showMessage } from '../helperFunctions/showMessage'
import { hashFunction } from '../helperFunctions/hashFunction'

export const submitSignUp = createAsyncThunk(
    'user/submitSignUp',
    async ({
        firstName,
        lastName,
        email,
        password,
    }: {
        firstName: string
        lastName: string
        email: string
        password: string
    }) => {
        const hashedPassword = hashFunction(password)
        const data = {
            firstName,
            lastName,
            email,
            password: hashedPassword,
        }
        const response = await fetch(`/user/signup`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        const jsonResponse = await response.json()
        if (response.status === 404) showMessage(jsonResponse.message)
        if (response.ok) {
            return {
                ...data,
                id: jsonResponse.id,
                genres: jsonResponse.genres,
                widgets: jsonResponse.widgets,
            }
        }
    }
)

export const requestLogin = createAsyncThunk(
    'user/requestLogin',
    async ({ email, password }: { email: string; password: string }) => {
        const hashedPassword = hashFunction(password)
        const data = {
            email,
            password: hashedPassword,
        }
        const response = await fetch(`/user/authenticate`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        const jsonResponse = await response.json()
        if (response.ok) {
            return {
                id: jsonResponse.id,
                firstName: jsonResponse.firstName,
                lastName: jsonResponse.lastName,
                email: jsonResponse.email,
                genres: jsonResponse.genres,
                widgets: jsonResponse.widgets,
            }
        } else {
            showMessage(jsonResponse.message)
        }
    }
)

export const logout = createAsyncThunk('user/logout', async () => {
    const response = await fetch(`/user/logout`, {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
    })
    if (response.ok) {
        return
    }
})

export const updateUserDetails = createAsyncThunk(
    'user/updateUserDetails',
    async (details: any) => {
        const response = await fetch(`/user`, {
            method: 'PUT',
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(details),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.ok) {
            showMessage(`User details updated`)
            return details
        } else {
            showMessage(`User details not updated`)
        }
    }
)

export const updateGenres = createAsyncThunk(
    'user/updateGenres',
    async (genres: any[]) => {
        await fetch(`/user/genres`, {
            method: 'PUT',
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(genres),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
)

export const updateWidgets = createAsyncThunk(
    'user/updateWidgets',
    async (widgets: any[]) => {
        await fetch(`/user/widgets`, {
            method: 'PUT',
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(widgets),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
)

type UserState = {
    id: string
    firstName: string
    lastName: string
    email: string
    genres: any[]
    widgets: any[]
}

const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        genres: [],
        widgets: [],
    } as UserState,
    reducers: {
        setGenres: (state, action) => {
            if (
                state.genres.indexOf(action.payload) === -1 &&
                state.genres.length < 5
            ) {
                return {
                    ...state,
                    genres: [...state.genres, action.payload],
                }
            } else {
                const newGenres = state.genres.filter(
                    (genre) => genre !== action.payload
                )
                return {
                    ...state,
                    genres: newGenres,
                }
            }
        },
        setWidgetSelection: (state, action) => {
            if (state.widgets.indexOf(action.payload) === -1) {
                return {
                    ...state,
                    widgets: [action.payload, ...state.widgets],
                }
            } else {
                const newWidgets = state.widgets.filter(
                    (widget) => widget !== action.payload
                )
                return {
                    ...state,
                    widgets: newWidgets,
                }
            }
        },
        setWidgetOrder: (state, action) => {
            state.widgets = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(submitSignUp.fulfilled, (state, action) => {
            if (action.payload) {
                state.id = action.payload.id
                state.firstName = action.payload.firstName
                state.lastName = action.payload.lastName
                state.email = action.payload.email
                state.genres = action.payload.genres
                state.widgets = action.payload.widgets
            }
        })
        builder.addCase(requestLogin.fulfilled, (state, action) => {
            if (action.payload) {
                if (action.payload.id) {
                    state.id = action.payload.id
                    state.firstName = action.payload.firstName
                    state.lastName = action.payload.lastName
                    state.email = action.payload.email
                    state.genres = action.payload.genres
                    state.widgets = action.payload.widgets
                }
            }
        })
        builder.addCase(logout.fulfilled, (state) => {
            state.id = ''
            state.firstName = ''
            state.lastName = ''
            state.email = ''
            state.genres = []
            state.widgets = []
        })
        builder.addCase(updateUserDetails.fulfilled, (state, action) => {
            if (action.payload) {
                state.firstName = action.payload.firstName
                state.lastName = action.payload.lastName
                state.email = action.payload.email
            }
        })
        builder.addCase(updateGenres.fulfilled, () => {
            return
        })
        builder.addCase(updateWidgets.fulfilled, () => {
            return
        })
    },
})

export const selectUserId = (state) => state.user.id
export const selectFirstName = (state) => state.user.firstName
export const selectLastName = (state) => state.user.lastName
export const selectEmail = (state) => state.user.email
export const selectGenres = (state) => state.user.genres
export const selectWidgets = (state) => state.user.widgets
export const { setGenres, setWidgetSelection, setWidgetOrder } =
    userSlice.actions
const userReducer = userSlice.reducer
export default userReducer
