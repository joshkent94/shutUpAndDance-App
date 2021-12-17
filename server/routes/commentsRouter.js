const express = require('express');
const commentsRouter = express.Router();
const { getComments } = require('../queries/getComments');
const { addComment } = require('../queries/addComment');
const { likeCommentToggle } = require('../queries/likeComment');

commentsRouter.get('/:threadId', getComments);
commentsRouter.post('/:threadId', addComment);
commentsRouter.put('/:commentId', likeCommentToggle);

module.exports = { commentsRouter };