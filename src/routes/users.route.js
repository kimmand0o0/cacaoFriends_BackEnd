const express = require('express');
const router = express.Router();
const OrdersController = require('../architecture/controllers/orders.controller');
const ordersController = new OrdersController();
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/orderLists', authMiddleware, ordersController.findAllOrderLists);
router.post('/orderLists', authMiddleware, ordersController.addOrderLists);

router.get('/carts', authMiddleware, ordersController.findCarts);
router.post('/carts', authMiddleware, ordersController.addCarts);
router.put(
    '/carts/:productId',
    authMiddleware,
    ordersController.updateProductAmountInCarts
);
router.put(
    '/carts/delete/:productId',
    authMiddleware,
    ordersController.deleteProductInCarts
);

module.exports = router;
