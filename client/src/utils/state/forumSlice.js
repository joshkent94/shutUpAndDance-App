import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createThread = createAsyncThunk(
    'forum/createThread',
    async ({ title, comment }) => {
        const data = {
            title: title,
            comment: comment
        };
        const response = await fetch('/threads/thread', {
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
            const thread = {
                id: jsonResponse.id,
                timestamp: jsonResponse.date_time,
                title: jsonResponse.title,
                initialComment: jsonResponse.initial_comment,
                comments: [],
                likes: jsonResponse.likes,
                firstName: jsonResponse.first_name,
                lastName: jsonResponse.last_name
            };
            return thread;
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
                let returnArray = [];
                for (let i = 0; i < jsonResponse.length; i++) {
                    const threadObj = {
                        id: jsonResponse[i].id,
                        timestamp: jsonResponse[i].date_time,
                        title: jsonResponse[i].title,
                        initialComment: jsonResponse[i].initial_comment,
                        likes: jsonResponse[i].likes,
                        numberOfComments: jsonResponse[i].number_of_comments,
                        firstName: jsonResponse[i].first_name,
                        lastName: jsonResponse[i].last_name
                    };
                    returnArray.push(threadObj);
                };
                return returnArray;
            };
        } else {
            return [];
        };
    }
);

export const getThread = createAsyncThunk(
    'forum/getThread',
    async (threadId) => {
        const response = await fetch(`/threads/thread/${threadId}`, {
            mode: "cors",
            credentials: "include"
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            const thread = {
                id: threadId,
                timestamp: jsonResponse.date_time,
                title: jsonResponse.title,
                initialComment: jsonResponse.initial_comment,
                comments: [],
                likes: jsonResponse.likes,
                firstName: jsonResponse.first_name,
                lastName: jsonResponse.last_name
            };
            return thread;
        };
    }
);

export const getThreadsByUserId = createAsyncThunk(
    'forum/getThreadsByUserId',
    async () => {
        const response = await fetch('/threads/user', {
            mode: "cors",
            credentials: "include"
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            let returnArray = [];
            for (let i = 0; i < jsonResponse.length; i++) {
                const threadObj = {
                    id: jsonResponse[i].id,
                    timestamp: jsonResponse[i].date_time,
                    title: jsonResponse[i].title,
                    initialComment: jsonResponse[i].initial_comment,
                    likes: jsonResponse[i].likes,
                    numberOfComments: jsonResponse[i].number_of_comments,
                    firstName: jsonResponse[i].first_name,
                    lastName: jsonResponse[i].last_name
                };
                returnArray.push(threadObj);
            };
            return returnArray;
        };
    }
);

export const likeThreadToggle = createAsyncThunk(
    'forum/likeThreadToggle',
    async ({ threadId, method }) => {
        const response = await fetch(`/threads/thread/${threadId}`, {
            method: "PUT",
            mode: "cors",
            credentials: "include"
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            return {
                jsonResponse,
                method,
                threadId
            };
        };
    }
);

export const getMostLikedThreads = createAsyncThunk(
    'forum/getMostLikedThreads',
    async () => {
        const response = await fetch('/threads/mostLiked', {
            method: "GET",
            mode: "cors",
            credentials: "include"
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            let returnArray = [];
            for (let i = 0; i < jsonResponse.length; i++) {
                const threadObj = {
                    id: jsonResponse[i].id,
                    timestamp: jsonResponse[i].date_time,
                    title: jsonResponse[i].title,
                    initialComment: jsonResponse[i].initial_comment,
                    likes: jsonResponse[i].likes,
                    numberOfComments: jsonResponse[i].number_of_comments,
                    firstName: jsonResponse[i].first_name,
                    lastName: jsonResponse[i].last_name
                };
                returnArray.push(threadObj);
            };
            return returnArray;
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
            let returnArray = [];
            for (let i = 0; i < jsonResponse.length; i++) {
                const commentObj = {
                    id: jsonResponse[i].id,
                    timestamp: jsonResponse[i].date_time,
                    comment: jsonResponse[i].comment,
                    likes: jsonResponse[i].likes,
                    firstName: jsonResponse[i].first_name,
                    lastName: jsonResponse[i].last_name
                };
                returnArray.push(commentObj);
            };
            return returnArray;
        };
    }
);

export const addComment = createAsyncThunk(
    'forum/addComment',
    async ({threadId, comment}) => {
        const data = {
            comment
        };
        await fetch(`/comments/${threadId}`, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return;
    }
);

export const likeCommentToggle = createAsyncThunk(
    'forum/likeCommentToggle',
    async ({ commentId }) => {
        const response = await fetch(`/comments/${commentId}`, {
            method: "PUT",
            mode: "cors",
            credentials: "include"
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            return {
                jsonResponse,
                commentId
            };
        };
    }
);

const forumSlice = createSlice({
    name: 'forum',
    initialState: {
        threadOverviews: [],
        userThreads: [],
        mostLiked: [],
        threadInfo: {
            id: "",
            timestamp: '',
            title: "",
            initialComment: "",
            comments: [],
            likes: [],
            firstName: "",
            lastName: ""
        }
    },
    reducers: {
        resetForumDetails: (state, action) => {
            state.threadOverviews = [];
            state.userThreads = [];
            state.mostLiked = [];
            state.threadInfo = {
                id: "",
                timestamp: '',
                title: "",
                initialComment: "",
                comments: [],
                likes: [],
                firstName: "",
                lastName: ""
            };
        }
    },
    extraReducers: {
        [createThread.fulfilled]: (state, action) => {
            state.threadInfo = action.payload;
        },
        [searchThreads.fulfilled]: (state, action) => {
            state.threadOverviews = action.payload;
        },
        [getThread.fulfilled]: (state, action) => {
            if (action.payload) {
                state.threadInfo = action.payload;
            };
        },
        [getThreadsByUserId.fulfilled]: (state, action) => {
            state.userThreads = action.payload;
        },
        [likeThreadToggle.fulfilled]: (state, action) => {
            if (action.payload.method === 'threadOverviews') {
                const index = state.threadOverviews.findIndex(({ id }) => id === action.payload.threadId);
                state.threadOverviews[index].likes = action.payload.jsonResponse;
            } else if (action.payload.method === 'mostLiked') {
                const index = state.mostLiked.findIndex(({ id }) => id === action.payload.threadId);
                state.mostLiked[index].likes = action.payload.jsonResponse;
            } else {
                state.threadInfo.likes = action.payload.jsonResponse;
            };
        },
        [getMostLikedThreads.fulfilled]: (state, action) => {
            state.mostLiked = action.payload;
        },
        [getComments.fulfilled]: (state, action) => {
            if (action.payload) {
                state.threadInfo.comments = action.payload;   
            };
        },
        [addComment.fulfilled]: (state, action) => {
            return;
        },
        [likeCommentToggle.fulfilled]: (state, action) => {
            const index = state.threadInfo.comments.findIndex(({ id }) => id === action.payload.commentId);
            state.threadInfo.comments[index].likes = action.payload.jsonResponse;
        }
    }
});

export const selectThreads = state => state.forum.threadOverviews;
export const selectUserThreads = state => state.forum.userThreads;
export const selectMostLiked = state => state.forum.mostLiked;
export const selectThreadInfo = state => state.forum.threadInfo;
export const { resetForumDetails } = forumSlice.actions;
const forumReducer = forumSlice.reducer;
export default forumReducer;