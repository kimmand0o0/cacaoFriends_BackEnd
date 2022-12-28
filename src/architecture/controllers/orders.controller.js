const OrdersService = require('../services/orders.service');

class OrdersController {
    ordersService = new OrdersService();

    findAllOrderLists = async (req, res, next) => {
        try {
            const userId = res.locals.user;
            const OrderLists = await this.ordersService.findAllOrderLists(
                userId
            );
            res.status(200).json({ OrderLists });
        } catch (error) {
            next(error);
        }
    };
    addOrderLists = async (req, res, next) => {
        try {
            const userId = res.locals.user;
            await this.ordersService.addOrderLists(userId);
            res.status(201).json({ message: '구매에 성공하였습니다.' });
        } catch (error) {
            next(error);
        }
    };

    directOrderLists = async (req, res, next) => {
        try {
            const userId = res.locals.user;
            const { productId, amount } = req.body;
            await this.ordersService.directOrderLists(
                productId,
                amount,
                userId
            );
            res.status(201).json({
                message: ' 구매에 성공하였습니다.',
            });
        } catch (error) {
            next(error);
        }
    };

    findCarts = async (req, res, next) => {
        try {
            const userId = res.locals.user;
            const Carts = await this.ordersService.findCarts(userId);
            res.status(200).json({ Carts });
        } catch (error) {
            next(error);
        }
    };

    addCarts = async (req, res, next) => {
        try {
            const userId = res.locals.user;
            const { productId, amount } = req.body;
            await this.ordersService.addCarts(productId, amount, userId);
            res.status(201).json({
                message: '장바구니 담기에 성공하였습니다.',
            });
        } catch (error) {
            next(error);
        }
    };

    updateProductAmountInCarts = async (req, res, next) => {
        try {
            const userId = res.locals.user;
            const productId = Number(req.params.productId);
            const { amount } = req.body;
            await this.ordersService.updateProductAmountInCarts(
                productId,
                amount,
                userId
            );
            res.status(201).json({
                message: '수량이 정상적으로 수정되었습니다.',
            });
        } catch (error) {
            next(error);
        }
    };

    deleteProductInCarts = async (req, res, next) => {
        try {
            const userId = res.locals.user;
            const productId = Number(req.params.productId);
            await this.ordersService.deleteProductInCarts(productId, userId);
            res.status(201).json({
                message: '정상적으로 삭제되었습니다.',
            });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = OrdersController;
