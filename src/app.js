const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Route principale
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// API de santé
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'App is running!',
    timestamp: new Date().toISOString(),
    version: process.env.APP_VERSION || '1.0.0'
  });
});

// API de salutation
app.get('/api/hello/:name', (req, res) => {
  const { name } = req.params;
  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Name is required' });
  }
  res.json({
    message: `Hello, ${name}! 👋`,
    name: name
  });
});

// Route 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;
