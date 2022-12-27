const express = require('express');
const router = express.Router();

router.use('/users', require('./user'));
router.use('/api/users', require('./users.route'));

module.exports = router;
