import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import { resetForumDetails } from '../../../utils/state/forumSlice';
import { resetSuggestionsDetails } from '../../../utils/state/suggestionsSlice';
import { logout, selectEmail, selectFirstName, selectLastName } from '../../../utils/state/userSlice';
import SideNav from '../SideNav/SideNav';
import './TopNav.css';

export default function TopNav() {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    let location = useLocation();
    const firstName = useSelector(selectFirstName);
    const lastName = useSelector(selectLastName);
    const email = useSelector(selectEmail);

    useEffect(() => {
        setShow(false);
        const currentPage = document.getElementsByClassName('main')[0];
        if (currentPage) {
            currentPage.classList.remove('side-nav-active');
        };
    }, [location]);

    const toggleShow = () => {
        const currentPage = document.getElementsByClassName('main')[0];
        if (show) {
            setShow(false);
            currentPage.classList.remove('side-nav-active');
        } else {
            setShow(true);
            currentPage.classList.add('side-nav-active');
        };
    };

    const handleLogout = e => {
        e.preventDefault();
        dispatch(logout());
        dispatch(resetSuggestionsDetails());
        dispatch(resetForumDetails());
    };
    
    return (
        <React.Fragment>
            <Navbar collapseOnSelect expand="lg" id="top-nav" className="fixed-top">
                <Container>
                    <Navbar.Brand onClick={toggleShow}>
                        <img src={logo} alt="logo-side-nav-toggle" id="side-nav-toggle" />
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