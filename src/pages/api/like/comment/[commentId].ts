import type { NextApiRequest, NextApiResponse } from 'next'
import { pool } from '@db/connectionConfig'
import { withIronSessionApiRoute } from 'iron-session/next'
import sessionOptions from '@utils/helperFunctions/sessionOptions'

async function likeComment(req: NextApiRequest, res: NextApiResponse) {
    const { commentId } = req.query
    pool.query(
        `SELECT likes FROM comments
                WHERE id = ($1)`,
        [commentId]
    ).then((data) => {
        const likes = data.rows[0].likes
        if (likes.includes(req.session.userId)) {
            const filteredArray = likes.filter(
                (like) => like !== req.session.userId
            )
            pool.query(
                `UPDATE comments
                            SET likes = ($1)
                            WHERE id = ($2)
                            RETURNING likes`,
                [filteredArray, commentId]
            ).then((data) => {
                res.status(200).send(data.rows[0].likes)
            })
        } else {
            const newArray = [...likes, req.session.userId]
            pool.query(
                `UPDATE comments
                            SET likes = ($1)
                            WHERE id = ($2)
                            RETURNING likes`,
                [newArray, commentId]
            ).then((data) => {
                res.status(200).send(data.rows[0].likes)
            })
        }
    })
}

export default withIronSessionApiRoute(likeComment, sessionOptions)
