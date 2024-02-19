import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import webLogo from "../../Assets/Images/Logo.png"
import { Link, useNavigate } from 'react-router-dom';
import { showErrorToast, showSuccessToast } from '../Toast/ToastifyToast';
import { ApiGetCall } from '../ApiCall/ApiCalls';

const Header = ({userInfo, updateLogInStatus}) => {

      const nav = useNavigate();

    const handleProfileClick = (event) => {
        // if (userInfo.isProfilingComplete)
            nav("/profile")
        // else
            // show a top up message to complete profile
    }

    const handleLogOut = async () => {
        try {
            await ApiGetCall('/logout');
            showSuccessToast("Logged Out Successfully")
            updateLogInStatus(false);
        } catch (error) {
            console.error("error /logout", error);
            showErrorToast("Error Logging Out")
        }
    }

    return (
        <Navbar bg="light" expand="lg" fixed="top">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src={webLogo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="Your Logo"
                    />
                    {' Care At Home'}
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbar" />

                <Navbar.Collapse id="navbar">
                    <Nav className="mx-auto">
                        <Nav.Link style={{ marginRight: "40px" }} as={Link} to={"/"}>Home</Nav.Link>
                        <Nav.Link style={{ marginRight: "40px" }} as={Link} to="/aboutus">About Us</Nav.Link>
                        <Nav.Link style={{ marginRight: "40px" }} as={Link} to="/contactus">Contact Us</Nav.Link>
                        <Nav.Link as={Link} to="/faqs">FAQs</Nav.Link>
                    </Nav>
                </Navbar.Collapse>

                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <NavDropdown title="Dear Sir Hussnain Haider" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={handleProfileClick}>Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#settings">Settings</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogOut}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
