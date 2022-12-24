const express = require("express");
const router = express.Router();

const MainController = require("../workspace/main/main.controller.js");
const mainController = new MainController();

router.get("/slides", mainController.getProductsSlides);
router.get("/new", mainController.getProductsNew);

module.exports = router;
