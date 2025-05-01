// === Backend: Node.js (Express) ===
// File: backend/routes/scan.js
const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

router.post('/scan', async (req, res) => {
  try {
    const { dependencyFile, filename } = req.body; // expects raw file content and filename
    const tempPath = path.join(__dirname, `../tmp/${filename}`);

    // Write file to tmp
    fs.writeFileSync(tempPath, dependencyFile);

    // Run osv-scanner on the file
    exec(`osv-scanner --lockfile=${tempPath} --json`, (error, stdout, stderr) => {
      if (error) {
        console.error('Scan error:', error);
        return res.status(500).json({ error: 'Scanner failed.' });
      }
      res.json(JSON.parse(stdout));
    });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;