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
import Head from 'next/head'

export default function SignUpPage({ user }) {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [validatedPassword, setValidatedPassword] = useState(null)

    useLayoutEffect(() => {
        if (user.isLoggedIn) {
            router.replace('/dashboard')
        }
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
        <>
            <Head>
                <title>Shut Up And Dance | Sign Up</title>
                <meta
                    name="description"
                    content="Sign up for our song suggestion and forum site"
                    key="desc"
                />
            </Head>
            <div className="flex h-screen w-full">
                <div className="flex w-1/4 flex-col justify-between bg-rapper bg-cover bg-scroll bg-center bg-no-repeat p-4 text-secondary">
                    <Image
                        src={Logo}
                        alt="logo"
                        priority
                        className="mb-40 h-10 w-10"
                    />
                    <div className="mb-auto mt-auto">
                        <h1 className="text-4xl font-medium">
                            Shut Up And Dance
                        </h1>
                        <h4 className="text-3xl">For the love of music</h4>
                    </div>
                </div>
                <div className="flex w-3/4 flex-col items-center justify-center">
                    <h2 className="mb-10 text-3xl font-semibold">Sign Up</h2>
                    <form
                        className="flex flex-col items-center font-semibold"
                        onSubmit={handleSignUpRequest}
                    >
                        <label className="mb-8 font-semibold">
                            First Name
                            <input
                                name="first name"
                                type="text"
                                placeholder="Josh"
                                className="form-control mt-4 w-[400px] text-primary placeholder:text-third focus:border-primary focus:shadow-none"
                                onChange={updateFirstName}
                                required
                            />
                        </label>
                        <label className="mb-8 font-semibold">
                            Last Name
                            <input
                                name="last name"
                                type="text"
                                placeholder="Kent"
                                className="form-control mt-4 w-[400px] text-primary placeholder:text-third focus:border-primary focus:shadow-none"
                                onChange={updateLastName}
                                required
                            />
                        </label>
                        <label className="mb-8 font-semibold">
                            Email
                            <input
                                name="email"
                                type="email"
                                placeholder="josh@example.com"
                                className="form-control mt-4 w-[400px] text-primary placeholder:text-third focus:border-primary focus:shadow-none"
                                onChange={updateEmail}
                                required
                            />
                        </label>
                        <label className="mb-8 font-semibold">
                            Password
                            <input
                                name="password"
                                type="password"
                                className="form-control mt-4 w-[400px] text-primary placeholder:text-third focus:border-primary focus:shadow-none"
                                onChange={updatePassword}
                                required
                                autoComplete="new-password"
                            />
                            <p className="mb-0 mt-2 text-[0.9rem] font-normal text-third">
                                1 upper, 1 lower, 1 special char, 1 number, min
                                8 chars
                            </p>
                        </label>
                        <label className="mb-8 font-semibold">
                            Retype Password
                            <input
                                name="retype password"
                                type="password"
                                className="form-control mt-4 w-[400px] text-primary placeholder:text-third focus:border-primary focus:shadow-none"
                                onChange={updateValidatedPassword}
                                required
                            />
                        </label>
                        <button
                            type="submit"
                            className="coolBeans mb-12 mt-4 w-40 bg-primary text-secondary after:bg-secondary hover:text-primary focus-visible:outline-none"
                        >
                            Sign Up
                        </button>
                    </form>
                    <p className="text-[0.9rem] font-normal text-third">
                        {'Already have an account? '}
                        <Link
                            href="/login"
                            className="text-primary hover:underline focus-visible:outline-none"
                        >
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = withIronSessionSsr(authCheck, sessionOptions)