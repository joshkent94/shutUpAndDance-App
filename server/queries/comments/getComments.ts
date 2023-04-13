const { pool } = require('../../connectionConfig');

const getComments = (req, res) => {
    const threadId = req.params.threadId;
    const regex = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    if (regex.test(threadId)) {
        pool.query(`SELECT comments.id, comments.date_time, comments.comment, comments.likes, users.first_name, users.last_name
                FROM comments INNER JOIN users ON (comments.user_id = users.id)
                WHERE comments.thread_id = ($1)`,
            [threadId])
            .then(data => {
                res.status(200).send(data.rows);
            });
    } else {
        res.status(404).send();
    };
};

module.exports = { getComments };