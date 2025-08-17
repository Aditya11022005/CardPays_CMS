import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import '../App.css';

function Login() {
  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col md={5}>
          <Card className="shadow p-4">
            <div className="cardpays-logo">CARDPAYS</div>
            <h4 className="mb-3 text-center">Login</h4>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email or Mobile</Form.Label>
                <Form.Control type="text" placeholder="Enter email or mobile" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

  // export default Login; // Commenting out the export to indicate removal
