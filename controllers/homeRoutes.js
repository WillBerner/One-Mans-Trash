const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    
    // Pass serialized session flag into template
    res.render('homepage', {
      logged_in: req.session.logged_in,
      shelves: [
        {
          title: "Today's Picks",
          products: [
            {
              description: 'whatever',
              price: 'free'
            },
            {
              description: 'soft',
              price: '$1'
            },
            {
              description: 'car',
              price: '$2'
            },            
            {
              description: 'horse',
              price: '$3'
            }
          ]
        },
        {
          title: "ELECTRONICS",
          products: [
            {
              description: 'Phone',
              price: 'free'
            },
            {
              description: 'Tablet',
              price: '$1'
            },
            {
              description: 'computer',
              price: '$2'
            },            
            {
              description: 'iPad',
              price: '$3'
            }
          ]
        },{
          title: "APPAREL",
          products: [
            {
              description: 'underwear',
              price: 'free'
            },
            {
              description: 'shirt',
              price: '$1'
            },
            {
              description: 'pants',
              price: '$2'
            },            
            {
              description: 'socks',
              price: '$3'
            }
          ]
        },{
          title: "HOME",
          products: [
            {
              description: 'couch',
              price: 'free'
            },
            {
              description: 'chair',
              price: '$1'
            },
            {
              description: 'clock',
              price: '$2'
            },            
            {
              description: 'art',
              price: '$3'
            }
          ]
        }
      ]
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {

  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
