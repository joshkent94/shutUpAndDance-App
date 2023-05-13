import type { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import sessionOptions from '@utils/helperFunctions/sessionOptions'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function widgets(req: NextApiRequest, res: NextApiResponse) {
    await prisma.widgets.upsert({
        where: {
            user_id: req.session.userId,
        },
        update: {
            widgets: req.body.map((widget: any) => JSON.stringify(widget)),
        },
        create: {
            user_id: req.session.userId,
            widgets: req.body.map((widget: any) => JSON.stringify(widget)),
        },
    })
    res.status(201).send({ message: 'Widgets updated' })
}

export default withIronSessionApiRoute(widgets, sessionOptions)
