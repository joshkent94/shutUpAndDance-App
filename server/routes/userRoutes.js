const express = require('express');
const userRouter = express.Router();
const { updateGenres } = require('../queries/updateGenres');
const { updateUserDetails } = require('../queries/updateUserDetails');
const { updateWidgets } = require('../queries/updateWidgets');

userRouter.put('/', updateUserDetails);
userRouter.put('/genres', updateGenres);
userRouter.put('/widgets', updateWidgets);

module.exports = { userRouter };