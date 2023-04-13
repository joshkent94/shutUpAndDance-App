import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import menuIcon from '../../../assets/bars-solid.svg';
import { resetForumDetails } from '../../../utils/state/forumSlice';
import { resetSpotifyDetails } from '../../../utils/state/spotifySlice';
import { logout, selectEmail, selectFirstName, selectLastName } from '../../../utils/state/userSlice';
import SideNav from '../SideNav/SideNav';
import './TopNav.scss';

export default function TopNav() {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    let location = useLocation();
    const firstName = useSelector(selectFirstName);
    const lastName = useSelector(selectLastName);
    const email = useSelector(selectEmail);


    // show burger menu icon on hover
    const showMenu = () => {
        document.getElementById("logo-icon").classList.add("hide-logo");
        document.getElementById("side-nav-toggle").classList.add("show-menu-icon");
    };

    // show logo again when mouse leaves
    const showLogo = () => {
        document.getElementById("logo-icon").classList.remove("hide-logo");
        document.getElementById("side-nav-toggle").classList.remove("show-menu-icon");
    };

    // toggle sidebar off whenever URL changes
    useEffect(() => {
        setShow(false);
    }, [location]);

    // toggle the sidebar on/off
    const toggleShow = () => {
        if (show) {
            setShow(false);
        } else {
            setShow(true);
        };
    };

    const handleLogout = e => {
        e.preventDefault();
        dispatch(logout())
            .unwrap()
            .then(() => {
                dispatch(resetSpotifyDetails());
                dispatch(resetForumDetails());
            });
    };
    
    return (
        <React.Fragment>
            <Navbar collapseOnSelect expand="lg" id="top-nav" className="fixed-top">
                <Container>
                    <Navbar.Brand onClick={toggleShow} onMouseEnter={showMenu} onMouseLeave={showLogo}>
                        <img src={logo} alt="logo" id="logo-icon" />
                        <img src={menuIcon} alt="side-nav-toggle" id="side-nav-toggle" />
                    </Navbar.Brand>
                    <Nav>
                        <Nav.Item id="help">
                            <i className="bi bi-question-circle-fill top-nav-icon"></i>
                            <p>Help</p>
                        </Nav.Item>
                        <div id="user-details">
                            <p id="user-name">{firstName} {lastName}</p>
                            <p id="user-email">{email}</p>
                        </div>
                        <Nav.Item className="dropdown">
                            <button className="nav-link dropdown-toggle top" data-bs-toggle="dropdown" id="account-button">
                                <i className="bi bi-person-fill top-nav-icon"></i>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end fade-down">
                                <li><Link className="dropdown-item" to="/account">My Account</Link></li>
                                <li><button className="dropdown-item" onClick={handleLogout}>Log Out</button></li>
                            </ul>
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
            <SideNav show={show} />
        </React.Fragment>
    );
};