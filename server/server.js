// server/server.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes/items');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', routes);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).send('404: Page Not Found');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
