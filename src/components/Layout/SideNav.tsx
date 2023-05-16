import { Nav, Offcanvas } from 'react-bootstrap'
import Link from 'next/link'

export default function SideNav({ show }) {
    return (
        <Offcanvas
            show={show}
            scroll={true}
            backdrop={false}
            className="mt-[3.925rem] w-48 md:w-64 border border-third bg-fifth"
        >
            <Offcanvas.Header className="mx-6 mt-4 h-[50px] border-b border-b-third p-0 pb-4">
                <Offcanvas.Title className="font-semibold">
                    Navigation
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="px-6 py-4">
                <Nav className="flex-col">
                    <Nav.Item className="py-[0.2rem] font-semibold">
                        <Link
                            href="/dashboard"
                            className="nav-link px-0 text-primary hover:text-fourth"
                        >
                            Dashboard
                        </Link>
                    </Nav.Item>
                    <Nav.Item className="py-[0.2rem] font-semibold">
                        <Link
                            href="/suggestions"
                            className="nav-link px-0 text-primary hover:text-fourth"
                        >
                            Suggestions
                        </Link>
                    </Nav.Item>
                    <Nav.Item className="py-[0.2rem] font-semibold">
                        <Link
                            href="/forum"
                            className="nav-link px-0 text-primary hover:text-fourth"
                        >
                            Forum
                        </Link>
                    </Nav.Item>
                </Nav>
            </Offcanvas.Body>
        </Offcanvas>
    )
}
