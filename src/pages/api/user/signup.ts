import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import sanitizeHtml from 'sanitize-html'
import sessionOptions from '@utils/helperFunctions/sessionOptions'
import { withIronSessionApiRoute } from 'iron-session/next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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
    const existingUser = await prisma.users.findUnique({
        where: {
            email: cleanEmail,
        },
    })
    if (existingUser) {
        res.status(404).send({ message: `Email address already in use` })
    } else {
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(cleanPassword, salt)
        const newUser = await prisma.users.create({
            data: {
                first_name: cleanFirstName,
                last_name: cleanLastName,
                email: cleanEmail,
                salt: salt,
                password: hashedPassword,
            },
        })
        const newGenres = await prisma.genres.create({
            data: {
                user_id: newUser.id,
                genres: ['chill'],
            },
        })
        const newWidgets = await prisma.widgets.create({
            data: {
                user_id: newUser.id,
                widgets: [
                    { name: 'Most Liked Threads', show: true },
                    { name: 'Suggestions', show: true },
                    { name: 'My Threads', show: true },
                ].map((widget: any) => JSON.stringify(widget)),
            },
        })
        req.session.userId = newUser.id
        await req.session.save()
        res.status(201).send({
            message: `Account created successfully`,
            id: newUser.id,
            genres: newGenres.genres,
            widgets: newWidgets.widgets.map((widget: any) =>
                JSON.parse(widget)
            ),
        })
    }
}

export default withIronSessionApiRoute(signup, sessionOptions)
