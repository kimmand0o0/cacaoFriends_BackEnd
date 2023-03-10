const express = require('express');
const router = express.Router();

router.use('/api/login', require('./login.route'));
router.use('/api/users', require('./orders.route'));
router.use('/api/products', require('./product.route.js'));

module.exports = router;
