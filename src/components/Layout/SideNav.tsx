import { Nav, Offcanvas } from 'react-bootstrap'
import Link from 'next/link'

export default function SideNav({ show }) {
    return (
        <Offcanvas show={show} scroll={true} backdrop={false}>
            <Offcanvas.Header>
                <Offcanvas.Title>Navigation</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Nav id="side-nav">
                    <Nav.Item>
                        <Link href="/dashboard" className="nav-link">
                            Dashboard
                        </Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link href="/suggestions" className="nav-link">
                            Suggestions
                        </Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link href="/forum" className="nav-link">
                            Forum
                        </Link>
                    </Nav.Item>
                </Nav>
            </Offcanvas.Body>
        </Offcanvas>
    )
}
