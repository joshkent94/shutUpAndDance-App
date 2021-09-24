const { pool } = require('../connectionConfig');

const getUserDetails = (req, res) => {
    pool.query(`SELECT first_name, last_name, email
                FROM users
                WHERE id = $1`,
        [req.session.userId])
        .then(data => {
            if (data.rows.length === 0) {
                res.status(401).send();
            } else {
                res.status(200).send({
                    firstName: data.rows[0].first_name,
                    lastName: data.rows[0].last_name,
                    email: data.rows[0].email
                });
            };
        });
};

module.exports = { getUserDetails };