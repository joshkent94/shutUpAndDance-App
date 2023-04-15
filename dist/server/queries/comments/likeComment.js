"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeCommentToggle = void 0;
const connectionConfig_1 = require("../../connectionConfig");
const likeCommentToggle = (req, res) => {
    const commentId = req.params.commentId;
    connectionConfig_1.pool.query(`SELECT likes FROM comments
                WHERE id = ($1)`, [commentId]).then((data) => {
        const likes = data.rows[0].likes;
        if (likes.includes(req.session.userId)) {
            const filteredArray = likes.filter((like) => like !== req.session.userId);
            connectionConfig_1.pool.query(`UPDATE comments
                            SET likes = ($1)
                            WHERE id = ($2)
                            RETURNING likes`, [filteredArray, commentId]).then((data) => {
                res.status(200).send(data.rows[0].likes);
            });
        }
        else {
            const newArray = [...likes, req.session.userId];
            connectionConfig_1.pool.query(`UPDATE comments
                            SET likes = ($1)
                            WHERE id = ($2)
                            RETURNING likes`, [newArray, commentId]).then((data) => {
                res.status(200).send(data.rows[0].likes);
            });
        }
    });
};
exports.likeCommentToggle = likeCommentToggle;
