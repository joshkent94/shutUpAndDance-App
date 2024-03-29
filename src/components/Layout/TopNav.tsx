import React, { useEffect, useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import logo from '@assets/logo.png'
import menuIcon from '@assets/bars-solid.svg'
import {
    logout,
    selectEmail,
    selectFirstName,
    selectLastName,
} from '@utils/state/userSlice'
import { useAppDispatch } from '@utils/state/store'
import SideNav from './SideNav'

export default function TopNav() {
    const dispatch = useAppDispatch()
    const [show, setShow] = useState(false)
    const router = useRouter()
    const location = router.pathname
    const firstName = useSelector(selectFirstName)
    const lastName = useSelector(selectLastName)
    const email = useSelector(selectEmail)

    // show burger menu icon on hover
    const showMenu = () => {
        document.getElementById('logo-icon')?.classList.add('hide-logo')
        document
            .getElementById('side-nav-toggle')
            ?.classList.add('show-menu-icon')
    }

    // show logo again when mouse leaves
    const showLogo = () => {
        document.getElementById('logo-icon')?.classList.remove('hide-logo')
        document
            .getElementById('side-nav-toggle')
            ?.classList.remove('show-menu-icon')
    }

    // toggle sidebar off whenever URL changes
    useEffect(() => {
        setShow(false)
    }, [location])

    // toggle the sidebar on/off
    const toggleShow = () => {
        if (show) {
            setShow(false)
        } else {
            setShow(true)
        }
    }

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logout())
    }

    return (
        <React.Fragment>
            <Navbar
                collapseOnSelect
                expand="lg"
                className="fixed left-0 right-0 top-0 z-50 flex w-screen border-b border-b-third bg-secondary md:py-2"
            >
                <Container className="m-0 max-w-none px-5 md:px-[1.3rem]">
                    <Navbar.Brand
                        onClick={toggleShow}
                        onMouseEnter={showMenu}
                        onMouseLeave={showLogo}
                        className="relative m-0 cursor-pointer"
                    >
                        <Image
                            src={logo}
                            alt="logo"
                            id="logo-icon"
                            className="h-[2.3rem] w-auto transition-opacity duration-300 ease-in-out"
                        />
                        <Image
                            src={menuIcon}
                            alt="side-nav-toggle"
                            id="side-nav-toggle"
                            className="absolute left-1 top-2 h-8 w-auto opacity-0 transition-opacity duration-300 ease-in-out"
                        />
                    </Navbar.Brand>
                    <Nav className="flex-row">
                        <Nav.Item
                            id="help"
                            className="flex items-center px-1 pl-4 hover:cursor-pointer hover:text-fourth md:border-r md:border-r-third md:px-4"
                        >
                            <i className="bi bi-question-circle-fill text-center text-2xl leading-[0.5rem]"></i>
                            <p className="m-0 hidden pl-2 md:block">Help</p>
                        </Nav.Item>
                        <div className="hidden pl-4 md:block">
                            <p className="m-0 text-[0.95rem] leading-[1.3rem]">
                                {firstName} {lastName}
                            </p>
                            <p className="m-0 text-[0.95rem] leading-[1.3rem] text-third">
                                {email}
                            </p>
                        </div>
                        <Nav.Item className="dropdown flex items-center pl-4 hover:cursor-pointer hover:text-fourth">
                            <button
                                className="dropdown-toggle top border-none bg-none py-2 text-primary hover:text-fourth"
                                data-bs-toggle="dropdown"
                            >
                                <i className="bi bi-person-fill text-center text-2xl leading-[0.5rem]"></i>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end fade-down absolute z-50">
                                <li className="dropdown-item p-0 hover:bg-secondary">
                                    <Link
                                        className="block h-full w-full px-3 py-1 font-semibold text-primary"
                                        href="/account"
                                    >
                                        My Account
                                    </Link>
                                </li>
                                <li className="dropdown-item p-0 hover:bg-secondary">
                                    <button
                                        className="w-full px-3 py-1 text-left font-semibold text-primary"
                                        onClick={handleLogout}
                                    >
                                        Log Out
                                    </button>
                                </li>
                            </ul>
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
            <SideNav show={show} />
        </React.Fragment>
    )
}
