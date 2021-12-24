const { pool } = require('../../connectionConfig');

const getComments = (req, res) => {
    const threadId = req.params.threadId;
    pool.query(`SELECT comments.id, comments.date_time, comments.comment, comments.likes, users.first_name, users.last_name
                FROM comments INNER JOIN users ON (comments.user_id = users.id)
                WHERE comments.thread_id = ($1)`,
        [threadId])
        .then(data => {
            res.status(200).send(data.rows);
        });
};

module.exports = { getComments };