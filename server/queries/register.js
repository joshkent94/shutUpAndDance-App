const { pool } = require('../connectionConfig');
const bcrypt = require('bcryptjs');
const sanitizeHtml = require('sanitize-html');

const register = (req, res) => {
    const cleanFirstName = sanitizeHtml(req.body.firstName);
    const cleanLastName = sanitizeHtml(req.body.lastName);
    const cleanEmail = sanitizeHtml(req.body.email);
    const cleanPassword = sanitizeHtml(req.body.password);
    pool.query(`SELECT first_name
                FROM users
                WHERE email = $1`,
                [cleanEmail])
        .then(data => {
            if (data.rows.length > 0) {
                res.status(404).send({ message: `Email address already in use.` });
            } else {
                const salt = bcrypt.genSaltSync(10);
                const hashedPassword = bcrypt.hashSync(cleanPassword, salt);
                pool.query(`INSERT INTO users (first_name, last_name, email, salt, password)
                            VALUES ($1, $2, $3, $4, $5)
                            RETURNING $3`,
                    [cleanFirstName, cleanLastName, cleanEmail, salt, hashedPassword])
                    .then(() => {
                        res.status(201).send({ message: `Account created successfully.` });
                    });
            };
        });
};

module.exports = { register };