const express = require('express');
const userRouter = express.Router();
const { updateGenres } = require('../queries/updateGenres');
const { updateUserDetails } = require('../queries/updateUserDetails');

userRouter.put('/', updateUserDetails);
userRouter.put('/genres', updateGenres);

module.exports = { userRouter };