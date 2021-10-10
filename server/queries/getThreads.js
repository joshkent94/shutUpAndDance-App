const { pool } = require('../connectionConfig');
const sanitizeHtml = require('sanitize-html');

const getThreads = (req, res) => {
    const cleanSearch = sanitizeHtml(req.params.searchTerm).toLowerCase();
    pool.query(`SELECT *
                FROM threads
                WHERE POSITION(($1) IN lower(title)) <> 0`,
        [cleanSearch])
        .then(data => {
            res.status(200).send(data.rows);
        });
};

module.exports = { getThreads };