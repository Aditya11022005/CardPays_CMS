import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import '../App.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = onLogin(username, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message || 'Login failed');
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col md={5}>
          <Card className="shadow p-4">
            <div className="cardpays-logo">CARDPAYS</div>
            <h4 className="mb-3 text-center">Login</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              {error && <div className="text-danger mb-2">{error}</div>}
              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
            </Form>
            <div className="mt-3 small text-muted">
              <div>Demo users:</div>
              <div>admin/admin123, manager/manager123, accountant/accountant123</div>
              <div>telecaller/tele123, teamlead/lead123</div>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
