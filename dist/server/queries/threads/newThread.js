"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newThread = void 0;
const connectionConfig_1 = require("../../connectionConfig");
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const newThread = (req, res) => {
    const cleanTitle = (0, sanitize_html_1.default)(req.body.title);
    const cleanComment = (0, sanitize_html_1.default)(req.body.comment);
    connectionConfig_1.pool.query(`INSERT INTO threads (creator_user_id, title, initial_comment)
                VALUES ($1, $2, $3)
                RETURNING *`, [req.session.userId, cleanTitle, cleanComment]).then((data) => {
        connectionConfig_1.pool.query(`SELECT threads.id, threads.date_time, threads.title, threads.initial_comment, threads.likes, users.first_name, users.last_name
                FROM threads INNER JOIN users ON (threads.creator_user_id = users.id)
                WHERE threads.id = ($1)`, [data.rows[0].id]).then((data) => {
            res.status(201).send(data.rows[0]);
        });
    });
};
exports.newThread = newThread;
