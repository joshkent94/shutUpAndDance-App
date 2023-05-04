import type { NextApiRequest, NextApiResponse } from 'next'
import { pool } from '@db/connectionConfig'
import sanitizeHtml from 'sanitize-html'
import { withIronSessionApiRoute } from 'iron-session/next'
import sessionOptions from '@utils/helperFunctions/sessionOptions'

async function postThread(req: NextApiRequest, res: NextApiResponse) {
    const cleanTitle = sanitizeHtml(req.body.title)
    const cleanComment = sanitizeHtml(req.body.comment)
    pool.query(
        `INSERT INTO threads (creator_user_id, title, initial_comment)
                VALUES ($1, $2, $3)
                RETURNING *`,
        [req.session.userId, cleanTitle, cleanComment]
    ).then((data) => {
        pool.query(
            `SELECT threads.id, threads.date_time, threads.title, threads.initial_comment, threads.likes, users.first_name, users.last_name
                FROM threads INNER JOIN users ON (threads.creator_user_id = users.id)
                WHERE threads.id = ($1)`,
            [data.rows[0].id]
        ).then((data) => {
            res.status(201).send(data.rows[0])
        })
    })
}

export default withIronSessionApiRoute(postThread, sessionOptions)
