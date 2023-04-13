import express from 'express';
import { getThread } from '../queries/threads/getThread';
import { getThreads } from '../queries/threads/getThreads';
import { getMostLikedThreads } from '../queries/threads/getMostLikedThreads';
import { likeThreadToggle } from '../queries/threads/likeThread';
import { newThread } from '../queries/threads/newThread';
import { getThreadsByUserId } from '../queries/threads/getThreadsByUserId';

const threadsRouter = express.Router();

threadsRouter.get('/mostLiked', getMostLikedThreads);
threadsRouter.get('/user', getThreadsByUserId);
threadsRouter.get('/:searchTerm', getThreads);
threadsRouter.get('/thread/:threadId', getThread);
threadsRouter.post('/thread', newThread);
threadsRouter.put('/thread/:threadId', likeThreadToggle);

export { threadsRouter };