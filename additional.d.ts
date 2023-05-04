// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as IronSession from 'iron-session'

declare module 'iron-session' {
    interface IronSessionData {
        userId: string
    }
}
