const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.use(express.json());

app.all('/proxy/api.openai.com/*', async (req, res) => {
  const url = req.originalUrl.replace('/proxy/api.openai.com', 'https://vercelproxy.021016.xyz');
  try {
    const response = await fetch(url, {
      method: req.method,
      headers: req.headers,
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = app;