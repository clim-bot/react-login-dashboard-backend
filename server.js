require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const routes = require('./src/routes');
const cors = require('cors');

const app = express();

// Connect to MongoDB
connectDB();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Use routes from the main routes file
app.use('/api', routes);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
