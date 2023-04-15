import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const createThread = createAsyncThunk(
    'forum/createThread',
    async ({ title, comment }: { title: string; comment: string }) => {
        const data = {
            title: title,
            comment: comment,
        }
        const response = await fetch('/threads/thread', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (response.ok) {
            const jsonResponse = await response.json()
            const thread = {
                id: jsonResponse.id,
                timestamp: jsonResponse.date_time,
                title: jsonResponse.title,
                initialComment: jsonResponse.initial_comment,
                comments: [],
                likes: jsonResponse.likes,
                firstName: jsonResponse.first_name,
                lastName: jsonResponse.last_name,
            }
            return thread
        }
    }
)

export const searchThreads = createAsyncThunk(
    'forum/searchThreads',
    async ({ searchTerm }: { searchTerm: string }) => {
        if (searchTerm) {
            const response = await fetch(`/threads/${searchTerm}`, {
                mode: 'cors',
                credentials: 'include',
            })
            if (response.ok) {
                const jsonResponse = await response.json()
                const returnArray: any[] = []
                for (let i = 0; i < jsonResponse.length; i++) {
                    const threadObj = {
                        id: jsonResponse[i].id,
                        timestamp: jsonResponse[i].date_time,
                        title: jsonResponse[i].title,
                        initialComment: jsonResponse[i].initial_comment,
                        likes: jsonResponse[i].likes,
                        numberOfComments: jsonResponse[i].number_of_comments,
                        firstName: jsonResponse[i].first_name,
                        lastName: jsonResponse[i].last_name,
                    }
                    returnArray.push(threadObj)
                }
                return returnArray
            }
        } else {
            return []
        }
    }
)

export const getThread = createAsyncThunk(
    'forum/getThread',
    async (threadId: string) => {
        const response = await fetch(`/threads/thread/${threadId}`, {
            mode: 'cors',
            credentials: 'include',
        })
        if (response.ok) {
            const jsonResponse = await response.json()
            const thread = {
                id: threadId,
                timestamp: jsonResponse.date_time,
                title: jsonResponse.title,
                initialComment: jsonResponse.initial_comment,
                comments: [],
                likes: jsonResponse.likes,
                firstName: jsonResponse.first_name,
                lastName: jsonResponse.last_name,
            }
            return thread
        }
    }
)

export const getThreadsByUserId = createAsyncThunk(
    'forum/getThreadsByUserId',
    async () => {
        const response = await fetch('/threads/user', {
            mode: 'cors',
            credentials: 'include',
        })
        if (response.ok) {
            const jsonResponse = await response.json()
            const returnArray: any[] = []
            for (let i = 0; i < jsonResponse.length; i++) {
                const threadObj = {
                    id: jsonResponse[i].id,
                    timestamp: jsonResponse[i].date_time,
                    title: jsonResponse[i].title,
                    initialComment: jsonResponse[i].initial_comment,
                    likes: jsonResponse[i].likes,
                    numberOfComments: jsonResponse[i].number_of_comments,
                    firstName: jsonResponse[i].first_name,
                    lastName: jsonResponse[i].last_name,
                }
                returnArray.push(threadObj)
            }
            return returnArray
        }
    }
)

export const likeThreadToggle = createAsyncThunk(
    'forum/likeThreadToggle',
    async ({ threadId, method }: { threadId: string; method: string }) => {
        const response = await fetch(`/threads/thread/${threadId}`, {
            method: 'PUT',
            mode: 'cors',
            credentials: 'include',
        })
        if (response.ok) {
            const jsonResponse = await response.json()
            return {
                jsonResponse,
                method,
                threadId,
            }
        }
    }
)

export const getMostLikedThreads = createAsyncThunk(
    'forum/getMostLikedThreads',
    async () => {
        const response = await fetch('/threads/mostLiked', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
        })
        if (response.ok) {
            const jsonResponse = await response.json()
            const returnArray: any[] = []
            for (let i = 0; i < jsonResponse.length; i++) {
                const threadObj = {
                    id: jsonResponse[i].id,
                    timestamp: jsonResponse[i].date_time,
                    title: jsonResponse[i].title,
                    initialComment: jsonResponse[i].initial_comment,
                    likes: jsonResponse[i].likes,
                    numberOfComments: jsonResponse[i].number_of_comments,
                    firstName: jsonResponse[i].first_name,
                    lastName: jsonResponse[i].last_name,
                }
                returnArray.push(threadObj)
            }
            return returnArray
        }
    }
)

export const getComments = createAsyncThunk(
    'forum/getComments',
    async (threadId: string) => {
        const response = await fetch(`/comments/${threadId}`, {
            mode: 'cors',
            credentials: 'include',
        })
        if (response.ok) {
            const jsonResponse = await response.json()
            const returnArray: any[] = []
            for (let i = 0; i < jsonResponse.length; i++) {
                const commentObj = {
                    id: jsonResponse[i].id,
                    timestamp: jsonResponse[i].date_time,
                    comment: jsonResponse[i].comment,
                    likes: jsonResponse[i].likes,
                    firstName: jsonResponse[i].first_name,
                    lastName: jsonResponse[i].last_name,
                }
                returnArray.push(commentObj)
            }
            return returnArray
        }
    }
)

export const addComment = createAsyncThunk(
    'forum/addComment',
    async ({ threadId, comment }: { threadId: string; comment: string }) => {
        const data = {
            comment,
        }
        await fetch(`/comments/${threadId}`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        return
    }
)

export const likeCommentToggle = createAsyncThunk(
    'forum/likeCommentToggle',
    async ({ commentId }: { commentId: string }) => {
        const response = await fetch(`/comments/${commentId}`, {
            method: 'PUT',
            mode: 'cors',
            credentials: 'include',
        })
        if (response.ok) {
            const jsonResponse = await response.json()
            return {
                jsonResponse,
                commentId,
            }
        }
    }
)

type ForumState = {
    threadOverviews: any[]
    userThreads: any[]
    mostLiked: any[]
    threadInfo: {
        id: string
        timestamp: string
        title: string
        initialComment: string
        comments: any[]
        likes: any[]
        firstName: string
        lastName: string
    }
}

const forumSlice = createSlice({
    name: 'forum',
    initialState: {
        threadOverviews: [],
        userThreads: [],
        mostLiked: [],
        threadInfo: {
            id: '',
            timestamp: '',
            title: '',
            initialComment: '',
            comments: [],
            likes: [],
            firstName: '',
            lastName: '',
        },
    } as ForumState,
    reducers: {
        resetForumDetails: (state) => {
            state.threadOverviews = []
            state.userThreads = []
            state.mostLiked = []
            state.threadInfo = {
                id: '',
                timestamp: '',
                title: '',
                initialComment: '',
                comments: [],
                likes: [],
                firstName: '',
                lastName: '',
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createThread.fulfilled, (state, action) => {
            if (action.payload) {
                state.threadInfo = action.payload
            }
        })
        builder.addCase(searchThreads.fulfilled, (state, action) => {
            if (action.payload) {
                state.threadOverviews = action.payload
            }
        })
        builder.addCase(getThread.fulfilled, (state, action) => {
            if (action.payload) {
                state.threadInfo = action.payload
            }
        })
        builder.addCase(getThreadsByUserId.fulfilled, (state, action) => {
            if (action.payload) {
                state.userThreads = action.payload
            }
        })
        builder.addCase(likeThreadToggle.fulfilled, (state, action) => {
            if (action.payload) {
                if (action.payload.method === 'threadOverviews') {
                    const index = state.threadOverviews.findIndex(
                        ({ id }) => id === action.payload?.threadId
                    )
                    state.threadOverviews[index].likes =
                        action.payload.jsonResponse
                } else if (action.payload.method === 'mostLiked') {
                    const index = state.mostLiked.findIndex(
                        ({ id }) => id === action.payload?.threadId
                    )
                    state.mostLiked[index].likes = action.payload.jsonResponse
                } else {
                    state.threadInfo.likes = action.payload.jsonResponse
                }
            }
        })
        builder.addCase(getMostLikedThreads.fulfilled, (state, action) => {
            if (action.payload) {
                state.mostLiked = action.payload
            }
        })
        builder.addCase(getComments.fulfilled, (state, action) => {
            if (action.payload) {
                state.threadInfo.comments = action.payload
            }
        })
        builder.addCase(addComment.fulfilled, () => {
            return
        })
        builder.addCase(likeCommentToggle.fulfilled, (state, action) => {
            const index = state.threadInfo.comments.findIndex(
                ({ id }) => id === action.payload?.commentId
            )
            state.threadInfo.comments[index].likes =
                action.payload?.jsonResponse
        })
    },
})

export const selectThreads = (state) => state.forum.threadOverviews
export const selectUserThreads = (state) => state.forum.userThreads
export const selectMostLiked = (state) => state.forum.mostLiked
export const selectThreadInfo = (state) => state.forum.threadInfo
export const { resetForumDetails } = forumSlice.actions
const forumReducer = forumSlice.reducer
export default forumReducer
