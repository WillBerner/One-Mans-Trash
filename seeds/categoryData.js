const { Category } = require('../models');

const categorydata = [
    {
        category_name: 'Appliances',
    },
    {
        category_name: 'Furniture',
    },
    {
        category_name: 'Electronics',
    },
    {
        category_name: 'Tools',
    },
];

const seedCategory = () => Category.bulkCreate(categorydata);

module.exports = seedCategory;