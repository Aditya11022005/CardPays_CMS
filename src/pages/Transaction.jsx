import React, { useState } from 'react';
import { Container, Card, Form, Button, Table, Row, Col, Alert } from 'react-bootstrap';

function Transaction() {
  // Demo leads (should be passed as prop or from context in real app)
  const demoLeads = [
    {
      name: 'Deepak',
      mobile: '9811084879',
      whatsapp: '',
      city: 'Delhi',
      bookedCall: '',
      owner: 'Telecaller',
      cards: [
        { bank: 'HDFC', bill: 50000, due: '2025-07-14', type: 'Visa', status: 'Active', remarks: '' },
        { bank: 'ICICI', bill: 100000, due: '2025-07-18', type: 'MasterCard', status: 'Temp Block', remarks: '' },
        { bank: 'INDUSIND', bill: 80000, due: '2025-07-24', type: 'RuPay', status: 'Blocked', remarks: '' },
      ],
    },
  ];
  const [selectedLeadIdx, setSelectedLeadIdx] = useState('');
  const selectedLead = selectedLeadIdx !== '' ? demoLeads[selectedLeadIdx] : null;

  const DEFAULT_CHARGE = 4.5;
  const [rows, setRows] = useState([
    { service: '', swipeAmt: '', swipeMode: '', payment: '', payMode: '' }
  ]);
  const [charge, setCharge] = useState(0);
  const [form, setForm] = useState({
    service: '',
    bank: '',
    cardType: '',
    chargePercent: DEFAULT_CHARGE,
    short: '',
    receivable: ''
  });
  const [kycFile, setKycFile] = useState(null);
  const [history, setHistory] = useState([]);

  const handleRowChange = (idx, field, value) => {
    const updated = rows.map((row, i) => i === idx ? { ...row, [field]: value } : row);
    setRows(updated);
  };

  const addRow = () => setRows([...rows, { service: '', swipeAmt: '', swipeMode: '', payment: '', payMode: '' }]);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleKycChange = (e) => {
    setKycFile(e.target.files[0]);
  };

  const calculateCharge = () => {
    const total = rows.reduce((sum, r) => sum + Number(r.payment || 0), 0);
    const percent = Number(form.chargePercent || 0);
    setCharge(((total * percent) / 100).toFixed(2));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateCharge();
    setHistory([
      ...history,
      {
        ...form,
        rows: [...rows],
        charge,
        kycFile: kycFile ? kycFile.name : '',
        date: new Date().toLocaleString()
      }
    ]);
    setRows([{ swipeAmt: '', swipeMode: '', payment: '', payMode: '' }]);
    setForm({ service: '', bank: '', cardType: '', chargePercent: DEFAULT_CHARGE, short: '', receivable: '' });
    setKycFile(null);
    setCharge(0);
  };

  return (
    <Container className="py-4">
      <div className="cardpays-logo">CARDPAYS</div>
      <h3 className="mb-4">Transaction</h3>
      {/* Lead Selector */}
      <Card className="mb-3">
        <Card.Body>
          <Form.Group as={Row} className="align-items-center">
            <Form.Label column md={2}>Select Lead</Form.Label>
            <Col md={6}>
              <Form.Select value={selectedLeadIdx} onChange={e => setSelectedLeadIdx(e.target.value)}>
                <option value="">-- Select --</option>
                {demoLeads.map((l, idx) => (
                  <option key={idx} value={idx}>{l.name} ({l.mobile})</option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>
        </Card.Body>
      </Card>
      {/* Lead Details */}
      {selectedLead && (
        <Card className="mb-4">
          <Card.Body>
            <h5>Lead Details</h5>
            <div><b>Name:</b> {selectedLead.name}</div>
            <div><b>Mobile:</b> {selectedLead.mobile}</div>
            <div><b>City:</b> {selectedLead.city}</div>
            <div><b>Owner:</b> {selectedLead.owner}</div>
            <div><b>Booked Call:</b> {selectedLead.bookedCall}</div>
            <div><b>Cards:</b>
              <ul className="mb-0">
                {selectedLead.cards.map((c, i) => (
                  <li key={i}>{c.bank} - {c.type} - ₹{c.bill} - Due: {c.due} - Status: {c.status}</li>
                ))}
              </ul>
            </div>
          </Card.Body>
        </Card>
      )}
      {/* Transaction Form */}
      <Card className="mb-4">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Service</Form.Label>
                  <Form.Select name="service" value={form.service} onChange={handleFormChange} required>
                    <option value="">Select</option>
                    <option>HCP</option>
                    <option>CTC</option>
                    <option>CTB</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Bank</Form.Label>
                  <Form.Control name="bank" value={form.bank} onChange={handleFormChange} required />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group>
                  <Form.Label>Card Type</Form.Label>
                  <Form.Select name="cardType" value={form.cardType} onChange={handleFormChange} required>
                    <option value="">Select</option>
                    <option>Visa</option>
                    <option>MasterCard</option>
                    <option>RuPay</option>
                    <option>Diners</option>
                    <option>Amex</option>
                    <option>Corporate</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group>
                  <Form.Label>Charge %</Form.Label>
                  <Form.Control name="chargePercent" type="number" value={form.chargePercent} onChange={handleFormChange} required />
                </Form.Group>
              </Col>
              <Col md={2} className="d-flex align-items-end">
                <Button variant="info" onClick={calculateCharge} className="w-100" type="button">Auto Calculate</Button>
              </Col>
            </Row>
            <Row className="g-3 mt-2">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>KYC/File Upload</Form.Label>
                  <Form.Control type="file" onChange={handleKycChange} />
                </Form.Group>
              </Col>
              <Col md={6} className="d-flex align-items-end justify-content-end">
                <Button variant="primary" type="submit">Submit Transaction</Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
      {charge > 0 && <Alert variant="info">Calculated Charge: ₹{charge}</Alert>}
      <Card className="mb-4">
        <Card.Body>
          <Table bordered hover responsive className="mb-0">
            <thead className="table-light">
              <tr>
                <th>Service</th>
                <th>Swipe Amt</th>
                <th>Swipe Mode</th>
                <th>Payment</th>
                <th>Pay Mode</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx}>
                  <td>
                    <Form.Select value={row.service} onChange={e => handleRowChange(idx, 'service', e.target.value)} required>
                      <option value="">Select</option>
                      <option>HCP</option>
                      <option>CTC</option>
                      <option>CTB</option>
                    </Form.Select>
                  </td>
                  <td><Form.Control value={row.swipeAmt} onChange={e => handleRowChange(idx, 'swipeAmt', e.target.value)} /></td>
                  <td><Form.Control value={row.swipeMode} onChange={e => handleRowChange(idx, 'swipeMode', e.target.value)} /></td>
                  <td><Form.Control value={row.payment} onChange={e => handleRowChange(idx, 'payment', e.target.value)} /></td>
                  <td><Form.Control value={row.payMode} onChange={e => handleRowChange(idx, 'payMode', e.target.value)} /></td>
                  <td>{idx === rows.length - 1 && <Button size="sm" onClick={addRow}>Add Row</Button>}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <h5>Invoice Preview</h5>
          <div className="table-responsive">
            <Table bordered hover size="sm" className="mb-0">
              <thead className="table-light">
                <tr>
                  <th>Service</th>
                  <th>Bank</th>
                  <th>Card Type</th>
                  <th>Charge %</th>
                  <th>Swipe Amt</th>
                  <th>Swipe Mode</th>
                  <th>Payment</th>
                  <th>Pay Mode</th>
                  <th>Charge Amt</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.service}</td>
                    <td>{form.bank}</td>
                    <td>{form.cardType}</td>
                    <td>{form.chargePercent}</td>
                    <td>{row.swipeAmt}</td>
                    <td>{row.swipeMode}</td>
                    <td>{row.payment}</td>
                    <td>{row.payMode}</td>
                    <td>{charge}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
      {/* Transaction History */}
      {history.length > 0 && (
        <Card className="mt-4">
          <Card.Body>
            <h5>Transaction History</h5>
            <div className="table-responsive">
              <Table bordered hover size="sm" className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Date/Time</th>
                    <th>Service</th>
                    <th>Bank</th>
                    <th>Card Type</th>
                    <th>Charge %</th>
                    <th>Charge Amt</th>
                    <th>KYC File</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((h, idx) => (
                    <tr key={idx}>
                      <td>{h.date}</td>
                      <td>{h.service}</td>
                      <td>{h.bank}</td>
                      <td>{h.cardType}</td>
                      <td>{h.chargePercent}</td>
                      <td>{h.charge}</td>
                      <td>{h.kycFile}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default Transaction;
