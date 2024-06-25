import React from "react";
import { Navbar, Container, Form, FormControl, Row, Col } from "react-bootstrap";

const Header = ({ search, setSearch }) => {
  return (
    <Navbar
      expand="lg"
      style={{
        overflow: "hidden",
        background:
          "linear-gradient(270deg, rgba(18, 34, 90, 0.849), rgba(122, 116, 158, 0.788))",
        padding: "5px 80px",
      }}
    >
      <Container fluid>
        <Row className="w-100">
          <Col xs={12} lg={12} className="mx-auto">
            <Form className="d-flex my-2">
              <FormControl
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                placeholder="What Services are you looking for today?"
                className="mr-2"
                style={{
                  padding: "10px 20px",
                  borderRadius: "50px",
                  border: "none",
                  backgroundColor: "white",
                  outline: "none",
                  width: "100%",
                }}
              />
            </Form>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default Header;
