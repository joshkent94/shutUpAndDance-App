import type { NextApiRequest, NextApiResponse } from 'next'
import { pool } from '@db/connectionConfig'
import { withIronSessionApiRoute } from 'iron-session/next'
import sessionOptions from '@utils/helperFunctions/sessionOptions'

async function genres(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        pool.query(
            `SELECT genres
                FROM genres
                WHERE user_id = $1`,
            [req.session.userId]
        ).then((data) => {
            if (data.rows.length === 0) {
                res.status(200).send({ message: 'No genres found' })
            } else {
                res.status(200).send(data.rows[0].genres)
            }
        })
    }
    if (req.method === 'PUT') {
        pool.query(
            `SELECT user_id
                    FROM genres
                    WHERE user_id = $1`,
            [req.session.userId]
        ).then((data) => {
            if (data.rows.length === 0) {
                pool.query(
                    `INSERT INTO genres
                                VALUES ($1, $2)`,
                    [req.session.userId, req.body]
                ).then(() => {
                    res.status(201).send([{ message: 'Genres updated' }])
                })
            } else {
                pool.query(
                    `UPDATE genres
                                SET genres = $1
                                WHERE user_id = $2`,
                    [req.body, req.session.userId]
                ).then(() => {
                    res.status(201).send({ message: 'Genres updated' })
                })
            }
        })
    }
}

export default withIronSessionApiRoute(genres, sessionOptions)
