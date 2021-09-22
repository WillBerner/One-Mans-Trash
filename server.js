// Import npm dependencies
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Import our routes
const routes = require('./controllers');

// Import sequelize database connection
const sequelize = require('./config/connection');

// Set up express server
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine
const hbs = exphbs.create();

// Create session options
const sess = {

  // Get session secret from .env file
  secret: process.env.SESSION_SECRET,

  // For development, set session expiration time to one minute. Feel free to adjust
  cookie: {
    maxAge: 600000
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// Use session middleware for authentication and authorization
app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Boilerplate express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));


// Connect backend routes to server
app.use(routes);

// Sync server with database and then start
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening at http://localhost:' + PORT));
});
