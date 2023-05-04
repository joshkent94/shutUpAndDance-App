import type { NextApiRequest, NextApiResponse } from 'next'
import { pool } from '@db/connectionConfig'
import sanitizeHtml from 'sanitize-html'
import sessionOptions from '@utils/helperFunctions/sessionOptions'
import { withIronSessionApiRoute } from 'iron-session/next'

async function comments(req: NextApiRequest, res: NextApiResponse) {
    const { threadId = '' } = req.query
    if (typeof threadId === 'string') {
        if (req.method === 'POST') {
            const cleanComment = sanitizeHtml(req.body.comment)
            pool.query(
                `INSERT INTO comments (thread_id, comment, user_id)
                VALUES ($1, $2, $3)`,
                [threadId, cleanComment, req.session.userId]
            ).then(() => {
                res.status(201).send({ message: 'Comment created' })
            })
        }
        if (req.method === 'GET') {
            const regex = new RegExp(
                /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
            )
            if (regex.test(threadId)) {
                pool.query(
                    `SELECT comments.id, comments.date_time, comments.comment, comments.likes, users.first_name, users.last_name
                FROM comments INNER JOIN users ON (comments.user_id = users.id)
                WHERE comments.thread_id = ($1)`,
                    [threadId]
                ).then((data) => {
                    res.status(200).send(data.rows)
                })
            } else {
                res.status(404).send({ message: 'Thread not found' })
            }
        }
    }
}

export default withIronSessionApiRoute(comments, sessionOptions)
