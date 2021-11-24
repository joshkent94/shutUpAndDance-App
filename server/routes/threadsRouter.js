const express = require('express');
const threadsRouter = express.Router();
const { getThread } = require('../queries/getThread');
const { getThreads } = require('../queries/getThreads');
const { newThread } = require('../queries/newThread');

threadsRouter.get('/:searchTerm', getThreads);
threadsRouter.post('/thread', newThread);
threadsRouter.get('/thread/:threadId', getThread);

module.exports = { threadsRouter };