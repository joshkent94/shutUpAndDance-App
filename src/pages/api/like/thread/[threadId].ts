import type { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import sessionOptions from '@utils/helperFunctions/sessionOptions'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function likeThread(req: NextApiRequest, res: NextApiResponse) {
    const { threadId } = req.query
    const thread = await prisma.threads.findUnique({
        where: {
            id: threadId as string,
        },
    })
    const likes = thread?.likes || []
    if (likes.includes(req.session.userId)) {
        const filteredArray = likes.filter(
            (like) => like !== req.session.userId
        )
        const updatedThread = await prisma.threads.update({
            where: {
                id: threadId as string,
            },
            data: {
                likes: filteredArray,
            },
        })
        res.status(200).send(updatedThread.likes)
    } else {
        const newArray = [...likes, req.session.userId]
        const updatedThread = await prisma.threads.update({
            where: {
                id: threadId as string,
            },
            data: {
                likes: newArray,
            },
        })
        res.status(200).send(updatedThread.likes)
    }
}

export default withIronSessionApiRoute(likeThread, sessionOptions)
