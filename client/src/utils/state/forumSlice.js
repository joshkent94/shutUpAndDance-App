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

const forumSlice = createSlice({
    name: 'forum',
    initialState: {
        threads: []
    },
    extraReducers: {
        [createThread.fulfilled]: (state, action) => {
            return;
        }
    }
});

export const selectThreads = state => state.forum.threads;
const forumReducer = forumSlice.reducer;
export default forumReducer;