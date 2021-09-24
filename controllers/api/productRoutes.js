// Boilerplate router creation
const router = require('express').Router();
const { multerUploads, datauri } = require('../../config/multer');
const cloudinary = require('../../config/cloudinary');

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

// Upload a user's image to cloud storage and return the url link
router.post('/upload-fileUpload', multerUploads.single('fileupload'), async (req, res) => {
    const file = datauri(req);
    cloudinary.uploader.upload(file.content,
        { dpr: "auto", responsive: true, width: "auto", crop: "scale" },
        (error, result) => {
            res.status(200).json(result.secure_url);
        }
    );
})

// Delete a product from a user
router.delete('/:id', withAuth, async (req, res) => {

    try {

        // Get product-being-deleted's owner ID
        const productToDelete = await Product.findByPk(req.params.id);
        const productOwnerID = productToDelete.dataValues.user_id;

        // Check to make sure the person deleting the product is the owner of the product
        if (productOwnerID !== req.session.user_id) {
            res.status(403).json({ message: "You cannot delete products that do not belong to you" });
            return;
        }

        // Attempt to delete the product
        const deletedProduct = await Product.destroy({
            where: {
                id: req.params.id
            }
        });

        res.status(200).json({ message: 'Product deleted successfully' });

    } catch (error) {
        res.status(500).json(error);
    }

});

module.exports = router;