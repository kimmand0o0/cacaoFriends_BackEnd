const express = require('express');
const router = express.Router();
const OrdersController = require('../architecture/controllers/orders.controller');
const ordersController = new OrdersController();
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/orderLists', authMiddleware, ordersController.findAllOrderLists);
router.post('/orderLists', authMiddleware, ordersController.addOrderLists);
router.post(
    '/directOrderLists',
    authMiddleware,
    ordersController.directOrderLists
);

router.get('/carts', authMiddleware, ordersController.findCart);
router.post('/carts', authMiddleware, ordersController.addCart);
router.put(
    '/carts/:productId',
    authMiddleware,
    ordersController.updateProductAmountInCart
);
router.put(
    '/carts/delete/:productId',
    authMiddleware,
    ordersController.deleteProductInCart
);

module.exports = router;
