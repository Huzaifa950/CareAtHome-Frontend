import React from "react";
import { Navbar, Container, Form, FormControl } from "react-bootstrap";


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
      <Container
        fluid
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ flex: "1", textAlign: "center", alignItems: "center" }}>
          <Form className=" my-2 " style={{ position: "relative" }}>
            <FormControl
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder="What Services are you looking for today ?"
              className="mr-2"
              style={{
                alignItems: "center",
                width: "100%",
                padding: "10px 40px 10px 20px",
                borderRadius: "50px",
                border: "none",
                backgroundColor: "white",
                outline: "none ",
              }}
            />
          </Form>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
