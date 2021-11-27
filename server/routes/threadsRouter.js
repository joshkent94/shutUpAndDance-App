const express = require('express');
const threadsRouter = express.Router();
const { getThread } = require('../queries/getThread');
const { getThreads } = require('../queries/getThreads');
const { likeThreadToggle } = require('../queries/likeThread');
const { newThread } = require('../queries/newThread');

threadsRouter.get('/:searchTerm', getThreads);
threadsRouter.post('/thread', newThread);
threadsRouter.get('/thread/:threadId', getThread);
threadsRouter.put('/thread/:threadId', likeThreadToggle);

module.exports = { threadsRouter };