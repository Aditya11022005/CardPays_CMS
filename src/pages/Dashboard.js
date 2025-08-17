import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../App.css';

function Dashboard() {
  return (
    <Container className="py-4">
      <div className="cardpays-logo">CARDPAYS</div>
      <h3 className="mb-4">Dashboard</h3>
      <Row>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Total Leads</Card.Title>
              <Card.Text>0</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Today's Fresh Leads</Card.Title>
              <Card.Text>0</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Follow Ups</Card.Title>
              <Card.Text>0</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* More widgets can be added here */}
    </Container>
  );
}

  // export default Dashboard; // Commenting out the export to indicate removal
