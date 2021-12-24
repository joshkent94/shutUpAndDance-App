const express = require('express');
const userRouter = express.Router();
const { getGenres } = require('../queries/user/getGenres');
const { requestLogin } = require('../queries/user/requestLogin');
const { requestLogout } = require('../queries/user/requestLogout');
const { signUp } = require('../queries/user/signUp');
const { updateGenres } = require('../queries/user/updateGenres');
const { updateUserDetails } = require('../queries/user/updateUserDetails');
const { updateWidgets } = require('../queries/user/updateWidgets');

userRouter.post('/signup', signUp);
userRouter.post('/authenticate', requestLogin);
userRouter.get('/logout', requestLogout);
userRouter.put('/', updateUserDetails);
userRouter.get('/genres', getGenres);
userRouter.put('/genres', updateGenres);
userRouter.put('/widgets', updateWidgets);

module.exports = { userRouter };