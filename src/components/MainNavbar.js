import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function MainNavbar() {
  const location = useLocation();
  return (
    <Navbar bg="light" expand="lg" className="mb-4 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/dashboard" className="fw-bold text-primary">CARDPAYS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard" active={location.pathname === '/dashboard'}>Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/leads" active={location.pathname === '/leads'}>Leads</Nav.Link>
            <Nav.Link as={Link} to="/settings" active={location.pathname === '/settings'}>Settings</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/login">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

  // export default MainNavbar; // Commenting out the export to indicate removal
