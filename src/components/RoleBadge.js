import React from 'react';
import { Badge } from 'react-bootstrap';

const roleColors = {
  Admin: 'danger',
  Manager: 'info',
  Accountant: 'success',
  Telecaller: 'primary',
  'Team Leader': 'warning',
};

function RoleBadge({ role }) {
  return <Badge bg={roleColors[role] || 'secondary'}>{role}</Badge>;
}

  // export default RoleBadge; // Commenting out the export to indicate removal
