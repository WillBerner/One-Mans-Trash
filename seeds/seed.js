const sequelize = require('../config/connection');
const { User } = require('../models');
const seedCategory = require('./categoryData');
const seedProduct = require('./productData');

const userData = require('./userData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await seedCategory();

  await seedProduct();

  process.exit(0);
};

seedDatabase();
