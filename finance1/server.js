const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Proxy all requests to Flask backend
app.use('/', createProxyMiddleware({
    target: 'http://localhost:5000',
    changeOrigin: true,
}));

app.listen(port, () => {
    console.log(`Proxy server is running on port ${port}`);
});