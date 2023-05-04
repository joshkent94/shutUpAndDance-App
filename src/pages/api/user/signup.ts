import type { NextApiRequest, NextApiResponse } from 'next'
import { pool } from '@db/connectionConfig'
import bcrypt from 'bcryptjs'
import sanitizeHtml from 'sanitize-html'
import sessionOptions from '@utils/helperFunctions/sessionOptions'
import { withIronSessionApiRoute } from 'iron-session/next'

interface Widget {
    name: string
    show: boolean
}

type Data = {
    message: string
    id?: string
    genres?: string[]
    widgets?: Widget[]
}

async function signup(req: NextApiRequest, res: NextApiResponse<Data>) {
    const cleanFirstName = sanitizeHtml(req.body.firstName)
    const cleanLastName = sanitizeHtml(req.body.lastName)
    const cleanEmail = sanitizeHtml(req.body.email)
    const cleanPassword = sanitizeHtml(req.body.password)
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
                    [data.rows[0].id, ['chill']]
                ).then((data) => {
                    pool.query(
                        `INSERT INTO widgets
                                            VALUES ($1, $2)
                                            RETURNING user_id, widgets`,
                        [
                            data.rows[0].user_id,
                            [
                                { name: 'Most Liked Threads', show: true },
                                { name: 'Suggestions', show: true },
                                { name: 'My Threads', show: true },
                            ],
                        ]
                    ).then(async (data) => {
                        req.session.userId = data.rows[0].user_id
                        await req.session.save()
                        res.status(201).send({
                            message: `Account created successfully`,
                            id: data.rows[0].user_id,
                            genres: ['chill'],
                            widgets: data.rows[0].widgets,
                        })
                    })
                })
            })
        }
    })
}

export default withIronSessionApiRoute(signup, sessionOptions)
