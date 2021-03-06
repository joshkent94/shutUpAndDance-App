const { pool } = require("../../connectionConfig");
const bcrypt = require('bcryptjs');
const sanitizeHtml = require('sanitize-html');

const updateUserDetails = (req, res) => {
    const cleanFirstName = sanitizeHtml(req.body.firstName);
    const cleanLastName = sanitizeHtml(req.body.lastName);
    const cleanEmail = sanitizeHtml(req.body.email);
    const cleanPassword = sanitizeHtml(req.body.password);
    if (cleanPassword !== '') {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(cleanPassword, salt);
        pool.query(`UPDATE users
                SET first_name = $1, last_name = $2, email = $3, salt = $4, password = $5
                WHERE id = $6`,
            [cleanFirstName, cleanLastName, cleanEmail, salt, hashedPassword, req.session.userId])
            .then(() => {
                res.status(200).send();
            });
    } else {
        pool.query(`UPDATE users
                SET first_name = $1, last_name = $2, email = $3
                WHERE id = $4`,
            [cleanFirstName, cleanLastName, cleanEmail, req.session.userId])
            .then(() => {
                res.status(200).send();
            });
    };
};

module.exports = {updateUserDetails};