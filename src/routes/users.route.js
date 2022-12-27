const express = require('express');
const router = express.Router();
const OrdersController = require('../architecture/controllers/orders.controller');
const ordersController = new OrdersController();
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/orderLists', ordersController.findAllOrderLists);
router.post('/orderLists', ordersController.addOrderLists);

router.get('/carts', ordersController.findCarts);
router.post('/carts', ordersController.addCarts);
router.put('/carts/:productId', ordersController.updateProductAmountInCarts);
router.put('/carts/delete/:productId', ordersController.deleteProductInCarts);

module.exports = router;
