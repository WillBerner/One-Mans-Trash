const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Attempt to update a user's email address
router.put('/updateEmail', async (req, res) => {

  // Get the new email address to set
  let newEmail = { email: req.body.newEmail };
  // Get the user's current email address to know which user to update
  let oldEmail = req.body.oldEmail;

  // Try to update the database with the new email
  try {

    const updatedEmail = await User.update(newEmail, {
      where: {
        email: oldEmail
      }
    });

    // If all is successful, update the client
    res.status(200).json(updatedEmail);
  } catch (error) {
    res.status(500).json(error);
  }

});

// Attempt to update a user's name
router.put('/updateName', async (req, res) => {

  // Get the new name to set
  let newName = { name: req.body.newName };
  // Get the current user's email address to know which user to update
  let userEmail = req.body.email;

  // Try to update the database with the new name
  try {

    const updatedName = await User.update(newName, {
      where: {
        email: userEmail
      }
    });

    // If all is successful, update the client
    res.status(200).json(updatedName);
  } catch (error) {
    res.status(500).json(error);
  }

});

// Attempt to update a user's password
router.put('/updatePassword', async (req, res) => {

  // Get the new plaintext password to set
  let newPassword = { password: req.body.newPassword };
  
  // Get the current user's email address to know which user to update
  let userEmail = req.body.email;

  // Try to update the database with the new password, and hash it beforehand with Hook
  try {

    const updatedName = await User.update(newPassword, {
      where: {
        email: userEmail
      },
      individualHooks: true,
    });

    // If all is successful, update the client
    res.status(200).json(updatedName);
  } catch (error) {
    res.status(500).json(error);
  }

});

// Export router for use in /controllers/api/index.js
module.exports = router;
