import { useLayoutEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { submitSignUp } from '@utils/state/userSlice'
import { passwordCheck } from '@utils/helperFunctions/passwordCheck'
import { showMessage } from '@utils/helperFunctions/showMessage'
import { spotifyRedirect } from '@utils/helperFunctions/spotifyRedirect'
import { useAppDispatch } from '@utils/state/store'
import Logo from '@assets/inverted-logo.png'
import sessionOptions from '@utils/helperFunctions/sessionOptions'
import authCheck from '@utils/helperFunctions/authCheck'
import { withIronSessionSsr } from 'iron-session/next'
import { useRouter } from 'next/router'

export default function SignUpPage({ user }) {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [validatedPassword, setValidatedPassword] = useState(null)

    useLayoutEffect(() => {
        if (user.isLoggedIn) router.replace('/dashboard')
    })

    const updateFirstName = (e) => {
        e.preventDefault()
        setFirstName(e.target.value)
    }

    const updateLastName = (e) => {
        e.preventDefault()
        setLastName(e.target.value)
    }

    const updateEmail = (e) => {
        e.preventDefault()
        setEmail(e.target.value)
    }

    const updatePassword = (e) => {
        e.preventDefault()
        setPassword(e.target.value)
    }

    const updateValidatedPassword = (e) => {
        e.preventDefault()
        setValidatedPassword(e.target.value)
    }

    // sign up and redirect to authenticate with Spotify if successful
    const handleSignUpRequest = async (e) => {
        e.preventDefault()
        if (password === validatedPassword) {
            if (passwordCheck(password)) {
                const signedUp = await dispatch(
                    submitSignUp({
                        firstName,
                        lastName,
                        email,
                        password,
                    })
                ).unwrap()
                if (signedUp) {
                    spotifyRedirect()
                }
            } else {
                showMessage('Password must meet criteria')
            }
        } else {
            showMessage(`Passwords don't match`)
        }
    }

    return (
        <div id="sign-up">
            <div id="pre-login-branding">
                <Image src={Logo} alt="logo" priority />
                <div id="pre-login-wording">
                    <h1>Shut Up And Dance</h1>
                    <h4>For the love of music</h4>
                </div>
            </div>
            <div id="pre-login-main">
                <h2>Sign Up</h2>
                <form id="sign-up-form" onSubmit={handleSignUpRequest}>
                    <label className="form-element">
                        First Name
                        <input
                            name="first name"
                            type="text"
                            placeholder="Josh"
                            className="form-control sign-up-element"
                            onChange={updateFirstName}
                            required
                        />
                    </label>
                    <label className="form-element">
                        Last Name
                        <input
                            name="last name"
                            type="text"
                            placeholder="Kent"
                            className="form-control sign-up-element"
                            onChange={updateLastName}
                            required
                        />
                    </label>
                    <label className="form-element">
                        Email
                        <input
                            name="email"
                            type="email"
                            placeholder="josh@example.com"
                            className="form-control sign-up-element"
                            onChange={updateEmail}
                            required
                        />
                    </label>
                    <label className="form-element">
                        Password
                        <input
                            name="password"
                            type="password"
                            className="form-control sign-up-element"
                            onChange={updatePassword}
                            required
                            autoComplete="new-password"
                        />
                        <p className="pre-login-prompt">
                            1 upper, 1 lower, 1 special char, 1 number, min 8
                            chars
                        </p>
                    </label>
                    <label className="form-element">
                        Retype Password
                        <input
                            name="retype password"
                            type="password"
                            className="form-control sign-up-element"
                            onChange={updateValidatedPassword}
                            required
                        />
                    </label>
                    <button
                        id="sign-up-button"
                        type="submit"
                        className="coolBeans"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="pre-login-prompt">
                    Already have an account? <Link href="/login">Log in</Link>
                </p>
            </div>
        </div>
    )
}

export const getServerSideProps = withIronSessionSsr(authCheck, sessionOptions)
