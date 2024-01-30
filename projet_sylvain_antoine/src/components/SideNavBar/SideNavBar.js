import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NitFlexNavBar() {
  return (
    <Navbar bg="dark" data-bs-theme="dark" >
        <Container>
          <Navbar.Brand style={{color: "red"}}>NitFlex</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#video">Film</Nav.Link>
            <Nav.Link href="#map">Carte</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
        </Container>
    </Navbar>
  );
}

export default NitFlexNavBar;