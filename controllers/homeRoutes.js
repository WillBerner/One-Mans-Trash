// Boilerplate router creation
const router = require("express").Router();

// Import user model and helper authorization middleware
const { User, Product, Category } = require("../models");
const withAuth = require("../utils/auth");
var shelves = [
  {
    title: "Today's Picks",
    products: [
      {
        description: "whatever",
        price: "free",
      },
      {
        description: "soft",
        price: "$1",
      },
      {
        description: "car",
        price: "$2",
      },
      {
        description: "horse",
        price: "$3",
      },
    ],
  },
  {
    title: "ELECTRONICS",
    products: [
      {
        description: "Phone",
        price: "free",
      },
      {
        description: "Tablet",
        price: "$1",
      },
      {
        description: "computer",
        price: "$2",
      },
      {
        description: "iPad",
        price: "$3",
      },
    ],
  },
  {
    title: "APPAREL",
    products: [
      {
        description: "underwear",
        price: "free",
      },
      {
        description: "shirt",
        price: "$1",
      },
      {
        description: "pants",
        price: "$2",
      },
      {
        description: "socks",
        price: "$3",
      },
    ],
  },
  {
    title: "HOME",
    products: [
      {
        description: "couch",
        price: "free",
      },
      {
        description: "chair",
        price: "$1",
      },
      {
        description: "clock",
        price: "$2",
      },
      {
        description: "art",
        price: "$3",
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
      allCategories,
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

// Export router for use in controllers/index.js
module.exports = router;
