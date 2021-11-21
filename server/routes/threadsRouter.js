const express = require('express');
const threadsRouter = express.Router();
const { getComments } = require('../queries/getComments');
const { getThread } = require('../queries/getThread');
const { getThreads } = require('../queries/getThreads');
const { newThread } = require('../queries/newThread');

threadsRouter.get('/:searchTerm', getThreads);
threadsRouter.post('/thread', newThread);
threadsRouter.get('/thread/:threadId', getThread);
threadsRouter.get('/comments/:threadId', getComments);

module.exports = { threadsRouter };