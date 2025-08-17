
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Loader from '../components/Loader';
import DashboardChart from '../components/DashboardChart';
import '../App.css';

function Dashboard() {
  const [loading, setLoading] = useState(true);
  // Demo stats
  const [stats] = useState({
    totalLeads: 120,
    todaysLeads: 8,
    followUps: 15,
    overdue: 3,
    converted: 40,
    scrap: 5,
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container fluid className="py-4 bg-light min-vh-100">
      <div className="cardpays-logo mb-2">CARDPAYS</div>
      <h3 className="mb-4 fw-bold text-center">Dashboard</h3>
      <Row className="g-3 mb-4">
        <Col xs={6} md={4} lg={2}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title className="fs-6 text-muted">Total Leads</Card.Title>
              <div className="display-6 fw-bold">{stats.totalLeads}</div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={4} lg={2}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title className="fs-6 text-muted">Today's Leads</Card.Title>
              <div className="display-6 fw-bold">{stats.todaysLeads}</div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={4} lg={2}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title className="fs-6 text-muted">Follow-ups</Card.Title>
              <div className="display-6 fw-bold">{stats.followUps}</div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={4} lg={2}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title className="fs-6 text-muted">Overdue</Card.Title>
              <div className="display-6 fw-bold">{stats.overdue}</div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={4} lg={2}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title className="fs-6 text-muted">Converted</Card.Title>
              <div className="display-6 fw-bold">{stats.converted}</div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={4} lg={2}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title className="fs-6 text-muted">Scrap</Card.Title>
              <div className="display-6 fw-bold">{stats.scrap}</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="g-3">
        <Col xs={12} md={8} className="mx-auto">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="mb-3">Performance Chart</Card.Title>
              <div className="bg-white rounded p-3">
                <DashboardChart />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
