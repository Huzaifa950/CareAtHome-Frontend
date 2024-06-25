import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import webLogo from "../../Assets/Images/Logo.png";
import { showErrorToast, showSuccessToast } from "../Toast/ToastifyToast";
import { ApiGetCall } from "../ApiCall/ApiCalls";
import { capitalizeFirstLetter } from "../Common/Common";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Header = ({ userInfo, updateLogInStatus }) => {
  const nav = useNavigate();

  const handleProfileClick = (event) => {
    nav("/profile");
  };

  const handleLogOut = async () => {
    try {
      await ApiGetCall("/logout");
      showSuccessToast("Logged Out Successfully");
      updateLogInStatus(false);
    } catch (error) {
      console.error("error /logout", error);
      showErrorToast("Error Logging Out");
    }
  };

  return (
    <Container>
      <Navbar
        style={{
          background:
            "linear-gradient(270deg, rgba(18, 34, 90, 0.849), rgba(122, 116, 158, 0.788))",
        }}
        bg="light"
        expand="lg"
        fixed="top"
      >
        <Navbar.Brand href="/" style={{ marginLeft: "50px" }}>
          <img
            src={webLogo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Your Logo"
          />
          {" CareAtHome"}
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar" style={{ marginRight: "50px" }} />

        <Navbar.Collapse id="navbar" style={{ marginRight: "50px" }}>
          <Nav className="mx-auto" style={{ fontWeight: "bold" }}>
            <Nav.Link style={{ marginRight: "35px" }} as={Link} to={"/"}>
              Home
            </Nav.Link>
            {userInfo.roleId === 2 && (
              <Nav.Link style={{ marginRight: "35px" }} as={Link} to={"/caretakers"}>
                CareTakers
              </Nav.Link>
            )}
            <Nav.Link style={{ marginRight: "35px" }} as={Link} to="/aboutus">
              About Us
            </Nav.Link>
            <Nav.Link style={{ marginRight: "35px" }} as={Link} to="/faqs">
              FAQs
            </Nav.Link>
            <Nav.Link as={Link} to="/contactus">
              Contact Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <NavDropdown
              style={{ fontWeight: "bold", position: "relative", marginRight: "80px" }}
              title={capitalizeFirstLetter(userInfo.username)}
              id="user-nav-dropdown"
              menuAlign="right"
            >
              {userInfo.roleId > 0 && (
                <NavDropdown.Item onClick={handleProfileClick}>
                  Profile
                </NavDropdown.Item>
              )}
              <NavDropdown.Item href="#settings" disabled>Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogOut}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>

  );
};

export default Header;
