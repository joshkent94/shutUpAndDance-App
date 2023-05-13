import type { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import sessionOptions from '@utils/helperFunctions/sessionOptions'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function likeComment(req: NextApiRequest, res: NextApiResponse) {
    const { commentId } = req.query
    const comment = await prisma.comments.findUnique({
        where: {
            id: commentId as string,
        },
    })
    const likes = comment?.likes || []
    if (likes.includes(req.session.userId)) {
        const filteredArray = likes.filter(
            (like) => like !== req.session.userId
        )
        const updatedComment = await prisma.comments.update({
            where: {
                id: commentId as string,
            },
            data: {
                likes: filteredArray,
            },
        })
        res.status(200).send(updatedComment.likes)
    } else {
        const newArray = [...likes, req.session.userId]
        const updatedComment = await prisma.comments.update({
            where: {
                id: commentId as string,
            },
            data: {
                likes: newArray,
            },
        })
        res.status(200).send(updatedComment.likes)
    }
}

export default withIronSessionApiRoute(likeComment, sessionOptions)
