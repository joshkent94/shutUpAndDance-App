const { pool } = require('../connectionConfig');
const bcrypt = require('bcryptjs');
const sanitizeHtml = require('sanitize-html');

const requestLogin = (req, res) => {
    const cleanEmail = sanitizeHtml(req.body.email);
    const cleanPassword = sanitizeHtml(req.body.password);
    let salt;
    let hashedPassword;
    let session = req.session;
    if (session.userId) {
        res.status(200).send();
    } else {
        pool.query(`SELECT id, salt, password
                    FROM users
                    WHERE email = $1`,
            [cleanEmail])
            .then(data => {
                if (data.rows.length === 0) {
                    res.status(401).send({ message: 'Email address in incorrect.' });
                } else {
                    salt = data.rows[0].salt;
                    hashedPassword = data.rows[0].password;
                    bcrypt.compare(cleanPassword, hashedPassword, (err, match) => {
                        if (err) {
                            throw err;
                        };
                        if (!match) {
                            res.status(401).send({ message: 'Password is incorrect.' });
                        } else {
                            session.userId = data.rows[0].id;
                            res.status(200).send();
                        };
                    });
                };
            });
    };
};

module.exports = { requestLogin };