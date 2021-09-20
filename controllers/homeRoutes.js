// Boilerplate router creation
const router = require("express").Router();

// Import user model and helper authorization middleware
const { User, Product, Category } = require("../models");
const withAuth = require("../utils/auth");
var shelves = [
  {
    category_name: "Today's Picks",
    products: [
      {
        description: "whatever",
        product_name: "free",
        img_url: "https://embassycleaners.com/wp-content/uploads/2016/05/old-sofa-couch.jpg"
      },
      {
        description: "soft",
        product_name: "$1",
        img_url: "https://embassycleaners.com/wp-content/uploads/2016/05/old-sofa-couch.jpg"
      },
      {
        description: "car",
        product_name: "$2",
        img_url: "https://embassycleaners.com/wp-content/uploads/2016/05/old-sofa-couch.jpg"
      },
      {
        description: "horse",
        product_name: "$3",
        img_url: "https://embassycleaners.com/wp-content/uploads/2016/05/old-sofa-couch.jpg"
      },
    ],
  },
  {
    category_name: "ELECTRONICS",
    products: [
      {
        description: "Phone",
        product_name: "free",
        img_url: "https://embassycleaners.com/wp-content/uploads/2016/05/old-sofa-couch.jpg"
      },
      {
        description: "Tablet",
        product_name: "$1",
        img_url: "https://embassycleaners.com/wp-content/uploads/2016/05/old-sofa-couch.jpg"
      },
      {
        description: "computer",
        product_name: "$2",
        img_url: "https://embassycleaners.com/wp-content/uploads/2016/05/old-sofa-couch.jpg"
      },
      {
        description: "iPad",
        product_name: "$3",
        img_url: "https://embassycleaners.com/wp-content/uploads/2016/05/old-sofa-couch.jpg"
      },
    ],
  },
  {
    category_name: "APPAREL",
    products: [
      {
        description: "underwear",
        product_name: "free",
        img_url: "https://embassycleaners.com/wp-content/uploads/2016/05/old-sofa-couch.jpg"
      },
      {
        description: "shirt",
        product_name: "$1",
        img_url: "https://embassycleaners.com/wp-content/uploads/2016/05/old-sofa-couch.jpg"
      },
      {
        description: "pants",
        product_name: "$2",
        img_url: "https://embassycleaners.com/wp-content/uploads/2016/05/old-sofa-couch.jpg"
      },
      {
        description: "socks",
        product_name: "$3",
        img_url: "https://embassycleaners.com/wp-content/uploads/2016/05/old-sofa-couch.jpg"
      },
    ],
  },
  {
    category_name: "HOME",
    products: [
      {
        description: "couch",
        product_name: "free",
        img_url: "https://embassycleaners.com/wp-content/uploads/2016/05/old-sofa-couch.jpg"
      },
      {
        description: "chair",
        product_name: "$1",
        img_url: "https://embassycleaners.com/wp-content/uploads/2016/05/old-sofa-couch.jpg"
      },
      {
        description: "clock",
        product_name: "$2",
        img_url: "https://embassycleaners.com/wp-content/uploads/2016/05/old-sofa-couch.jpg"
      },
      {
        description: "art",
        product_name: "$3",
        img_url: "https://embassycleaners.com/wp-content/uploads/2016/05/old-sofa-couch.jpg"
      },
    ],
  },
];

// Homepage route - render homepage.handlebars
router.get("/", async (req, res) => {
  console.log("hit home route");
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product, include: [{ model: User }] }],
    });

    const allCategories = categoryData.map((category) =>
      category.get({ plain: true })
    );
    console.log(allCategories);

    // Pass serialized session value into homepage template
    res.render("homepage", {
      logged_in: req.session.logged_in,
      // Mock shelves can be removed when the backend feature is ready
      shelves,
      // Mock categories can be removed when the backend feature is ready
      categories: allCategories,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to certain routes
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });

    // Extract useful information from data
    const user = userData.get({ plain: true });

    // render profile page with user info (logged_in must be true if we're reached here because of withAuth middleware)
    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render the login page (if the user isn't already logged in)
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route (profile.handlebars)
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  // If nobody's logged in, render login.handlebars
  res.render("login");
});

router.get('/logout', async (req, res) => {
  await fetch('/api/users/logout', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
});

// Export router for use in controllers/index.js
module.exports = router;
