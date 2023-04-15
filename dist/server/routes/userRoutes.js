"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const getGenres_1 = require("../queries/user/getGenres");
const requestLogin_1 = require("../queries/user/requestLogin");
const requestLogout_1 = require("../queries/user/requestLogout");
const signUp_1 = require("../queries/user/signUp");
const updateGenres_1 = require("../queries/user/updateGenres");
const updateUserDetails_1 = require("../queries/user/updateUserDetails");
const updateWidgets_1 = require("../queries/user/updateWidgets");
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.post('/signup', signUp_1.signUp);
userRouter.post('/authenticate', requestLogin_1.requestLogin);
userRouter.get('/logout', requestLogout_1.requestLogout);
userRouter.put('/', updateUserDetails_1.updateUserDetails);
userRouter.get('/genres', getGenres_1.getGenres);
userRouter.put('/genres', updateGenres_1.updateGenres);
userRouter.put('/widgets', updateWidgets_1.updateWidgets);