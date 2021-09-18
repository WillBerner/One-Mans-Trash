// Authenication middleware to make sure user is logged in before accessing certain routes

const withAuth = (req, res, next) => {
  
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    res.redirect('/login');

  } else {
    
    // If the user is logged in, continue to whatever protected route was requested
    next();
  }
};

// Export for use for /controllers routes
module.exports = withAuth;
