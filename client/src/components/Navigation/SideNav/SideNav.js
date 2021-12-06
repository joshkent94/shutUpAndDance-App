import { Nav, Offcanvas } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './SideNav.css';

export default function SideNav({ show }) {
    return (
        <Offcanvas show={show} scroll={true} backdrop={false}>
            <Offcanvas.Body>
                <Nav id="side-nav">
                    <Nav.Item>
                        <NavLink to="/dashboard" className="nav-link">
                            Dashboard
                        </NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink to="/suggestions" className="nav-link">
                            Suggestions
                        </NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink to="/forum" className="nav-link">
                            Forum
                        </NavLink>
                    </Nav.Item>
                </Nav>
            </Offcanvas.Body>
        </Offcanvas>
    );
};