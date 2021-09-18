const router = require('express').Router();
const userRoutes = require('./userRoutes');

// Import product routes (get, post, put, delete, etc)
const productRoutes = require('./productRoutes');

// Use userRoutes as middleware
router.use('/users', userRoutes);
router.use('/products', productRoutes);

module.exports = router;
