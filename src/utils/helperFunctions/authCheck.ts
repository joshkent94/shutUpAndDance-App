export default function authCheck({ req }) {
    const user = req.session.userId

    if (user === undefined) {
        return {
            props: {
                user: {
                    isLoggedIn: false,
                },
            },
        }
    }

    return {
        props: {
            user: {
                isLoggedIn: true,
            },
        },
    }
}
