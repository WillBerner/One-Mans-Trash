// Boilerplate router creation
const router = require('express').Router();

// Import user model
const { User } = require('../../models');

// Attempt to create a new user from request body
router.post('/', async (req, res) => {
  try {

    const userData = await User.create(req.body);

    // If successful, create user session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// Attempt to login user based on given email/password combo
router.post('/login', async (req, res) => {
  try {

    const userData = await User.findOne({ where: { email: req.body.email } });

    // If no email found, respond with error message
    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    // If email exists but password is invalid, respond with error message
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // If email/password are correct, create user session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// Log user out by destroying their session (if they are actually logged in)
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Export router for use in /controllers/api/index.js
module.exports = router;
