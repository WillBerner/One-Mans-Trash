// Boilerplate router creation
const router = require('express').Router();

// Importing models
const { Product, Category, User } = require('../../models');

// Importing authentication middelware for protected routes
const withAuth = require('../../utils/auth');

// Add a new product if a user is logged in using withAuth middleware
router.post('/', withAuth, async (req, res) => {
    
    // Req.body should look like:
    // {
    //      "product_name": "something",
    //      "description": "some description",
    //      "img_url": "url",
    //      "location_zipcode": "12345",
    //      "category_name": "Electronics"
    // }

    try {

        // Get category data by category name from database
        const category = await Category.findOne({ 
            where: {
                category_name: req.body.category_name
            }
        });

        // Get category ID from category data and add it to request body
        req.body.category_id = category.dataValues.id;

        // Get user_id from session and add it to request body
        req.body.user_id = req.session.user_id;

        // Create new product using request body
        const product = await Product.create(req.body);

        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json(error);
    }
});


router.get('/', async (req, res) => {
    try {
        const productData = await Product.findAll({
            include: [{ model: Category }, { model: User }],
        });
        res.status(200).json(productData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {

    try {
        const productData = await Product.findOne({
            where: {
                id: req.params.id,
            },
            include:  [ { model: Category } ],
        });
        
        if(!productData) {
            res.status(404).json({ message: 'No product found with that ID'});
            return;
        }
        console.log(productData);
        const oneProduct = productData.get({ plain: true });
        console.log(oneProduct);
        res.status(200).json(oneProduct);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

router.delete('/:id', async (req, res) => {

    try {
        const deletedProduct = await Product.destroy({
            where: { 
                id: req.params.id
            }
        });

        res.status(200).json({ message: 'Product deleted successfully'});

    } catch (error) {
        res.status(500).json(error);
    }

});

module.exports = router;