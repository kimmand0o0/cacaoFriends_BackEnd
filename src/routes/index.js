const express = require('express');
const router = express.Router();

router.use('/api/users', require('./users.route'));
router.use('/api/products', require('./product.route.js'));

module.exports = router;
