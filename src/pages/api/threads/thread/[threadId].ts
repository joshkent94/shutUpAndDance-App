import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function getThread(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { threadId } = req.query
    if (typeof threadId === 'string') {
        const regex = new RegExp(
            /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
        )
        if (regex.test(threadId)) {
            const thread = await prisma.threads.findUnique({
                where: {
                    id: threadId,
                },
                include: {
                    users: true,
                },
            })
            if (thread) {
                res.status(200).send(thread)
            } else {
                res.status(404).send({ message: 'Thread not found' })
            }
        } else {
            res.status(404).send({ message: 'Thread not found' })
        }
    }
}
