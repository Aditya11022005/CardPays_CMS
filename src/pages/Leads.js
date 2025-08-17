import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../App.css';

function Leads() {
  return (
    <Container className="py-4">
      <div className="cardpays-logo">CARDPAYS</div>
      <h3 className="mb-4">Leads</h3>
      <Card className="mb-3">
        <Card.Body>
          <Button variant="primary">+ Add Lead</Button>
        </Card.Body>
      </Card>
      {/* Leads table/grid will go here */}
    </Container>
  );
}

  // export default Leads; // Commenting out the export to indicate removal
