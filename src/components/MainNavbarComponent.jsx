import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function MainNavbar({ user, onLogout }) {
  const location = useLocation();
  // Role-based nav: Only show Settings to Admin/Manager
  const canSeeSettings = user && (user.role === 'Admin' || user.role === 'Manager');
  // Only show Leads to non-Accountant
  const canSeeLeads = user && user.role !== 'Accountant';

  return (
    <Navbar bg="light" expand="lg" className="mb-4 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/dashboard" className="fw-bold text-primary">CARDPAYS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard" active={location.pathname === '/dashboard'}>Dashboard</Nav.Link>
            {canSeeLeads && (
              <Nav.Link as={Link} to="/leads" active={location.pathname === '/leads'}>Leads</Nav.Link>
            )}
            <Nav.Link as={Link} to="/transaction" active={location.pathname === '/transaction'}>Transaction</Nav.Link>
            <Nav.Link as={Link} to="/accounting" active={location.pathname === '/accounting'}>Accounting</Nav.Link>

            {canSeeSettings && (
              <Nav.Link as={Link} to="/settings" active={location.pathname === '/settings'}>Settings</Nav.Link>
            )}
          </Nav>
          <Nav>
            {user && (
              <>
                <span className="me-2">{user.username} <Badge bg="secondary">{user.role}</Badge></span>
                <Nav.Link as={Link} to="/login" onClick={onLogout}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
