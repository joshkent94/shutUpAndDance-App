import type { NextApiRequest, NextApiResponse } from 'next'
import sanitizeHtml from 'sanitize-html'
import { withIronSessionApiRoute } from 'iron-session/next'
import sessionOptions from '@utils/helperFunctions/sessionOptions'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function postThread(req: NextApiRequest, res: NextApiResponse) {
    const cleanTitle = sanitizeHtml(req.body.title)
    const cleanComment = sanitizeHtml(req.body.comment)
    const createdThread = await prisma.threads.create({
        data: {
            creator_user_id: req.session.userId,
            title: cleanTitle,
            initial_comment: cleanComment,
        },
    })
    const threadDetails = await prisma.threads.findUnique({
        where: {
            id: createdThread.id,
        },
        include: {
            users: true,
        },
    })
    res.status(201).send(threadDetails)
}

export default withIronSessionApiRoute(postThread, sessionOptions)
