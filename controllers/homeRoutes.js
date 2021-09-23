// Boilerplate router creation
const router = require("express").Router();

const { all } = require(".");
// Import user model and helper authorization middleware
const { User, Product, Category } = require("../models");
const withAuth = require("../utils/auth");

// Homepage route - render homepage.handlebars
const getAllCategories = async () => {
  const categoryData = await Category.findAll({
    include: [{ model: Product }],
  });
  const allCategories = categoryData.map((category) =>
    category.get({ plain: true })
  );
  return allCategories;
};

const getAllProducts = async () => {
  const productData = await Product.findAll({
    include: [{ model: Category }],
  });
  const allListings = productData.map((listing) =>
    listing.get({ plain: true })
  );
  // console.log(allListings);
  return allListings;
};

const getProductById = async (productId) => {
  const product = await (
    await Product.findByPk(productId)
  ).get({ plain: true });
  return product;
};

const getProductsByCategoryId = async (categoryId) => {
  const products = await Product.findAll({
    where: {
      category_id: categoryId,
    },
  });
  return products.map((product) => product.get({ plain: true }));
};

router.get("/", async (req, res) => {
  console.log("hit home route");
  try {
    const categoryData = await getAllCategories();
    const productData = await getAllProducts();

    const shelves = categoryData.map((category) => {
      const shelf = {
        category_name: category.category_name,
        products: productData.filter((product) => {
          return product.category_id === category.id;
        }),
      };
      return shelf;
    });

    // Pass serialized session value into homepage template
    res.render("homepage", {
      logged_in: req.session.logged_in,
      // Mock shelves can be removed when the backend feature is ready
      shelves: shelves,
      // Mock categories can be removed when the backend feature is ready
      categories: categoryData,
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

router.get("/category/:categoryId", async (req, res) => {
  const id = req.params.categoryId;
  const category = await Category.findAll({
    where: {
      category_name: id,
    },
  });
  const productData = await getProductsByCategoryId(category[0].id);
  
  res.render("homepage", {
    shelves: [
      {
        category_name: category[0].category_name,
        products: productData,
      },
    ],
    categories: await getAllCategories()
  });
});

router.get("/listing/:listingId", async (req, res) => {
  const categoryData = await getAllCategories();
  const id = req.params.listingId;
  const productData = await getProductById(id);
  const temp = {
    categories: categoryData,
    ...productData,
  };
  res.render("productPage", temp);
});


router.get("/new-post", async (req, res) => {
  res.render("productCreate")
})

// Export router for use in controllers/index.js
module.exports = router;
