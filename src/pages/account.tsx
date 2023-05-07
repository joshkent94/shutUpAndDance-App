import { useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import TopNav from '@components/Layout/TopNav'
import MusicPlayer from '@components/MusicPlayerFeature/MusicPlayer'
import Footer from '@components/Layout/Footer'
import sessionOptions from '@utils/helperFunctions/sessionOptions'
import authCheck from '@utils/helperFunctions/authCheck'
import { withIronSessionSsr } from 'iron-session/next'
import { resetForumDetails } from '@utils/state/forumSlice'
import { resetSpotifyDetails } from '@utils/state/spotifySlice'
import Pendo from '@components/Layout/Pendo'
import { hashFunction } from '@utils/helperFunctions/hashFunction'
import { passwordCheck } from '@utils/helperFunctions/passwordCheck'
import { showMessage } from '@utils/helperFunctions/showMessage'
import {
    selectEmail,
    selectFirstName,
    selectLastName,
    updateUserDetails,
    logout,
} from '@utils/state/userSlice'
import { useAppDispatch } from '@utils/state/store'
import Head from 'next/head'

export default function AccountPage({ user }) {
    const dispatch = useAppDispatch()
    const firstName = useSelector(selectFirstName)
    const lastName = useSelector(selectLastName)
    const email = useSelector(selectEmail)
    const [newFirstName, setNewFirstName] = useState(firstName)
    const [newLastName, setNewLastName] = useState(lastName)
    const [newEmail, setNewEmail] = useState(email)
    const [newPassword, setNewPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')

    useLayoutEffect(() => {
        if (!user.isLoggedIn) {
            dispatch(logout()).then(() => {
                dispatch(resetForumDetails())
                dispatch(resetSpotifyDetails())
            })
        }
    })

    const handleFirstNameChange = (e) => {
        e.preventDefault()
        setNewFirstName(e.target.value)
    }

    const handleLastNameChange = (e) => {
        e.preventDefault()
        setNewLastName(e.target.value)
    }

    const handleEmailChange = (e) => {
        e.preventDefault()
        setNewEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        e.preventDefault()
        setNewPassword(e.target.value)
    }

    const handleConfirmedPasswordChange = (e) => {
        e.preventDefault()
        setConfirmedPassword(e.target.value)
    }

    // save user's details, display relevant on-screen message
    // and clear password fields if necessary
    const handleDetailsSave = (e) => {
        e.preventDefault()
        if (newPassword !== '') {
            if (passwordCheck(newPassword)) {
                if (newPassword === confirmedPassword) {
                    const hashedPassword = hashFunction(newPassword)
                    const details = {
                        firstName: newFirstName,
                        lastName: newLastName,
                        email: newEmail,
                        password: hashedPassword,
                    }
                    dispatch(updateUserDetails(details))
                        .unwrap()
                        .then(() => {
                            const passwordInput = document.getElementById(
                                'password-input'
                            ) as HTMLInputElement
                            const confirmPasswordInput =
                                document.getElementById(
                                    'confirm-password-input'
                                ) as HTMLInputElement
                            passwordInput.value = ''
                            confirmPasswordInput.value = ''
                        })
                } else {
                    showMessage("Passwords don't match")
                }
            } else {
                showMessage('Password must meet criteria')
            }
        } else {
            if (newPassword === confirmedPassword) {
                const details = {
                    firstName: newFirstName,
                    lastName: newLastName,
                    email: newEmail,
                    password: newPassword,
                }
                dispatch(updateUserDetails(details))
            } else {
                showMessage("Passwords don't match")
            }
        }
    }

    return (
        <>
            <Head>
                <title>Account | Change your account details</title>
                <meta
                    name="description"
                    content="Change your account details such as email, first name, last name and password."
                    key="desc"
                />
            </Head>
            <Pendo />
            <TopNav />
            <div className="main">
                <div className="page">
                    <div className="page-header">
                        <h5 className="page-header-h5">My Account</h5>
                    </div>
                    <div className="page-content">
                        <div id="account-page" className="content-container">
                            <form
                                id="account-form"
                                onSubmit={handleDetailsSave}
                            >
                                <label className="form-element">
                                    First Name
                                    <input
                                        name="first name"
                                        type="text"
                                        value={newFirstName}
                                        className="form-control sign-up-element"
                                        onChange={handleFirstNameChange}
                                        required
                                    />
                                </label>
                                <label className="form-element">
                                    Last Name
                                    <input
                                        name="last name"
                                        type="text"
                                        value={newLastName}
                                        className="form-control sign-up-element"
                                        onChange={handleLastNameChange}
                                        required
                                    />
                                </label>
                                <label className="form-element">
                                    Email
                                    <input
                                        name="email"
                                        type="email"
                                        value={newEmail}
                                        className="form-control sign-up-element"
                                        onChange={handleEmailChange}
                                        required
                                    />
                                </label>
                                <label className="form-element">
                                    Reset Password
                                    <input
                                        name="password"
                                        type="password"
                                        id="password-input"
                                        className="form-control sign-up-element"
                                        placeholder="Optional"
                                        onChange={handlePasswordChange}
                                        autoComplete="new-password"
                                    />
                                    <p className="pre-login-prompt">
                                        1 upper, 1 lower, 1 special char, 1
                                        number, min 8 chars
                                    </p>
                                </label>
                                <label className="form-element">
                                    Confirm New Password
                                    <input
                                        name="retype password"
                                        type="password"
                                        id="confirm-password-input"
                                        className="form-control sign-up-element"
                                        placeholder="Optional"
                                        onChange={handleConfirmedPasswordChange}
                                    />
                                </label>

                                <button
                                    id="save-details-button"
                                    className="coolBeans"
                                    type="submit"
                                >
                                    Save
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <MusicPlayer />
                <Footer />
            </div>
        </>
    )
}

export const getServerSideProps = withIronSessionSsr(authCheck, sessionOptions)
