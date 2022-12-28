const express = require('express');
const router = express.Router();

const ProductController = require('../architecture/controllers/product.controller.js');
const productController = new ProductController();

router.post('/', productController.createProducts);
router.get('/new', productController.getProductsNew);
router.get('/hot', productController.getProductsBest);
router.get(
    '/characters/:characterName',
    productController.getProductsCharacterName
);
// router.get('/characters', productController.getProductsCharacterName);
router.get('/:productId', productController.getProductsDetail);

module.exports = router;
