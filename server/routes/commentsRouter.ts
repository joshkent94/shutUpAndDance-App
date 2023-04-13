const express = require('express');
const commentsRouter = express.Router();
const { getComments } = require('../queries/comments/getComments');
const { addComment } = require('../queries/comments/addComment');
const { likeCommentToggle } = require('../queries/comments/likeComment');

commentsRouter.get('/:threadId', getComments);
commentsRouter.post('/:threadId', addComment);
commentsRouter.put('/:commentId', likeCommentToggle);

module.exports = { commentsRouter };