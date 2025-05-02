// File: frontend/pages/Dashboard.jsx
import React, { useState } from "react";
import VulnerabilityTable from "../components/VulnerabilityTable";

const Dashboard = () => {
  const [fileContent, setFileContent] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [results, setResults] = useState([]);

  const handleScan = async () => {
    const response = await fetch("/api/scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dependencyFile: fileContent,
        filename: "package-lock.json",
      }),
    });
    const data = await response.json();
    setResults(data.results || []);
  };

  const handleScanUrl = async () => {
    const response = await fetch("/api/scan-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileUrl,
        filename: "package-lock.json",
      }),
    });
    const data = await response.json();
    setResults(data.results || []);
  };

  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="font-bold mb-2">Paste Dependency File</h2>
        <textarea
          className="w-full h-40 border p-2"
          value={fileContent}
          onChange={(e) => setFileContent(e.target.value)}
          placeholder="Paste your package-lock.json content here..."
        />
        <button
          onClick={handleScan}
          className="mt-2 bg-blue-500 text-white px-4 py-2"
        >
          Scan Pasted Code
        </button>
      </div>

      <div>
        <h2 className="font-bold mb-2">Scan From URL</h2>
        <input
          type="text"
          className="w-full border p-2"
          value={fileUrl}
          onChange={(e) => setFileUrl(e.target.value)}
          placeholder="Enter URL to package-lock.json"
        />
        <button
          onClick={handleScanUrl}
          className="mt-2 bg-green-600 text-white px-4 py-2"
        >
          Scan URL
        </button>
      </div>

      <VulnerabilityTable results={results} />
    </div>
  );
};

export default Dashboard;
