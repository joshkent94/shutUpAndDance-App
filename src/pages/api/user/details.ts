import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import sanitizeHtml from 'sanitize-html'
import { withIronSessionApiRoute } from 'iron-session/next'
import sessionOptions from '@utils/helperFunctions/sessionOptions'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function details(req: NextApiRequest, res: NextApiResponse) {
    const cleanFirstName = sanitizeHtml(req.body.firstName)
    const cleanLastName = sanitizeHtml(req.body.lastName)
    const cleanEmail = sanitizeHtml(req.body.email)
    const cleanPassword = sanitizeHtml(req.body.password)
    if (cleanPassword !== '') {
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(cleanPassword, salt)
        await prisma.users.update({
            where: {
                id: req.session.userId,
            },
            data: {
                first_name: cleanFirstName,
                last_name: cleanLastName,
                email: cleanEmail,
                salt,
                password: hashedPassword,
            },
        })
        res.status(200).send({ message: 'Details updated' })
    } else {
        await prisma.users.update({
            where: {
                id: req.session.userId,
            },
            data: {
                first_name: cleanFirstName,
                last_name: cleanLastName,
                email: cleanEmail,
            },
        })
        res.status(200).send({ message: 'Details updated' })
    }
}

export default withIronSessionApiRoute(details, sessionOptions)
