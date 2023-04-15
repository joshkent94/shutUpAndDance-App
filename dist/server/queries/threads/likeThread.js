"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeThreadToggle = void 0;
const connectionConfig_1 = require("../../connectionConfig");
const likeThreadToggle = (req, res) => {
    const threadId = req.params.threadId;
    connectionConfig_1.pool.query(`SELECT likes FROM threads
                WHERE id = ($1)`, [threadId]).then((data) => {
        const likes = data.rows[0].likes;
        if (likes.includes(req.session.userId)) {
            const filteredArray = likes.filter((like) => like !== req.session.userId);
            connectionConfig_1.pool.query(`UPDATE threads
                            SET likes = ($1)
                            WHERE id = ($2)
                            RETURNING likes`, [filteredArray, threadId]).then((data) => {
                res.status(200).send(data.rows[0].likes);
            });
        }
        else {
            const newArray = [...likes, req.session.userId];
            connectionConfig_1.pool.query(`UPDATE threads
                            SET likes = ($1)
                            WHERE id = ($2)
                            RETURNING likes`, [newArray, threadId]).then((data) => {
                res.status(200).send(data.rows[0].likes);
            });
        }
    });
};
exports.likeThreadToggle = likeThreadToggle;
