import React, { useState , useEffect} from "react";
import { Link, useHistory } from "react-router-dom";import { Nav, Navbar, NavItem, Container,Button } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";
import { onError } from "./libs/errorLib";

function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const history = useHistory();
  /**
   If we don’t pass in an array of variables, our hook gets executed everytime our component is rendered.
   If we pass in some variables, on every render React will first check if those variables have changed, before running our function.
   If we pass in an empty list of variables, then it’ll only run our function on the FIRST render.
   */
  useEffect(() => {
    onLoad();
  }, []);
  
  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        onError(e);
      }
    }
  
    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();
  
    userHasAuthenticated(false);
    history.push("/login");
  }

  return (
    !isAuthenticating &&
    <div className="App container">
      <Navbar bg="light" expand="lg" collapseOnSelect>
        <Navbar.Brand href="/">Scratch</Navbar.Brand>
        <Navbar.Toggle />
          <Navbar.Collapse> 
            <Nav className="ml-auto" variant="pills">
            {isAuthenticated 
              ?  <Button onClick={handleLogout} variant="light">LogOut</Button>
              :
              <>
                <LinkContainer to='/signup'>
                    <Button variant="light">Signup</Button>
                </LinkContainer>
                <LinkContainer to='/login'>
                    <Button variant="light">Login</Button>
                </LinkContainer>
              </>
              }
             </Nav>
          </Navbar.Collapse>
      </Navbar>
  <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
    <Routes />
  </AppContext.Provider>    
</div>
  );
}

export default App;