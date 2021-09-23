// Import necessary npm dependencies
const Sequelize = require('sequelize');
// const mysql = require('mysql2');


// Declare sequelize variable in global scope to export
let sequelize;

// Assign sequalize variable with .env credentials
if (process.env.JAWSDB_URL) {

  // For use when deployed to Heroku
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {

  // For use when developing on local machine
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}



// Export sequelize connection
module.exports = sequelize;
