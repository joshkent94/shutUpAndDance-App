const { pool } = require('../connectionConfig');

const getThread = (req, res) => {
    const threadId = req.params.threadId;
    pool.query(`SELECT threads.title, threads.initial_comment, threads.likes, users.first_name, users.last_name
                FROM threads INNER JOIN users ON (threads.creator_user_id = users.id)
                WHERE threads.id = ($1)`,
        [threadId])
        .then(data => {
            res.status(200).send(data.rows[0]);
        });
};

module.exports = { getThread };