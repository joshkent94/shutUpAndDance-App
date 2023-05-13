import type { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import sessionOptions from '@utils/helperFunctions/sessionOptions'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function userThreads(req: NextApiRequest, res: NextApiResponse) {
    const threads = await prisma.threads.findMany({
        where: {
            creator_user_id: req.session.userId,
        },
        orderBy: {
            likes: 'desc',
        },
        select: {
            id: true,
            date_time: true,
            title: true,
            initial_comment: true,
            likes: true,
            users: {
                select: {
                    first_name: true,
                    last_name: true,
                },
            },
        },
    })
    const threadsWithNumberOfComments = await Promise.all(
        threads.map(async (thread) => {
            const numberOfComments = await prisma.comments.count({
                where: {
                    thread_id: thread.id,
                },
            })
            return {
                ...thread,
                number_of_comments: numberOfComments,
            }
        })
    )
    res.status(200).send(threadsWithNumberOfComments)
}

export default withIronSessionApiRoute(userThreads, sessionOptions)
