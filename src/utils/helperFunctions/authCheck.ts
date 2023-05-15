export default async function authCheck({ req, resolvedUrl }) {
    const user = req.session.userId
    const isPreLoginRoute =
        resolvedUrl === '/login' || resolvedUrl === '/signup'

    if (!user && !isPreLoginRoute) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }

    if (user && isPreLoginRoute) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
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
