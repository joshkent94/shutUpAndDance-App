import { pool } from '../../connectionConfig'
import bcrypt from 'bcryptjs'
import sanitizeHtml from 'sanitize-html'

const signUp = (req, res) => {
    const cleanFirstName = sanitizeHtml(req.body.firstName)
    const cleanLastName = sanitizeHtml(req.body.lastName)
    const cleanEmail = sanitizeHtml(req.body.email)
    const cleanPassword = sanitizeHtml(req.body.password)
    const session = req.session
    pool.query(
        `SELECT first_name
                FROM users
                WHERE email = $1`,
        [cleanEmail]
    ).then((data) => {
        if (data.rows.length > 0) {
            res.status(404).send({ message: `Email address already in use` })
        } else {
            const salt = bcrypt.genSaltSync(10)
            const hashedPassword = bcrypt.hashSync(cleanPassword, salt)
            pool.query(
                `INSERT INTO users (first_name, last_name, email, salt, password)
                            VALUES ($1, $2, $3, $4, $5)
                            RETURNING id`,
                [
                    cleanFirstName,
                    cleanLastName,
                    cleanEmail,
                    salt,
                    hashedPassword,
                ]
            ).then((data) => {
                pool.query(
                    `INSERT INTO genres
                                    VALUES ($1, $2)
                                    RETURNING user_id`,
                    [data.rows[0].id, []]
                ).then((data) => {
                    pool.query(
                        `INSERT INTO widgets
                                            VALUES ($1, $2)
                                            RETURNING user_id`,
                        [data.rows[0].user_id, []]
                    ).then((data) => {
                        session.userId = data.rows[0].user_id
                        res.status(201).send({
                            message: `Account created successfully`,
                            id: data.rows[0].user_id,
                        })
                    })
                })
            })
        }
    })
}

export { signUp }
