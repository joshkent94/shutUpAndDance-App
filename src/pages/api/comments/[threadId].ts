import type { NextApiRequest, NextApiResponse } from 'next'
import sanitizeHtml from 'sanitize-html'
import sessionOptions from '@utils/helperFunctions/sessionOptions'
import { withIronSessionApiRoute } from 'iron-session/next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function comments(req: NextApiRequest, res: NextApiResponse) {
    const { threadId = '' } = req.query
    if (typeof threadId === 'string') {
        if (req.method === 'POST') {
            const cleanComment = sanitizeHtml(req.body.comment)
            await prisma.comments.create({
                data: {
                    thread_id: threadId,
                    comment: cleanComment,
                    user_id: req.session.userId,
                },
            })
            res.status(201).send({ message: 'Comment created' })
        }
        if (req.method === 'GET') {
            const regex = new RegExp(
                /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
            )
            if (regex.test(threadId)) {
                const comments = await prisma.comments.findMany({
                    where: {
                        thread_id: threadId,
                    },
                    include: {
                        users: true,
                    },
                })
                res.status(200).send(comments)
            } else {
                res.status(404).send({ message: 'Thread not found' })
            }
        }
    }
}

export default withIronSessionApiRoute(comments, sessionOptions)
