import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createThread = createAsyncThunk(
    'forum/createThread',
    async ({ title, comment }) => {
        const data = {
            title: title,
            comment: comment
        };
        await fetch('/thread', {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    }
);

export const searchThreads = createAsyncThunk(
    'forum/searchThreads',
    async ({ searchTerm }) => {
        const response = await fetch(`/threads/${searchTerm}`, {
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
        threads: []
    },
    extraReducers: {
        [createThread.fulfilled]: (state, action) => {
            return;
        },
        [searchThreads.fulfilled]: (state, action) => {
            state.threads = action.payload;
        }
    }
});

export const selectThreads = state => state.forum.threads;
const forumReducer = forumSlice.reducer;
export default forumReducer;