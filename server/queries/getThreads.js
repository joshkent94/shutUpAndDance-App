const { pool } = require('../connectionConfig');
const sanitizeHtml = require('sanitize-html');

const getThreads = (req, res) => {
    const cleanSearch = sanitizeHtml(req.params.searchTerm).toLowerCase();
    pool.query(`SELECT threads.id, threads.title, threads.initial_comment, threads.likes, users.first_name, users.last_name
                FROM threads INNER JOIN users ON (threads.creator_user_id = users.id)
                WHERE POSITION(($1) IN lower(title)) <> 0`,
        [cleanSearch])
        .then(data => {
            res.status(200).send(data.rows);
        });
};

module.exports = { getThreads };