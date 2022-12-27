const express = require('express');
const router = express.Router();

router.use("/products", require("./product.route.js"));

module.exports = router;
