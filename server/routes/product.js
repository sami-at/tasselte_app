const {
    allProducts,
    createProduct,
    singleProduct,
    updateProduct,
    deleteProduct

} = require('../controllers/productController');
const { isAuthorized, isLoggedIn } = require('../middlewares/user');
const express = require('express');


const router = express.Router();


router.route('/products/all_products').get(allProducts);
router.route('/products/:productId').get(singleProduct);

router.route('/products/create_product').post(isLoggedIn, isAuthorized('admin'), createProduct);
router.route('/products/update_product/:productId').post(isLoggedIn, isAuthorized('admin'), updateProduct);
router.route('/products/update_product/:productId').delete(isLoggedIn, isAuthorized('admin'), deleteProduct);
module.exports = router;