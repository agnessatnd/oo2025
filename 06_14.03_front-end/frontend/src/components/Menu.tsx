import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">Veebipood</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/cart">Ostukorv</Nav.Link>
            <Nav.Link as={Link} to="/orders">Tellimused</Nav.Link>
            <Nav.Link as={Link} to="/arrays">Arrayd</Nav.Link>
            <NavDropdown title="Admin" id="collapsible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/manage/products">Tooted</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/manage/categories">
                Kategooriad
              </NavDropdown.Item>
              
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/login">Logi sisse</Nav.Link>
            <Nav.Link eventKey={2} as={Link} to="/signup">
              Registreeru
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;