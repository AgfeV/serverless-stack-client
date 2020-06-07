import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem, Container,Button } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";

function App() {
  return (
    <div className="App container">
      <Navbar bg="light" expand="lg" collapseOnSelect>
        <Navbar.Brand href="/">Scratch</Navbar.Brand>
        <Navbar.Toggle />
          <Navbar.Collapse> 
            <Nav className="ml-auto" variant="pills">
              <LinkContainer to='/signup'>
                  <Button variant="light">Signup</Button>
              </LinkContainer>
              <LinkContainer to='/login'>
                  <Button variant="light">Login</Button>
              </LinkContainer>
             </Nav>
          </Navbar.Collapse>
      </Navbar>
      <Routes />
    </div>
  );
}

export default App;