import React, { useState } from 'react';
import { Container, Card, Row, Col, Nav, Tab, Form, Button } from 'react-bootstrap';

function Profile() {
  const [key, setKey] = useState('details');
  return (
    <Container fluid className="py-4 bg-light min-vh-100">
      <div className="cardpays-logo">CARDPAYS</div>
      <h3 className="mb-4">Customer Profile</h3>
      <Card>
        <Card.Body>
          <Tab.Container activeKey={key} onSelect={k => setKey(k)}>
            <Row>
              <Col md={3} className="mb-3 mb-md-0">
                <Nav variant="tabs" className="flex-md-column">
                  <Nav.Item>
                    <Nav.Link eventKey="details">Details</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="cards">Cards</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="transactions">Transactions</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="kyc">KYC Upload</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col md={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="details">
                    <h5>Customer Details</h5>
                    <Row className="g-2">
                      <Col md={6}><Form.Group><Form.Label>Name</Form.Label><Form.Control value="Deepak" readOnly /></Form.Group></Col>
                      <Col md={6}><Form.Group><Form.Label>Mobile</Form.Label><Form.Control value="9811084879" readOnly /></Form.Group></Col>
                      <Col md={6}><Form.Group><Form.Label>City</Form.Label><Form.Control value="Delhi" readOnly /></Form.Group></Col>
                      <Col md={6}><Form.Group><Form.Label>Email</Form.Label><Form.Control value="deepak@email.com" readOnly /></Form.Group></Col>
                    </Row>
                  </Tab.Pane>
                  <Tab.Pane eventKey="cards">
                    <h5>Card Details</h5>
                    <div className="table-responsive">
                      <table className="table table-bordered table-sm">
                        <thead className="table-light">
                          <tr>
                            <th>Bank</th>
                            <th>Card Type</th>
                            <th>Status</th>
                            <th>Bill</th>
                            <th>Due Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td>HDFC</td><td>Visa</td><td>Active</td><td>50,000</td><td>2025-07-14</td></tr>
                          <tr><td>ICICI</td><td>MasterCard</td><td>Temp Block</td><td>1,00,000</td><td>2025-07-18</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="transactions">
                    <h5>Transactions</h5>
                    <div className="table-responsive">
                      <table className="table table-bordered table-sm">
                        <thead className="table-light">
                          <tr>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td>2025-08-17</td><td>Payment</td><td>₹10,000</td><td>Success</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="kyc">
                    <h5>KYC Upload</h5>
                    <Form.Group className="mb-3">
                      <Form.Label>ID Proof</Form.Label>
                      <Form.Control type="file" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>PAN Card</Form.Label>
                      <Form.Control type="file" />
                    </Form.Group>
                    <Button variant="primary">Upload</Button>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Profile;
