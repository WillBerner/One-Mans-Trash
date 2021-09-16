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

router.put('/updateEmail', async (req, res) => {

  let newEmail = { email: req.body.newEmail };
  let oldEmail = req.body.oldEmail;

  try {

    const updatedEmail = await User.update(newEmail, {
      where: {
        email: oldEmail
      }
    });

    res.status(200).json(updatedEmail);

  } catch (error) {
    res.status(500).json(error);
  }

});

router.put('/updateName', async (req, res) => {

  let newName = { name: req.body.newName };
  let userEmail = req.body.email;

  try {

    const updatedName = await User.update(newName, {
      where: {
        email: userEmail
      }
    });

    res.status(200).json(updatedName);
  } catch (error) {
    res.status(500).json(error);
  }

});

router.put('/updatePassword', async (req, res) => {

  let newPassword = { password: req.body.newPassword };
  let userEmail = req.body.email;

  try {

    const updatedName = await User.update(newPassword, {
      where: {
        email: userEmail
      },
      individualHooks: true,
    });

    res.status(200).json(updatedName);
  } catch (error) {
    res.status(500).json(error);
  }

});

// Export router for use in /controllers/api/index.js
module.exports = router;
