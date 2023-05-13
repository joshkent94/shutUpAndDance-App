import type { NextApiRequest, NextApiResponse } from 'next'
import sanitizeHtml from 'sanitize-html'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function getThreads(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const cleanSearch = sanitizeHtml(req.query.searchTerm).toLowerCase()
    const threads = await prisma.threads.findMany({
        take: 10,
        where: {
            title: {
                contains: cleanSearch,
                mode: 'insensitive',
            },
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
