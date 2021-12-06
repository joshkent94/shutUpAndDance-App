import { Accordion, Nav, Offcanvas } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './SideNav.css';

export default function SideNav({ show }) {
    const handleRotate = e => {
        e.preventDefault();
        const arrow = e.target.tagName === "I" ? e.target : e.target.parentNode.childNodes[1];
        arrow.classList.toggle('rotate');
    };

    return (
        <Offcanvas show={show} scroll={true} backdrop={false}>
            <Offcanvas.Header>
                <Offcanvas.Title>
                    Navigation
                </Offcanvas.Title>
            </Offcanvas.Header>
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
                        <NavLink to="/gigs" className="nav-link">
                            Gigs
                        </NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <Accordion flush>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header onClick={handleRotate}>
                                    <p>Forum</p>
                                    <i className="bi bi-caret-down-fill"></i>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <NavLink to="/forum/new" className="nav-link">
                                        Create New Thread
                                    </NavLink>
                                    <NavLink to="/forum" className="nav-link">
                                        Browse Threads
                                    </NavLink>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Nav.Item>
                </Nav>
            </Offcanvas.Body>
        </Offcanvas>
    );
};