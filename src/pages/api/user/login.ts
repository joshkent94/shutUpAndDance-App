import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import sanitizeHtml from 'sanitize-html'
import { withIronSessionApiRoute } from 'iron-session/next'
import sessionOptions from '@utils/helperFunctions/sessionOptions'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type Data = {
    message?: string
    id?: string
    firstName?: string
    lastName?: string
    email?: string | null
    genres?: any[]
    widgets?: any[]
}

async function login(req: NextApiRequest, res: NextApiResponse<Data>) {
    const cleanEmail = sanitizeHtml(req.body.email)
    const cleanPassword = sanitizeHtml(req.body.password)
    let hashedPassword
    const user = await prisma.users.findUnique({
        where: {
            email: cleanEmail,
        },
        include: {
            genres: {
                select: {
                    genres: true,
                },
            },
            widgets: {
                select: {
                    widgets: true,
                },
            },
        },
    })
    if (!user) {
        res.status(401).send({ message: 'Email address is incorrect' })
    } else {
        hashedPassword = user.password
        bcrypt.compare(cleanPassword, hashedPassword, (err, match) => {
            if (err) {
                throw err
            }
            if (!match) {
                res.status(401).send({
                    message: 'Password is incorrect',
                })
            }
        })
        req.session.userId = user.id
        await req.session.save()
        console.log(user)
        res.status(200).send({
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            genres: user.genres[0].genres,
            widgets: user.widgets[0].widgets.map((widget: any) =>
                JSON.parse(widget)
            ),
        })
    }
}

export default withIronSessionApiRoute(login, sessionOptions)
