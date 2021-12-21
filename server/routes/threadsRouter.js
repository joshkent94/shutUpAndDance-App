const express = require('express');
const threadsRouter = express.Router();
const { getThread } = require('../queries/getThread');
const { getThreads } = require('../queries/getThreads');
const { getMostLikedThreads } = require('../queries/getMostLikedThreads');
const { likeThreadToggle } = require('../queries/likeThread');
const { newThread } = require('../queries/newThread');
const { getThreadsByUserId } = require('../queries/getThreadsByUserId');

threadsRouter.get('/mostLiked', getMostLikedThreads);
threadsRouter.get('/user', getThreadsByUserId);
threadsRouter.get('/:searchTerm', getThreads);
threadsRouter.get('/thread/:threadId', getThread);
threadsRouter.post('/thread', newThread);
threadsRouter.put('/thread/:threadId', likeThreadToggle);

module.exports = { threadsRouter };