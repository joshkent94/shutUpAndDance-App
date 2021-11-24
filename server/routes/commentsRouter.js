const express = require('express');
const commentsRouter = express.Router();
const { getComments } = require('../queries/getComments');
const { addComment } = require('../queries/addComment');

commentsRouter.get('/:threadId', getComments);
commentsRouter.post('/:threadId', addComment);

module.exports = { commentsRouter };