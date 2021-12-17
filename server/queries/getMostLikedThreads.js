const { pool } = require('../connectionConfig');

const getMostLikedThreads = (req, res) => {
    pool.query(`SELECT threads.id, threads.date_time, threads.title, threads.initial_comment, threads.likes, users.first_name, users.last_name
                FROM threads INNER JOIN users ON (threads.creator_user_id = users.id)
                ORDER BY array_length(likes, 1) DESC NULLS LAST
                LIMIT 10`)
        .then(data => {
            res.status(200).send(data.rows);
        });
};

module.exports = { getMostLikedThreads };