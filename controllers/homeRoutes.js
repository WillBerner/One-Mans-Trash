// Boilerplate router creation
const router = require('express').Router();

// Import user model and helper authorization middleware
const { User } = require('../models');
const withAuth = require('../utils/auth');

// Homepage route - render homepage.handlebars
router.get('/', async (req, res) => {
  try {
    
    // Pass serialized session value into homepage template
    res.render('homepage', {
      logged_in: req.session.logged_in 
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to certain routes
router.get('/profile', withAuth, async (req, res) => {
  try {
    
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    // Extract useful information from data
    const user = userData.get({ plain: true });

    // render profile page with user info (logged_in must be true if we're reached here because of withAuth middleware)
    res.render('profile', {
      ...user,
      logged_in: true
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

// Render the login page (if the user isn't already logged in)
router.get('/login', (req, res) => {

  // If the user is already logged in, redirect the request to another route (profile.handlebars)
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  // If nobody's logged in, render login.handlebars 
  res.render('login');
});

// Export router for use in controllers/index.js
module.exports = router;
