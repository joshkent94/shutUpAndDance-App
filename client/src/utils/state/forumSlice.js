import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createThread = createAsyncThunk(
    'forum/createThread',
    async ({ title, comment }) => {
        const data = {
            title: title,
            comment: comment
        };
        const response = await fetch('/thread', {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        };
    }
);

export const searchThreads = createAsyncThunk(
    'forum/searchThreads',
    async ({ searchTerm }) => {
        if (searchTerm) {
            const response = await fetch(`/threads/${searchTerm}`, {
                mode: "cors",
                credentials: "include"
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                return jsonResponse;
            };
        } else {
            return [];
        };
    }
);

export const getThread = createAsyncThunk(
    'forum/getThread',
    async (threadId) => {
        const response = await fetch(`/thread/${threadId}`, {
            mode: "cors",
            credentials: "include"
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            const thread = {
                id: threadId,
                ...jsonResponse
            };
            return thread;
        };
    }
);

export const getComments = createAsyncThunk(
    'forum/getComments',
    async (threadId) => {
        const response = await fetch(`/comments/${threadId}`, {
            mode: "cors",
            credentials: "include"
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        };
    }
);

const forumSlice = createSlice({
    name: 'forum',
    initialState: {
        threadOverviews: [],
        threadInfo: {},
        comments: []
    },
    extraReducers: {
        [createThread.fulfilled]: (state, action) => {
            state.threadInfo = action.payload;
        },
        [searchThreads.fulfilled]: (state, action) => {
            state.threadOverviews = action.payload;
        },
        [getThread.fulfilled]: (state, action) => {
            state.threadInfo = action.payload;
        },
        [getComments.fulfilled]: (state, action) => {
            state.comments = action.payload;
        }
    }
});

export const selectThreads = state => state.forum.threadOverviews;
export const selectThreadInfo = state => state.forum.threadInfo;
export const selectComments = state => state.forum.comments;
const forumReducer = forumSlice.reducer;
export default forumReducer;