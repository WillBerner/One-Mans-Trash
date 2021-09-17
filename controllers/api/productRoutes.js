// Boilerplate router creation
const router = require('express').Router();

const { Product, Category, User } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const productData = await Product.findAll({
            include: [{ model: Category }, { model: User }],
        });
        // res.status(200).json(productData);
        const allProducts = productData.map((product) => product.get({ plain: true }));
        console.log(productData);
        res.render('product', {allProducts});
    } catch (err) {
        res.status(500).json(err);
    }
});

// router.get('/:id', async (req,res) => {

//     try {
//         const productData = await Product.findOne({
//             where: {
//                 id: req.params.id,
//             },
//             include: [ { model: Category }, { model: Product } ],
//         });
        
//         if(!productData) {
//             res.status(404).json({ message: 'No product found with that ID'});
//             return;
//         }
//         const oneProduct = productData.map((product) => product.get({ plain: true }));
//         console.log(productData);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });
module.exports = router;