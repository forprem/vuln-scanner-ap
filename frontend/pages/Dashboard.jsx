// File: frontend/pages/Dashboard.jsx
import React, { useState } from 'react';
import VulnerabilityTable from '../components/VulnerabilityTable';

const Dashboard = () => {
  const [fileContent, setFileContent] = useState('');
  const [results, setResults] = useState([]);

  const handleScan = async () => {
    const response = await fetch('/api/scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dependencyFile: fileContent, filename: 'package-lock.json' }),
    });
    const data = await response.json();
    setResults(data.results || []);
  };

  return (
    <div className="p-4">
      <textarea className="w-full h-40 border p-2" value={fileContent} onChange={(e) => setFileContent(e.target.value)} />
      <button onClick={handleScan} className="mt-2 bg-blue-500 text-white px-4 py-2">Scan</button>
      <VulnerabilityTable results={results} />
    </div>
  );
};

export default Dashboard;
