import type { NextApiRequest, NextApiResponse } from 'next'
import { pool } from '@db/connectionConfig'
import bcrypt from 'bcryptjs'
import sanitizeHtml from 'sanitize-html'
import { withIronSessionApiRoute } from 'iron-session/next'
import sessionOptions from '@utils/helperFunctions/sessionOptions'

async function details(req: NextApiRequest, res: NextApiResponse) {
    const cleanFirstName = sanitizeHtml(req.body.firstName)
    const cleanLastName = sanitizeHtml(req.body.lastName)
    const cleanEmail = sanitizeHtml(req.body.email)
    const cleanPassword = sanitizeHtml(req.body.password)
    if (cleanPassword !== '') {
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(cleanPassword, salt)
        pool.query(
            `UPDATE users
                SET first_name = $1, last_name = $2, email = $3, salt = $4, password = $5
                WHERE id = $6`,
            [
                cleanFirstName,
                cleanLastName,
                cleanEmail,
                salt,
                hashedPassword,
                req.session.userId,
            ]
        ).then(() => {
            res.status(200).send({ message: 'Details updated' })
        })
    } else {
        pool.query(
            `UPDATE users
                SET first_name = $1, last_name = $2, email = $3
                WHERE id = $4`,
            [cleanFirstName, cleanLastName, cleanEmail, req.session.userId]
        ).then(() => {
            res.status(200).send({ message: 'Details updated' })
        })
    }
}

export default withIronSessionApiRoute(details, sessionOptions)
