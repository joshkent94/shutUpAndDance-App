const { pool } = require('../../connectionConfig');

const getThreadsByUserId = (req, res) => {
    const userId = req.session.userId;
    pool.query(`SELECT threads.id, threads.date_time, threads.title, threads.initial_comment, threads.likes, t1.first_name, t1.last_name, COALESCE(t2.number_of_comments, 0) AS number_of_comments
                FROM threads
                LEFT JOIN (
                    SELECT id, first_name, last_name
                    FROM users
                ) t1
                ON (threads.creator_user_id = t1.id)
                LEFT JOIN (
                    SELECT thread_id, COUNT(comment) AS number_of_comments
                    FROM comments
                    GROUP BY thread_id
                ) t2
                ON (threads.id = t2.thread_id)
                WHERE threads.creator_user_id = ($1)
                ORDER BY array_length(threads.likes, 1) DESC NULLS LAST`,
        [userId])
        .then(data => {
            res.status(200).send(data.rows);
        });
};

module.exports = { getThreadsByUserId };