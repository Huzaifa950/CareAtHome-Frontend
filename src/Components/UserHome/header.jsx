import React from 'react';
import { Navbar, Container, Nav, Form, FormControl } from 'react-bootstrap';
import { BsBell, BsEnvelope } from 'react-icons/bs';
import { FaRegCircleUser } from "react-icons/fa6";

const Header = ({ search, setSearch }) => {
  return (
    <Navbar bg="light" expand="lg" style={{ overflow: 'hidden', backgroundColor: '#B5C0D0', padding: '10px 80px' }}>
      <Container fluid style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Navbar.Brand href="#home">
          <img
            src="your-logo.png"
            height="30"
            className="d-inline-block align-top"
            alt="Your Logo"
          />
        </Navbar.Brand>

        <div style={{ flex: '1', textAlign: 'center', position: 'relative' }}>
          <Form className="mx-auto my-2 d-inline-flex" style={{ position: 'relative' }}>
            <FormControl
              value={search}
              onChange={e => setSearch(e.target.value)}
              type="search"
              placeholder="What Services are you looking for today ?"
              className="mr-2" style={{ width: '60%', padding: '15px 40px 15px 20px', borderRadius: '50px', border: 'none', backgroundColor: 'white', outline: 'none ' }} />
          </Form>
        </div>

        <Nav style={{ display: 'flex', justifyContent: 'space-between', width: '15%' }}>
          <Nav.Link href="#notifications" style={{ fontSize: '25px', color: 'black' }}><BsBell /></Nav.Link>
          <Nav.Link href="#messages" style={{ fontSize: '25px', color: 'black' }}><BsEnvelope /></Nav.Link>
          <Nav.Link href="#profile" style={{ fontSize: '30px', color: 'black' }}><FaRegCircleUser /></Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;