import { useState } from 'react'
import { useSelector } from 'react-redux'
import TopNav from '@components/Layout/TopNav'
import MusicPlayer from '@components/MusicPlayerFeature/MusicPlayer'
import Footer from '@components/Layout/Footer'
import sessionOptions from '@utils/helperFunctions/sessionOptions'
import authCheck from '@utils/helperFunctions/authCheck'
import { withIronSessionSsr } from 'iron-session/next'
import Pendo from '@components/Layout/Pendo'
import { hashFunction } from '@utils/helperFunctions/hashFunction'
import { passwordCheck } from '@utils/helperFunctions/passwordCheck'
import { showMessage } from '@utils/helperFunctions/showMessage'
import {
    selectEmail,
    selectFirstName,
    selectLastName,
    updateUserDetails,
} from '@utils/state/userSlice'
import { useAppDispatch } from '@utils/state/store'
import Head from 'next/head'

export default function AccountPage() {
    const dispatch = useAppDispatch()
    const firstName = useSelector(selectFirstName)
    const lastName = useSelector(selectLastName)
    const email = useSelector(selectEmail)
    const [newFirstName, setNewFirstName] = useState(firstName)
    const [newLastName, setNewLastName] = useState(lastName)
    const [newEmail, setNewEmail] = useState(email)
    const [newPassword, setNewPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')

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
            <div className="flex min-h-screen w-full flex-col bg-fifth pt-[3.925rem]">
                <div className="flex grow flex-col px-8 py-4">
                    <div className="flex h-[50px] items-center justify-between border-b border-b-third px-4 pb-4">
                        <h5 className="m-0 text-[1.3rem] font-semibold leading-normal">
                            My Account
                        </h5>
                    </div>
                    <div className="flex grow flex-col">
                        <div className="mt-4 flex grow flex-col rounded-[0.2rem] border border-third bg-secondary p-2">
                            <form
                                className="mt-6 flex grow flex-col items-center justify-center"
                                onSubmit={handleDetailsSave}
                            >
                                <label className="mb-8 font-semibold">
                                    First Name
                                    <input
                                        name="first name"
                                        type="text"
                                        value={newFirstName}
                                        className="form-control mt-4 w-[400px] text-primary placeholder:text-third focus:border-primary focus:shadow-none"
                                        onChange={handleFirstNameChange}
                                        required
                                    />
                                </label>
                                <label className="mb-8 font-semibold">
                                    Last Name
                                    <input
                                        name="last name"
                                        type="text"
                                        value={newLastName}
                                        className="form-control mt-4 w-[400px] text-primary placeholder:text-third focus:border-primary focus:shadow-none"
                                        onChange={handleLastNameChange}
                                        required
                                    />
                                </label>
                                <label className="mb-8 font-semibold">
                                    Email
                                    <input
                                        name="email"
                                        type="email"
                                        value={newEmail}
                                        className="form-control mt-4 w-[400px] text-primary placeholder:text-third focus:border-primary focus:shadow-none"
                                        onChange={handleEmailChange}
                                        required
                                    />
                                </label>
                                <label className="mb-8 font-semibold">
                                    Reset Password
                                    <input
                                        name="password"
                                        type="password"
                                        id="password-input"
                                        className="form-control mt-4 w-[400px] text-primary placeholder:text-third focus:border-primary focus:shadow-none"
                                        placeholder="Optional"
                                        onChange={handlePasswordChange}
                                        autoComplete="new-password"
                                    />
                                    <p className="mb-0 mt-2 text-[0.9rem] font-normal text-third">
                                        1 upper, 1 lower, 1 special char, 1
                                        number, min 8 chars
                                    </p>
                                </label>
                                <label className="mb-8 font-semibold">
                                    Confirm New Password
                                    <input
                                        name="retype password"
                                        type="password"
                                        id="confirm-password-input"
                                        className="form-control mt-4 w-[400px] text-primary placeholder:text-third focus:border-primary focus:shadow-none"
                                        placeholder="Optional"
                                        onChange={handleConfirmedPasswordChange}
                                    />
                                </label>

                                <button
                                    className="coolBeans mb-12 mt-4 w-40 bg-primary text-secondary after:bg-secondary hover:text-primary focus-visible:outline-none"
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
