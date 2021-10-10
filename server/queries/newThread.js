const { pool } = require('../connectionConfig');
const sanitizeHtml = require('sanitize-html');

const newThread = (req, res) => {
    const cleanTitle = sanitizeHtml(req.body.title);
    const cleanComment = sanitizeHtml(req.body.comment);
    pool.query(`INSERT INTO threads (creator_user_id, title, initial_comment, likes)
                VALUES ($1, $2, $3, 0)
                RETURNING *`,
        [req.session.userId, cleanTitle, cleanComment])
        .then(() => {
            res.status(201).send();
        });
};

module.exports = { newThread };