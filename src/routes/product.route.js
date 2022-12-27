const express = require("express");
const router = express.Router();

const ProductController = require("../architecture/controllers/product.controller.js");
const productController = new ProductController();

const upload = require('../modules/module.js');

router.post("/", productController.createProducts);
router.get("/new", productController.getProductsNew);
router.get("/hot", productController.getProductsBest);
router.get("/characters/:characterName", productController.getProductscharacterName);
router.get("/:productId", productController.getProductsDetail);
// router.post("/slides", upload.single('slideImg'), productController.createProductsSlides);
// router.get("/slides", productController.getProductsSlides);
// router.post("/shorts", productController.createProductsShorts);
// router.get("/shorts", productController.getProductsShorts);

module.exports = router;
