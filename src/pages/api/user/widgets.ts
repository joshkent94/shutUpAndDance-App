import type { NextApiRequest, NextApiResponse } from 'next'
import { pool } from '@db/connectionConfig'
import { withIronSessionApiRoute } from 'iron-session/next'
import sessionOptions from '@utils/helperFunctions/sessionOptions'

async function widgets(req: NextApiRequest, res: NextApiResponse) {
    pool.query(
        `SELECT user_id
                    FROM widgets
                    WHERE user_id = $1`,
        [req.session.userId]
    ).then((data) => {
        if (data.rows.length === 0) {
            pool.query(
                `INSERT INTO widgets
                                VALUES ($1, $2)`,
                [req.session.userId, req.body]
            ).then(() => {
                res.status(201).send({ message: 'Widgets updated' })
            })
        } else {
            pool.query(
                `UPDATE widgets
                                SET widgets = $1
                                WHERE user_id = $2`,
                [req.body, req.session.userId]
            ).then(() => {
                res.status(201).send({ message: 'Widgets updated' })
            })
        }
    })
}

export default withIronSessionApiRoute(widgets, sessionOptions)
