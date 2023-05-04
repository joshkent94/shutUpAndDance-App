import type { NextApiRequest, NextApiResponse } from 'next'
import { pool } from '@db/connectionConfig'
import bcrypt from 'bcryptjs'
import sanitizeHtml from 'sanitize-html'
import { withIronSessionApiRoute } from 'iron-session/next'
import sessionOptions from '@utils/helperFunctions/sessionOptions'

interface Widget {
    name: string
    show: boolean
}

type Data = {
    message?: string
    id?: string
    firstName?: string
    lastName?: string
    email?: string
    genres?: string[]
    widgets?: Widget[]
}

async function login(req: NextApiRequest, res: NextApiResponse<Data>) {
    const cleanEmail = sanitizeHtml(req.body.email)
    const cleanPassword = sanitizeHtml(req.body.password)
    let hashedPassword
    pool.query(
        `SELECT id, salt, password
                FROM users
                WHERE email = $1`,
        [cleanEmail]
    ).then((data) => {
        if (data.rows.length === 0) {
            res.status(401).send({ message: 'Email address in incorrect' })
        } else {
            hashedPassword = data.rows[0].password
            bcrypt.compare(cleanPassword, hashedPassword, (err, match) => {
                if (err) {
                    throw err
                }
                if (!match) {
                    res.status(401).send({
                        message: 'Password is incorrect',
                    })
                } else {
                    pool.query(
                        `SELECT *
                            FROM users
                            INNER JOIN genres
                            ON (users.id = genres.user_id)
                            INNER JOIN widgets
                            ON (users.id = widgets.user_id)
                            WHERE users.id = ($1)`,
                        [data.rows[0].id]
                    ).then(async (data) => {
                        req.session.userId = data.rows[0].id
                        await req.session.save()
                        res.status(200).send({
                            id: data.rows[0].id,
                            firstName: data.rows[0].first_name,
                            lastName: data.rows[0].last_name,
                            email: data.rows[0].email,
                            genres: data.rows[0].genres,
                            widgets: data.rows[0].widgets,
                        })
                    })
                }
            })
        }
    })
}

export default withIronSessionApiRoute(login, sessionOptions)
