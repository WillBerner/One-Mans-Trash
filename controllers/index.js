// Boilerplate router creation
const router = require('express').Router();

// Import our routes to use
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

// Set up primary (home) routes and api routes
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

// Export router for use in server.js
module.exports = router;
