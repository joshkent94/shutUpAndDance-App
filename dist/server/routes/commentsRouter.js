"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsRouter = void 0;
const express_1 = __importDefault(require("express"));
const getComments_1 = require("../queries/comments/getComments");
const addComment_1 = require("../queries/comments/addComment");
const likeComment_1 = require("../queries/comments/likeComment");
const commentsRouter = express_1.default.Router();
exports.commentsRouter = commentsRouter;
commentsRouter.get('/:threadId', getComments_1.getComments);
commentsRouter.post('/:threadId', addComment_1.addComment);
commentsRouter.put('/:commentId', likeComment_1.likeCommentToggle);
