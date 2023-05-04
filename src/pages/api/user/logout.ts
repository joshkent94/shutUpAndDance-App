import type { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import sessionOptions from '@utils/helperFunctions/sessionOptions'

function logout(req: NextApiRequest, res: NextApiResponse) {
    req.session.destroy()
    res.status(200).send({ message: 'Logout successful' })
}

export default withIronSessionApiRoute(logout, sessionOptions)
