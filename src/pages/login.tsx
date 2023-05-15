import { useEffect, useState } from 'react'
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
import Head from 'next/head'
import { resetUserDetails } from '@utils/state/userSlice'
import { resetForumDetails } from '@utils/state/forumSlice'
import { resetSpotifyDetails } from '@utils/state/spotifySlice'
import Loading from '@components/Layout/Loading'

export default function LoginPage() {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const state = router.query.state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        dispatch(resetUserDetails())
        dispatch(resetForumDetails())
        dispatch(resetSpotifyDetails())
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
        setLoading(true)
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
        <>
            <Head>
                <title>Shut Up And Dance | Log In</title>
                <meta
                    name="description"
                    content="Log in to our song suggestion and forum site"
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
                {loading && <Loading />}
                {!loading && (
                    <div className="flex w-3/4 flex-col items-center justify-center">
                        <h2 className="mb-10 text-3xl font-semibold">Log In</h2>
                        <form
                            className="flex flex-col items-center font-semibold"
                            onSubmit={handleLoginSubmit}
                        >
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
                                />
                            </label>
                            <button
                                type="submit"
                                className="coolBeans mb-12 mt-4 w-40 bg-primary text-secondary after:bg-secondary hover:text-primary focus-visible:outline-none"
                            >
                                Log In
                            </button>
                        </form>
                        <p className="text-[0.9rem] font-normal text-third">
                            {"Don't have an account? "}
                            <Link
                                href="/signup"
                                className="text-primary hover:underline focus-visible:outline-none"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                )}
            </div>
        </>
    )
}

export const getServerSideProps = withIronSessionSsr(authCheck, sessionOptions)