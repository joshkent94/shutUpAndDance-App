import { useState } from 'react'
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
import Head from 'next/head'
import Loading from '@components/Layout/Loading'

export default function SignUpPage() {
    const dispatch = useAppDispatch()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [validatedPassword, setValidatedPassword] = useState(null)
    const [loading, setLoading] = useState(false)

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
                setLoading(true)
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
            <div className="flex w-full justify-center">
                <div className="hidden h-full w-1/4 flex-col justify-between bg-rapper bg-cover bg-scroll bg-center bg-no-repeat p-4 text-secondary md:flex">
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
                {loading && <Loading />}
                {!loading && (
                    <div className="my-12 flex w-3/4 flex-col items-center justify-center">
                        <h2 className="mb-10 text-3xl font-semibold">
                            Sign Up
                        </h2>
                        <form
                            className="flex w-full flex-col items-center font-semibold"
                            onSubmit={handleSignUpRequest}
                        >
                            <label className="mb-8 w-72 font-semibold md:w-[400px]">
                                First Name
                                <input
                                    name="first name"
                                    type="text"
                                    placeholder="Josh"
                                    className="form-control mt-4 w-72 text-primary placeholder:text-third focus:border-primary focus:shadow-none md:w-[400px]"
                                    onChange={updateFirstName}
                                    required
                                />
                            </label>
                            <label className="mb-8 w-72 font-semibold md:w-[400px]">
                                Last Name
                                <input
                                    name="last name"
                                    type="text"
                                    placeholder="Kent"
                                    className="form-control mt-4 w-72 text-primary placeholder:text-third focus:border-primary focus:shadow-none md:w-[400px]"
                                    onChange={updateLastName}
                                    required
                                />
                            </label>
                            <label className="mb-8 w-72 font-semibold md:w-[400px]">
                                Email
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="josh@example.com"
                                    className="form-control mt-4 w-72 text-primary placeholder:text-third focus:border-primary focus:shadow-none md:w-[400px]"
                                    onChange={updateEmail}
                                    required
                                />
                            </label>
                            <label className="mb-8 flex w-72 flex-col items-center font-semibold md:w-[400px]">
                                <div className="flex w-full justify-start">
                                    Password
                                </div>
                                <input
                                    name="password"
                                    type="password"
                                    className="form-control mt-4 w-72 text-primary placeholder:text-third focus:border-primary focus:shadow-none md:w-[400px]"
                                    onChange={updatePassword}
                                    required
                                    autoComplete="new-password"
                                />
                                <p className="mb-0 mt-2 text-center text-[0.9rem] font-normal text-third">
                                    1 upper, 1 lower, 1 special char, 1 number,
                                    min 8 chars
                                </p>
                            </label>
                            <label className="mb-8 w-72 font-semibold md:w-[400px]">
                                Retype Password
                                <input
                                    name="retype password"
                                    type="password"
                                    className="form-control mt-4 w-72 text-primary placeholder:text-third focus:border-primary focus:shadow-none md:w-[400px]"
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
                )}
            </div>
        </>
    )
}

export const getServerSideProps = withIronSessionSsr(authCheck, sessionOptions)
