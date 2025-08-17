
import React, { useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import '../App.css';

function Settings({
  bankOptions, setBankOptions,
  typeOptions, setTypeOptions,
  statusOptions, setStatusOptions,
  chargePercent, setChargePercent,
  branches, setBranches
}) {
  // Local input states
  const [bankInput, setBankInput] = useState('');
  const [typeInput, setTypeInput] = useState('');
  const [statusInput, setStatusInput] = useState('');
  const [branchInput, setBranchInput] = useState('');
  const [chargeInput, setChargeInput] = useState(chargePercent);

  // Add handlers
  const addBank = () => {
    if (bankInput && !bankOptions.includes(bankInput)) {
      setBankOptions([...bankOptions, bankInput]);
      setBankInput('');
    }
  };
  const removeBank = (b) => setBankOptions(bankOptions.filter(x => x !== b));

  const addType = () => {
    if (typeInput && !typeOptions.includes(typeInput)) {
      setTypeOptions([...typeOptions, typeInput]);
      setTypeInput('');
    }
  };
  const removeType = (t) => setTypeOptions(typeOptions.filter(x => x !== t));

  const addStatus = () => {
    if (statusInput && !statusOptions.includes(statusInput)) {
      setStatusOptions([...statusOptions, statusInput]);
      setStatusInput('');
    }
  };
  const removeStatus = (s) => setStatusOptions(statusOptions.filter(x => x !== s));

  const addBranch = () => {
    if (branchInput && !branches.includes(branchInput)) {
      setBranches([...branches, branchInput]);
      setBranchInput('');
    }
  };
  const removeBranch = (b) => setBranches(branches.filter(x => x !== b));

  const saveCharge = () => {
    if (chargeInput > 0) setChargePercent(Number(chargeInput));
  };

  return (
    <Container className="py-4">
      <div className="cardpays-logo">CARDPAYS</div>
      <h3 className="mb-4">Settings</h3>
      <Card className="mb-4">
        <Card.Body>
          <h5 className="mb-3">Dropdown Management</h5>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Bank Names</label>
              <div className="input-group mb-2">
                <input className="form-control" placeholder="Add new bank" value={bankInput} onChange={e => setBankInput(e.target.value)} />
                <Button variant="primary" onClick={addBank}>Add</Button>
              </div>
              <ul className="list-group">
                {bankOptions.map(b => (
                  <li className="list-group-item d-flex justify-content-between align-items-center" key={b}>
                    {b}
                    <Button size="sm" variant="danger" onClick={() => removeBank(b)}>&times;</Button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-4">
              <label className="form-label">Card Types</label>
              <div className="input-group mb-2">
                <input className="form-control" placeholder="Add new type" value={typeInput} onChange={e => setTypeInput(e.target.value)} />
                <Button variant="primary" onClick={addType}>Add</Button>
              </div>
              <ul className="list-group">
                {typeOptions.map(t => (
                  <li className="list-group-item d-flex justify-content-between align-items-center" key={t}>
                    {t}
                    <Button size="sm" variant="danger" onClick={() => removeType(t)}>&times;</Button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-4">
              <label className="form-label">Card Status</label>
              <div className="input-group mb-2">
                <input className="form-control" placeholder="Add new status" value={statusInput} onChange={e => setStatusInput(e.target.value)} />
                <Button variant="primary" onClick={addStatus}>Add</Button>
              </div>
              <ul className="list-group">
                {statusOptions.map(s => (
                  <li className="list-group-item d-flex justify-content-between align-items-center" key={s}>
                    {s}
                    <Button size="sm" variant="danger" onClick={() => removeStatus(s)}>&times;</Button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card.Body>
      </Card>
      <Card className="mb-4">
        <Card.Body>
          <h5 className="mb-3">Default Charge %</h5>
          <div className="row g-3 align-items-center">
            <div className="col-auto">
              <input type="number" className="form-control" value={chargeInput} onChange={e => setChargeInput(e.target.value)} min="0" step="0.1" />
            </div>
            <div className="col-auto">
              <Button variant="success" onClick={saveCharge}>Save</Button>
            </div>
            <div className="col-auto">
              <span className="form-text">(Used in Transaction page)</span>
            </div>
          </div>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <h5 className="mb-3">Branch Management</h5>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Branches</label>
              <div className="input-group mb-2">
                <input className="form-control" placeholder="Add new branch" value={branchInput} onChange={e => setBranchInput(e.target.value)} />
                <Button variant="primary" onClick={addBranch}>Add</Button>
              </div>
              <ul className="list-group">
                {branches.map(b => (
                  <li className="list-group-item d-flex justify-content-between align-items-center" key={b}>
                    {b}
                    <Button size="sm" variant="danger" onClick={() => removeBranch(b)}>&times;</Button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Settings;
