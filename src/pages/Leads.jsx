
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Modal, Form, InputGroup } from 'react-bootstrap';
import '../App.css';

const initialLeads = [
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



function Leads() {
  const [show, setShow] = useState(false);
  const [leads, setLeads] = useState(initialLeads.map(l => ({ ...l, followUps: [] })));
  const [filter, setFilter] = useState('');
  const [billFilter, setBillFilter] = useState('');
  const [dueFilter, setDueFilter] = useState('');
  const [form, setForm] = useState({
    name: '', mobile: '', whatsapp: '', city: '', bookedCall: '', owner: 'Telecaller', cards: [
      { bank: '', bill: '', due: '', type: 'Visa', status: 'Active', remarks: '' }
    ], followUps: []
  });
  // Follow-up modal state
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [followUpIdx, setFollowUpIdx] = useState(null);
  const [followUp, setFollowUp] = useState({ date: '', remarks: '' });

  // Card dropdowns (could be from settings)
  const [bankOptions, setBankOptions] = useState(['HDFC', 'ICICI', 'INDUSIND']);
  const [typeOptions, setTypeOptions] = useState(['Visa', 'MasterCard', 'RuPay', 'Diners', 'Amex', 'Corporate']);
  const [statusOptions, setStatusOptions] = useState(['Active', 'Temp Block', 'Blocked', 'Don’t Know']);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // Lead form field change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // Card grid field change
  const handleCardChange = (idx, e) => {
    const newCards = form.cards.map((c, i) => i === idx ? { ...c, [e.target.name]: e.target.value } : c);
    setForm({ ...form, cards: newCards });
  };
  // Add card row
  const addCardRow = () => {
    setForm({ ...form, cards: [...form.cards, { bank: '', bill: '', due: '', type: 'Visa', status: 'Active', remarks: '' }] });
  };
  // Remove card row
  const removeCardRow = (idx) => {
    setForm({ ...form, cards: form.cards.filter((_, i) => i !== idx) });
  };

  // Add new lead
  const handleAdd = (e) => {
    e.preventDefault();
    setLeads([...leads, { ...form, followUps: [] }]);
    setForm({ name: '', mobile: '', whatsapp: '', city: '', bookedCall: '', owner: 'Telecaller', cards: [
      { bank: '', bill: '', due: '', type: 'Visa', status: 'Active', remarks: '' }
    ], followUps: [] });
    handleClose();
  };

  // Follow-up logic
  const openFollowUp = (idx) => {
    setFollowUpIdx(idx);
    setFollowUp({ date: '', remarks: '' });
    setShowFollowUp(true);
  };
  const closeFollowUp = () => setShowFollowUp(false);
  const handleFollowUpChange = (e) => {
    setFollowUp({ ...followUp, [e.target.name]: e.target.value });
  };
  const saveFollowUp = (e) => {
    e.preventDefault();
    setLeads(leads.map((l, i) => i === followUpIdx ? { ...l, followUps: [...(l.followUps || []), followUp] } : l));
    setShowFollowUp(false);
  };

  // Filtering
  const today = new Date().toISOString().slice(0, 10);
  const getDueFilter = (due) => {
    if (!dueFilter) return true;
    const dueDate = new Date(due);
    const now = new Date();
    if (dueFilter === 'today') return due === today;
    if (dueFilter === '3days') {
      const diff = (dueDate - now) / (1000 * 60 * 60 * 24);
      return diff >= 0 && diff <= 2;
    }
    if (dueFilter === '7days') {
      const diff = (dueDate - now) / (1000 * 60 * 60 * 24);
      return diff >= 0 && diff <= 6;
    }
    if (dueFilter === '20days') {
      const diff = (dueDate - now) / (1000 * 60 * 60 * 24);
      return diff >= 0 && diff <= 19;
    }
    return true;
  };

  // Flat list for table display
  const flatLeads = leads.flatMap((lead, leadIdx) =>
    lead.cards.map(card => ({
      ...lead,
      ...card,
      allCardTotal: lead.cards.reduce((sum, c) => sum + Number(c.bill || 0), 0),
      followUp: card.due === today ? 'Today' : '',
      leadIdx,
    }))
  ).filter(l =>
    (l.name.toLowerCase().includes(filter.toLowerCase()) ||
      l.mobile.includes(filter) ||
      l.city.toLowerCase().includes(filter.toLowerCase())) &&
    (billFilter ? Number(l.bill) === Number(billFilter) : true) &&
    getDueFilter(l.due)
  );


  return (
    <Container fluid className="py-4 bg-light min-vh-100">
      <div className="cardpays-logo">CARDPAYS</div>
      <h3 className="mb-4">Leads</h3>
      <Card className="mb-3">
        <Card.Body>
          <Row className="g-2 align-items-center">
            <Col xs={12} md={3}>
              <InputGroup>
                <Form.Control placeholder="Search by name, mobile, city" value={filter} onChange={e => setFilter(e.target.value)} />
                <Button variant="outline-secondary" onClick={() => setFilter('')}>Clear</Button>
              </InputGroup>
            </Col>
            <Col xs={12} md={3}>
              <Form.Select value={billFilter} onChange={e => setBillFilter(e.target.value)}>
                <option value="">Bill Amount Filter</option>
                {Array.from(new Set(flatLeads.map(l => l.bill))).map(bill => (
                  <option key={bill} value={bill}>{Number(bill).toLocaleString()}</option>
                ))}
              </Form.Select>
            </Col>
            <Col xs={12} md={3}>
              <Form.Select value={dueFilter} onChange={e => setDueFilter(e.target.value)}>
                <option value="">Due Date Filter</option>
                <option value="today">Today</option>
                <option value="3days">Next 3 Days</option>
                <option value="7days">Next 7 Days</option>
                <option value="20days">Next 20 Days</option>
              </Form.Select>
            </Col>
            <Col xs="auto" className="ms-auto">
              <Button variant="primary" onClick={handleShow}>+ Add Lead</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <div className="table-responsive">
            <Table striped bordered hover size="sm" className="mb-0">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>WhatsApp</th>
                  <th>City</th>
                  <th>Booked Call</th>
                  <th>Owner</th>
                  <th>Bank Name</th>
                  <th>Bill Amount</th>
                  <th>Due Date</th>
                  <th>Card Type</th>
                  <th>Card Status</th>
                  <th>Remarks</th>
                  <th>All Card Total Bill</th>
                  <th>Follow-up</th>
                </tr>
              </thead>
              <tbody>
                {flatLeads.map((lead, idx) => (
                  <tr key={idx}>
                    <td>{lead.name}</td>
                    <td>{lead.mobile}</td>
                    <td>{lead.whatsapp}</td>
                    <td>{lead.city}</td>
                    <td>{lead.bookedCall}</td>
                    <td>{lead.owner}</td>
                    <td>{lead.bank}</td>
                    <td className="text-end">{Number(lead.bill).toLocaleString()}</td>
                    <td>{lead.due}</td>
                    <td>{lead.type}</td>
                    <td>{lead.status}</td>
                    <td>{lead.remarks}</td>
                    <td className="text-end">{Number(lead.allCardTotal).toLocaleString()}</td>
                    <td>
                      <Button size="sm" variant="outline-primary" onClick={() => openFollowUp(lead.leadIdx)}>Follow Up</Button>
                      {leads[lead.leadIdx]?.followUps?.length > 0 && (
                        <ul className="list-unstyled mb-0 mt-1">
                          {leads[lead.leadIdx].followUps.map((f, i) => (
                            <li key={i} className="small text-muted">{f.date}: {f.remarks}</li>
                          ))}
                        </ul>
                      )}
                    </td>
                  </tr>
                ))}
      {/* Follow Up Modal */}
      <Modal show={showFollowUp} onHide={closeFollowUp} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Follow Up</Modal.Title>
        </Modal.Header>
        <Form onSubmit={saveFollowUp}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" name="date" value={followUp.date} onChange={handleFollowUpChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Remarks</Form.Label>
              <Form.Control as="textarea" name="remarks" value={followUp.remarks} onChange={handleFollowUpChange} required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeFollowUp}>Cancel</Button>
            <Button variant="primary" type="submit">Save</Button>
          </Modal.Footer>
        </Form>
      </Modal>
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
      {/* Add Lead Modal */}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Lead</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAdd}>
          <Modal.Body>
            <Row className="g-2">
              <Col xs={12} md={4}>
                <Form.Group className="mb-2">
                  <Form.Label>Name</Form.Label>
                  <Form.Control name="name" value={form.name} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group className="mb-2">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control name="mobile" value={form.mobile} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group className="mb-2">
                  <Form.Label>WhatsApp No.</Form.Label>
                  <Form.Control name="whatsapp" value={form.whatsapp} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group className="mb-2">
                  <Form.Label>City</Form.Label>
                  <Form.Control name="city" value={form.city} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group className="mb-2">
                  <Form.Label>Booked Call</Form.Label>
                  <Form.Control name="bookedCall" value={form.bookedCall} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group className="mb-2">
                  <Form.Label>Owner</Form.Label>
                  <Form.Control name="owner" value={form.owner} readOnly />
                </Form.Group>
              </Col>
            </Row>
            <hr />
            <h6>Card Details</h6>
            <div className="table-responsive">
              <Table bordered size="sm" className="mb-2">
                <thead className="table-light">
                  <tr>
                    <th>Bank Name</th>
                    <th>Bill Amount</th>
                    <th>Due Date</th>
                    <th>Card Type</th>
                    <th>Card Status</th>
                    <th>Remarks</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {form.cards.map((card, idx) => (
                    <tr key={idx}>
                      <td>
                        <Form.Select name="bank" value={card.bank} onChange={e => handleCardChange(idx, e)} required>
                          <option value="">Select</option>
                          {bankOptions.map(b => <option key={b}>{b}</option>)}
                        </Form.Select>
                      </td>
                      <td>
                        <Form.Control name="bill" value={card.bill} onChange={e => handleCardChange(idx, e)} type="number" className="text-end" required />
                      </td>
                      <td>
                        <Form.Control name="due" value={card.due} onChange={e => handleCardChange(idx, e)} type="date" required />
                      </td>
                      <td>
                        <Form.Select name="type" value={card.type} onChange={e => handleCardChange(idx, e)} required>
                          {typeOptions.map(t => <option key={t}>{t}</option>)}
                        </Form.Select>
                      </td>
                      <td>
                        <Form.Select name="status" value={card.status} onChange={e => handleCardChange(idx, e)} required>
                          {statusOptions.map(s => <option key={s}>{s}</option>)}
                        </Form.Select>
                      </td>
                      <td>
                        <Form.Control name="remarks" value={card.remarks} onChange={e => handleCardChange(idx, e)} />
                      </td>
                      <td>
                        {form.cards.length > 1 && (
                          <Button variant="danger" size="sm" onClick={() => removeCardRow(idx)}>&times;</Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button variant="outline-primary" size="sm" onClick={addCardRow}>+ Add Card</Button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" type="submit">Add Lead</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default Leads;
