import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetSuggestionsDetails } from '../../utils/state/suggestionsSlice';
import { logout } from '../../utils/state/userSlice';
import logo from '../../assets/inverted-logo.png';
import './Navbar.css';
import { resetForumDetails } from '../../utils/state/forumSlice';

export default function Navbar() {
    const dispatch = useDispatch();

    const handleLogout = e => {
        e.preventDefault();
        dispatch(logout());
        dispatch(resetSuggestionsDetails());
        dispatch(resetForumDetails());
    };

    return (
        <nav id="sidebar">
            <ul id="nav-list">
                <li className="icon-element">
                    <NavLink to="/dashboard">
                        <img src={logo} alt="logo" id="logo" />
                    </NavLink>
                </li>
                <li className="nav-element">
                    <NavLink to="/dashboard" className="nav-option">
                        <i className="bi bi-house-fill nav-icon dashboard-button"></i>
                        <p className="nav-title">Dashboard</p>
                    </NavLink>
                </li>
                <li className="nav-element">
                    <NavLink to="/suggestions" className="nav-option">
                        <i className="bi bi-music-note-beamed nav-icon suggestions-button"></i>
                        <p className="nav-title">Suggestions</p>
                    </NavLink>
                </li>
                <li className="nav-element">
                    <NavLink to="/forum" className="nav-option">
                        <i className="bi bi-chat-fill nav-icon forum-button"></i>
                        <p className="nav-title">Forum</p>
                    </NavLink>
                </li>
                <li className="nav-element">
                    <NavLink to="/account" className="nav-option">
                        <i className="bi bi-person-fill nav-icon account-button"></i>
                        <p className="nav-title">Account</p>
                    </NavLink>
                </li>
            </ul>

            <button className="nav-option bottom-nav" onClick={handleLogout}>
                <i className="bi bi-box-arrow-left nav-icon"></i>
                <p className="nav-title">Log Out</p>
            </button>
        </nav>
    );
};