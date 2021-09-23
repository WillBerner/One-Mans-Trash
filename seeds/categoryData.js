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
    {
        category_name: 'Home',
    },
    {
        category_name: 'Gaming',
    },
    {
        category_name: 'Outdoor',
    },
    {
        category_name: 'Apparel',
    }
];

const seedCategory = () => Category.bulkCreate(categorydata);

module.exports = seedCategory;