import React from 'react';
import DataTable from '../components/DataTable';

const mockData = [
  { name: 'John Doe', email: 'john.doe@example.com' },
  { name: 'Jane Smith', email: 'jane.smith@example.com' },
];

function Dashboard() {
  return (
    <div className="container mt-5">
      <h1>Dashboard</h1>
      <DataTable data={mockData} />
    </div>
  );
}

export default Dashboard;
