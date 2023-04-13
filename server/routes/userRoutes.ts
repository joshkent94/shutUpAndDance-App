import express from 'express';
import { getGenres } from '../queries/user/getGenres';
import { requestLogin } from '../queries/user/requestLogin';
import { requestLogout } from '../queries/user/requestLogout';
import { signUp } from '../queries/user/signUp';
import { updateGenres } from '../queries/user/updateGenres';
import { updateUserDetails } from '../queries/user/updateUserDetails';
import { updateWidgets } from '../queries/user/updateWidgets';

const userRouter = express.Router();

userRouter.post('/signup', signUp);
userRouter.post('/authenticate', requestLogin);
userRouter.get('/logout', requestLogout);
userRouter.put('/', updateUserDetails);
userRouter.get('/genres', getGenres);
userRouter.put('/genres', updateGenres);
userRouter.put('/widgets', updateWidgets);

export { userRouter };