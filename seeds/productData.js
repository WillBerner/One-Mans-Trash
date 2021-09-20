const { Product } = require('../models');

const productdata = [
    {
        product_name: 'Washer',
        description: 'Fairly old whirlpool washer that does not currently work. I do not have the time to fix it myself.',
        img_url: '/images/Assets/washer.jpg',
        location_zipcode: '27513',
        category_id: 1,
        user_id: 2,
    },
    {
        product_name: 'stove top',
        description: 'Used stove top. In working condition, no longer have need for it.',
        img_url: '/images/Assets/stove-top.jpg',
        location_zipcode: '27607',
        category_id: 1,
        user_id: 2,
    },
    {
        product_name: 'Couch',
        description: 'Older family couch. Has a little wear and tear, but can easily be repurposed.',
        img_url: '/images/Assets/couch.jpg',
        location_zipcode: '27604',
        category_id: 2,
        user_id: 2,
    },
    {
        product_name: 'Side table',
        description: 'Damaged side table with scuff marks',
        img_url: '/images/Assets/side-table.jpg',
        location_zipcode: '27604',
        category_id: 2,
        user_id: 2,
    },
    {
        product_name: 'Gameboy Color',
        description: 'Old gameboy color found in my sons room. Still works, but has no games.',
        img_url: '/images/Assets/gameboy.jpg',
        location_zipcode: '27602',
        category_id: 3,
        user_id: 2,
    },
    {
        product_name: 'Old TV',
        description: 'I have an old TV with a large back, one of the really old ones.',
        img_url: '/images/Assets/old-tv.jpg',
        location_zipcode: '27607',
        category_id: 3,
        user_id: 2,
    },
    {
        product_name: 'Rusted Screwdrivers',
        description: 'Tin Can full of rusty screwdrivers that are no longer being used.',
        img_url: '/images/Assets/screwdriver.jpg',
        location_zipcode: '27560',
        category_id: 4,
        user_id: 2,
    },
    {
        product_name: 'Axe',
        description: 'Wooden handle axe that I no longer need.',
        img_url: '/images/Assets/axe.jpg',
        location_zipcode: '27616',
        category_id: 4,
        user_id: 2,
    },

];

const seedProduct = () => Product.bulkCreate(productdata);

module.exports = seedProduct;