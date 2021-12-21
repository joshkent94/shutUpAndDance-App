const { pool } = require('../connectionConfig');

const getThreadsByUserId = (req, res) => {
    const userId = req.session.userId;
    pool.query(`SELECT threads.id, threads.date_time, threads.title, threads.initial_comment, threads.likes, users.first_name, users.last_name
                FROM threads INNER JOIN users ON (threads.creator_user_id = users.id)
                WHERE threads.creator_user_id = ($1)
                ORDER BY array_length(likes, 1) DESC NULLS LAST`,
        [userId])
        .then(data => {
            res.status(200).send(data.rows);
        });
};

module.exports = { getThreadsByUserId };