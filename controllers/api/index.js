// Boilerplate router creation
const router = require('express').Router();

// Import user routes (login, register, logout)
const userRoutes = require('./userRoutes');

// Use userRoutes as middleware
router.use('/users', userRoutes);

// Export router for use in controllers/index.js
module.exports = router;
