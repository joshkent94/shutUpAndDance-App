import express from 'express'
import { getComments } from '../queries/comments/getComments'
import { addComment } from '../queries/comments/addComment'
import { likeCommentToggle } from '../queries/comments/likeComment'

const commentsRouter = express.Router()

commentsRouter.get('/:threadId', getComments)
commentsRouter.post('/:threadId', addComment)
commentsRouter.put('/:commentId', likeCommentToggle)

export { commentsRouter }
