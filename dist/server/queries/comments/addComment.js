"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addComment = void 0;
const connectionConfig_1 = require("../../connectionConfig");
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const addComment = (req, res) => {
    const threadId = req.params.threadId;
    const cleanComment = (0, sanitize_html_1.default)(req.body.comment);
    connectionConfig_1.pool.query(`INSERT INTO comments (thread_id, comment, user_id)
                VALUES ($1, $2, $3)`, [threadId, cleanComment, req.session.userId]).then(() => {
        res.status(201).send();
    });
};
exports.addComment = addComment;
