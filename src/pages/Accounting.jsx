import React, { useState } from 'react';
import { Container, Card, Table, Row, Col, Form, Button } from 'react-bootstrap';

const branches = ['Delhi', 'Mumbai', 'Bangalore'];
const initialLedger = [
  { date: '2025-08-17', branch: 'Delhi', type: 'Receipt', amount: 10000, mode: 'Cash', remarks: 'Payment received' },
  { date: '2025-08-17', branch: 'Mumbai', type: 'Payment', amount: 5000, mode: 'Bank', remarks: 'Bill paid' },
];

function Accounting() {
  const [ledger, setLedger] = useState(initialLedger);
  const [branch, setBranch] = useState('');
  const [date, setDate] = useState('');
  const [editIdx, setEditIdx] = useState(-1);
  const [editRow, setEditRow] = useState({ date: '', branch: '', type: '', amount: '', mode: '', remarks: '' });
  const [showAdd, setShowAdd] = useState(false);
  const [addRow, setAddRow] = useState({ date: '', branch: '', type: '', amount: '', mode: '', remarks: '' });

  const filtered = ledger.filter(l =>
    (branch ? l.branch === branch : true) &&
    (date ? l.date === date : true)
  );

  const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditRow({ ...filtered[idx] });
  };
  const handleEditChange = (e) => {
    setEditRow({ ...editRow, [e.target.name]: e.target.value });
  };
  const saveEdit = (idx) => {
    const globalIdx = ledger.findIndex((l, i) => l === filtered[idx]);
    const updated = [...ledger];
    updated[globalIdx] = { ...editRow };
    setLedger(updated);
    setEditIdx(-1);
  };
  const cancelEdit = () => setEditIdx(-1);
  const handleDelete = (idx) => {
    const globalIdx = ledger.findIndex((l, i) => l === filtered[idx]);
    const updated = [...ledger];
    updated.splice(globalIdx, 1);
    setLedger(updated);
  };
  const handleAddChange = (e) => {
    setAddRow({ ...addRow, [e.target.name]: e.target.value });
  };
  const addLedgerRow = () => {
    setLedger([...ledger, { ...addRow }]);
    setAddRow({ date: '', branch: '', type: '', amount: '', mode: '', remarks: '' });
    setShowAdd(false);
  };

  return (
    <Container fluid className="py-4 bg-light min-vh-100">
      <div className="cardpays-logo">CARDPAYS</div>
      <h3 className="mb-4">Accounting & Ledger</h3>
      <Card className="mb-3">
        <Card.Body>
          <Row className="g-2 align-items-end">
            <Col xs={12} md={3}>
              <Form.Group>
                <Form.Label>Branch</Form.Label>
                <Form.Select value={branch} onChange={e => setBranch(e.target.value)}>
                  <option value="">All</option>
                  {branches.map(b => <option key={b}>{b}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" value={date} onChange={e => setDate(e.target.value)} />
              </Form.Group>
            </Col>
            <Col xs="auto" className="ms-auto d-flex align-items-center">
              <Button variant="outline-secondary" size="sm" className="me-2" onClick={() => setShowAdd(true)}>+ Add Row</Button>
              <Button variant="primary" size="sm" className="me-2">Export Excel</Button>
              <Button variant="secondary" size="sm" className="me-2">Export PDF</Button>
              <Button variant="warning" size="sm">Settings</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <div className="table-responsive">
            <Table bordered hover size="sm" className="mb-0">
              <thead className="table-light">
                <tr>
                  <th>Date</th>
                  <th>Branch</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Mode</th>
                  <th>Remarks</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((entry, idx) => (
                  editIdx === idx ? (
                    <tr key={idx}>
                      <td><Form.Control name="date" type="date" value={editRow.date} onChange={handleEditChange} size="sm" /></td>
                      <td><Form.Select name="branch" value={editRow.branch} onChange={handleEditChange} size="sm">{branches.map(b => <option key={b}>{b}</option>)}</Form.Select></td>
                      <td><Form.Select name="type" value={editRow.type} onChange={handleEditChange} size="sm"><option>Receipt</option><option>Payment</option></Form.Select></td>
                      <td><Form.Control name="amount" type="number" value={editRow.amount} onChange={handleEditChange} size="sm" /></td>
                      <td><Form.Control name="mode" value={editRow.mode} onChange={handleEditChange} size="sm" /></td>
                      <td><Form.Control name="remarks" value={editRow.remarks} onChange={handleEditChange} size="sm" /></td>
                      <td>
                        <Button size="sm" variant="success" className="me-1" onClick={() => saveEdit(idx)}>Save</Button>
                        <Button size="sm" variant="secondary" onClick={cancelEdit}>Cancel</Button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={idx}>
                      <td>{entry.date}</td>
                      <td>{entry.branch}</td>
                      <td>{entry.type}</td>
                      <td className="text-end">₹{entry.amount}</td>
                      <td>{entry.mode}</td>
                      <td>{entry.remarks}</td>
                      <td>
                        <Button size="sm" variant="outline-primary" className="me-1" onClick={() => handleEdit(idx)}>Edit</Button>
                        <Button size="sm" variant="outline-danger" onClick={() => handleDelete(idx)}>Delete</Button>
                      </td>
                    </tr>
                  )
                ))}
                {showAdd && (
                  <tr>
                    <td><Form.Control name="date" type="date" value={addRow.date} onChange={handleAddChange} size="sm" /></td>
                    <td><Form.Select name="branch" value={addRow.branch} onChange={handleAddChange} size="sm"><option value="">Select</option>{branches.map(b => <option key={b}>{b}</option>)}</Form.Select></td>
                    <td><Form.Select name="type" value={addRow.type} onChange={handleAddChange} size="sm"><option value="">Select</option><option>Receipt</option><option>Payment</option></Form.Select></td>
                    <td><Form.Control name="amount" type="number" value={addRow.amount} onChange={handleAddChange} size="sm" /></td>
                    <td><Form.Control name="mode" value={addRow.mode} onChange={handleAddChange} size="sm" /></td>
                    <td><Form.Control name="remarks" value={addRow.remarks} onChange={handleAddChange} size="sm" /></td>
                    <td>
                      <Button size="sm" variant="success" className="me-1" onClick={addLedgerRow}>Add</Button>
                      <Button size="sm" variant="secondary" onClick={() => setShowAdd(false)}>Cancel</Button>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Accounting;
