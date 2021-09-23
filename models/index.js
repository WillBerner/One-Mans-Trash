const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');

Category.hasMany(Product, {
  foreignKey: 'category_id',
});

Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

User.hasMany(Product, {
  foreignKey: 'user_id',
});

Product.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Category, Product };