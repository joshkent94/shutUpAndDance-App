import { useLayoutEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { requestLogin } from '@utils/state/userSlice'
import { spotifyRedirect } from '@utils/helperFunctions/spotifyRedirect'
import { useAppDispatch } from '@utils/state/store'
import Logo from '@assets/inverted-logo.png'
import { withIronSessionSsr } from 'iron-session/next'
import authCheck from '@utils/helperFunctions/authCheck'
import sessionOptions from '@utils/helperFunctions/sessionOptions'

export default function LoginPage({ user }) {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const state = router.query.state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useLayoutEffect(() => {
        if (user.isLoggedIn && document.cookie.includes('shut-up-and-dance')) {
            router.push('/dashboard')
        }
    })

    const updateEmail = (e) => {
        e.preventDefault()
        setEmail(e.target.value)
    }

    const updatePassword = (e) => {
        e.preventDefault()
        setPassword(e.target.value)
    }

    // log user into app and authenticate with Spotify
    const handleLoginSubmit = (e) => {
        e.preventDefault()
        dispatch(
            requestLogin({
                email: email,
                password: password,
            })
        )
            .unwrap()
            .then((data) => {
                if (data) {
                    spotifyRedirect(state)
                }
            })
    }

    return (
        <div id="login">
            <div id="pre-login-branding">
                <Image src={Logo} alt="logo" priority />
                <div id="pre-login-wording">
                    <h1>Shut Up And Dance</h1>
                    <h4>For the love of music</h4>
                </div>
            </div>
            <div id="pre-login-main">
                <h2>Log In</h2>
                <form id="login-form" onSubmit={handleLoginSubmit}>
                    <label className="form-element">
                        Email
                        <input
                            name="email"
                            type="email"
                            placeholder="josh@example.com"
                            className="form-control login-element"
                            onChange={updateEmail}
                            required
                        />
                    </label>
                    <label className="form-element">
                        Password
                        <input
                            name="password"
                            type="password"
                            className="form-control login-element"
                            onChange={updatePassword}
                            required
                        />
                    </label>
                    <button
                        id="login-button"
                        type="submit"
                        className="coolBeans"
                    >
                        Log In
                    </button>
                </form>
                <p className="pre-login-prompt">
                    {"Don't have an account? "}
                    <Link href="/signup">Sign up</Link>
                </p>
            </div>
        </div>
    )
}

export const getServerSideProps = withIronSessionSsr(authCheck, sessionOptions)
