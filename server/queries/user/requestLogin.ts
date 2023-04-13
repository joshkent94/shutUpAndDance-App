import { pool } from '../../connectionConfig';
import bcrypt from 'bcryptjs';
import sanitizeHtml from 'sanitize-html';

const requestLogin = (req, res) => {
    const cleanEmail = sanitizeHtml(req.body.email);
    const cleanPassword = sanitizeHtml(req.body.password);
    let salt;
    let hashedPassword;
    let session = req.session;
    pool.query(`SELECT id, salt, password
                FROM users
                WHERE email = $1`,
        [cleanEmail])
        .then(data => {
            if (data.rows.length === 0) {
                res.status(401).send({ message: 'Email address in incorrect' });
            } else {
                salt = data.rows[0].salt;
                hashedPassword = data.rows[0].password;
                bcrypt.compare(cleanPassword, hashedPassword, (err, match) => {
                    if (err) {
                        throw err;
                    };
                    if (!match) {
                        res.status(401).send({ message: 'Password is incorrect' });
                    } else {
                        pool.query(`SELECT *
                            FROM users
                            INNER JOIN genres
                            ON (users.id = genres.user_id)
                            INNER JOIN widgets
                            ON (users.id = widgets.user_id)
                            WHERE users.id = ($1)`,
                            [data.rows[0].id])
                            .then(data => {
                                session.userId = data.rows[0].id;
                                res.status(200).send({
                                    id: data.rows[0].id,
                                    firstName: data.rows[0].first_name,
                                    lastName: data.rows[0].last_name,
                                    email: data.rows[0].email,
                                    genres: data.rows[0].genres,
                                    widgets: data.rows[0].widgets
                                });
                            });
                    };
                });
            };
        });
};

export { requestLogin };