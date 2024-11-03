const express = require('express');
const authRoutes = require('./authRoutes');

const router = express.Router();

// Health Check Route
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'Server is healthy' });
});

// Authentication Routes
router.use('/auth', authRoutes);

// 404 Route for undefined paths
router.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = router;
