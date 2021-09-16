// Boilerplate router creation
const router = require('express').Router();

// Import user routes (login, register, logout)
const userRoutes = require('./userRoutes');

// Import product routes (get, post, put, delete, etc)
const productRoutes = require('./productRoutes');

// Use userRoutes as middleware
router.use('/users', userRoutes);
router.use('/products', productRoutes);

// Export router for use in controllers/index.js
module.exports = router;
