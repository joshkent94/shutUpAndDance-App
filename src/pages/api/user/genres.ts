import type { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import sessionOptions from '@utils/helperFunctions/sessionOptions'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function genres(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const genres = await prisma.genres.findUnique({
            where: {
                user_id: req.session.userId,
            },
        })
        if (!genres) {
            res.status(200).send({ message: 'No genres found' })
        } else {
            res.status(200).send(genres.genres)
        }
    }
    if (req.method === 'PUT') {
        await prisma.genres.upsert({
            where: {
                user_id: req.session.userId,
            },
            update: {
                genres: req.body,
            },
            create: {
                user_id: req.session.userId,
                genres: req.body,
            },
        })
        res.status(201).send({ message: 'Genres updated' })
    }
}

export default withIronSessionApiRoute(genres, sessionOptions)
