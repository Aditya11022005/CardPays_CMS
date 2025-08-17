import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Leads from './pages/Leads.jsx';
import Settings from './pages/Settings.jsx';
import Layout from './components/Layout.jsx';
import Transaction from './pages/Transaction.jsx';
import Accounting from './pages/Accounting.jsx';

import { mockUsers } from './mockUsers';
import './App.css';


function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('cardpays_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Shared dropdowns, charge %, branches
  const [bankOptions, setBankOptions] = useState(['HDFC', 'ICICI', 'INDUSIND']);
  const [typeOptions, setTypeOptions] = useState(['Visa', 'MasterCard', 'RuPay', 'Diners', 'Amex', 'Corporate']);
  const [statusOptions, setStatusOptions] = useState(['Active', 'Temp Block', 'Blocked', 'Don’t Know']);
  const [chargePercent, setChargePercent] = useState(4.5);
  const [branches, setBranches] = useState(['Delhi', 'Mumbai', 'Bangalore']);

  const handleLogin = (username, password) => {
    const found = mockUsers.find(
      (u) => u.username === username && u.password === password
    );
    if (found) {
      setUser(found);
      localStorage.setItem('cardpays_user', JSON.stringify(found));
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('cardpays_user');
  };

  const isAuthenticated = !!user;
  const userRole = user?.role;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? (
            <Layout user={user} onLogout={handleLogout}>
              <Dashboard user={user} />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route
          path="/leads"
          element={isAuthenticated ? (
            <Layout user={user} onLogout={handleLogout}>
              <Leads user={user} bankOptions={bankOptions} typeOptions={typeOptions} statusOptions={statusOptions} />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route
          path="/transaction"
          element={isAuthenticated ? (
            <Layout user={user} onLogout={handleLogout}>
              <Transaction user={user} bankOptions={bankOptions} typeOptions={typeOptions} statusOptions={statusOptions} chargePercent={chargePercent} />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route
          path="/accounting"
          element={isAuthenticated ? (
            <Layout user={user} onLogout={handleLogout}>
              <Accounting user={user} branches={branches} />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )}
        />

        <Route
          path="/settings"
          element={isAuthenticated ? (
            <Layout user={user} onLogout={handleLogout}>
              <Settings
                user={user}
                bankOptions={bankOptions} setBankOptions={setBankOptions}
                typeOptions={typeOptions} setTypeOptions={setTypeOptions}
                statusOptions={statusOptions} setStatusOptions={setStatusOptions}
                chargePercent={chargePercent} setChargePercent={setChargePercent}
                branches={branches} setBranches={setBranches}
              />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
