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
  foreignKey: 'product_id',
});

Product.belongsTo(User, {
  foreignKey: 'product_id',
});

module.exports = { User, Category, Product };

