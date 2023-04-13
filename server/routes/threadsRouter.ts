const express = require('express');
const threadsRouter = express.Router();
const { getThread } = require('../queries/threads/getThread');
const { getThreads } = require('../queries/threads/getThreads');
const { getMostLikedThreads } = require('../queries/threads/getMostLikedThreads');
const { likeThreadToggle } = require('../queries/threads/likeThread');
const { newThread } = require('../queries/threads/newThread');
const { getThreadsByUserId } = require('../queries/threads/getThreadsByUserId');

threadsRouter.get('/mostLiked', getMostLikedThreads);
threadsRouter.get('/user', getThreadsByUserId);
threadsRouter.get('/:searchTerm', getThreads);
threadsRouter.get('/thread/:threadId', getThread);
threadsRouter.post('/thread', newThread);
threadsRouter.put('/thread/:threadId', likeThreadToggle);

module.exports = { threadsRouter };